import axios from "../axios/axios";
import axiosApi from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Form } from "react-bootstrap";
import Home from "./Home";
import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-toastify"
import { logoutCart } from "../features/cartSlice";
import ToastMessage from "../components/ToastMessage";
import { useNavigate } from "react-router-dom";


let addressTemp = [];

function CheckOutForm() {
  const [addresses, setAddress] = useState([]);
  const [addressId, setAddressId] = useState("");
  const [city, setCity] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [detail, setDetail] = useState("");
  const [phone, setPhone] = useState("");
  const cart = useSelector((state) => state.cart);
  let totalAmount = cart.reduce((total, item) => {
    total += item.price * item.quantity;
    return total;
  }, 0);
  const shippingAmount = 30000;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [success, setSuccess] = useState(false);
  var citySelected = "";
  var districtSelected = "";
  var wardSelected = "";
  // console.log(citySelected, ", ", districtSelected, ", ", wardSelected);

  useEffect(() => {
    axios.get("/api/address/getUserAddress").then(({ data }) => {
      setAddress(data.data);
    });
    axiosApi
      .get("https://provinces.open-api.vn/api/?depth=3")
      .then(({ data }) => {
        setCity(data);
      });
  }, []);
  const handleGetDistrict = (e) => {
    const selectedCity = city.filter((item) => item.name === e.target.value);
    setDistricts(selectedCity[0].districts);
    citySelected = selectedCity[0].name;
    addressTemp = [];
    addressTemp[0]=selectedCity[0];
    // console.log(citySelected);
  };
  const handleGetWard = (e) => {
    const selectedDistrict = districts.filter(
      (item) => item.name === e.target.value
    );
    districtSelected = selectedDistrict[0].name;
    // console.log(districtSelected);
    addressTemp[2] = {}
    addressTemp[1] = selectedDistrict[0];
    setWards(selectedDistrict[0].wards);
  };
  const handleOnChangeWard = (e) => {
    const selectedWard = wards.filter((item) => item.name === e.target.value);
    wardSelected = selectedWard[0].name;
    // console.log(selectedWard[0]);
    addressTemp[2] = selectedWard[0];
  };

  const handleCheckout = async () => {
    await axios
      .post(`/api/order/checkout`, { addressId })
      .then(({ data }) => {
        toast.success("Checkout Successful");
        dispatch(logoutCart());
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch(({ error }) => {
        toast.error("Checkout Failed");
      });
  };

  const handleAddAddress = () => {
    console.log(citySelected, ", ", districtSelected, ", ", wardSelected);
    axios
      .post(`/api/address/addAddress`, {
        city: addressTemp[0].name,
        district: addressTemp[1].name,
        ward: addressTemp[2].name,
        detail: detail,
        phone: phone,
      })
      .then(({ data }) => {
        // console.log(data);
        setAddress(data.data);
        toast.success("Add Successful Address");
      });
  };

  // console.log(addressTemp);

  return (
    <div style={{ textAlign: "left" }} className="container-fluid">
      <div className="row px-xl-5">
        <div className="col-lg-8">
          <h5 className="section-title position-relative text-uppercase mb-3">
            <span className="bg-secondary pr-3">Billing Address</span>
          </h5>
          <Form.Select
            size="lg"
            style={{ width: "100%", height: "50px", borderRadius: "0" }}
            onChange={(e) => setAddressId(e.target.value)}
          >
            <option selected>--Select Address--</option>

            {addresses.map((address) => (
              <option key={address._id} value={address._id}>
                {address.detail}, {address.ward}, {address.district},{" "}
                {address.city}
              </option>
            ))}
          </Form.Select>
          <div style={{ position: "relative" }} className="bg-light p-30 mb-5">
            <div className="row">
              <div className="col-md-6 form-group">
                <label>Mobile No</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="+84"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="col-md-6 form-group">
                <label>City</label>
                <Form.Select
                  className="custom-select"
                  onChange={handleGetDistrict}
                >
                  <option selected>--Select City--</option>
                  {city &&
                    city.map((province) => (
                      <option key={province.name}>{province.name}</option>
                    ))}
                </Form.Select>
              </div>
              <div className="col-md-6 form-group">
                <label>Dictrict</label>
                <Form.Select className="custom-select" onChange={handleGetWard}>
                  <option selected>--Select District--</option>

                  {districts &&
                    districts.map((district) => (
                      <option key={district.name}>{district.name}</option>
                    ))}
                </Form.Select>
              </div>
              <div className="col-md-6 form-group">
                <label>Ward</label>
                <Form.Select
                  className="custom-select"
                  onChange={handleOnChangeWard}
                >
                  <option selected>--Select Ward--</option>

                  {wards &&
                    wards.map((ward) => (
                      <option key={ward.name}>{ward.name}</option>
                    ))}
                </Form.Select>
              </div>
              <div className="col-md-6 form-group">
                <label>Address</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="123 Street"
                  onChange={(e) => setDetail(e.target.value)}
                />
              </div>
              <button
                style={{
                  width: "30%",
                  position: "absolute",
                  right: "30px",
                  bottom: "50px",
                }}
                className="btn btn-primary px-3"
                onClick={() => handleAddAddress()}
              >
                {" "}
                Add Address{" "}
              </button>
            </div>
          </div>
          <div className="collapse mb-5" id="shipping-address">
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Shipping Address</span>
            </h5>
            <div className="bg-light p-30">
              <div className="row">
                <div className="col-md-6 form-group">
                  <label>First Name</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="John"
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>Last Name</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Doe"
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>E-mail</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="example@email.com"
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>Mobile No</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="+84"
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>Address Line 1</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="123 Street"
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>Address Line 2</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="123 Street"
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>Country</label>
                  <select className="custom-select">
                    <option selected>United States</option>
                    <option>Afghanistan</option>
                    <option>Albania</option>
                    <option>Algeria</option>
                  </select>
                </div>
                <div className="col-md-6 form-group">
                  <label>City</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="New York"
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>State</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="New York"
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>ZIP Code</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <h5 className="section-title position-relative text-uppercase mb-3">
            <span className="bg-secondary pr-3">Order Total</span>
          </h5>
          <div className="bg-light p-30 mb-5">
            <div className="border-bottom">
              <h6 className="mb-3">Products</h6>
              {cart.map((product) => (
                <div className="d-flex justify-content-between">
                  <p>{product.name}</p>
                  <p>${product.price * product.quantity}</p>
                </div>
              ))}
            </div>
            <div className="border-bottom pt-3 pb-2">
              <div className="d-flex justify-content-between mb-3">
                <h6>Subtotal</h6>
                <h6>{totalAmount}</h6>
              </div>
              <div className="d-flex justify-content-between">
                <h6 className="font-weight-medium">Shipping</h6>
                <h6 className="font-weight-medium">${shippingAmount}</h6>
              </div>
            </div>
            <div className="pt-2">
              <div className="d-flex justify-content-between mt-2">
                <h5>Total</h5>
                <h5>${totalAmount + shippingAmount}</h5>
              </div>
            </div>
          </div>
          <div className="mb-5">
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Payment</span>
            </h5>
            <div className="bg-light p-30">
              {/* <div className="form-group">
                <div className="custom-control custom-radio">
                  <input
                    type="radio"
                    className="custom-control-input"
                    name="payment"
                    id="shipcod"
                  />
                  <label className="custom-control-label" for="paypal">
                    Ship Cod
                  </label>
                </div>
              </div> */}
              <button
                className="btn btn-block btn-primary font-weight-bold py-3"
                onClick={() => handleCheckout()}
              >
                Place Order
              </button>
              {success && (
                <ToastMessage
                  bg="info"
                  title="Notification"
                  body="Checkout Successfully"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOutForm;
