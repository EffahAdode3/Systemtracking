import Admin from '../model/adminModel.js';
import Shipment from '../model/shipmentsModel.js';
import Client from '../model/clientModel.js';  
import bcryptjs from "bcryptjs";
import dotenv from 'dotenv'
dotenv.config();
function generateVerificationCode() {
    return Math.floor(1000 + Math.random() * 9000);
  }
// sign up for admin
const signupAdmin = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phoneNumber } = req.body;
        const existingAdmin = await Admin.findOne({where:{ email }});
        if (existingAdmin) {
            return res.status(409).json({ message: 'Admin Already Registed' });
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = await Admin.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phoneNumber,
        });
        if (newUser) {
            return res.status(201).json({ message: 'Admin Add successfully' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
};

// find All Client 
const findAllClient = async (req, res) => {
    try {
        let clients = []
        clients = await Client.findAll();
        // console.log(clients);
        return res.status(200).json({ message: "Successful", clients });
        // console.log(clients);
    } catch (error) { 
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }  
};
// create shipment 
const createShipment = async (req, res)=> {
    try {    
        const tracking_No = generateVerificationCode();
        const  { tracking_Number, item_name, statuses, client_id } = req.body;
        const shipmentData = {
            item_name,
            statuses,
            tracking_Number: tracking_No,
            client_id: client_id  
        };
      const createships = await Shipment.create(shipmentData)
      if(createships)
      return res.status(201).json({message: "success " })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error",  error});
    }
}
// 
const Login = async(req, res, next) =>{
    const token = req.token;
    // const User = req.body;
    if(token){
      return res.status(200).json({message:" Successfull login",token});    
    }
}
// Get all Shipment
const getAllShipment = async (req, res) => {
    try {
   
      let allShipment = [];
        allShipment = await Shipment.findAll();
      if (allShipment.length === 0) {
        return res.status(409).json({ message: "No Shipment found" });
      }
      return res.status(200).json({
        message: "Success", 
        allShipment
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  // get each Shipment
  const getEachShipment = async (req, res) => {
    try {
      const Client_id = req.params.Client_id;
      console.log(Client_id);
      let allShipment = [];
      const user = await Shipment.findOne({where:{client_id: Client_id}});
      if (!user) {
        return res.status(404).json({
          message: 'Client not found'
        });
      }
      allShipment = await Shipment.findAll({
        where: {
          Client_id: user.client_id
        }
      });
      if (allShipment.length === 0) {
        return res.status(409).json({
          message: 'No Shipment found'
        });
      }
      return res.status(200).json({
        message: "Success",
        allShipment
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }  
  }
  //get Client Profile
  const getClientProfile = async (req, res) => {
    try {
      const id = req.params.Client_id;
      console.log(id );
      const user = await Client.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: "Client not found" });
      }
  
      const profile = await Client.findAll({
        where: {
          id: user.id
        }
      });
  
      return res.status(200).json({
        message: "Success",
        profile
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  };
// update shipment
const updateInfo = async (req, res) => {
  try {
    const ID_shipment = req.params.shipment_id;
    console.log(ID_shipment);
    const updateClientShipment = await Shipment.findByPk(ID_shipment);
    const item_name = req.body.item_name ? req.body.item_name : updateClientShipment.item_name;
    const statuses = req.body.statuses ? req.body.statuses : updateClientShipment.statuses;
    if (!updateClientShipment) {
      return res.status(409).json({ message: "Shipment was not found"});
    }
    const shipmentData = {
      item_name,
      statuses,
    };
    const updateDetails = await Shipment.update(shipmentData, { where: {id:ID_shipment } });
    console.log(req.body, "########################################");
    if (updateDetails) {
      return res.status(201).json({ message: "Shipment has been Updated" });
    } else {
      return res.status(500).json({ message: "Failed to update shipment" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};
export default{ signupAdmin, findAllClient, Login, createShipment, getAllShipment, getEachShipment, getClientProfile, updateInfo }