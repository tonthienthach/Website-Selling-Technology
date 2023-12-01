import React from "react";

function MessageItem(props) {
  const { type, message } = props;
  return (
    <>
      <div className="w-100">
        {message.textMessage !== "" && (
          <div className={`card ${type === "send" ? "float-end" : ""}`}>
            <div
              className={`card-body ${
                type === "send" ? "message-item-send" : "message-item-receive"
              }`}
            >
              <p className="card-text">{message.textMessage}</p>
            </div>
          </div>
        )}
      </div>
      <div className={type === "send" ? "float-end" : ""}>
        {!!message.file?.length &&
          message.file.map((item, idx) => (
            <img
              src={item}
              key={"file" + idx}
              alt={"img"}
              className="img-message-sent mr-2 my-1"
            />
          ))}
      </div>
    </>
  );
}

export default MessageItem;
