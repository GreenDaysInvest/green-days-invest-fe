import React from 'react';

type ButtonProps = {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'dark' | 'secondary' | 'tertiary' | 'white' | 'outline' | 'danger' | 'link' | 'icon';
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode; // Add icon prop
};

const Button: React.FC<ButtonProps> = ({ label, onClick, type, variant = 'primary', disabled = false, className, icon }) => {
  let buttonStyle = 'px-6 py-3 rounded font-normal focus:outline-none transition duration-300 ease-in-out flex items-center justify-center'; 

  switch (variant) {
    case 'primary':
      buttonStyle += ' bg-darkGreen text-white hover:bg-secondary';
      break;
    case 'secondary':
      buttonStyle += ' bg-secondary text-white hover:bg-main hover:text-white';
      break;
    case 'tertiary':
      buttonStyle += ' border border-1 border-tertiary text-tertiary hover:bg-tertiary hover:text-white';
      break;
    case 'white':
      buttonStyle += ' bg-white text-secondary hover:bg-tertiary hover:text-white';
      break;
    case 'dark':
      buttonStyle += ' bg-darkGreen text-tertiary hover:bg-secondary';
      break;
    case 'outline':
      buttonStyle += ' border border-1 border-secondary text-secondary hover:bg-secondary hover:text-white ';
      break;
    case 'link':
      buttonStyle += ' text-secondary';
      break;
    case 'danger':
      buttonStyle += ' bg-red-600 text-white hover:bg-red-700';
      break;
    case 'icon':
      buttonStyle += ' bg-secondary text-white hover:bg-main hover:text-white';
      break;
    default:
      buttonStyle += ' bg-secondary text-black';
  }

  if (disabled) {
    buttonStyle += ' opacity-50 cursor-not-allowed';
  }

  return (
    <button 
      type={type}
      className={`${className} ${buttonStyle}`} 
      onClick={onClick} 
      disabled={disabled}>
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );
};

export default Button;
