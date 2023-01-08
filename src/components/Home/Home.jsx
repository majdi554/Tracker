import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Login from '../Login/Login'
import "../Login/Login.css"
import Register from '../Register/Register'
import "./Home.css"
import Tracker from "../Tracker/Tracker"
import spinner from "../../assets/Loader.gif"

import fire from '../../config/Fire.js'
import "firebase/compat/auth"


function Home() {

  let [state, setState] = useState({
    user: 1,
    loading: true,
    formLogin: true,
  })

  useEffect(() => {
      authListener()
  }, [])

  function authListener(){
    fire.auth().onAuthStateChanged((user) => {
      if(user) {
        setState({user})
      }else {
        setState({user: null})
      }
    })
  }

  function formSwitcher (action) {
    setState({
      formLogin: action === 'register' ? false : true
    }) 
  }
  
  if(state.user !== 1) {
              return (
                    <div>
                        { (!state.user) ? 
                          <div className="mainBlock">
                            {state.formLogin === true ? 
                                <div>
                                  <Login />
                                <span className='underLine'>
                                      Not Registered?  <button onClick={() => formSwitcher('register')} className="linkBtn" > Create an account</button>            
                                  </span>
                                </div>
                            : <div>
                                  <Register />
                                  <span className='underLine'>
                                      Already have an account?  <button onClick={() => formSwitcher('login')} className="linkBtn" > Sign In</button>            
                                  </span>
                              </div> 
                            }
                            
                          </div>
                        : <Tracker /> }        
                </div>
                )
    }else {
      return (
        <div className='spinner'>
            <img src={spinner} alt="spinner gif" className='imgSpinner' />
            {/* <h1 className='spinnerTxt'>Loading...</h1> */}
        </div>
      )
    }            
}

export default Home