// import React from "react";
import CustomCarousel from "./CustomCarousel";
import "./testimonials.scss";

export default function Testimonials() {
  return (
    <section className="container section-testimonials">
      <div className="row">
        <div className="col-12">
          <div className="content-wrap">
            <div className="title-testimonials">
              <h2>Testimonials</h2>
            </div>
            <CustomCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
