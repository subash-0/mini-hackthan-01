'use client'
import { useState } from "react";
import { BsTelephone } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
const AddCustomer = () => {
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: ''
  
  })
  const addCustomer = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/api/customer', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(customerData)
    }).then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    })
    console.log("Hello")
  }
  return (
    <div className="max-w-[1640px] m-auto py-10 sm:py-20 flex justify-center items-center">
        <div class="w-full max-w-xs">
  <form onSubmit={addCustomer} class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
       Customer's name:
      </label>
      <div className="flex gap-1 items-center border  rounded-lg ">
      <FaRegUser size={45} className="bg-[var(--bg-orange)] text-white p-2 " />
      <input onChange={(e)=>setCustomerData({...customerData, name: e.target.value})} class=" rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Customer's Name" />
    </div>
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
       Phone :
      </label>
      <div className="flex gap-1 items-center border  rounded-lg ">
       <BsTelephone size={45} className="bg-[var(--bg-orange)] text-white p-2 " />
      <input onChange={(e)=>setCustomerData({...customerData, phone: e.target.value})} defaultValue="xyz" class="appearance-none  rounded w-full  py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline" id="phone" type="number" placeholder="Customer's Phone"  maxLength={10} minLength={10} required/>
      </div>
    </div>
    <div class="flex items-center justify-between">
      <button type="submit"  class="bg-[var(--bg-orange)] hover:opacity-90 hover:drop-shadow-md text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
       Add Customer
      </button>
    
    </div>
  </form>
 
</div>
     
    </div>
  )
}

export default AddCustomer
