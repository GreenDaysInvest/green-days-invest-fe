"use client";
import React, { ReactNode } from 'react';
import Link from 'next/link';

interface DropdownItemProps {
  href: string;
  title: string;
  description: string;
  icon: ReactNode;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  href,
  title,
  description,
  icon,
}) => {
  return (
    <Link href={href} legacyBehavior>
      <a className="flex items-start space-x-3 p-2 hover:bg-gray-100 rounded-md w-full">
        <span className="bg-main rounded-full w-[40px] h-[40px] flex items-center justify-center flex-shrink-0">
          {icon}
        </span>
        <div className="flex-1">
          <h6 className="text-sm font-semibold text-black">{title}</h6>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </a>
    </Link>
  );
};

export default DropdownItem;
