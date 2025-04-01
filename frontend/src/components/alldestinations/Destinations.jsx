import React from "react"
import Back from "../common/back/Back"
import DestinationCard from "./DestinationCardOld"
import DestinationC from "./DestinationCard"
import Facilities from "./Facilities"
import Pricing from "../price/Pricing"

const Destination = () => {
  return (
    <>
      <Back title='Explore Destinations' />
      {/* <DestinationCard /> */}
      <DestinationC/>
      {/* <Facilities /> */}
      {/* <Pricing/> */}
      <br />
    </>
  )
}

export default Destination
