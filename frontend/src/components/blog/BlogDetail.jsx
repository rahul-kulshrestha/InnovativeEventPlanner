import React, { useEffect, useState } from "react";
import moment from "moment";
import Back from "../common/back/Back"
import "./blog.css"
import { useParams } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;

const BlogDetail = () => {
    const [blog, setBlog] = useState(null);
    const params = useParams('id');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/post/${params.id}`);
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
      <Back title='Blog Detail' />
      <section className='blog padding'>
        <div className='blog-single container'>
        <div className="">
            <div className="img">
              <img
                src={
                  blog.image ? blog.image : `${apiUrl}/media/destination/bg17.jpg`
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
                    {moment(blog.created_at).format("DD MMM, YYYY")}
                  </label>
                </span>
              </div>
              <h1>{blog.title}</h1>
              <p>{blog.content}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
} else {
    return <h1>No Blog</h1>;
  }
}

export default BlogDetail
