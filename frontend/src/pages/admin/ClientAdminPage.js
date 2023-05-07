import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import adminApi from "../../axios/adminApi";
import Loading from "../../components/Loading";
import "./ClientAdminPage.css";
import { useRemoveUserMutation } from "../../services/appApi";
import { toast } from "react-toastify";

function ClientAdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [removeUser] = useRemoveUserMutation();

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

  const handleRemoveUser = async (userID) => {
    if (window.confirm("Must you want to remove user?")) {
      const { data } = await removeUser(userID);
      if (data.success) {
        toast.success("User has been removed successfully");
        setUsers(data.data);
      } else {
        toast.error(data.message);
      }
    }
  };

  return (
    <Container>
      <Row>
        <Col md={12}>
          <div className="card-style-client">
            <Table responsive bordered>
              <thead>
                <tr>
                  <th></th>
                  <th>Client Id</th>
                  <th>Client Username</th>
                  <th>Client Name</th>
                  <th>Client Email</th>
                  <th></th>
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
                    {!user.admin ? (
                      <td>
                        <Button
                          onClick={async () => handleRemoveUser(user._id)}
                          variant="danger"
                        >
                          Delete
                        </Button>
                      </td>
                    ) : (
                      <td></td>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ClientAdminPage;
