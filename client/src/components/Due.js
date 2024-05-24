'use client';
import React, { useEffect, useState } from 'react'
import Table from './Table.js';
import { toast } from 'react-toastify';

const Customers = () => {
    const [dueData, setDueData] = useState([]);
    useEffect(() => {   
        fetch('http://localhost:8080/api/customer/amount',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
        }})
        .then( async(data) => {
            const response = await data.json();
            let temp = [];
            response.map((data) => (
                temp.push({
                    name: data.user,
                    totalDueAmount: data.totalDueAmount,
                    totalPaidAmount: data.totalPaidAmount,
                    totalAmount: data.totalAmount
                })
            ))
            setDueData(temp);
        })
        .catch(err => toast.error('Error Fetching Data'))
    }, [])
    
    let headings = ['Users', 'Total Due Amount', 'Total Paid Amount', 'Total Amount', 'Action']
  return (
    <div className='max-w[1640px] m-auto px-4 py-6 sm:px-12'>
        <div className="container mx-auto">
            <div className='py-6'>
            <h1 className='text-3xl py-1 font-bold'>Dues</h1>
            <p className='text-sm text-gray-600'>Records of All Customers with Dues</p>
            </div>
        <Table headings={headings} Data={dueData}      />
    </div>

    </div>
  )
}

export default Customers
