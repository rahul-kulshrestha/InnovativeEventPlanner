import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;

const BlogCard = () => {
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/post/`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setBlog(result);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (blog) {
    return (
      <>
        {blog.map((val) => (
          <Link to={`/blog/${val.id}`}>
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
                    <i className="fa fa-user"></i>
                    <label htmlFor="">{"Admin"}</label>
                  </span>
                  {/* <span>
                  <i className='fa fa-comments'></i>
                  <label htmlFor=''>{"comments"}</label>
                </span> */}
                  <span>
                    <i className="fa fa-calendar-alt"></i>
                    <label htmlFor="">
                      {moment(val.created_at).format("DD MMM, YYYY")}
                    </label>
                  </span>
                </div>
                <h1>{val.title}</h1>
                <p>
                  {val.content.length > 120
                    ? val.content.slice(0, 120) + "..."
                    : val.content}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </>
    );
  } else {
    return <h1>No Blog Post</h1>;
  }
};

export default BlogCard;
