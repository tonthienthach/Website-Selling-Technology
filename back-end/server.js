require("dotenv").config();

const express = require("express");
const session = require("express-session");
//connectDB
const { DBconnect } = require("./configs/ConnectDB");
DBconnect();

//router
const brandRouter = require("./routes/BrandRoute");

const cateRouter = require("./routes/CateRoute");

const productRouter = require("./routes/ProductRoute");

const AuthenRoute = require("./routes/AuthenRoute");

const CartRoute = require("./routes/CartRoute");

const OrderRoute = require("./routes/OrderRoute");

const AddressRoute = require("./routes/AddressRoute");

//routes admin
const adminProductRouter = require("./routes/admin/AdminProductRoute");

const adminUserRouter = require("./routes/admin/AdminUserRoute");

const adminOrderRouter = require("./routes/admin/AdminOrderRoute");

const adminDashBoardRouter = require("./routes/admin/DashBoardRoute");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: "tech-store",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
  })
);

app.listen(process.env.PORT, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});

app.use("/api/brand", brandRouter);

app.use("/api/category", cateRouter);

app.use("/api/product", productRouter);

app.use("/api/admin/product", adminProductRouter);

app.use("/api/admin/order", adminOrderRouter);

app.use("/api/admin/user", adminUserRouter);

app.use("/api/admin/dashboard", adminDashBoardRouter);

app.use("/api/user/", AuthenRoute);

app.use("/api/cart/", CartRoute);

app.use("/api/order/", OrderRoute);

app.use("/api/address/", AddressRoute);

app.get("/", (req, res) => {
  res.send("hello");
});
