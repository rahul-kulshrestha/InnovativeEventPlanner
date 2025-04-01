import React from "react"
import "./about.css"
import Back from "../common/back/Back"
import AboutCard from "./AboutCard"
import Testimonal from "../home/testimonal/Testimonal"

const About = () => {
  return (
    <>
      <Back title='About Us' />
      <AboutCard />
      <Testimonal />
    </>
  )
}

export default About
