import React from 'react';
import Gallery from 'react-photo-gallery';
const MyGallery = ({ images }) => {
    return (
        <div>
            <Gallery photos={images} />
        </div>
    );
};
export default MyGallery;