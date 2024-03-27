import { Button, Flex } from "antd";
import LayoutComponent from "../Layout";
import { useState, useEffect } from "react";
import Search from "antd/es/input";

const Accounts = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  async function getUserData() {
    try {
      const resp = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await resp.json();
      setIsLoading(false);
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return [];
    }
  }

  useEffect(() => {
    getUserData().then((data) => {
      setUsers(data.reverse());
    });
  }, []);

  function handleSearch(value) {
    setIsLoading(true);
    setSearch(value);
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
    setIsLoading(false);
  }
  function hanldeEdit() {
    alert("Edit");
  }
  function hanldeDelete() {
    alert("Delete");
  }
  return (
    <div className="UserTable">
      <Flex justify="space-between" gap="20%">
        <form
          style={{ display: "flex", gap: "1rem", width: "100%" }}
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(search);
          }}
        >
          <Search placeholder="Enter field to search" />

          <Button
            type="primary"
            htmlType="submit"
            className="actionButton"
            style={{ height: " 100%", fontSize: "1rem" }}
          >
            Search
          </Button>
        </form>
        <Button className="actionButton addBtn">Add New Account</Button>
      </Flex>
      <table>
        <tbody>
          <tr>
            <th>Account No.</th>
            <th>Member Id</th>
            <th>Account Type</th>
            <th>Balance</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          {!isLoading && filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.website}</td>
                <td style={{ display: "flex" }}>
                  <Button className="actionButton" onClick={hanldeEdit}>
                    Edit
                  </Button>
                  <Button className="actionButtonDelete" onClick={hanldeDelete}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : !isLoading && users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td style={{ display: "flex" }}>
                  <Button className="actionButton" onClick={hanldeEdit}>
                    Edit
                  </Button>
                  <Button className="actionButtonDelete" onClick={hanldeDelete}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <progress></progress>
          )}
        </tbody>
      </table>
    </div>
  );
};

const AccountsComponents = () => {
  return <LayoutComponent page={Accounts} name={"This is the Accounts page"} />;
};

export default AccountsComponents;
