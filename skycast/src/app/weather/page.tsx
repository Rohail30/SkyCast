'use client';
import React, { useState } from 'react';
import './weather.css';
import ResultPage from '../result/page';
import { IoMdArrowRoundBack } from 'react-icons/io';
import Link from 'next/link';

export default function Page() {
  const [city, setCity] = useState('');
  const [searchedCity, setSearchedCity] = useState('');

  const handleSearch = () => {
    setSearchedCity(city);
  };

  return (
    <div className="weather">
      <div className="back">
        <Link href="/">
          <IoMdArrowRoundBack className="i" />
        </Link>
      </div>
      <div className="container">
        <h1 className="title">Sky Cast</h1>
        <p className="subtitle">Your go-to weather app</p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div className="res">
        {searchedCity && <ResultPage city={searchedCity} />}
      </div>
    </div>
  );
}
