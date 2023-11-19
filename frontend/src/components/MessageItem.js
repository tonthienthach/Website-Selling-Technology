import React from "react";

function MessageItem(props) {
  const { type, message } = props;
  return (
    <div className={`card ${type === "send" ? "float-end" : ""}`}>
      <div
        className={`card-body ${
          type === "send" ? "message-item-send" : "message-item-receive"
        }`}
      >
        <p className="card-text">{message.textMessage}</p>
      </div>
    </div>
  );
}

export default MessageItem;
