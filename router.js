// importing required modules
import express from "express";
import runScript from "./Controllers/runScript.js";
import upload from "./Controllers/upload.js";
import path from "path"
const router=express.Router();

router.get("/",(req,res)=>{
    console.log(`ok... ${process.pid}`);
    console.log(path)
    // res.send(path);
    res.sendFile(path.join(__dirname, "frontend/public", "index.html"));

    // cluster.worker.kill();
})

// declaring routes
router.post("/upload", upload.single('image_name'), (req, res) => {
    res.sendStatus(200);
})

router.post("/runScript", runScript)
export {router};