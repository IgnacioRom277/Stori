import React from "react";
import Button from "../../../FormElements/Button/Button";
import Card from "../../Card/Card";
import './Error.css';

const Error = (props) => {
  return (
    <div className={`error-modal ${props.className}`}>
      <Card className="error-modal__card">
        <h3>{props.title}</h3>
        <Button onClick={props.onClick}> {props.buttonText} </Button>
      </Card>
    </div>
  )
}

export default Error;