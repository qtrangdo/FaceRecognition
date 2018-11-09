import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageurl, box}) =>{
    return (
        <div className='center ma'>
            <div className= 'absolute mt2'>
                 <img id='inputimage' alt = '' src={imageurl} width='auto' height='500px' ></img>
                <div className = 'bounding_box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>        
        </div>
    )
}

export default FaceRecognition;