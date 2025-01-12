import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedLayout = () => {
  const isAuth = localStorage.getItem("refreshToken")
  return (
    isAuth ? <Outlet/> : <Navigate to={"/sign-in"}/>
  )
}

export default ProtectedLayout
