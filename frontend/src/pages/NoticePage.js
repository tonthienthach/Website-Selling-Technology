import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import orderApi from "../axios/orderApi";
import { Button, Modal } from "react-bootstrap";

function NoticePage() {
  const [resp] = useSearchParams();
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const statusPayment = resp.get("vnp_ResponseCode");
  useEffect(() => {
    if (resp.get("vnp_ResponseCode") === "00") {
      const updateStatusPayment = async () => {
        await orderApi.updateStatusPaid({
          orderId: resp.get("vnp_TxnRef").split("-")[0],
          paid: true,
        });
        // toast.success("Successful payment");
        // console.log(resp.get("vnp_TxnRef"));
      };
      updateStatusPayment();
    }
  }, [resp]);

  const handleClose = () => {
    setShow(false);
    navigate("/checkorder");
  };

  //   console.log(resp.get("vnp_Amount"));
  return (
    <>
      {statusPayment === "00" && (
        <>
          <h1 className="h1 text-center">Successful payment</h1>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Payment</Modal.Title>
            </Modal.Header>
            <Modal.Body>Successful payment</Modal.Body>
            <Modal.Footer>
              <Button
                variant="danger"
                className="rounded"
                onClick={handleClose}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
      {statusPayment === "24" && (
        <>
          <h1 className="h1 text-center">The transaction has been cancelled</h1>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Payment</Modal.Title>
            </Modal.Header>
            <Modal.Body>The transaction has been cancelled</Modal.Body>
            <Modal.Footer>
              <Button
                variant="danger"
                className="rounded"
                onClick={handleClose}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
      {statusPayment === "51" && (
        <>
          <h1 className="h1 text-center">
            Your balance doesn't have enough money to pay
          </h1>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Payment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Your balance doesn't have enough money to pay
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="danger"
                className="rounded"
                onClick={handleClose}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
      {statusPayment !== "00" &&
        statusPayment !== "24" &&
        statusPayment !== "51" && (
          <>
            <h1 className="h1 text-center">The transaction failed</h1>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Payment</Modal.Title>
              </Modal.Header>
              <Modal.Body>The transaction failed</Modal.Body>
              <Modal.Footer>
                <Button
                  variant="danger"
                  className="rounded"
                  onClick={handleClose}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
    </>
  );
}

export default NoticePage;
