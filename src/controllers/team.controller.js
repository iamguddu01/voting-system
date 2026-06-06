import { Code } from "mongodb";
import db from "../models/index.js";

const { Team } = db

export const createTeam = async(req, res)=>{
    try {
        const {name, email, description = "", code, isActive} = req.body;
        if(!name || !email || !code){
            return res.status(400).json({message: "name, email and code are required"})
        }
        
        let team = await Team.findOne({
            code: code.toUpperCase(),
        });
        if(team){
            return res.status(400).json({message: "team already exist"})
        }
        team = await Team.findOne({email})
        if(team){
            return res.status(400).json({message: "team already exist with this email"})
        }
        team = await Team.create({
            name,
            email,
            description,
            code: code.toUpperCase(),
            isActive: isActive !== undefined ? isActive: true,
        })

        return res.status(201).json({message: "team created successfully", team})
    } catch (error) {
        return res.status(500).json({message: "Something went wrong while creating team", error: error.message || error})
    }
}

export const getAllTeam = async(req, res)=>{
    try {
        const teams = await Team.find({})
        return res.status(200).json({
            message: "teams fetched successfully",
            teams
        })
    } catch (error) {
        return res.status(500).json({
            message:"Something went wrong while fetching teams",
            error: error.message || error
        })
    }
}

export const getTeamDetailsByCode = async(req, res)=>{
    try {
        const teamCode = req.params?.code;
        const team = await Team.findOne({
            code:teamCode?.toUpperCase()
        })
        if(!team){
            return res.status(400).json({message: `team does not exist with this code ${teamCode}`})
        }
        return res.status(200).json({
            message: "team fetched successfully",
            team
        })
    } catch (error) {
        return res.status(500).json({
            message:"Something went wrong while fetching team",
            error: error.message || error
        })
    }
}

export const deleteTeam = async(req, res)=>{
    try {
        const teamCode = req.params?.code;
        const team = await Team.findOneAndDelete({
            code:teamCode?.toUpperCase()
        })
        if(!team){
            return res.status(400).json({message: `team does not exist with this code ${teamCode}`})
        }
        return res.status(200).json({
            message: "team deleted successfully",
            team
        })
    } catch (error) {
        return res.status(500).json({
            message:"Something went wrong while deleting team",
            error: error.message || error
        })
    }
}

export const updateTeam = async(req, res)=>{
    try {
        const teamId = req.params?.teamId
        const { payload } = req.body
        let payloadForUpdate = {}
        let allowedKeys = {
            name:true,
            email:true,
            code:true,
            description:true,
            isActive:true
        }

        for(const key in payload){
            if(allowedKeys?.[key]){
                payloadForUpdate.key=payload?.[key]
            }
        }
        if(payloadForUpdate?.email){
            let team = await Team.findOne(  {email: payloadForUpdate?.email});
            if(team){
                return res.status(400).json({
                    message: "email update is prohibited"
                })
            }
        }
        if(payloadForUpdate?.code){
            let team = await Team.findOne({code: payloadForUpdate?.code.toUpperCase()});
            if(team){
                return res.status(400).json({
                    message: "code change is prohibited"
                })
            }
        }
        const updatedTeam = await Team.findOneAndUpdate({_id: teamId}, {...payloadForUpdate}, {isNew: true}) 
        return res.status(200).json({
            message: "team updated successfully",
            updateTeam
        })
    } catch (error) { 
        return res.status(500).json({
            message:"Something went wrong while updating team",
            error: error.message || error
        })
    }
}