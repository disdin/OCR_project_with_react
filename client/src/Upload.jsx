import axios from 'axios';
import React, { useState } from 'react'
import './upload.css';

// const Upload = () => {
//     useState [selectedFile, setSelectedFile] = useState(null);
//     const fileSelectedHandler = (event) =>{
//         // console.log(event.target.files[0])
//         setSelectedFile = event.target.files[0]
//     };
//     const fileUploadHandler = (event) =>{
//         const fd = new FormData();
//         fd.append('image', selectedFile, selectedFile.name);
//         axios.post('',fd)
//         .then(res=> {
//             console.log(res);
//         });
//     }
//   return (
//     <div className='upload'>
//         <input type="file" onChange={fileSelectedHandler} />
//         <button onClick={fileUploadHandler}>Upload</button>
//     </div>
//   )
// }
function Upload (){
    const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
  
    return (
        <>
            <input className='upload-btn' style={{width:"19rem"}} type="file" onChange={handleChange} />
            <div className="upload">
                <div className="upload-left">
                    <button className='upload-btn'>Upload</button>
                    <img src={file} className='upload-image'/>
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