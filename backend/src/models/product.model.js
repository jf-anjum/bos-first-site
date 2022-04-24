const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id:{type:'Number',required:true},
    name:{type: 'String',required: true},
    city:{type: 'String',required: true},
    address:{type: 'String',required: true},
    capacity:{type: 'Number',required: true},
    cost_per_day:{type: 'Number',required: true},
    verified:{type: 'String',required: true},
    rating:{type: 'Number',required: true},
    admin_id : {type: mongoose.Schema.Types.ObjectId, ref: "admin", required: true}
    
},{
    versionKey:false,
    timestamps:true,
}

)

module.exports = mongoose.model("product",productSchema);