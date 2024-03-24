// import React from "react";
import { featuresData } from "../../data";
import "../features/features.scss";

export default function Features() {
  const { list, subtitle, title } = featuresData;
  return (
    <section className="container section-features">
      <div className="row">
        <div className="col-12">
          <div className="title-features">
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="list-feature">
          {list.map(
            ({ image, bgImage, title, description, linkText }, index) => (
              <div key={index} className="item-feature">
                <div className="item-bg">
                  <img src={bgImage} alt="" />
                </div>
                <div className="item-img">
                  <img src={image} alt="" />
                </div>
                <div className="item-content">
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <div className="item-link">
                    <a href="#">{linkText}</a>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
