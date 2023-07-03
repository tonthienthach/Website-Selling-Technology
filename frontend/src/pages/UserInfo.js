import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import LockIcon from "@mui/icons-material/Lock";

import { useDispatch, useSelector } from "react-redux";
import "./UserInfo.css";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import AddLocationIcon from "@mui/icons-material/AddLocation";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import NavigationNexIcon from "@mui/icons-material/NavigateNext";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LinkBreadcrums from "@mui/material/Link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import userApi from "../axios/userApi";
import { toast } from "react-toastify";
import addressApi from "../axios/addressApi";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Link,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import instance, { instanceApiGHN } from "../axios/axios";
import axios from "axios";
import { updateUser } from "../features/userSlice";

function UserInfo() {
  const [tab, setTab] = useState("information");
  const userData = useSelector((state) => state.user);
  const [name, setName] = useState(userData.user.name);
  const [email, setEmail] = useState(userData.user.email);
  const [selectedImage, setSelectedImage] = useState(userData.user.avatar);

  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const handleSubmit = async () => {
    const { data } = await userApi.updateInfoUser({
      name: name,
      email: email,
      avatar: selectedImage,
    });
    console.log(data);
    if (data.success) {
      toast.success("successfully updated");

      await dispatch(updateUser(data));
    } else {
      toast.error("Error updating");
    }
  };

  function showWidget() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dtksctz3g",
        uploadPreset: "o2ijzzgc",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setSelectedImage(result.info.url);
        }
      }
    );
    widget.open();
  }

  //   const createAddress = () => {
  //     var formData = new FormData();
  //     formData.append('apartmentNumber', apartmentNumber);
  //     formData.append('ward', wardString);
  //     formData.append('district', districtString);
  //     formData.append('province', provinceString);
  //     formData.append('defaultAddress', '0');

  //     instance
  //       .post(`/api/address/addAddress`, {
  //         city: addressTemp[0].ProvinceName,
  //         district: addressTemp[1].DistrictName,
  //         ward: addressTemp[2].WardName,
  //         detail: detail,
  //         phone: phone,
  //         districtId: addressTemp[1].DistrictID,
  //         wardCode: addressTemp[2].WardCode,
  //       })
  //       .then(({ data }) => {
  //         // console.log(data);
  //         setAddress(data.data);
  //         toast.success("Add Successful Address");
  //       });

  //     axios.post(`${baseURL}/api/v1/address/user?userId=${userId}`, formData)
  //         .then((res) => console.log(res.data))
  //         .catch((err) => console.log("Address create err: ", err))

  //     let xyz = {
  //         "user": userId,
  //         "address": {
  //             "id": 3,
  //             "apartmentNumber": apartmentNumber,
  //             "ward": wardString,
  //             "district": districtString,
  //             "province": provinceString,
  //         },
  //         "defaultAddress": false
  //     }
  //     allAddressOriginal.push(xyz);
  //     setAllAddress(allAddressOriginal);
  // }

  //   const removeAddress = async (addressId) => {
  //     const { data } = await addressApi.deleteAddress(addressId);
  //     if (data.success) {
  //       toast.success(data.message);
  //       setAllAddress(data.data);
  //     }
  //   };

  return (
    <Container className="profile__container">
      <Row className="profile__header" style={{ color: "white" }}>
        <h5 style={{ fontSize: 30, fontWeight: "bold" }}>My profile</h5>
        <p>Quản lý hồ sơ để bảo mật tài khoản</p>
      </Row>
      <Row>
        <Col lg="2" md="9">
          <div className="profile__userInfo-title">
            <img
              src={userData.user.avatar}
              style={{ height: 50, width: 50, borderRadius: 25 }}
              alt=""
            />
            <p>{userData.user.name}</p>
          </div>
          <div style={{ marginTop: 30 }}>
            <div
              style={{
                cursor: "pointer",
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <p
                className={`${tab === "information" ? "tab__active" : ""}`}
                onClick={() => setTab("information")}
              >
                <AccountCircleIcon /> Information
              </p>
            </div>
            <div
              style={{
                cursor: "pointer",
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <p
                className={`${tab === "password" ? "tab__active" : ""}`}
                onClick={() => setTab("password")}
              >
                <LockIcon /> Edit password
              </p>
            </div>
            <div
              style={{
                cursor: "pointer",
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <p
                onClick={() => setTab("changPassword")}
                className={`${tab === "changPassword" ? "tab__active" : ""}`}
              >
                <HomeIcon /> Address
              </p>
            </div>
          </div>
        </Col>
        {tab === "information" ? (
          <>
            <Col lg="7" md="9" className="profile__content">
              <div className="profile__item">
                <p className="profile__label">Full name</p>
                <div>
                  <input
                    className="newsletter"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="profile__item">
                <p className="profile__label">Email</p>
                <div>
                  <input
                    className="newsletter"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <button
                  className="newAddress_btn"
                  style={{ marginLeft: 320 }}
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </Col>
            <Col
              lg="3"
              md="9"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* UPLOAD IMAGE */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  className="m-4"
                  alt="not found"
                  width={"250px"}
                  height={"250px"}
                  style={{ borderRadius: "125px" }}
                  src={selectedImage}
                />
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <div>
                    <Button
                      variant="contained"
                      className="mb-2 me-2"
                      onClick={showWidget}
                    >
                      <FileUploadIcon />
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      className="mb-2"
                      onClick={() =>
                        setSelectedImage(
                          "https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"
                        )
                      }
                    >
                      <ClearIcon />
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </>
        ) : null}
        {/* {tab === "changPassword" && (
          <Col lg="10" md="9">
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: 80,
              }}
            >
              <h5 style={{ color: "#F9813A", fontWeight: "bold" }}>
                My address
              </h5>
              <button
                className="newAddress_btn"
                onClick={() => setModalAddressVisible(true)}
              >
                <AddLocationIcon /> Address
              </button>
            </div>
            <div>
              {allAddress.map((item, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "white",
                    marginBottom: 3,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 5,
                    borderRadius: 10,
                  }}
                >
                  <div className="address__item-text">
                    <p>{item.address.apartmentNumber}</p>
                    <p style={{ color: "grey" }}>
                      {item.address.ward + ", "}
                      {item.address.district + ", "}
                      {item.address.province}
                    </p>
                    {item.defaultAddress == true && (
                      <p className="defaultAddress__flag">Default address</p>
                    )}
                  </div>
                  <div>
                    <button className="addressItem__btn">
                      <EditIcon />
                    </button>
                    <button
                      className="addressItem__btn"
                      style={{ backgroundColor: "red" }}
                      onClick={() => removeAddress(item.address.id)}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={modalAddressVisible}
              onClose={() => setModalAddressVisible(!modalAddressVisible)}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <Fade in={modalAddressVisible}>
                <Box sx={style}>
                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    New address
                  </Typography>
                  <div>
                    <div className="profile__item">
                      <p className="profile__label">Province</p>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Age"
                        onChange={(e) => setAge(e.target.value)}
                        fullWidth
                      >
                        {provinceData.map((item) => (
                          <MenuItem value={item.ProvinceID}>
                            {item.ProvinceName}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                    <div className="profile__item">
                      <p className="profile__label">District</p>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Age"
                        onChange={(e) => setDistrictValue(e.target.value)}
                        fullWidth
                      >
                        {districtData.map((item) => (
                          <MenuItem value={item.DistrictID}>
                            {item.DistrictName}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                    <div className="profile__item">
                      <p className="profile__label">Ward</p>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Age"
                        onChange={(e) => setWardValue(e.target.value)}
                        fullWidth
                      >
                        {wardData.map((item) => (
                          <MenuItem value={item.WardCode}>
                            {item.WardName}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>

                    <div className="profile__item">
                      <p
                        className="profile__label"
                        style={{ marginLeft: -170 }}
                      >
                        Apartment Number
                      </p>
                      <div className="newsletter1" style={{ marginLeft: -30 }}>
                        <input
                          type="email"
                          onChange={(e) => setApartmentNumber(e.target.value)}
                        />
                      </div>
                    </div>
                    <button
                      style={{
                        padding: 5,
                        backgroundColor: "#F9813A",
                        color: "white",
                      }}
                      onClick={() => {
                        setModalAddressVisible(!modalAddressVisible);

                        createAddress();
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        console.log({
                          wardString,
                          districtString,
                          provinceString,
                        });
                      }}
                    >
                      SHOW ADDRESS
                    </button>
                  </div>
                </Box>
              </Fade>
            </Modal>
          </Col>
        )} */}
        {/* {tab === "password" && (
          <Col lg="10" md="9" className="profile__content">
            <div className="profile__item">
              <p className="profile__label">Current password</p>
              <div className="newsletter">
                <input
                  type={hidePassword ? "password" : "email"}
                  onChange={(e) => setPassword0(e.target.value)}
                />
                {hidePassword ? (
                  <VisibilityIcon
                    onClick={() => setHidePassword(!hidePassword)}
                  />
                ) : (
                  <VisibilityOffIcon
                    onClick={() => setHidePassword(!hidePassword)}
                  />
                )}
              </div>
            </div>
            <div className="profile__item">
              <p className="profile__label">New password</p>
              <div className="newsletter">
                <input
                  type={hidePassword ? "password" : "email"}
                  onChange={(e) => setPassword1(e.target.value)}
                />
                {hidePassword ? (
                  <VisibilityIcon
                    onClick={() => setHidePassword(!hidePassword)}
                  />
                ) : (
                  <VisibilityOffIcon
                    onClick={() => setHidePassword(!hidePassword)}
                  />
                )}
              </div>
            </div>
            <div className="profile__item">
              <p className="profile__label">New password</p>
              <div className="newsletter">
                <input
                  type={hidePassword ? "password" : "email"}
                  onChange={(e) => setPassword2(e.target.value)}
                />
                {hidePassword ? (
                  <VisibilityIcon
                    onClick={() => setHidePassword(!hidePassword)}
                  />
                ) : (
                  <VisibilityOffIcon
                    onClick={() => setHidePassword(!hidePassword)}
                  />
                )}
              </div>
            </div>
            <button
              onClick={() => handleChangePassword()}
              className="newAddress_btn"
              style={{ marginLeft: 490 }}
            >
              Save
            </button>
          </Col>
        )} */}
      </Row>
    </Container>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default UserInfo;
