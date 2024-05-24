'use client';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import TodaySells from './TodaySells';
const Home = () => {
  const cardDesign ="flex flex-col justify-center w-full sm:w-64 px-4 py-2 rounded-lg  border drop-shadow-md hover:drop-shadow-lg cursor-pointer duration-200";
  const linkBtn ="bg-[var(--bg-orange)] px-3 py-2 rounded-lg text-center text-white hover:drop-shadow-lg duration-100 hover:-tracking-tight sm:w-44"
  const [sellsData, setSellsData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/purchase/total-sales")
    .then(async(res) => {
      const data = await res.json();
      
      if(!res.ok){
        const error = (data && data.message) || res.statusText;
        return Promise.reject(error);
      }
     setSellsData([...sellsData, {id:1, title:"Today's Sell", amount:data.totalSales},{id:2, title:"Today's Dues", amount:data.totalDue},{id:3, title:"Today's Paid", amount:data.totalPaid}])
    })
  }, [])
  return (
    <div className="max-w-[1640px] m-auto px-4 sm:px-20 py-5 my-15">
      <div className=" duration-200 ">
        <div className='flex items-center justify-center gap-4 duration-200 flex-wrap'>
        {sellsData.map((sell) => (
          <div className={`${cardDesign} ${sell.id===1?'bg-white':sell.id===2?'bg-red-500 text-white':'bg-green-600 text-white'}`} key={sell.id}>
          <h1 className="text-2xl font-bold  ">{sell.title}</h1>
          <p className=" text-lg"> Amount :{sell.amount}</p>
        </div>
        ) )}
         </div>
        <div className="my-5 md:py-6 md:px-96 flex  sm:flex-row justify-center gap-4 ">
          <Link href="/add-customers" passHref className={linkBtn}> Add Customers </Link>
          <Link href="/add-products" passHref className={linkBtn}> Add Products </Link>
          <Link href="/add-transactions" passHref className={linkBtn}> Add Transactions </Link>
          

        </div>
        <div className=" w-full px-4 sm:px-10 ">
          <h1 className="text-xl sm:text-2xl py-2 sm:py-4 font-bold">Today's Sales</h1>
          <TodaySells />
           </div>
         </div>
      </div>
  )
}

export default Home
