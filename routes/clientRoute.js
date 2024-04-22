import  express  from "express";
import Client from '../controllers/clientController.js'
import middleware from "../middleware/authClient.js"
const router = express.Router();
router.post('/signupClient', Client.signupClient)
router.post('/loginClient', middleware.generateToken, Client.Login)
router.get('/allClient',  Client.findAllClient)
router.put('/tracking', Client.findOneshipment )
router.get('/myprofile', middleware.tokenVerification, Client.getProfile)
router.get('/client_Dashboard', middleware.tokenVerification, Client.getYourShipment)
export default router;