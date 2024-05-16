"use client";
import React from 'react'
import Link from 'next/link'
import "./navbar.scss"
import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();
  const [showDropDown, setshowDropDown] = useState(false);

  return (
    <nav>
      <div className='leftNav'>
        <Link href={'/'}><div className="logo">
          <img width={'50px'} src="logo.gif" alt=""/>
          <span>Get Me a CHAI...</span>
        </div></Link>

      </div>

      <div className='rightNav'>
        {!session && <Link href={"/Login"} ><button className='loginBtn'>Login </button></Link>}

        {session && <div className="dropdown">
          <button onClick={() => setshowDropDown(!showDropDown)} onBlur={() => { setTimeout(() => { setshowDropDown(false) }, 100) }} className='dropdownBtn'>Hello, {session.user.email}</button>
          <ul style={{ display: showDropDown ? 'flex' : 'none' }} >
            <Link href={"/dashboard"}><li>Dashboard</li></Link>
            <Link href={`/${session.user.name}`}><li>Your page</li></Link>
            <Link href={""}><li onClick={() => signOut()}>Signout</li></Link>
          </ul>
        </div>}

      </div>
    </nav>
  )
}

export default Navbar
