const User = require("../models/User");

exports.getProfileDetails=async(req,resp,next)=>{
    try {
      
        const {name,email,phoneNumber,jobPosition,companyName,industry,state,city}=req.user;
        resp.status(200).json({name,email,phoneNumber,jobPosition,companyName,industry,state,city})
        
    } catch (error) {
        resp.status(500).json({message:"Internal server error!"});
        
    }

}