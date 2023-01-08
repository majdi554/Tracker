import React from 'react'
import { useState } from 'react'
import fire from '../../config/Fire.js'
import "firebase/compat/auth"
import "../Login/Login.css"


function Register() {
    const [state, setState] = useState({
        email: '',
        displayName: '',
        password: '',
        fireErrors: ''
    })
 
    function handleChange(e){
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    }    

    function handleRegister(e){
        e.preventDefault()
        fire.auth().createUserWithEmailAndPassword(state.email, state.password).then((user) => {
            let currentUser = fire.auth().currentUser;
            currentUser.updateProfile({
                displayName: state.displayName
            })
        }).catch( (error) => {
            setState({
                fireErrors: error.message
            })
        })
    }


  return (

    <div>
    {state.fireErrors ? 
        <div className='error'>
                {state.fireErrors}
        </div>
        : null
    }
    
             

        <form >
            <input type="text" className='regField' placeholder='Your Name' name="displayName" onChange={handleChange}/>
            <input type="text" className='regField' placeholder='Email' name="email" onChange={handleChange}/>
            <input type="password" className='regField' placeholder='Password' name="password" onChange={handleChange}/>
            <input type="submit" className='submitBtn' value="Register" onClick={handleRegister} />

        </form>
        
    </div>
  )
}

export default Register