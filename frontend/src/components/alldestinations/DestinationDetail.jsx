import React, { useEffect, useState } from "react";
import moment from "moment";
import Back from "../common/back/Back"
import "../blog/blog.css";
import { Link, useParams } from "react-router-dom";
import { Rating, Typography } from "@mui/material";
const apiUrl = process.env.REACT_APP_API_URL;

const DestinationDetail = () => {
    const [destination, setDestination] = useState(null);
    const params = useParams('id');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/destination/${params.id}`);
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
      <Back title='Destination Detail' />
      <section className='blog padding'>
        <div className='blog-single container'>
        <div className="">
            <div className="img">
              <img
                src={
                    destination.image ? destination.image : `${apiUrl}/media/destination/bg17.jpg`
                }
                alt=""
              />
            </div>
            <div className="text">
                    <div className="admin flexSB">
                      <span>
                        <i className="fa fa-map"></i>
                        <label htmlFor="">{destination.city}</label>
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
                    <h1>{destination.name}</h1>
                    <p>
                      {destination.description}
                    </p>
                    <br />

                    <div className="admin flexSB">
                      <span>
                        <Typography variant="subtitle1">
                          <i className="fa fa-rupee"></i>₹{destination.price}
                        </Typography>
                      </span>
                      <span>
                        <Typography variant="subtitle1">
                          <i className="fa fa-users"></i> {destination.capacity}
                        </Typography>
                      </span>
                    </div>
                    <div className="admin ">
                      <span>
                        <Link to={`/book-now/${destination.id}`}>
                          <button className="primary-btn">BOOK NOW{" "} <i className='fa fa-long-arrow-alt-right'></i></button>
                        </Link>
                      </span>
                    </div>
                  </div>
          </div>
        </div>
      </section>
    </>
  )
} else {
    return <h1>No Destination</h1>;
  }
}

export default DestinationDetail
