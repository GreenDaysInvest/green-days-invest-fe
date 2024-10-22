import React from 'react';

type ButtonProps = {
  label: string;
  onClick: () => void;
  type?: 'primary' | 'dark' | 'secondary' | 'tertiary' | 'white' | 'outline' | 'danger';
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ label, onClick, type = 'primary', disabled = false }) => {
  let buttonStyle = 'px-6 py-3 rounded font-normal focus:outline-none transition duration-300 ease-in-out'; 

  switch (type) {
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