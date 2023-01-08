import React from 'react'
import fire from "../../config/Fire"
import "firebase/compat/auth"
import "./LogOutBtn.css"


const LogOutBtn = () => {

  function logOut() {
      fire.auth().signOut()
  }  
  return (
    <button className="logOutBtn" onClick={logOut}>Log Out</button>
  )
}

export default LogOutBtn