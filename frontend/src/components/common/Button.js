import React from 'react';

const Button = ({ children, onClick, type = 'button', styleType = 'default' }) => {
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
  
  const style = styleType === 'primary' ? primaryStyle : baseStyle;

  return (
    <button type={type} onClick={onClick} style={style}>
      {children}
    </button>
  );
};

export default Button;