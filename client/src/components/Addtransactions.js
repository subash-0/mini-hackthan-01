'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { toast } from "react-toastify";
const Addtransactions = () => {
    const [customerData, setCustomerData] = useState([]);
    const [productData, setProductData] = useState([]);
    const [formData, setFormData] = useState({
        customerName: '',
        productName: '',
        quantity: '',
        paidAmount: 0,
    });
    
    const addTransaction = (e) => {
        e.preventDefault();
       fetch('http://localhost:8080/api/purchase', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
         })
            .then(async (res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
               toast.success('Transaction Added Successfully');
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }
    const reactComponet ={
        height: "40px",
        borderRadius: "8px",
        backgroundColor: "white",
        color: "#212529",
        placeholderColor: "rgb(184, 188, 194)",
        padding: "2px -8px",
        zIndex: 20,
    }
    useEffect(() => {
        fetch('http://localhost:8080/api/purchase/find-customer')
    .then(async (res) => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
       

        if (Array.isArray(data.customers)) {
            const formattedData = data.customers.map((customer) => ({
                id: customer.id,
                name: customer.name,
            }));
            setCustomerData(formattedData);
        } else {
            console.error('Expected an array in the "customers" property but received:', data.customers);
        }
    })
    .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
    });
    fetch('http://localhost:8080/api/product')
    .then(async (res) => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log('Data received from API:', data);

        if (Array.isArray(data.products)) {
            const formattedData = data.products.map((product,i) => ({
                id: i,
                name: product.name,
            }));
            setProductData(formattedData);
        } else {
            console.error('Expected an array in the "customers" property but received:', data.customers);
        }
    })
    .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
    });
      
    }, [])  
    const formatResult = (item) => {
        return (
          <>
        
            <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
          </>
        )
      }
      const handleSelectName = (item) => {
        setFormData({...formData, customerName: item.name});
      }
      const handleSelectProduct = (item) => {
        setFormData({...formData, productName: item.name});
      }
      console.log(formData);
  return (
    <div>
        <div>
            {productData && console.log(productData)}
            <h1 className='text-sm font-semibold opacity-85 text-gray-700 '>Add Your All Transactions</h1>
            <div className=' border px-4 py-2 w-full sm:w-fit my-4 sm:ml-4'>
               
            <form onSubmit={addTransaction} className='flex flex-col gap-2 w-full sm:w-96 '>
                <label htmlFor="name">Customer's Name:</label>
                <ReactSearchAutocomplete
                    items={customerData}
                    showIcon={false}
                    autoFocus
                    placeholder="Customer Name"
                    formatResult={formatResult}
                    styling={reactComponet}
                   onSelect={handleSelectName}
          />
                <label htmlFor="date">Product's Name:</label>
                <ReactSearchAutocomplete
                    items={productData}
                    showIcon={false}
                    autoFocus
                    placeholder="Product Name"
                    formatResult={formatResult}
                    styling={{
                     height: "40px",
                    borderRadius: "8px",
                    backgroundColor: "white",
                    color: "#212529",
                    placeholderColor: "rgb(184, 188, 194)",
                    padding: "2px -8px",
                    zIndex: 10,}}
                    onSelect={handleSelectProduct}
                    
          />
                
                <label htmlFor="description">Qauntity:</label>
                <input type="number" onChange={(e)=>setFormData({...formData,quantity:e.target.value})} id="quantity" placeholder="Quantity..." className='border hover:drop-shadow-lg  p-2 rounded-lg' required />
                <label htmlFor="description">Payment:</label>
                <input type="number" onChange={(e)=>setFormData({...formData,paidAmount:e.target.value})} id="payment" placeholder="Payment..." className='border hover:drop-shadow-lg  p-2 rounded-lg' min={0} defaultValue={0} />
                <button type="submit" className='bg-[var(--bg-orange)] text-white px-3 py-2 my-2 rounded-lg hover:drop-shadow-lg duration-100'>Add Transaction</button>
                <Link href='/add-customers' passHref className=" text-sm text-center "> <span className=" hover:underline py-4 font-semibold hover:text-[var(--bg-orange)] ">Add Customer</span></Link>
                </form>
                </div>
        </div>
    </div>
  )
}

export default Addtransactions
