import React, { useState } from 'react'
import SimpleForm from './SimpleForm'

const App = () => {

const [state, setState] = useState({
  user: {
    name: 'Bala',
    age: 30,
    address : {
      streed : "no 5/10",
      city: "new York",
      distance: 10
    }
  }
})

const increment = () => {
  setState((prevstate)=>({
      ...prevstate,
      user : {
        ...prevstate.user,
        address: {
             ...prevstate.user.address,
             distance : prevstate.user.address.distance + 1
        }
      }
  }))
}


  return (
    <div>
      <SimpleForm/>
      <div>
        <h1>user information</h1>
        <p>name : {state.user.name}</p>
        <p>street : {state.user.address.streed}</p>
        <p>city : {state.user.address.city}</p>
        <p>distance : {state.user.address.distance}</p>

        <button onClick={increment}>increament distance -- {state.user.address.distance}</button>
      </div>
    </div>
  )
}

export default App