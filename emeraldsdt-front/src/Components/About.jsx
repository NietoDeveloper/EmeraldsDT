import React, { useState } from "react";
import "./app.css";

export const FullScreenCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageCards = [... add your images];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % imageCards.slice(2, 5).length
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => setCurrentIndex(index);

  return (
    <div className="fullscreen-carousel">
      {imageCards.slice(2, 5).map((slide, index) => (
        <div
          key={index}
          className={`carousel-slide ${index === currentIndex ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.imageUrl})` }}
        >
          <div className="slide-overlay">
            <h1>{slide.title}</h1>
            <p>{slide.description}</p>
          </div>
        </div>
      ))}

      <div className="carousel-dots">
        {imageCards.slice(2, 5).map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};