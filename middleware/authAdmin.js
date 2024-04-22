
import Admin from "../model/adminModel.js";
import  jwt  from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();
const secret = process.env.ACCESS_TOKEN;
const generateToken = async(req, res, next) =>{
    try {
  const {email, password} = req.body;
  const findAdmin = await Admin.findOne({where:{email}});
  if(!findAdmin){
    return res.status(401).json({message:"Invalid Email "});
  } 
  const passwordMatch = await bcrypt.compare(
    password, findAdmin.password
 )
 if(!passwordMatch){
    res.status(409).json({message:"Invalid Password"});
    return;
 }
 const generatetoken = {
    id:findAdmin.id,
    email:findAdmin.email,
    firstName:findAdmin.firstName,
    lastName:findAdmin.lastName,
 }
const AdminToken = jwt.sign(generatetoken, secret, { expiresIn: "1h" });
 req.token = AdminToken
 req.user = findAdmin;
 next()
} catch (error) {
    console.log(error);
    res.status(500).json({message:"Unable to login", error})
    return;   
}
};
// token Verification
const tokenVerification = async (req, res, next) => {
    try {
      const tokenInHeader = req.headers.token;
      if (!tokenInHeader) {
        return res.status(401).json({ message: "No token provided" });
      }
      const decodedToken = jwt.decode(tokenInHeader, { complete: true });
      if (!decodedToken || !decodedToken.payload) {
        return res.status(401).json({ message: "Invalid token format" });
      }
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.payload.exp <= currentTime) {
        return res.status(401).json({ message: "Token has expired" });
      }
      const verify = jwt.verify(tokenInHeader, secret);
      req.Admin_id = verify.id;
      // console.log(verify);
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error", error });
    }
  };
export default {generateToken, tokenVerification }