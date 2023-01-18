import { spawn } from 'child_process'
import { json } from 'express';
import fs from 'fs'

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
            data: fs.readFileSync("run/image.jpg"),
            contentType: 'image/jpg',
            output: resData,
            err: " "
        }                
        console.log(`child process exited with code ${code}`);
        res.send(JSON.stringify(img))
    });
};
export default runScript;

