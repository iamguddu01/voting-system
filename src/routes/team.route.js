import express from "express"
import { createTeam, deleteTeam, getAllTeam, getTeamDetailsByCode, updateTeam } from "../controllers/team.controller.js";
import { checkUserAuth } from "../middlewares/index.js";

const router = express.Router();
// create
router.post("/create-team", checkUserAuth, createTeam)
router.get("/get-all-teams", checkUserAuth, getAllTeam)
router.post("/get-team-details/:code", checkUserAuth, getTeamDetailsByCode)
router.delete("/delete-team/:code", checkUserAuth, deleteTeam)
router.put("/update-team/:teamId", checkUserAuth, updateTeam)
export default router;