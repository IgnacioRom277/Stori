import React from "react";
import MultiRecipient from "./Multi/MultiRecipient";
import './Recipient.css';
import NewRecipient from "./Single/NewRecipient";

const Recipient = () => {
  return (
    <div className="recipient__wrapper">
      <NewRecipient />
      <MultiRecipient />
    </div>
  )
}

export default Recipient;