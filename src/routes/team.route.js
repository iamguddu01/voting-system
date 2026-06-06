import express from "express"
import { createTeam, deleteTeam, getAllTeam, getTeamDetailsByCode, updateTeam } from "../controllers/team.controller.js";

const router = express.Router();
// create
router.post("/create-team", createTeam)
router.get("/get-all-teams", getAllTeam)
router.post("/get-team-details/:code", getTeamDetailsByCode)
router.delete("/delete-team/:code", deleteTeam)
router.put("/update-team/:teamId", updateTeam)
export default router;