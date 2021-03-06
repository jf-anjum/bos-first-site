import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {useState , useEffect } from 'react';
import {addData} from '../Redux/Product/action'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export function Tables() {
    const [page,setPage] = useState(1)
    const [load,setLoad] = useState(true)
    const allProducts = useSelector((store)=>store.data.data)
    const isLoggedIn = useSelector((store) => store.reducer.isLoggedIn)

    // console.log(allProducts);
    const dispatch = useDispatch();
    const navigate = useNavigate();

  useEffect(() => {
      getData()
  },[page])    

  const getData = () =>{
      setLoad(true)
      axios.get('https://bos-first-site-065.herokuapp.com/products',{
          params:{
              page:page,
              size:4
          }
      }).then((response) => {
        dispatch(addData(response.data.products));
        setLoad(false)
      })
  }

  const handleSortPrice = (event) => {
    var price
    if(event.target.value === 'Increasing'){
      price = "asc"
    }else{
      price = "desc"
    }
     axios.get(`https://bos-first-site-065.herokuapp.com/products?price=${price}`).then((response) => {
       dispatch(addData(response.data));
     })
  };

    const handleSortRate = (event) => {
      var rating
      if(event.target.value === 'Increasing'){
        rating = "asc"
      }else{
        rating = "desc"
      }
      axios.get(`https://bos-first-site-065.herokuapp.com/products?rating=${rating}`).then((response) => {
        dispatch(addData(response.data));
      })
  };
  
  const handleRefresh = () => {
    getData()
  }

  const filterVerified = (filter) =>{
    axios.get(`https://bos-first-site-065.herokuapp.com/products?verified=${filter}`).then((response) => {
      dispatch(addData(response.data));
    })
  }

  const handleDelete = (id) => {
    axios.delete(`https://bos-first-site-065.herokuapp.com/products/${id}`).then((response)=>{
      getData()
    })
  }

  return (
    <>
        <Button style={{margin:'10px'}} onClick={()=>filterVerified('yes')} variant="contained">Filter Verified Place</Button>
        
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          style={{display: 'inline'}}
        >
            <TextField
              id="outlined-select-currency"
              select
              label="Sort Price"
              // value={currency}
              onChange={handleSortPrice}
              helperText="Please select your choice"
            >   
                <MenuItem value="Increasing">Increasing</MenuItem>
                <MenuItem value="Decreasing">Decreasing</MenuItem>
            </TextField>
          
        </Box>

        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          style={{display: 'inline'}}
        >
            <TextField
              id="outlined-select-currency"
              select
              label="Sort Rating"
              // value={currency}
              onChange={handleSortRate}
              helperText="Please select your choice"
            >   
                <MenuItem value="Increasing">Increasing</MenuItem>
                <MenuItem value="Decreasing">Decreasing</MenuItem>
            </TextField>
          
        </Box>

        <Button style={{margin:'10px'}} onClick={handleRefresh} variant="contained">Refresh</Button>
        {load?<div>Loading...</div>:<TableContainer style={{marginTop:'50px'}} component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell>Id</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">City</StyledTableCell>
                <StyledTableCell align="center">Address</StyledTableCell>
                <StyledTableCell align="center">Capacity</StyledTableCell>
                <StyledTableCell align="center">Cost Per Day</StyledTableCell>
                <StyledTableCell align="center">Verified</StyledTableCell>
                <StyledTableCell align="center">Rating</StyledTableCell>
                <StyledTableCell align="center">Details</StyledTableCell>
                <StyledTableCell align="center">Image</StyledTableCell>
                {isLoggedIn?<StyledTableCell align="center">Edit</StyledTableCell>:""}
                {isLoggedIn?<StyledTableCell align="center">Delete</StyledTableCell>:""}
            </TableRow>
            </TableHead>
            <TableBody>
            {allProducts.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">{row.id}</StyledTableCell>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">{row.city}</StyledTableCell>
                  <StyledTableCell align="center">{row.address}</StyledTableCell>
                  <StyledTableCell align="center">{row.capacity}</StyledTableCell>
                  <StyledTableCell align="center">{row.cost_per_day}</StyledTableCell>
                  <StyledTableCell align="center">{row.verified}</StyledTableCell>
                  <StyledTableCell align="center">{row.rating}</StyledTableCell>
                  <StyledTableCell align="center" style={{cursor: 'pointer' , textDecoration:'underline' , color:'blue'}} onClick={()=>{navigate(`/details/${row._id}`)}}>Details</StyledTableCell>
                  <StyledTableCell align="center"><img src={row.image} alt="pet's house" width="100px" /></StyledTableCell>
                  {isLoggedIn?<StyledTableCell align="center"><Button onClick={()=>navigate(`/editpage/${row._id}`)} variant="contained">Edit</Button></StyledTableCell>:""}
                  {isLoggedIn?<StyledTableCell align="center"><Grid onClick={()=>handleDelete(row._id)} style={{cursor: 'pointer'}} item xs={8}><DeleteIcon /></Grid></StyledTableCell>:""}
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        <Button style={{margin:'20px' , backgroundColor:'gray'}} variant="contained" disabled={page===1} onClick={()=>{setPage(page-1)}}>Prev</Button>
        <Button style={{margin:'20px' , backgroundColor:'gray'}} variant="contained" onClick={()=>{setPage(page+1)}}>Next</Button>
      </TableContainer>}
    </>
  );
}
