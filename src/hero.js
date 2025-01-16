import React from 'react';
import heroImg from './heroImg.svg';
import arrowRight from './arrowRight.svg';
import { Link } from 'react-router-dom'
import styles from './style/hero.module.css';
import TopRecentPodcasts from './topRecentPodcasts';
import ic1 from './imatges/icons/ic1.svg';
import ic2 from './imatges/icons/ic2.svg';
import ic3 from './imatges/icons/ic3.svg';
import banner from './imatges/banner.svg';

function Hero() {
  return (

    <div className={styles.hero}>

      <div class="hero">
{/* Hero section with main image and text */}
        <div className={styles.home}>
          <h1>Press Play. Chill Out.</h1>
          <h2>The best podcasts, all in one spot. Ready when you are.</h2>
{/* Button to navigate to the topics-selector page */}
          <Link to="/topics-selector">
            <div class="boton" ><p>Let’s listen</p>
              <img src={arrowRight}></img>
            </div>
          </Link>


        </div>
 {/* Hero image */}
        <img src={heroImg}></img>

      </div>
 {/* Content section showcasing available types of content */}

      <section>
        <h3>Our content</h3>
        <p>Explore a rich collection of podcasts and audiobooks, handpicked to suit every mood and moment.</p>
        <div>
           {/* Podcasts content box */}
          <div className='content-type'>
            <h3>Podcasts</h3>
            <p>+5M Podcasts available</p>
            <div>
              <p>Listen Now</p>
            </div>
          </div>
            {/* Audiobooks content box */}
          <div className='content-type'>
            <h3>Audiobooks</h3>
            <p>+300k Audiobooks avaliable</p>
            <div>
              <p>Listen Now</p>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.ilustration}>
        <h1 >Where ideas take flight and stories find their nest.</h1>
        <img src={banner} alt="banner"/>
      </section>
      <section className={styles.services} >
        <div>
        <img src={ic1} alt="tag" width="42" height="42" />
          <h2 className={styles.titulo1}>The best. Now free</h2>
          <p>The world’s most powerful podcast platform, now available for free.</p>
        </div>
        <div>
        <img src={ic2} alt="tag" width="42" height="42" />
        <h2 className={styles.titulo2}>Easy to use</h2>
        <p>Our podcast player provides next level listening, search and discovery tools.</p>
        </div>
        <div>
        <img src={ic3} alt="tag" width="42" height="42" />
        <h2 className={styles.titulo3}>Curated by experts</h2>
        <p>Find your next obsession with our hand curated podcast recommendations</p>
        </div>
      </section>
      <section>
      <TopRecentPodcasts />
       {/* <h3>New Podcasts</h3>
        <p>Dive into a world of thought-provoking conversations, trending topics, and expert opinions.</p>*/}
      </section>
      <section className={styles.categoriees}>
      <h3>All Topics</h3>
      <div className={styles.cat}>

        <section>
        <div><p>Comedy</p></div>
        <div><p>Science & Tech</p></div>
        <div><p>Kids</p></div>
        </section>
       <section>
       <div><p>Mistery</p></div>
        <div><p>Art & Culture</p></div>
        <div><p>History</p></div>
       </section>
      <section>
      <div><p>Sport</p></div>
        <div><p>Politics</p></div>
        <div><p>Health</p></div>
      </section>
      
      </div>
      
      </section>
    </div>





  );
}

export default Hero;
