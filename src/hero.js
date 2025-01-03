import React from 'react';
import heroImg from './heroImg.svg';
import arrowRight from './arrowRight.svg';
import { Link } from 'react-router-dom'

function Hero() {
  return (

    <div className='home'>
      <div class="hero">

        <div class="hero-text">
          <h1>Press Play. Chill Out.</h1>
          <h2>The best podcasts, all in one spot. Ready when you are.</h2>

          <Link to="/topics-selector">
            <div class="boton" ><p>Let’s listen</p>
              <img src={arrowRight}></img>
            </div>
          </Link>


        </div>

        <img src={heroImg}></img>

      </div>

      <section>
        <h3>Our content</h3>
        <p>Explore a rich collection of podcasts and audiobooks, handpicked to suit every mood and moment.</p>
        <div>
          <div className='content-type'>
            <h3>Podcasts</h3>
            <p>+5M Podcasts available</p>
            <div>
              <p>Listen Now</p>
            </div>
          </div>
          <div className='content-type'>
            <h3>Audiobooks</h3>
            <p>+300k Audiobooks avaliable</p>
            <div>
              <p>Listen Now</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <h1>Where ideas take flight and stories find their nest.</h1>
      </section>
      <section>
        <div>
          <h2>The best. Now free</h2>
          <p>The world’s most powerful podcast platform, now available for free.</p>
        </div>
        <div>
        <h2>Easy to use</h2>
        <p>Our podcast player provides next level listening, search and discovery tools.</p>
        </div>
        <div>
        <h2>Curated by experts</h2>
        <p>Find your next obsession with our hand curated podcast recommendations</p>
        </div>
      </section>
      <section>
        <h3>New Podcasts</h3>
        <p>Dive into a world of thought-provoking conversations, trending topics, and expert opinions.</p>
      </section>
      <section>
      <h3>All Topics</h3>
      <div>
        <div><p>Comedy</p></div>
        <div><p>Science & Tech</p></div>
        <div><p>Kids</p></div>
        <div><p>Mistery</p></div>
        <div><p>Art & Culture</p></div>
        <div><p>History</p></div>
        <div><p>Sport</p></div>
        <div><p>Politics</p></div>
        <div><p>Health</p></div>
      </div>
      
      </section>
    </div>





  );
}

export default Hero;
