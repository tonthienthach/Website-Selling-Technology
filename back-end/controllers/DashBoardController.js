const Category = require("../models/Category");
const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

exports.revenueSale = async (req, res) => {
  const { year } = req.body;
  const ListOrderByMonth = [];
  try {
    for (let i = 1; i < 13; i++) {
      const listOrderCompleted = await Order.aggregate([
        {
          $project: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
            total: 1, // Lấy toàn bộ thông tin order
            shippingAmount: 1,
            Status: 1,
          },
        },
        {
          $match: {
            month: i, // Chỉ lấy order của tháng cần truy vấn
            year: year,
            Status: "completed",
          },
        },
        {
          $sort: {
            day: 1, // Sắp xếp theo ngày tăng dần (nếu muốn)
          },
        },
      ]);
      const revenuePerMonth = listOrderCompleted.map(
        (order) => order.total - order.shippingAmount
      );
      const sumRevenue = revenuePerMonth.reduce((acc, curr) => acc + curr, 0);

      ListOrderByMonth.push(sumRevenue);
    }

    res.status(200).json({
      success: true,
      data: ListOrderByMonth,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "failed to get revenue per Month",
    });
  }
};

exports.storeStats = async (req, res) => {
  const { month } = req.body;
  const curDate = Date.now();
  const productCount = await Product.find({ status: true }).count();
  const orderPending = await Order.find({ Status: "pending" }).count();
  const newUser = await User.aggregate([
    {
      $project: {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" },
        day: { $dayOfMonth: "$createdAt" },
        name: 1,
        Status: 1,
      },
    },
    {
      $match: {
        month: month, // Chỉ lấy order của tháng cần truy vấn
        year: 2023,
      },
    },
    {
      $sort: {
        day: 1, // Sắp xếp theo ngày tăng dần (nếu muốn)
      },
    },
  ]);
  const listOrder = await Order.aggregate([
    {
      $project: {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" },
        day: { $dayOfMonth: "$createdAt" },
        total: 1, // Lấy toàn bộ thông tin order
        shippingAmount: 1,
        Status: 1,
      },
    },
    {
      $match: {
        month: month, // Chỉ lấy order của tháng cần truy vấn
        year: 2023,
        Status: "completed",
      },
    },
    {
      $sort: {
        day: 1, // Sắp xếp theo ngày tăng dần (nếu muốn)
      },
    },
  ]);
  const revenue = listOrder.map((order) => order.total - order.shippingAmount);
  const sumRevenue = revenue.reduce((acc, curr) => acc + curr, 0);

  res.status(200).json({
    success: true,
    productCount,
    orderPending,
    newUser: newUser.length,
    sumRevenue,
  });
};

exports.revenueByCate = async (req, res) => {
  const { year } = req.body;
  const ListOrderByMonth = [];
  const listCate = await Category.find();
  const orderDetail = await Order.find()
    .populate({
      path: "detail.product",
      populate: { path: "cate" },
    })
    .populate({
      path: "detail.product",
      populate: { path: "brand" },
    });
  try {
    const listColor = ["#3e95cd", "#8e5ea2", "#8e5ea2", "#e8c3b9"];
    const listData = [];
    for (let i = 0; i < listCate.length; i++) {
      const listDataByCate = [];
      for (let j = 0; j < 12; j++) {
        const listProductByMonth = [];
        orderDetail.forEach((od) => {
          const detail = od.detail;
          detail.forEach((dt) => {
            if (
              dt.product.cate.name == listCate[i].name &&
              od.createdAt.getMonth() === j
            ) {
              listProductByMonth.push({
                name: dt.product.name,
                price: dt.product.price,
                quantity: dt.quantity,
              });
            }
          });
        });
        const newListProductByMonth = listProductByMonth.map(
          (pd) => pd.price * pd.quantity
        );
        const sumproduct = newListProductByMonth.reduce(
          (acc, curr) => acc + curr,
          0
        );
        listDataByCate.push(sumproduct);
      }
      listData.push({
        cate: listCate[i].name,
        color: listColor[i],
        data: listDataByCate,
      });
    }

    res.status(200).json({
      success: true,
      data: listData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "failed to get revenue per Month",
    });
  }
};
