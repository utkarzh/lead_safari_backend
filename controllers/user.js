const User = require("../models/User");
const {Op}=require("sequelize")
const bcrypt=require('bcrypt')
exports.resetPassword = async (req, res) => {
    
    const { oldPassword, newPassword } = req.body;
  
  
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: 'Old password and new password are required' });
    }
  
    try {
      // Find the user (assuming the user is authenticated and their ID is in req.user.id)
      const user = await User.findByPk(req.user.id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the old password matches
      const isMatch = await bcrypt.compare(oldPassword, user.password);
  
      if (!isMatch) {
        return res.status(401).json({ message: 'Wrong password' });
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the user's password
      user.password = hashedPassword;
      await user.save();
  
      return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      
      return res.status(500).json({ message: 'Server error' });
    }
  };
exports.getProfileDetails=async(req,resp,next)=>{
    try {
      
        const {name,email,phoneNumber,jobPosition,companyName,industry,state,city}=req.user;
        resp.status(200).json({name,email,phoneNumber,jobPosition,companyName,industry,state,city})
        
    } catch (error) {
        resp.status(500).json({message:"Internal server error!"});
        
    }

}
exports.getAllUsers = async (req, res, next) => {
    try {

  
      // Query to find all users except the current user and exclude the password field
      const users = await User.findAll({
        where: {
          id: { [Op.ne]: req.user.id } // Op.ne means "not equal"
        },
        attributes: [ 'name', 'email', 'phoneNumber', 'jobPosition', 'companyName', 'industry', 'state', 'city'] // List all attributes you want to include
      });
  
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Internal server error!" });
    }
  };