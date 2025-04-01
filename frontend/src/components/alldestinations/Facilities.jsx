import React from "react"
import "./destinations.css"
import { popular } from "../../dummydata"
import Heading from "../common/heading/Heading"

const Facilities = () => {
  return (
    <>
      <section className='popular'>
        <div className='container'>
          <Heading subtitle='Destinations' title='Browse Our popular Destinations' />
          <div className='content grid3'>
            {popular.map((val) => (
              <div className='box'>
                <div className='img'>
                  <img src={val.cover} />
                  <img src={val.hoverCover} alt='' className='show' />
                </div>
                <h1>{val.courseName}</h1>
                <span>{val.course}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Facilities
