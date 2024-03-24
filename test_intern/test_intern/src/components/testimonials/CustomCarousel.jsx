import { useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

import "./customCarousel.scss";
import { testimonialsData } from "../../data";
export default function CustomCarousel() {
  const [cardIndex, setCardIndex] = useState(0);
  const nextCard = () => {
    console.log(cardIndex);
    setCardIndex((index) => {
      if (index === testimonialsData.length - 1) return 0;
      return index + 1;
    });
  };
  const prevCard = () => {
    console.log(cardIndex);
    setCardIndex((index) => {
      if (index === 0) return testimonialsData.length - 1;
      return index - 1;
    });
  };
  return (
    <div className="carousel">
      <button className="prevBtn" onClick={prevCard}>
        <FaArrowLeft size={25} color={`white`} />
      </button>

      <div className="wrap-cards">
        {testimonialsData.map((item, index) => (
          <div
            className="card"
            key={index}
            style={{ translate: `${-100 * cardIndex}%` }}
          >
            <div className="img-user">
              <img src={item.image} alt="" />
            </div>
            <div className="content-card">
              <div className="name">{item.name}</div>
              <div className="email">{item.web}</div>
              <p className="message">{item.message}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="nextBtn">
        <FaArrowRight size={25} color={`white`} onClick={nextCard} />
      </button>

      <div className="dots">
        {testimonialsData.map((item, index) => (
          <span
            key={index}
            onClick={() => setCardIndex(index)}
            className={`${index === cardIndex ? "active" : ""}`}
          ></span>
        ))}
      </div>
    </div>
  );
}
