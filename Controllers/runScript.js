import { spawn } from 'child_process'

function runScript() {
    const child = spawn('python', ['Scrypt.py'], { shell: true });
    var resData = ""
    child.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        resData = data.toString()
    });

    child.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    child.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        // res.send(FormData)
    });
};
export default runScript;

