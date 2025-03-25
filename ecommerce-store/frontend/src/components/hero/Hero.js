import React from 'react'
import banner from '../../assets/bannerimg.jpg'
import './Hero.css'

const Hero = () => {
  return (
    <div className='heroContainer' style={{backgroundImage: `url(${banner})`}}>
    </div>
  )
}

export default Hero
