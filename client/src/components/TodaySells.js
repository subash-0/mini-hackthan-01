'use client'
import Link from "next/link"
import { useEffect, useState } from "react"

const TodaySells = () => {
    const [salesData, setSalesData] = useState('')
    useEffect(() => {
        fetch('http://localhost:8080/api/purchase/sales', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(async(data) => {
            const response = await data.json();
           setSalesData(response.customers);
        })
        .catch(err => console.log(err))
    },[])
   
  return (
    
<div className="">
    
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
               
                <th scope="col" className="px-6 py-3">
                    Customer Name
                </th>
                <th scope="col" className="px-6 py-3">
                   Total Paid Amount
                </th>
                <th scope="col" className="px-6 py-3">
                    Total Due Amount
                </th>
                <th scope="col" className="px-6 py-3">
                    Total Amount
                </th>
               
            </tr>
        </thead>
        <tbody>
            {salesData && salesData.map((data, i) => (
            <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
             <td className="px-6 py-4">
              <Link href={`/customer-purchase/:${data.name}`} >  {data.name} </Link>
             </td>
             <td className="px-6 py-4">
                {data.totalPaid}
             </td>
             <td className="px-6 py-4">
                {data.totalDueRemaining}
             </td>
             <td className="px-6 py-4">
                {data.totalDueRemaining + data.totalPaid} 
             </td>
         </tr>    
            
            ))}
           
           
           
           
        </tbody>
    </table>
</div>
</div>

  )
}

export default TodaySells
