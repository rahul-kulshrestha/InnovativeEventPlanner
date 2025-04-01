import React, { useRef, useState } from "react";
import { faq } from "../../dummydata";
import "./faq.css"
import Back from "../common/back/Back";
import Heading from "../common/heading/Heading";

const Faq = () => {
  const [click, setClick] = useState(false);

  const toggle = (index) => {
    if (click === index) {
      return setClick(null);
    }
    setClick(index);
  };

  return (
    <>
      <Back title="Frequesntly Ask Question" />
      <section className="faq padding">
        <div className="container">
          <Heading subtitle="FAQS" title="Frequesntly Ask Question" />
          {faq.map((val, index) => (
            <div className="box">
              <button
                className="accordion"
                onClick={() => toggle(index)}
                key={index}
              >
                <h2>{val.title}</h2>
                <span>
                  {click === index ? (
                    <i className="fa fa-chevron-down"></i>
                  ) : (
                    <i className="fa fa-chevron-right"></i>
                  )}
                </span>
              </button>
              {click === index ? (
                <div className="text">
                  <p>{val.desc}</p>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Faq;
