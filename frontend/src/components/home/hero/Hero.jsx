import React from "react"
import { Link, useNavigate } from "react-router-dom"
import Heading from "../../common/heading/Heading"
import "./Hero.css"

const Hero = () => {
  const navigate = useNavigate();
  const handleRedirection = () => {
    navigate("/destinations");
    return;
  };
  return (
    <>
      <section className='hero'>
        <div className='container'>
          <div className='row'>
            <Heading subtitle='Your Event, Your Way' title='Find the best venue vendors' />
            <p className="pt-2">Innovative Event Planner is an Indian Venue Planning Website where you can find the best venue vendors, with prices and reviews at the click of a button.</p>
            <div className='button'>
              {/* <Link to="/destinations">
                <button className="primary-btn">GET BOOKED NOW <i className='fa fa-long-arrow-alt-right'></i></button>
              </Link> */}
              {/* <Link to="/destinations"> */}
                {/* <button onClick={handleRedirection}>VIEW DESTINATIONS <i className='fa fa-long-arrow-alt-right'></i></button> */}
              {/* </Link> */}
            </div>
           
          </div>
        </div>
      </section>
      <div className='margin'></div>
    </>
  )
}

export default Hero
