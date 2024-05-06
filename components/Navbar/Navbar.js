import React from 'react'
import Link from 'next/link'
import "./navbar.scss"

const Navbar = () => {
  return (
    <nav>
      <div className='leftNav'>
        <div className="logo">
          <img width={'50px'} src="logo.gif" alt="" srcset="" />
          <span>Get Me a CHAI...</span>
        </div>

      </div>

      <div className='rightNav'>
        <ul>
        <Link href={"/Login"} ><button className='loginBtn'>Login</button></Link>
        </ul>
      </div>

    </nav>
  )
}

export default Navbar
