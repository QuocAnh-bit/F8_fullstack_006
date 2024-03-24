// import React from 'react'
import { heroData } from "../../data";
import "../hero/hero.scss";
import Button from "../Button";
export default function Hero() {
  const { title, btnText, image, subtitle } = heroData;
  console.log(title);
  return (
    <section className="container section-hero">
      <div className="row">
        <div className="col-12 col-md-8">
          <div className="title">
            <h1>{title}</h1>
            <p>{subtitle}</p>
            <Button btnText={btnText} />
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="img-hero">
            <img src={image} alt={title} />
          </div>
        </div>
      </div>
    </section>
  );
}
