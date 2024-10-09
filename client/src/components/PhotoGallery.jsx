import React from 'react'
import ImageCard from './ImageCard'

const PhotoGallery = () => {
  return (
   <div className='my-10'>
    <h2 className='text-3xl font-semibold text-primary mb-10 text-center'>Photos</h2>
     <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
      <ImageCard/>
      <ImageCard/>
      <ImageCard/>
      <ImageCard/>
      <ImageCard/>
      <ImageCard/>
    </div>
   </div>
  )
}

export default PhotoGallery
