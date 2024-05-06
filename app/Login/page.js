import React from 'react'
import "./page.scss"

const Login = () => {
  return (
    <div className='social_auth_container'>
      <button>
        <img width={32} src="/google.png" alt="" />
        <span>Continue with Google</span>
      </button>

      <button>
        <img width={35} style={{filter: 'invert(100)', marginLeft : -2 }} src="/github.png" alt="" />
        <span>Continue with Github</span>
      </button>
     
      <button>
        <img width={30} src="/microsoft.png" alt="" />
        <span>Continue with Microsoft</span>
      </button>
     
      <button>
        <img width={37} style={{marginLeft : -4}} src="/apple.png" alt="" />
        <span>Continue with Apple</span>
      </button>
    </div>
  )
}

export default Login
