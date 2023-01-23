// importing required modules
import express from "express";
import runScript from "./Controllers/runScript.js";
import upload from "./Controllers/upload.js";

const router=express.Router();

router.get("/",(req,res)=>{
    console.log(`ok... ${process.pid}`);
    res.header("Access-Control-Allow-Origin", "*");
    res.send(`ok... ${process.pid}`);
    // cluster.worker.kill();
})

// declaring routes
router.post("/upload", upload.single('image_name'), (req, res) => {
    res.sendStatus(200);
})

router.post("/runScript", runScript)
export {router};