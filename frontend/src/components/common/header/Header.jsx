import React, { useState } from "react"
import { Link } from "react-router-dom"
import Head from "./Head"
import "./header.css"

const Header = () => {
  const [click, setClick] = useState(false)
  const authToken = localStorage.getItem('token');

  return (
    <>
      <Head />
      <header>
        <nav className='flexSB'>
          <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/destinations'>Destinations</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
            {/* <li>
              <Link to='/team'>Team</Link>
            </li> */}
            <li>
              <Link to='/faqs'>Faqs</Link>
            </li>
            <li>
              <Link to='/blog'>Blog</Link>
            </li>
            <li>
              <Link to='/contact'>Contact</Link>
            </li>
          </ul>
          <div className='start'>
            {authToken ? <Link to='/profile'><div className=''>My Account</div></Link> : <Link to='/login'><div className=''>Login</div></Link>}
          </div>
          <button className='toggle' onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times'> </i> : <i className='fa fa-bars'></i>}
          </button>
        </nav>
      </header>
    </>
  )
}

export default Header
