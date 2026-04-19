import React from 'react';

const Input = ({label, placeholder, ...props}) => (
    <div style={{ marginBottom: '15px' }}>
    <label style={{ display: 'block', marginBottom: '5px' }}>{label}</label>
    <input 
      placeholder={placeholder}
      {...props}
      style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }} 
    />
  </div>
);

export default Input;