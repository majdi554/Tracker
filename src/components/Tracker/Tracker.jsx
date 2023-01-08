import React, { useState } from 'react'
import LogOutBtn from '../LogoutBtn/LogOutBtn'
import "./Tracker.css"
import Swal from 'sweetalert2'; 


import fire from '../../config/Fire.js'
import "firebase/compat/auth"
import 'firebase/compat/database'
import Transactions from './Transactions';
import { useEffect } from 'react';

const Tracker = () => {

  let [state, setState] = useState({
    transactions: [],
    money: 0,
    transactionName: '',
    transactionType: '',
    price: '',
    currentUID: fire.auth().currentUser.uid 
  })

  let currentUser = fire.auth().currentUser
  
  const handleChange = (input) => e => {
      setState({
        ...state,
        [input]: e.target.value !== "0" ? e.target.value : ""
      })
  }

  const addNewTrx = (e) => {
    e.preventDefault()
    //validation
    if (state.transactionName && state.transactionType && state.price) {
        let newTrx = {
            id: state.transactions.length ,
            name: state.transactionName,
            type: state.transactionType,
            price: state.price,
            user_id: state.currentUID
        }

        

        fire.database().ref('Transactions/' + state.currentUID).push(newTrx)
        .then((data) => {
          //if  successfull
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your transaction has been saved',
            showConfirmButton: false,
            timer: 1500
          })
           
          console.log("money pre update", state.money)
          console.log("trx type", state.transactionType)
          console.log("trx price", state.price)
          setState({
            
            transactions: [...state.transactions, newTrx],
            money: state.transactionType === "deposit" ? ( state.money + parseFloat(state.price) ): ( state.money - parseFloat(state.price) ),
            transactionName: '',
            transactionType: '',
            price: '',
            user_id: state.currentUID

          })
        }).catch((error) => {
          console.log('error', error)
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Something went wrong, please try again',
            showConfirmButton: false,
            timer: 1500
          })
        })
    }
  }

  

  useEffect(() => {
      const {currentUID, money} = state
      let totalMoney = money;
      const backUpState = []
      fire.database().ref('Transactions/' + currentUID).once('value', 
      (snapshot) => {
          snapshot.forEach((elem) => {
            totalMoney = elem.val().type === "deposit" 
            ? totalMoney + parseFloat(elem.val().price)
            : totalMoney - parseFloat(elem.val().price);

            console.log("+1 en backUpState")
            backUpState.push({
              id: elem.val().ide,
              name: elem.val().name,
              type: elem.val().type,
              price: elem.val().price,
              user_id: elem.val().user_id,
            })
          })

          setState({
            transactions: backUpState,
            money: totalMoney,
            currentUID: fire.auth().currentUser.uid 
          })
      })
      
  },[])

  return (
    <div className='trackerBlock'>
        <div className='welcome'>
              <span>Hi, {currentUser.displayName}!</span>
              <LogOutBtn />
        </div>
        
        <div>
          <div className='totalMoney'>${state.money}</div>
        </div>

        <div className="newTrxBlock">
          <div className="newTrx">
            <form>
                <input placeholder='Transaction name' type="text" name="txrName" onChange={handleChange('transactionName')}/>
                
                <div className='inputGroup'>
                    <select name="type" onChange={handleChange('transactionType')}>
                          <option value="0">Type</option>
                          <option value="expense">Expense</option>
                          <option value="deposit">Deposit</option>
                    </select>
                    <input className="price" placeholder='Price' type="text" name="price" onChange={handleChange('price')}/>
                </div>

                <button className='addTrxBtn' onClick={addNewTrx}> + Add Transaction</button>    
            </form>
            </div>
            <div className='latestTrx'>
                <p>Latest Transactions</p>
                <ul>
                  {
                    Object.keys(state.transactions)?.map((id) => (
                        <Transactions 
                          type={state.transactions[id].type}
                          name={state.transactions[id].name}
                          price={state.transactions[id].price}
                        />
                    ))
                  }  
                </ul>

            </div>
          
        </div>
    </div>
  )
}

export default Tracker