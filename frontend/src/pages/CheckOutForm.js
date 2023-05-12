import axios, { instanceApiGHN } from "../axios/axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logoutCart } from "../features/cartSlice";
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
  const [shippingAmount, setShippingAmount] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/address/getUserAddress").then(({ data }) => {
      setAddress(data.data);
    });
    instanceApiGHN.get("/master-data/province").then(({ data }) => {
      setCity(data.data);
    });
  }, []);
  const handleGetDistrict = (e) => {
    const selectedCity = city.filter(
      (item) => item.ProvinceName === e.target.value
    );
    // setDistricts(selectedCity[0].districts);
    addressTemp = [];
    addressTemp[0] = selectedCity[0];
    instanceApiGHN
      .post("/master-data/district", {
        province_id: selectedCity[0].ProvinceID,
      })
      .then(({ data }) => {
        // console.log(data);
        setDistricts(data.data);
      });
    // console.log(citySelected);
  };
  const handleGetWard = (e) => {
    const selectedDistrict = districts.filter(
      (item) => item.DistrictName === e.target.value
    );
    // console.log(districtSelected);
    addressTemp[2] = {};
    addressTemp[1] = selectedDistrict[0];

    instanceApiGHN
      .post("/master-data/ward", {
        district_id: selectedDistrict[0].DistrictID,
      })
      .then(({ data }) => {
        // console.log(data);
        setWards(data.data);
      });
    // setWards(selectedDistrict[0].wards);
  };
  const handleOnChangeWard = (e) => {
    const selectedWard = wards.filter(
      (item) => item.WardName === e.target.value
    );
    // console.log(selectedWard[0]);
    addressTemp[2] = selectedWard[0];
  };

  const handleCheckout = async () => {
    await axios
      .post(`/api/order/checkout`, { addressId, shippingAmount })
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
    // console.log(citySelected, ", ", districtSelected, ", ", wardSelected);
    axios
      .post(`/api/address/addAddress`, {
        city: addressTemp[0].ProvinceName,
        district: addressTemp[1].DistrictName,
        ward: addressTemp[2].WardName,
        detail: detail,
        phone: phone,
        districtId: addressTemp[1].DistrictID,
        wardCode: addressTemp[2].WardCode,
      })
      .then(({ data }) => {
        // console.log(data);
        setAddress(data.data);
        toast.success("Add Successful Address");
      });
  };

  const handleCalculatorFee = async (e) => {
    setAddressId(e.target.value);
    const addressSelected = addresses.filter(
      (item) => item._id === e.target.value
    );
    const { data } = await instanceApiGHN.post(
      "/v2/shipping-order/available-services",
      {
        shop_id: 123943,
        from_district: 3695,
        to_district: addressSelected[0].districtId,
      }
    );

    instanceApiGHN
      .post(
        "/v2/shipping-order/fee",
        {
          from_district_id: 3695,
          service_id: data.data[0].service_id,
          to_district_id: addressSelected[0].districtId,
          to_ward_code: addressSelected[0].wardCode,
          weight: 2000,
          insurance_value: 1000000,
          coupon: null,
        },
        {
          headers: {
            ShopId: 123943,
          },
        }
      )
      .then(({ data }) => {
        setShippingAmount(data.data.total);
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
            onChange={handleCalculatorFee}
            defaultValue={""}
          >
            <option defaultValue={""}>-- Select Address --</option>

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
                  defaultValue={""}
                >
                  <option defaultValue={""}>--Select City--</option>
                  {city &&
                    city.map((province) => (
                      <option key={province.ProvinceName}>
                        {province.ProvinceName}
                      </option>
                    ))}
                </Form.Select>
              </div>
              <div className="col-md-6 form-group">
                <label>District</label>
                <Form.Select
                  className="custom-select"
                  onChange={handleGetWard}
                  defaultValue={""}
                >
                  <option defaultValue={""}>--Select District--</option>

                  {districts &&
                    districts.map((district) => (
                      <option key={district.DistrictName}>
                        {district.DistrictName}
                      </option>
                    ))}
                </Form.Select>
              </div>
              <div className="col-md-6 form-group">
                <label>Ward</label>
                <Form.Select
                  className="custom-select"
                  onChange={handleOnChangeWard}
                  defaultValue={""}
                >
                  <option defaultValue={""}>--Select Ward--</option>

                  {wards &&
                    wards.map((ward) => (
                      <option key={ward.WardName}>{ward.WardName}</option>
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
                <div
                  className="d-flex justify-content-between"
                  key={product._id}
                >
                  <p key={product.name}>{product.name}</p>
                  <p key={product.price * product.quantity}>
                    {(product.price * product.quantity).toLocaleString(
                      "vi-VN",
                      { style: "currency", currency: "VND" }
                    )}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-bottom pt-3 pb-2">
              <div className="d-flex justify-content-between mb-3">
                <h6>Subtotal</h6>
                <h6>
                  {totalAmount.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </h6>
              </div>
              <div className="d-flex justify-content-between">
                <h6 className="font-weight-medium">Shipping</h6>
                <h6 className="font-weight-medium">
                  {shippingAmount.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </h6>
              </div>
            </div>
            <div className="pt-2">
              <div className="d-flex justify-content-between mt-2">
                <h5>Total</h5>
                <h5>
                  {(totalAmount + shippingAmount).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </h5>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOutForm;
