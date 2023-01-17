import React, { useState } from 'react'
import './images.css';


function Images() {
  const allImages =
    [
      { id: 1, image: './ocr_pics/1.jpg' },
      { id: 2, image: './ocr_pics/2.jpg' },
      { id: 3, image: './ocr_pics/3.jpg' },
      { id: 4, image: './ocr_pics/4.jpg' },
      { id: 5, image: './ocr_pics/5.jpg' },
      { id: 6, image: './ocr_pics/6.jpg' },
      { id: 7, image: './ocr_pics/7.jpg' },
      { id: 8, image: './ocr_pics/8.jpg' },
      { id: 9, image: './ocr_pics/9.jpg' },
      { id: 10, image: './ocr_pics/10.jpg' }
    ]
  const [path_clicked, setpath_clicked] = useState("");
  const image_clicked = (path) => {
    setpath_clicked(path)
  }

  return (
    <div className='container_upper'>
      <div className='images'>
        {allImages.map((item) => (
          <div key={item.id} onClick={() => image_clicked(item.image)} style={{ display: "flex", flexDiretion: "column", justifyContent: "center" }}>
            <img src={item.image} className="image-display" />
          </div>
        ))}

      </div>
      <p style={{ fontWeight: "600" }}>{path_clicked}</p>
    </div>
  )
}

export default Images