import express from 'express'
import {forgotPassword, getMe, loginUser, logoutUser, registerUser, resetPassword, verifyUser} from "../controllers/user.controller.js"
import { isLoggedIn } from '../middleware/auth.middleware.js'
const router = express.Router()

router.post("/register" , registerUser)
router.get("/verify/:token" , verifyUser)
router.post("/login" , loginUser)
router.get("/logout" ,isLoggedIn, logoutUser)
router.post("/forgot-password" , forgotPassword)
router.post("/reset-password/:token" , resetPassword)
router.get("/me" ,isLoggedIn ,  getMe)


export default router