import axios from 'axios';
import React, { useState } from 'react'
import Images from './Images';
import './upload.css';

const image_function = async (file) => {
    const out = await fetch(file);
    const blob = await out.blob()
    const fileobj = new File([blob], "image_name", { type: blob.type, lastModified: Date.now() })
    console.log("image data object", fileobj);
}

function Upload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [file, setFile] = useState(null);
    const [base64out, setBase64out] = useState(null);
    const [output, setOutput] = useState(null);
    function handleChange(e) {
        console.log(e.target.files);
        setSelectedFile(e.target.files[0])
        setFile(null)
        setBase64out(null)
        setOutput(null)
    }

    // if (file != null) image_function(file);

    const fileUploadHandler = async(event) => {
        setFile(URL.createObjectURL(selectedFile));
        const fd = new FormData();
        fd.append('image_name', selectedFile, selectedFile.name);
        try {
            const res = await axios.post('http://localhost:5000/upload', fd) 
            console.log(res)
            setOutput(res.data.output)
            const base64String = btoa(
                String.fromCharCode(...new Uint8Array(res.data.data.data))
              );
            //   console.log("fuck uhhhhhhhh ", base64String)
            setBase64out(base64String);
        }
        catch(err){
            console.log("upload.jsx error msg ", err)
        }
    }

    // const fileRunnerHandler = (event) =>{
    //     axios
    //     .get("http://localhost:5000/upload")
    //     .then((res) => setData(res.data))
    //     .catch((err) => console.log(err, "it has an error"));
    // }
    
    return (
        <>
            <Images />
            <input className='upload-btn' style={{ width: "19rem" }} type="file" onChange={handleChange} />
            <div className="upload">
                <div className="upload-left">
                    <button className='upload-btn' onClick={fileUploadHandler}>Upload</button>
                    <img src={file} className='upload-image' />
                </div>
                <div className="upload-right">
                    <button className='upload-btn' 
                    // onClick={fileRunnerHandler}
                    >
                        Run</button>
                    <img src={base64out==null?file:`data:image/jpg;base64,${base64out}`} className='upload-image' />
                    
                </div>
            </div>
            <p style={{fontWeight:"600",fontSize:"2rem"}}>{output}</p>
        </>

    );
}

export default Upload