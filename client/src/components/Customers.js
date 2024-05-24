'use client';
import React, { useEffect, useState } from 'react'
import Table from './Table.js';

const Customers = () => {
    const [dueData, setDueData] = useState([])
    useEffect(() => {   
        fetch('http://localhost:8080/api/customer',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
        }})
        .then( async(data) => {
            const response = await data.json();
            console.log(response);
            setDueData(response.customers);
        })
        .catch(err => console.log(err))
    }, [])
    console.log(dueData);
    let headings = ['Users', 'Phone Number', 'Total Due Amount', 'Total Paid Amount', 'Total Amount', 'Action']
  return (
    <div className='max-w[1640px] m-auto px-4 py-6 sm:px-12'>
        <div className="container mx-auto">
            <div className='py-6'>
            <h1 className='text-3xl py-1 font-bold'>Customers</h1>
            <p className='text-sm text-gray-600'>Records of All Customers</p>
            </div>
        <Table headings={headings} Data={dueData}      />
    </div>

    </div>
  )
}

export default Customers
