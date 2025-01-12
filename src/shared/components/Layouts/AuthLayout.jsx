import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AuthLayout = () => {
  const isAuth = localStorage.getItem("refreshToken")
  return (
    isAuth ? <Navigate to={"/"}/> : <Outlet/>
  )
}

export default AuthLayout
