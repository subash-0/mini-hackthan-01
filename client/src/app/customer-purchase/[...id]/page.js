'use client'
import Link from "next/link"
import { useEffect, useState } from "react"

const TodaySells = ({params}) => {
    const id = decodeURIComponent(params.id);
    let customerName = id.split(':')[1];
    const [salesData, setSalesData] = useState('')
    const [purchaseLength, setPurchaseLength] = useState(0)
    useEffect(() => {
        fetch('http://localhost:8080/api/purchase/sales', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(async(data) => {
            const response = await data.json();
            let temp= [];
            response.customers.map((customer) => {
                if(customer.name === customerName){
                    temp.push(customer);
                }
            })
           setSalesData(temp);
        })
        .catch(err => console.log(err))
    },[])

  return (
    
<div className="my-16 sm:my-10  px-4 sm:px-10 md:px-20 lg:px-40">
    <h1 className="text-xl sm:text-3xl my-7 font-bold text-left "> customer's purchase</h1>
    
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
{salesData && salesData.map((data, i) => (
   
    <div key={i}>
        <div  className="w-full my-4 px-2">
    <h1 className="tex-lg sm:text-xl text-gray-800 hover:opacity-90">
     <span className="font-bold">Name:</span> {data.name}
   </h1>
   <p className="tex-sm  hover:opacity-90 text-green-600">
    <span className="font-semibold">Total Paid Amount:</span> {data.totalPaid}
   </p>
   <p className="tex-sm  text-red-600  hover:opacity-90">
      <span className="font-semibold">Total Due Amount:</span> {data.totalDueRemaining}
   </p>
   <p className="tex-sm  text-orange-800 hover:opacity-90">
    <span className="font-semibold">Total Amount:</span> {data.totalDueRemaining + data.totalPaid}
   </p>
   <h1 className="text-lg sm:text-xl my-4 font-light text-left "> customer's purchase</h1>
   </div>
    <table key={i} className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
               
                <th scope="col" className="px-6 py-3">
                productName
                </th>
                <th scope="col" className="px-6 py-3">
                price
                </th>
                <th scope="col" className="px-6 py-3">
                quantity
                </th>
                <th scope="col" className="px-6 py-3">
                total
                </th>
               
            </tr>
        </thead>
        <tbody>
           
            {data.purchases.map((purchase, i) => (
                
            <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
             
             <td className="px-6 py-4">
              <Link href={`/customer-purchase/:${data.name}`} >  {purchase.productName} </Link>
             </td>
             <td className="px-6 py-4">
                {purchase.price}
             </td>
             <td className="px-6 py-4">
                {purchase.quantity}
             </td>
             <td className="px-6 py-4">
                {purchase.total} 
             </td>
         </tr>    
            ))}
          
        </tbody>
    </table>
    </div>
       ))}
</div>
</div>

  )
}

export default TodaySells
