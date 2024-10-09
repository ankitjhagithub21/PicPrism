import React from 'react'
import Hero from '../components/Hero'
import PhotoGallery from '../components/PhotoGallery'

const Home = () => {
  return (
    <div className='container mx-auto px-3 md:px-0'>
      <Hero/>
      <PhotoGallery/>
    </div>
  )
}

export default Home
