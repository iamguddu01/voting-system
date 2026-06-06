import express from "express"
import { handleGoogleAuth, handleGoogleCallback, handleGoogleSignIn, handleUserAuthentication } from "../controllers/user.controller.js";
const router = express.Router();
router.get("/auth/signin-google", handleGoogleSignIn);

router.get('/auth/google', handleGoogleAuth)

router.get('/auth/google/callback', handleGoogleCallback);

router.get("/user-authenticated", handleUserAuthentication)

export default router;