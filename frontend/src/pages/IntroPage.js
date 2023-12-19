import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import authApi from "../axios/authApi";
import { updateUser } from "../features/userSlice";
import { updateCart } from "../features/cartSlice";
import Loading from "../components/Loading";

const IntroPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const getUserByGoogle = async () => {
      const { data } = await authApi.getUserByLoginGoogle(id);
      if (data.success) {
        dispatch(updateUser(data));
        dispatch(updateCart(data.user.cart));
        localStorage.setItem("token", data.token);
      }
      console.log("data Login", data);
    };
    getUserByGoogle();
  }, [id]);
  return <div>{user ? <Navigate to={"/"} replace={true} /> : <Loading />}</div>;
};

export default IntroPage;
