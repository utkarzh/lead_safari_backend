const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, resp, next) => {
    let { name, jobPosition, companyName, industry,state, city, phoneNumber, email, password } = req.body;
  
    try {
      // Input validation
      if (!name || !jobPosition || !companyName ||!state|| !industry || !city || !phoneNumber || !email || !password) {
        throw new Error('Missing fields');
      }
  
      // Check if email is already registered
      const existingEmail = await User.findOne({ where: { email } });
  
      if (existingEmail) {
        return resp.status(409).json({ message: "Email is already registered" });
      }
  
      // Check if phoneNumber is already registered
      const existingPhoneNumber = await User.findOne({ where: { phoneNumber } });
  
      if (existingPhoneNumber) {
        return resp.status(409).json({ message: "Phone number is already registered" });
      }
  
      // Password hashing
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create user in database
      await User.create({
        name,
        email,
        companyName,
        industry,
        state,
        city,
        phoneNumber,
        password: hashedPassword,
        jobPosition,
      });
  
      // Respond with success message
      return resp.status(200).json({ message: "Sign Up successful!" });
    } catch (error) {
      // Error handling
      console.error('Error in signUp:', error.message);
      return resp.status(400).json({ message: "Failed to sign up user" }); // Generic error message for client
    }
  };

  exports.logIn = async (req, resp, next) => {
    let { email, password } = req.body;
  
    try {
      // Input validation
      if (!email || !password) {
        throw new Error('Missing inputs');
      }
  
      // Find user by email
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return resp.status(404).json({ message: "User not found" });
      }
  
      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return resp.status(401).json({ message: "Invalid password" });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id},
        process.env.JWT_SECRET, // Replace JWT_SECRET with your actual secret key
     // Token expiration time
      );
  
      // Return user data and token
      resp.status(200).json({ userDetails: {name:user.name,email:user.email,phoneNumber:user.phoneNumber,jobPosition:user.jobPosition,industry:user.industry,state:user.state,city:user.city,companyName:user.companyName}, token });
      
    } catch (error) {
      console.error('Login error:', error.message);
      resp.status(400).json({ message: "Invalid credentials" });
    }
  };