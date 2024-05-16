"use client"
import React from 'react'
import "./page.scss"
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {

    if (session) {
      router.push('/dashboard')
    }
  }, [router, session])

  return (
    <div className='social_auth_container'>
      <button>
        <img width={32} src="/google.png" alt="" />
        <span>Continue with Google</span>
      </button>

      <button onClick={() => { signIn("github") }}>
        <img width={35} style={{ filter: 'invert(100)', marginLeft: -2 }} src="/github.png" alt="" />
        <span>Continue with Github</span>
      </button>

      <button>
        <img width={30} src="/microsoft.png" alt="" />
        <span>Continue with Microsoft</span>
      </button>

      <button>
        <img width={37} style={{ marginLeft: -4 }} src="/apple.png" alt="" />
        <span>Continue with Apple</span>
      </button>
    </div>
  )
}

export default Login
