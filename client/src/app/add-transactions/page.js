import { Addtransactions } from '@/components'
import React from 'react'

const page = () => {
  return (
    <div className='max-w-[1640px] m-auto px-3 py-6 sm:px-20 sm:py-10'>
        <h1 className='text-3xl font-semibold opacity-85 text-[var(--bg-orange)]'>Add Transactions</h1>
        <Addtransactions />
    </div>
  )
}

export default page
