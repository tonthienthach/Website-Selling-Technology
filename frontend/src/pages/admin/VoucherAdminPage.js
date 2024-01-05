import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import Pagination from "../../components/Pagination";
import voucherApi from "../../axios/voucherApi";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";
import moment from "moment";

const VoucherAdminPage = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentItems, setCurrentItems] = useState([]);

  const handleRemoveVoucher = async (id) => {
    if (window.confirm("Must you want to remove voucher?")) {
      const { data } = await voucherApi.deleteVoucher(id);
      if (data.success) {
        toast.success("Deleted voucher successfully");
        setVouchers(data.data);
      } else {
        toast.error("Voucher deleted failed");
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      const { data } = await voucherApi.getAllVoucher();
      setLoading(false);
      setVouchers(data.data);
      //   console.log(vouchers);
    };
    getUser();
  }, []);
  if (loading) return <Loading />;

  return (
    <Container>
      <Row>
        <Col md={12}>
          <div className="card-style-client">
            <Table responsive bordered>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Condition</th>
                  <th>Discount Limit</th>
                  <th>Expiration Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((voucher) => (
                  <tr key={voucher._id}>
                    <td>{voucher.code}</td>
                    <td>{voucher.name}</td>
                    <td>{voucher.type}</td>
                    <td>{voucher.quantity}</td>
                    <td>
                      {voucher.condition?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                    <td>
                      {voucher.discountLimit?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                    <td>
                      {moment(voucher.expirationDate).format("DD-MM-YYYY")}
                    </td>
                    <td>
                      <Button
                        onClick={async () => handleRemoveVoucher(voucher._id)}
                        variant="danger"
                      >
                        Disable
                      </Button>
                    </td>
                    {/* {!voucher.admin ? (
                      
                    ) : (
                      <td></td>
                    )} */}
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination
              itemsPerPage={12}
              items={vouchers}
              setCurrentItems={setCurrentItems}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default VoucherAdminPage;
