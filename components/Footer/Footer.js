import "./footer.scss";
import React from 'react';
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className='copyright'>
        <span>&copy; {currentYear} | Get Me a CHAI</span>
        <span>All Rights Reserved</span>
      </div>
      <div className='footerLinks'>
        <ul>
          <Link href="/about"><li>About</li></Link>
          <Link href="/about"><li>Refund</li></Link>
          <a href="https://www.linkedin.com/in/aadhar-j/" target="_blank"><li>Contact</li></a>
          <Link href="/about"><li>Terms</li></Link>
        </ul>
      </div>
      <div className='socials'>
        <a href="https://www.linkedin.com/in/aadhar-j/"><img width={37} src="/linkedin.webp" alt="LinkedIn" /></a>
        <a href="https://github.com/aadhar-jain"><img height={35} width={35} src="/github.webp" alt="Github" /></a>
      </div>
    </footer>
  )
}

export default Footer
