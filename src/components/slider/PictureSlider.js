import React from 'react'

// here we are importing some images 
// but the Slider children can be an array of any element nodes, or your own components
// import images from './images'

import Slider from 'react-touch-drag-slider'
import styled, { createGlobalStyle } from 'styled-components'

import images from './images'

// define some basic styles
const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html,body {
    padding: 0;
    margin: 0;
  }
`
// The slider will fit any size container, lets go full screen...
const AppStyles = styled.main`
  height: 100vh;
  width: 100vw;
`

// Whatever you render out in the Slider will be draggable 'slides'
function PictureSlider() {
  return (
    <>
      <GlobalStyles />
      <AppStyles>
        <Slider>
          {images.map(({ url, title }, index) => (
            <img src={url} key={index} alt={title} />
          ))}
        </Slider>
      </AppStyles>
    </>
  )
}

export default PictureSlider
