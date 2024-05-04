const mongoose=require('mongoose')

const {Schema}=mongoose;
const userOrderSchema=new Schema({
    location:{
        type:Object
    },
    email:{
        type:String
    },
    date:{
        type:Object,
        default:Date.now
    },
    orders:{
        type:Object
    }
})

module.exports=mongoose.model('userorder',userOrderSchema)