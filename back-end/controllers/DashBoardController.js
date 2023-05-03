const Order = require("../models/Order");

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
          },
        },
        {
          $match: {
            month: i, // Chỉ lấy order của tháng cần truy vấn
            year: year,
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
