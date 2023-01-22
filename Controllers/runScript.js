import { spawn } from 'child_process'
import fs from 'fs'
import uploadInDB from './uploadInDB.js';
import path from 'path'

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
        // const img = {
        //     data: fs.readFileSync("run/image.jpg","base64"),
        //     output: resData,
        //     err: " "
        // } 
        // uploadInDB(img);
        // // console.log(img.data);         
        // console.log(`child process exited with code ${code}`);
        // res.send(JSON.stringify(img))
        const testFolder = './run'
        var  fiiile;
        fs.readdirSync(testFolder).forEach(file => {
            fiiile = file
          });
          const path__ = path.join(testFolder, fiiile)
           const img = {
            data: fs.readFileSync(path__,"base64"),
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

