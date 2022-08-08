import React, { useEffect, useReducer } from 'react';
import { validate } from '../../../utils/validators';
import './Input.css';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true
      };
    }
    default:
      return state;
  }
};


const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isTouched: false,
    isValid: props.initialValid || false
  });

  const { id, type, label, placeholder, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => { onInput(id, value, isValid); },
    [id, value, isValid, onInput]
  );

  const onChangeHandler = (event) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators
    });
  }

  const onTouchHandler = () => {
    dispatch({
      type: 'TOUCH',
    });
  };

  return (
    <div className='form-control'>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={onChangeHandler}
        onBlur={onTouchHandler}
        value={inputState.value}
      />
    </div>
  );
};

export default Input;