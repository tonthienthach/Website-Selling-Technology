import { Button, Card, CardContent, Typography } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import userApi from "../axios/userApi";
import { useSelector } from "react-redux";

function CarouselItem(props) {
  const { voucher, isCheckout, handleSelectVoucher } = props;
  const user = useSelector((state) => state.user);
  let checkSaved = user
    ? user.user.vouchers.find((item) => item._id === voucher._id)
    : null;
  const [status, setStatus] = useState(Boolean(checkSaved));
  const handleSaveVoucher = async (id) => {
    if (status) {
      return;
    }
    const { data } = await userApi.saveVoucher(id);
    console.log("Save Voucher", data);
    setStatus(data.success);
  };
  return (
    <Card
      size={"sm"}
      variant="solid"
      className="mx-2"
      style={{ maxHeight: "124px" }}
    >
      <CardContent className="d-flex align-items-center h-100 justify-content-between">
        <div className="">
          <Typography level="title-lg" fontWeight={"bold"} className="mt-2">
            {voucher.name}
          </Typography>
          <div className="my-2">
            <Typography fontSize={"13px"} color={"gray"}>
              {voucher.description}
            </Typography>
            <Typography fontSize={"12px"} color={"gray"}>
              HSD: {moment(voucher.expirationDate).format("DD-MM-YYYY")}
            </Typography>
          </div>
        </div>
        {!isCheckout ? (
          <div className="ms-2">
            <Button
              size="small"
              className={`${
                status
                  ? "border border-primary text-primary"
                  : "bg-primary text-white"
              }`}
              onClick={() => handleSaveVoucher(voucher._id)}
            >
              {status ? "Saved" : "Save"}
            </Button>
          </div>
        ) : (
          <div className="ms-2">
            <input
              type="radio"
              name="voucherItem"
              onChange={() => handleSelectVoucher(voucher)}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default CarouselItem;
