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
      <button onClick={() => { signIn("google") }}>
        <img width={32} src="/google.webp" alt="" />
        <span>Continue with Google</span>
      </button>

      <button onClick={() => { signIn("github") }}>
        <img width={35} style={{ filter: 'invert(100)', marginLeft: -2 }} src="/github.webp" alt="" />
        <span>Continue with Github</span>
      </button>

      <button onClick={() => { signIn("google") }}>
        <img width={30} src="/mail.webp" alt="" />
        <span>Continue with Email</span>
      </button>

      <button onClick={() => { signIn("facebook") }}>
        <img width={33} style={{ marginLeft: -4 }} src="/facebook.webp" alt="" />
        <span>Continue with Facebook</span>
      </button>
    </div>
  )
}

export default Login
