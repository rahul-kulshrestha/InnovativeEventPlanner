import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import Back from "../common/back/Back";
import "./booking.css";
import { Typography } from "@mui/material";
const apiUrl = process.env.REACT_APP_API_URL;

const DestinationBooking = () => {
  const [destination, setDestination] = useState(null);
  const [user, setUser] = useState(null);
  const params = useParams();
  const [booking, setBooking] = useState({
    user: "",
    name: "",
    destination: "",
    check_in_date: "",
    check_out_date: "",
    amount: "",
    address: "",
    phone_number: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
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

      try {
        const token = localStorage.getItem("token");
        const response2 = await fetch(`${apiUrl}/api/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response2.ok) {
          throw new Error(`HTTP error! Status: ${response2.status}`);
        }

        const result2 = await response2.json();
        setUser(result2);
        console.log(result2);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setBooking({
      ...booking,
      [name]: value,
    });
    // console.log(event.target.value)
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    console.log("Form submitted:", booking);
    try {
      const response = await fetch(`${apiUrl}/api/booking/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user: user.id,
          name: user.name,
          destination: destination.id,
          amount: destination.price,
          address: user.address,
          phone_number: user.phone_number ? user.phone_number : "9876564545",
          check_in_date: booking.check_in_date,
          check_out_date: booking.check_out_date,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors(errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);
      setBooking({
        email: "",
        password: "",
      });
      setErrors([]);
      alert("Venue Booked Successfully");
      navigate("/profile");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (destination && user) {
    return (
      <>
        <Back title={"Booking"} />
        <section className="contacts padding">
          <div className="container shadow">
            <div className="">
              <form onSubmit={handleOnSubmit} className="login mt-5">
                <h2>Destination Booking</h2>

                <div className="booking">
                  <img
                    src={
                      destination.image
                        ? destination.image
                        : `${apiUrl}/media/destination/bg17.jpg`
                    }
                    alt=""
                  />
                </div>

                <h1>{destination.name}</h1>
                <h6>
                  {destination.description.length > 120
                    ? destination.description.slice(0, 120) + "..."
                    : destination.description}
                </h6>
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
                {Object.keys(errors).length > 0 && (
                  <div style={{ color: "red", marginBottom: "10px" }}>
                    <ul>
                      {Object.entries(errors).map(([field, messages]) => (
                        <li key={field}>{messages.join(", ")}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={user.name}
                  disabled
                />
                <label>
                  Checkin Date
                  <input
                    type="date"
                    placeholder="Checkin date"
                    name="check_in_date"
                    onChange={handleOnChange}
                    value={booking.check_in_date}
                    required
                  />
                </label>
                <label>
                  Checkout Date
                  <input
                    type="date"
                    placeholder="Checkout date"
                    name="check_out_date"
                    onChange={handleOnChange}
                    value={booking.check_out_date}
                    required
                  />
                </label>
                <input type="submit" value="Book Now" />
              </form>
            </div>
          </div>
        </section>
      </>
    );
  } else {
    return <h2>Loding...</h2>;
  }
};

export default DestinationBooking;
