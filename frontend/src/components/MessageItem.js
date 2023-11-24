import React from "react";

function MessageItem(props) {
  const { type, message } = props;
  return (
    <div className="w-100">
      <div className={`card ${type === "send" ? "float-end" : ""}`}>
        <div
          className={`card-body ${
            type === "send" ? "message-item-send" : "message-item-receive"
          }`}
        >
          <p className="card-text">{message.textMessage}</p>
        </div>
      </div>
    </div>
  );
}

export default MessageItem;
