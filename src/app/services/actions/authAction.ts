"use server"

import { cookies } from 'next/headers'
// import { NextResponse } from 'next/server'

// Types for User
type User = {
    username: string
    password: string
  
}

// 'http://localhost:5053/api/Authenticate/login'
// Create Function Login and Register

// Login Function
async function login(data: User) {
    
    try {
      // Make a POST request to the login API
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/Authenticate/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (response.ok) {

        const data = await response.json()

        // Save the token in cookies
        cookies().set('token', data.token, {
          maxAge: 60 * 60 * 24, // 1 day
        })

        // console.log(data)
        return { success: true, data }
      } else {
        const error = await response.json()
        console.log(error)
        return { success: false, error }
      }
    } catch (error) {
        console.error('An error occurred during the login process:', error)
        return { success: false, error }
    }
}

// Register Function
async function register(data: User) {
    try {
        // Make a POST request to the register API
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/Authenticate/register-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        return { success: true, data }
      } else {
        const error = await response.json()
        console.log(error)
        return { success: false, error }
      }      
    } catch (error) {
        console.error('An error occurred during the registration process:', error)
        return { success: false, error }
    }
}

// Logout Function
async function logout() {
    try {
      // Make a POST request to the logout API
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/Authenticate/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        cookies().set('token', '', {
          maxAge: 0,
        })
        return { success: true }
      } else {
        return { success: false }
      }      
    } catch (error) {
        console.error('An error occurred during the logout process:', error)
        return { success: false, error }
    }
}

export { login, register, logout }