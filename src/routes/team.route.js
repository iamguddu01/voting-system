import express from "express"
import { createTeam } from "../controllers/team.controller.js";

const router = express.Router();
// create
router.post("/create-team", createTeam)
export default router;