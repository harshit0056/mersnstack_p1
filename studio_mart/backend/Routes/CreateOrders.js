const express = require('express')
const router = express.Router()
const userorder=require("../models/order")
router.post("/order",async(req,res)=>{
    try {
        
        const newgorder = new userorder(req.body)
        const result = await newgorder.save();
        console.log(result);
        res.send(result);

    } catch (err) {
        res.json({ success: false });
    }
})

module.exports = router;