import React from 'react';

import './item.css'

const Item = (props) => (
    <div className='img-child'>
     <img src={props.image.largeImageURL} alt='' />
    </div>
)

export default Item;