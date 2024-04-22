import nodemailer from 'nodemailer';
import Client from '../model/clientModel.js'
import Shipment from '../model/shipmentsModel.js'
import bcryptjs from "bcryptjs";
import dotenv from 'dotenv'
dotenv.config();
// Nodemailer 
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
});
function sendClientDetails( fullName, email,  password ) {
  const mailOptions = {
    from: 'maximnyansa75@gmail.com',
    to: email,
    subject: 'Login Details and Item Information',
    html: `
      <p>Dear ${fullName},</p>
      <p>Welcome to Our Movis logistics!</p>
      <p>Your account has been successfully created. Below are your login details:</p>
      <ul>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Password:</strong> ${password}</li>
      </ul>
      <p>Please use the above credentials to login to your account.</p>
      <p>Thank you,</p>
      <p>Movis logistics</p> `
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending verification email:', error);
    } else {
      console.log('Verification email sent:', info.response);
    }
  });
};
// Add Client 
const signupClient = async (req, res) => {
    try {
        const { fullName,  email, password, company } = req.body;
        const existingClient = await Client.findOne({where:{ email }});
        if (existingClient) {
            return res.status(409).json({ message: 'Client Already Registed' });
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        
        const newUser = await Client.create({
            fullName,
            email,
            password: hashedPassword,
            company,
        });
   sendClientDetails( fullName, email,  password )
        if (newUser) {
            return res.status(201).json({ message: 'Client Add successfully' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
};
const Login = async(req, res) =>{
    const token = req.token;
    // const User = req.body;
    if(token){
      return res.status(200).json({message:" Successfull login",token});    
    }
};
// 
const findAllClient = async (req, res) => {
    try {
        let clients = []
        clients = await Client.findAll();
        // console.log(clients);
        return res.status(200).json({ message: "Successful", clients });
     
    } catch (error) { 
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
    
};
const findOneshipment = async (req, res) => {
    try {
      const { tracking_Number } = req.body;
      const find_tracking_Number = await Shipment.findAll({ where: {tracking_Number } });
      if(find_tracking_Number ){
        return res.status(200).json({
          message: "Success",
         find_tracking_Number
        });
      }
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  };

  const getProfile = async(req, res) =>{
    try {
      console.log(req.Client_id)
      let profile = []
      const user = await Client.findByPk(req.Client_id);
      profile = await  Client.findAll({
        where:{
          id:user.id
        }
      })
      return res.status(200).json({
        message : "Success ",
        profile
      })
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }

// 
  const getYourShipment = async (req, res ) => {
    try {
      console.log(req.Client_id)
      let allShipment = [];
      const user = await Client.findByPk(req.Client_id);
      allShipment = await Shipment.findAll({
        where:{ 
          Client_id: user.id
        }
      });
      if( allShipment. length === 0 ){
        return res. status(409).json({
          message: 'No Shipment found'
        })
      }
      return res.status(200).json({
        message: "Success",
        // data: allProduct,
        allShipment
      });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Server error" });
    }
  }
export default{ signupClient, Login, findAllClient, findOneshipment,getProfile,getYourShipment }