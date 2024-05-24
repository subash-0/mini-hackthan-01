'use client'
import { Sales } from "@/components";
import React from "react";

const page = () => {
  return (
    <div className="px-4 my-15 sm:my-10 sm:px-10">
      <div className="my-4 px-2">
      <h1 className="text-lg sm:text-4xl font-bold drop-shadow-sm text-gray-700">Sales</h1>
      <p className="text-sm sm:text-sm my-2 mb-4 drop-shadow-sm text-gray-500">Your Whole sales are listed</p>
      </div>
      <Sales />
    </div>
  );
};

export default page;
