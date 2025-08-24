import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjVjYmNiNjczY2I5ZDUxMDQyYjU5YTM0YTcwZDYxZSIsIm5iZiI6MTc1NjAyNzQ2My4xMzYsInN1YiI6IjY4YWFkYTQ3MTQ1ZThhMjA2ODc4MWM3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SJr033-imVujA-E4BzKaxMQS_ToVxtLpDZWyg4sxrA0'
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category?category : "now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(data => {
        if (data.results) {
          setApiData(data.results);
        }
      })
      .catch(err => console.error("API Fetch Error:", err));

    const currentRef = cardsRef.current;
    currentRef.addEventListener('wheel', handleWheel);

    return () => {
      currentRef.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className='title-Cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/Player/${card.id}`} className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.original_title} />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
