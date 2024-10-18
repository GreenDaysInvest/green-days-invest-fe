import React from 'react';

type ButtonProps = {
  label: string;
  onClick: () => void;
  type?: 'primary' | 'secondary' | 'outline' | 'danger';
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ label, onClick, type = 'primary', disabled = false }) => {
  let buttonStyle = 'px-6 py-3 rounded font-semibold focus:outline-none transition duration-300 ease-in-out'; 

  switch (type) {
    case 'primary':
      buttonStyle += ' bg-darkGreen text-white hover:bg-secondary';
      break;
    case 'secondary':
      buttonStyle += ' bg-secondary text-white hover:bg-main hover:text-white';
      break;
    case 'outline':
      buttonStyle += ' border border-2 border-darkGreen text-darkGreen hover:bg-darkGreen hover:text-white ';
      break;
    case 'danger':
      buttonStyle += ' bg-red-600 text-white hover:bg-red-700';
      break;
    default:
      buttonStyle += ' bg-secondary text-black';
  }

  if (disabled) {
    buttonStyle += ' opacity-50 cursor-not-allowed';
  }

  return (
    <button className={buttonStyle} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;