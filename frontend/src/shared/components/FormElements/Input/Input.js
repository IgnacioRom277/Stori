import React from 'react';
import './Input.css';

const Input = props => {
  const { id, type, label, placeholder } = props;

  return (
    <div className='form-control'>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;