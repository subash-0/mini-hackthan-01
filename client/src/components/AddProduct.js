'use client'
import { useState } from "react";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { FiCodesandbox } from "react-icons/fi";
import { toast } from "react-toastify";
const AddProduct = () => {
  const [customerData, setCustomerData] = useState({
    name: '',
    price: 1,
  
  })
  const addCustomer = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/api/product', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(customerData)
    }).then((data) => {
      if(!data.ok){
        toast.error('Failed to add product');
        return;
      }
      setCustomerData({
        name: '',
        price: 1,
      
      });
      toast.success('Product added successfully');
    })
    .catch((err) => {
      toast.error('Failed to add product');
    })
  }
  return (
    <div className="max-w-[1640px] m-auto py-10 sm:py-20 flex justify-center items-center">
        <div class="w-full max-w-xs">
  <form onSubmit={addCustomer} class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
       Product's name:
      </label>
      <div className="flex gap-1 items-center border  rounded-lg ">
      <FiCodesandbox size={45} className="bg-[var(--bg-orange)] text-white p-2 " />
      <input onChange={(e)=>setCustomerData({...customerData, name: e.target.value})} class=" rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="e.g. Pens" />
    </div>
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
       Product's Price :
      </label>
      <div className="flex gap-1 items-center border  rounded-lg ">
       <FaRegMoneyBillAlt size={45} className="bg-[var(--bg-orange)] text-white p-2 " />
      <input onChange={(e)=>setCustomerData({...customerData, price: e.target.value})} class="appearance-none  rounded w-full  py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline" id="phone" type="number" placeholder="Customer's Phone" />
      </div>
    </div>
    <div class="flex items-center justify-between">
      <button type="submit"  class="bg-[var(--bg-orange)] hover:opacity-90 hover:drop-shadow-md text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
       Add Product
      </button>
    
    </div>
  </form>
 
</div>
     
    </div>
  )
}

export default AddProduct
