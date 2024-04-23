
import express from 'express';
import Admin from "../controllers/adminController.js";
import middleware from "../middleware/authAdmin.js";
const router = express.Router();
router.post('/signup', Admin.signupAdmin)
router.post('/LoginAdmin', middleware.generateToken, Admin.Login)
router.get ('/getClient', Admin.findAllClient)
router.post('/addshipment',  Admin.createShipment)
// router.get('/shipment', middleware.tokenVerification, Admin.getAllShipment )
router.get('/shipment',  Admin.getAllShipment )
router.get('/getEach/:Client_id', Admin.getEachShipment); 
router.get('/clientProfile/:Client_id', Admin.getClientProfile)
router.patch('/updateShipment/:shipment_id', Admin.updateInfo)
export default router;