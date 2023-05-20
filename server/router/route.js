import {Router} from "express";
const router=Router();

/**Importing all controllers */
import * as controller from '../controllers/appController.js';
import {registerMail} from '../controllers/mailer.js';
import Auth,{localVariables} from '../middleware/auth.js';

/**POST Methods */
router.route('/register').post(controller.register);
router.route('/registerMail').post(registerMail); //Send the email
router.route('/authenticate').post(controller.verifyUser, (req,res)=>res.end()); //Authenticate user
router.route('/login').post(controller.verifyUser, controller.login); //Login In App

/**GET Methods */
router.route('/user/:username').get(controller.getUser) //User with Username
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP) //Generate Random OTP
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP) //Verify Generated OTP
router.route('/createResetSession').get(controller.createResetSession) //Reset all the variables

/**Put Methods */
router.route('/updateuser').put(Auth, controller.updateUser); //Used to update the user profile
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword);  //Used to reset Password

export default router;