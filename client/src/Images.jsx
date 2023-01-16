import React from 'react'
import './images.css';

function Images() {
    const allImages =
    [
      { id: 1, image: './1.jpg' },
      { id: 2, image: './1.jpg' },
      { id: 3, image: './1.jpg' },
      { id: 4, image: './1.jpg' },
      { id: 5, image: './1.jpg' },
      { id: 6, image: './1.jpg' },
      { id: 7, image: './1.jpg' },
      { id: 8, image: './1.jpg' },
      { id: 9, image: './1.jpg' }
    ]
  return (
    <div className='images'>
        {allImages.map((item) => (
          <div key={item.id}>
            <img src={item.image} className="image-display"/> 
          </div>
        ))}
        {/* <div className="row1">
            <img src='1.jpg' />
        </div>
        <div className="row2">

        </div> */}
    </div>
  )
}

export default Images