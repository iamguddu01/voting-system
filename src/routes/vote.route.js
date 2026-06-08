import express from "express"
import { handleCastUserVotes, handleVoteCalculations } from "../controllers/vote.controller";

const router = express.Router();
// create
router.post("/cast-vote", handleCastUserVotes);
router.get("/get-teamvotes/:electionCode", handleVoteCalculations)

export default router;