import express from "express"
import { createElection, deleteElection, getAllElection, getElectionDetailsById, updateElection } from "../controllers/election.controller";

const router = express.Router();
// create
router.post("/create-election", createElection) 
router.get("/get-all-election", getAllElection)
router.post("/get-election-details/:id", getElectionDetailsById)
router.delete("/delete-election/:id", deleteElection)
router.put("/update-election/:id", updateElection)
export default router;