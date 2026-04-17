import React from 'react';

const Button = ({ children, onClick, type = 'button', styleType = 'default', style, ...props }) => {
  const baseStyle = {
    padding: '10px 20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginRight: '10px'
  };
  
  const primaryStyle = {
    ...baseStyle,
    backgroundColor: '#007bff',
    color: 'white',
    borderColor: '#007bff'
  };
  
  const internalStyle = styleType === 'primary' ? primaryStyle : baseStyle;

  const finalStyle = {
    ...internalStyle,
    ...style 
  };

  return (
    <button type={type} onClick={onClick} style={finalStyle} {...props}>
      {children}
    </button>
  );
};

export default Button;