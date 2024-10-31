"use client";

import { FC } from "react";

interface Props {
    isWhite?: boolean
}

export const Loader:FC<Props> = ({ isWhite = false }) => {
    return (
        <div className="flex items-center justify-center py-8 mx-auto">
            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 border-4 ${isWhite ? 'border-white' : 'border-secondary'} border-t-transparent rounded-full animate-spin`}></div>
              <p className={`${isWhite ? 'text-white' : 'text-secondary'} mt-4 text-lg`}>Loading data...</p>
            </div>
        </div>
    )
}