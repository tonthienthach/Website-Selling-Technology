/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import "./MessageBox.css";
import { Button } from "react-bootstrap";
import ClearIcon from "@mui/icons-material/Clear";

function MessageBox() {
  const [showBox, setShowBox] = useState(false);
  return (
    <div>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Font_Awesome_5_brands_facebook-messenger_color.svg/1792px-Font_Awesome_5_brands_facebook-messenger_color.svg.png"
        className="message-icon"
        alt="image"
        onClick={() => setShowBox(true)}
      />
      {showBox && (
        <div className="card message-box">
          <div className="card-body">
            <div className="position-relative">
              <h5 className="card-title text-center">Tech Shop</h5>
              <Button
                variant="outline"
                className="p-0 border rounded-circle ms-1 btn-clear"
                onClick={(e) => {
                  setShowBox(false);
                }}
              >
                <ClearIcon></ClearIcon>
              </Button>
            </div>
            <hr />
            <div>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
            <div>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageBox;
