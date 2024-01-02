import React, { useState } from "react";
import { Card, Button, Table } from "react-bootstrap";
import ClearIcon from "@mui/icons-material/Clear";
import "./CompareProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { ProductCompareValue } from "../contants/Product";
import { deleteProduct } from "../features/compareProductSlice";
const data = [
  {
    id: "644e9f32388d059aa6199760",
    name: "MSI Katana GF66",
    CPU: "I5 12450H",
    ram: "8GB",
    rom: "512GB",
    VGA: "RTX 3050",
    display: "Full HD, 1920x1080, 144HZ",
    battery: "3 Cell 54WHrs",
    OS: "WIndow 11",
    weight: "2.2 Kg",
  },
  {
    id: "644ea11b388d059aa6199770",
    name: "Lenovo Region 5",
    CPU: "R7 6800H",
    ram: "8GB",
    rom: "512GB",
    VGA: "RTX 3050",
    display: "Full HD, 1920x1080, 144HZ",
    battery: "3 Cell 54WHrs",
    OS: "WIndow 11",
    weight: "2.2 Kg",
  },
];
const properties = Object.keys(data[0]);
const CompareProduct = () => {
  const [show, setShow] = useState(false);
  const compareProduct = useSelector((state) => state.compareProduct);
  const dispatch = useDispatch();

  const handleSetShow = () => {
    setShow(!show);
  };

  const handleDeleteProductCompare = (id) => {
    dispatch(deleteProduct(id));
  };
  return (
    <div>
      <span
        className="badge bg-info title-badge p-2"
        onClick={() => handleSetShow()}
      >
        Compare ({compareProduct.length})
      </span>
      {show && !!compareProduct.length && (
        <div className="section-compare">
          <div className="btn-show-less">
            <Button
              variant="outline"
              className="p-1 border bg-white rounded-top"
              onClick={() => {
                handleSetShow();
              }}
            >
              Show less
            </Button>
          </div>
          <div className="compare-body">
            <Card className="rounded-0 width-card">
              <Card.Body>
                <Card.Text>
                  <div className="d-flex justify-content-around">
                    {compareProduct?.map((product, idx) => (
                      <>
                        <div key={product._id} className="compare-item-product">
                          <Button
                            variant="outline"
                            className="p-0 border rounded-circle ms-1 btn-clear-compare"
                            onClick={() => {
                              handleDeleteProductCompare(product._id);
                            }}
                          >
                            <ClearIcon></ClearIcon>
                          </Button>
                          <img
                            src={product.image[0]?.url}
                            alt=""
                            className="img-item-compare"
                          />
                          <p>{product.name}</p>
                        </div>
                        {idx !== compareProduct.length - 1 && (
                          <div className="border"></div>
                        )}
                      </>
                    ))}
                  </div>
                </Card.Text>
                <div className="text-center">
                  <Button
                    variant="primary"
                    data-toggle="modal"
                    data-target={"#modalReview"}
                  >
                    Compare
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      )}
      <div
        className="modal fade"
        id={"modalReview"}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modalReviewLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog " role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalReviewLabel">
                Compare Product
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Table responsive bordered className="w-100">
                <thead>
                  <tr>
                    <th></th>
                    {compareProduct.map((product) => (
                      <th key={product._id}>{product.name}</th>
                    ))}

                    {/* <th>Client Username</th> */}
                  </tr>
                </thead>
                <tbody>
                  {ProductCompareValue.map((property) => (
                    <tr>
                      {compareProduct.map((product, idx) => {
                        if (product[property.id]) {
                          if (idx === 0)
                            return (
                              <>
                                <td>{property.value}</td>
                                <td key={product._id}>
                                  {product[property.id]}
                                </td>
                              </>
                            );
                          else {
                            return (
                              <td key={product._id}>{product[property.id]}</td>
                            );
                          }
                        }
                        return <></>;
                      })}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareProduct;
