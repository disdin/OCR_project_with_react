import { spawn } from 'child_process'
import fs from 'fs'
import uploadInDB from './uploadInDB.js';

function runScript(req, res) {
    const child = spawn('python', ['scrypt.py'], { shell: true });
    var resData = ""
    child.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        resData = data.toString()
    });

    child.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    child.on('close', (code) => {
        const img = {
            data: fs.readFileSync("run/image.jpg","base64"),
            contentType: 'image/jpg',
            output: resData,
            err: " "
        } 
        uploadInDB(img);
        // console.log(img.data);         
        console.log(`child process exited with code ${code}`);
        res.send(JSON.stringify(img))
    });
};
export default runScript;

