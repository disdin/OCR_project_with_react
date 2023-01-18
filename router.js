// importing required modules
import express from "express";
import runScript from "./Controllers/runScript.js";
import upload from "./Controllers/upload.js";

const router=express.Router();

router.get("/",(req,res)=>{
    console.log(`ok... ${process.pid}`);
    res.send(`ok... ${process.pid}`);
    // cluster.worker.kill();
})

// declaring routes
router.post("/upload", upload.single('image_name'), (req, res) => {
    runScript(req,res);
    // res.send("xsvb")
})

// router.get("/run", async (req,res)=>{
//     const allData = await imagemodel.find()
//     res.json(allData)
// })
export {router};