import React from 'react';
import './Input.css';

const Input = props => {
  const { id, type, placeholder } = props;

  return (
    <div className='form-control'>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;