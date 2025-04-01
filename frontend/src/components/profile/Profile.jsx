import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Back from "../common/back/Back";
import "./profile.css";
const apiUrl = process.env.REACT_APP_API_URL;

const Profile = ({ signout }) => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState(null);
  const navigate = useNavigate();
  const handleLogout = () => {
    signout(null);
    navigate("/login");
    return;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/profile/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        setUser(result);
        console.log(result);
      } catch (error) {
        signout(null);
        navigate("/login");
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (user && user.id) {
      const fetchBookings = async () => {
        try {
          const response = await fetch(
            `${apiUrl}/api/booking?user=${user.id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const result2 = await response.json();
          setBookings(result2);
          console.log(result2);
        } catch (error) {
          console.log(error);
        }
      };
      fetchBookings();
    }
  }, [user]);

  if (!user) return <p>Loading profile...</p>;
  return (
    <>
      <Back title="My Account" />
      <section className="padding">
        <div className="profile p-5">
          <div className="head">
            <div className="items shadow">
              <div className="box flex p-5">
                <div className="img">
                  <img
                    src={
                      user.profile_image
                        ? user.profile_image
                        : `${apiUrl}/media/profile_photos/defualt.webp`
                    }
                    alt=""
                  />
                </div>
                <div className="name m-5">
                  <h3>Name: {user.name}</h3>
                  <h3>Email: {user.email}</h3>
                  <h3>Phone Number: {user.phone_number}</h3>
                  <h3>
                    Date of Birth:{" "}
                    {moment(user.date_of_birth).format("DD MMM, YYYY")}
                  </h3>
                  <h3>Address: {user.address}</h3>
                  
                  <button className="primary-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </div>

              <div className="booking-table p-5">
                <h1 className="text-center mb-4">Booking Details</h1>
                <table>
                  <tr>
                    <th>S. No.</th>
                    <th>Venue Name</th>
                    <th>Address</th>
                    <th>Booking Date</th>
                    <th>Amount</th>
                    <th>Checkin Date</th>
                    <th>Checkout Date</th>
                  </tr>
                  {bookings &&
                    bookings.map((booking, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{booking.destination.name}</td>
                        <td>{booking.destination.address}</td>
                        <td>
                          {moment(booking.date_time).format("DD MMM, YYYY")}
                        </td>
                        <td>₹{booking.amount}</td>
                        <td>
                          {moment(booking.check_in_date).format("DD MMM, YYYY")}
                        </td>
                        <td>
                          {moment(booking.check_out_date).format(
                            "DD MMM, YYYY"
                          )}
                        </td>
                      </tr>
                    ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
