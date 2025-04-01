import React from "react"
import Heading from "../common/heading/Heading"
import "./about.css"
import { homeAbout } from "../../dummydata"
import Awrapper from "./Awrapper"

const AboutCard = () => {
  return (
    <>
      <section className='aboutHome'>
        <div className='container flexSB'>
          <div className='left row'>
            <img src='./images/bg3.jpg' alt='' />
          </div>
          <div className='right row'>
            <div>
              <h1 className="primary-text">Event planning has always been messy and difficult</h1>
              <p className="mt-2">Planning every single event needs answers to a number of questions. Innovative Event Planner is attempting to collect all the information that you will ever need to plan your event - from when, where and how, to more hidden gems in every destination, Innovative Event Planner is the one-stop solution to all your event planning needs.</p>
            </div>
            <div className='items'>
              {homeAbout.map((val) => {
                return (
                  <div className='item flex'>
                    <div className='img'>
                      <img src={val.cover} alt='' />
                    </div>
                    <div className='text'>
                      {/* <h2>{val.title}</h2> */}
                      <p>{val.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
      <Awrapper />
    </>
  )
}

export default AboutCard
