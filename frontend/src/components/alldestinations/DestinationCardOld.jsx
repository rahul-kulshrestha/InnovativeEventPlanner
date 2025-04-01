import React, { useEffect, useState } from "react"
import "./destinations.css"
// import "../blog/blog.css"
import { destinationsCard, blog } from "../../dummydata"
const apiUrl = process.env.REACT_APP_API_URL;

const DestinationCard = () => {

  const [blo, setBlo] = useState(null)
  
  useEffect(() => {
    // Define the async function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/post/`); // Replace with your API URL
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setBlo(result);
        // setLoading(false);
        console.log(result);
      } catch (error) {
        // setError(error.message);
        console.log(error);
      }
    };

    fetchData();
  }, []);
  if (blo){return (
    <>
      <section className='destinationsCard'>
        <div className='container grid2'>
        
        {blo.map((val) => (
        <div className='items shadow'>
          <div className='img'>
            <img src={val.image} alt='' />
          </div>
          <div className='text'>
            <div className='admin flexSB'>
              <span>
                <i className='fa fa-user'></i>
                <label htmlFor=''>{"Admin"}</label>
              </span>
              {/* <span>
                <i className='fa fa-comments'></i>
                <label htmlFor=''>{"comments"}</label>
              </span> */}
              <span>
                <i className='fa fa-calendar-alt'></i>
                <label htmlFor=''>{val.created_at}</label>
              </span>
            </div>
            <h1>{val.title}</h1>
            <p>{val.content}</p>
          </div>
        </div>
      ))}
          {/* {destinationsCard.map((val) => (
            <div className='items'>
              <div className='content flex'>
                <div className='left'>
                  <div className='img'>
                    <img src={val.cover} alt='' />
                  </div>
                </div>
                <div className='text'>
                  <h1>{val.destinationsName}</h1>
                  <div className='rate'>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <label htmlFor=''>(5.0)</label>
                  </div>
                  <div className='details'>
                    {val.courTeacher.map((details) => (
                      <>
                        <div className='box'>
                          <div className='dimg'>
                            <img src={details.dcover} alt='' />
                          </div>
                          <div className='para'>
                            <h4>{details.name}</h4>
                          </div>
                        </div>
                        <span>{details.totalTime}</span>
                      </>
                    ))}
                  </div>
                </div>
              </div>
              <div className='price'>
                <h3>
                  {val.priceAll} / {val.pricePer}
                </h3>
              </div>
              <button className='outline-btn'>ENROLL NOW !</button>
            </div>
          ))} */}
        </div>
      </section>
    </>
  )}else{
    return (<h1>'No Blog Post'</h1>)
  }
}

export default DestinationCard;
