import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import adminApi from "../../axios/adminApi";
import Loading from "../../components/Loading";
import "./ClientAdminPage.css";

function ClientAdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      const { data } = await adminApi.getListAllUser();
      setLoading(false);
      console.log(data);
      setUsers(data.data);
      //   console.log(users);
    };
    getUser();
  }, []);

  if (loading) return <Loading />;
  if (users?.length === 0)
    return <h2 className="py-2 text-center">No users yet</h2>;

  return (
    <Container>
      <Row>
        <Col md={12}>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th></th>
                <th>Client Id</th>
                <th>Client Username</th>
                <th>Client Name</th>
                <th>Client Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <img
                      src={user.avatar}
                      alt=""
                      className="dashboard-user-preview"
                    />
                  </td>
                  <td>{user._id}</td>
                  <td>{user.username}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button variant="danger">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default ClientAdminPage;
