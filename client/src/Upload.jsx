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
    function handleChange(e) {
        console.log(e.target.files);
        setSelectedFile(e.target.files[0])
        setFile(null)
    }

    // if (file != null) image_function(file);

    const fileUploadHandler = (event) => {
        setFile(URL.createObjectURL(selectedFile));
        const fd = new FormData();
        fd.append('image_name', selectedFile, selectedFile.name);
        axios.post('http://localhost:5000/upload', fd)
            .then(res => {
                console.log(res);
            });
    }
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
                    <button className='upload-btn'>Run</button>
                    <img src={file} className='upload-image' />
                </div>
            </div>
        </>

    );
}

export default Upload