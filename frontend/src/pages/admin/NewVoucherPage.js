import React, { useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import voucherApi from "../../axios/voucherApi";

const typeVoucher = [{ name: "amount" }, { name: "percent" }, { name: "ship" }];

function NewVoucherPage() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountLimit, setDiscountLimit] = useState(0);
  const [typeSelected, setTypeSelected] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [expirationDate, setExpirationDate] = useState("");
  const [condition, setCondition] = useState(0);

  const handleGetType = (e) => {
    const cateSelected = typeVoucher.filter(
      (item) => item.name === e.target.value
    );
    // console.log(cateSelected);
    // if (cateSelected[0].name === "amount") {
    //   setIsTypeAmount(true);
    // } else {
    //     setIsTypeAmount(false);
    // }
    setTypeSelected(cateSelected[0].name);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const dataRequest = {
      name: name,
      code: code,
      description: description,
      discountLimit: discountLimit,
      type: typeSelected,
      quantity: quantity,
      expirationDate: expirationDate,
      condition: condition,
    };
    if (typeSelected === "amount") {
      dataRequest.discountAmount = discountAmount;
    } else if (typeSelected === "percent") {
      dataRequest.discountPercent = discountPercent;
    }
    const { data } = await voucherApi.createVoucher(dataRequest);
    if (data.success) {
      toast.success("Create a successful voucher");
    } else {
      toast.error("Failed voucher creation");
    }
  }

  return (
    <Container>
      <Row>
        <h1 className="mt-4">Create a voucher</h1>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6} className="new-product__form--container">
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter voucher name"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Code"
                  value={code}
                  required
                  onChange={(e) => setCode(e.target.value)}
                />
              </Form.Group>
              {typeSelected === "amount" && (
                <Form.Group className="mb-3">
                  <Form.Label>Discount Amount</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Discount Amount"
                    value={discountAmount}
                    required
                    onChange={(e) => setDiscountAmount(e.target.value)}
                  />
                </Form.Group>
              )}
              {typeSelected === "percent" && (
                <Form.Group className="mb-3">
                  <Form.Label>Discount Percent</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Discount Percent"
                    value={discountPercent}
                    required
                    onChange={(e) => setDiscountPercent(e.target.value)}
                  />
                </Form.Group>
              )}
              <Form.Group className="mb-3">
                <Form.Label>Discount Limit</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Discount Limit"
                  value={discountLimit}
                  required
                  onChange={(e) => setDiscountLimit(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Quantity"
                  value={quantity}
                  required
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Button type="submit">Create Voucher</Button>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" onChange={handleGetType}>
                <Form.Label>Type</Form.Label>
                <Form.Select>
                  <option disabled selected>
                    -- Select One --
                  </option>
                  {typeVoucher.map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Condition</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Condition"
                  value={condition}
                  required
                  onChange={(e) => setCondition(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Expiration Date</Form.Label>
                <Form.Control
                  type="Date"
                  placeholder="Enter Battery"
                  value={expirationDate}
                  required
                  onChange={(e) => setExpirationDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Voucher description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Voucher description"
                  style={{ height: "100px" }}
                  value={description}
                  required
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Row>
    </Container>
  );
}

export default NewVoucherPage;
