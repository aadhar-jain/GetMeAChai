import React from 'react';
import "./footer.scss";

const Footer = () => {
  return (
    <footer>
      <div className='copyright'>
        <span>&copy; Get Me a CHAI</span>
        <span>All Rights Reserved</span>
      </div>
      <div className='footerLinks'>
          <ul>
            <li>About</li>
            <li>Refund</li>
            <li>Contact</li>
            <li>Terms</li>
          </ul>
      </div>
      <div className='socials'>
        <a href="https://www.linkedin.com/in/aadhar-j/"><img width={37} src="/linkedin.png" alt="LinkedIn" srcset="" /></a>
        <a href="https://github.com/aadhar-jain"><img height={35} width={35} src="/github.png" alt="Github" srcset="" /></a>
      </div>
    </footer>
  )
}

export default Footer
