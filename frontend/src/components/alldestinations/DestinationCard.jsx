import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import "../blog/blog.css";
import Heading from "../common/heading/Heading";
import { Rating, Typography, Button } from "@mui/material";
const apiUrl = process.env.REACT_APP_API_URL;

const DestinationCard = () => {
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/destination/`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setDestination(result);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  if (destination) {
    return (
      <>
        <section className="blog">
          <div className="container">
            <br />
            <Heading subtitle="OUR DESTINATIONS" title="All Destinations" />
            <div className="grid2">
              {destination.map((val) => (
                <div className="items shadow">
                  <div className="img">
                    <img
                      src={
                        val.image
                          ? val.image
                          : `${apiUrl}/media/destination/bg17.jpg`
                      }
                      alt=""
                    />
                  </div>
                  <div className="text">
                    <div className="admin flexSB">
                      <span>
                        <i className="fa fa-map"></i>
                        <label htmlFor="">{val.city}</label>
                      </span>
                      <span>
                        <Rating
                          name="read-only"
                          value={3.5}
                          precision={0.5}
                          readOnly
                        />
                      </span>
                    </div>
                    <Link to={`/destinations/${val.id}`}>
                    <h1>{val.name}</h1>
                    </Link>
                    <p>
                      {val.description.length > 120
                        ? val.description.slice(0, 120) + "..."
                        : val.description}
                    </p>
                    <br />

                    <div className="admin flexSB">
                      <span>
                        <Typography variant="subtitle1">
                          <i className="fa fa-rupee"></i>₹{val.price}
                        </Typography>
                      </span>
                      <span>
                        <Typography variant="subtitle1">
                          <i className="fa fa-users"></i> {val.capacity}
                        </Typography>
                      </span>
                    </div>
                    <div className="admin ">
                      <span>
                        <Link to={`/book-now/${val.id}`}>
                          <button className="primary-btn">BOOK NOW{" "} <i className='fa fa-long-arrow-alt-right'></i></button>
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  } else {
    <h1>No Destination</h1>;
  }
};

export default DestinationCard;
