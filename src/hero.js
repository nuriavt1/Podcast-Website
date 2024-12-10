import React from 'react';
import heroImg from './heroImg.svg';
import arrowRight from './arrowRight.svg';

function Hero() {
  return (
    <div class="hero">

      <div class="hero-text">
        <h1>Press Play. Chill Out.</h1>
        <h2>The best podcasts, all in one spot. Ready when you are.</h2>

        <div class="boton"><p>Let’s listen</p>
        <img src = {arrowRight}></img>
        </div>
        
      </div>

      <img src={heroImg}></img>

    </div>
  );
}

export default Hero;
