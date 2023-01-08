import React from 'react'
import { useState } from 'react'
import "./Login.css"
import fire from "../../config/Fire"
import "firebase/compat/auth"

function Login() {
    let  [state, setState] = useState({
        email: '',
        password: '',
        fireErrors: ''
    })

const handleChange = (e) => {
    setState({
        ...state,
        [e.target.name]: e.target.value
    })
}    

const login = (e) => {
    e.preventDefault()
    fire.auth().signInWithEmailAndPassword(state.email, state.password)
    .catch( (error) => {
        setState({fireErrors: error.message})
    })
}

  return (
    <div>
        {state.fireErrors ? <div className='error'>{state.fireErrors}</div> : null }
        <form >
            <input type="text" className='regField' placeholder='Email' name="email" onChange={handleChange}/>
            <input type="password" className='regField' placeholder='Password' name="password" onChange={handleChange}/>
            <input type="submit" className='submitBtn' value="Sign In" onClick={login} />

        </form>
        
    </div>
  )
}

export default Login