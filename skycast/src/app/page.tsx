'use client';
import './home.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="home">
      <section className="hero-section">
        <div className="container">
          <div className="image-container">
            <img className="hero-image" alt="hero" src="./Hero.png" />
          </div>
          <div className="content">
            <h1 className="title">
              Your Weather, Your Way
              <br className="hidden-lg" />
              <span style={{ color: '#0168B5' }}>
                Stay Ahead of the Skies with Sky Cast
              </span>
            </h1>
            <p className="description">
              Get real-time weather updates, forecasts, and insights tailored
              just for you. Whether it’s sunshine or storms, stay prepared for
              every moment.
            </p>
            <div className="button-group">
              <Link href="/weather">
                <button className="primary-button">Check Weather!</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
