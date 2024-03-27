import { Button, Flex } from "antd";
import LayoutComponent from "../Layout";
import { useState, useEffect } from "react";
import Search from "antd/es/input";

function User() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);

  async function getUserData() {
    try {
      const resp = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await resp.json();
      return data;
    } catch (error) {
      alert("failed to fetch records");
      console.error("Error fetching user data:", error);
      return [];
    }
  }

  function hanldeEdit() {
    alert("Edit");
  }
  function hanldeDelete() {
    alert("Delete");
  }

  function handleSearch(value) {
    setSearch(value);
    setFilteredUsers(
      users.filter((user) =>
        user.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  }

  useEffect(() => {
    getUserData().then((data) => {
      setUsers(data.reverse());
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="UserTable">
      <Flex justify="space-between">
        <Flex justify="flex-start" gap="20%">
          <form
            style={{ display: "flex", gap: "1rem", width: "100%" }}
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(search);
            }}
          >
            <Search
              placeholder="Enter field to search"
              style={{ width: "45rem", height: "100%", fontSize: "1rem" }}
            />

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
      </Flex>
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
          {!isLoading && filteredUsers.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td className="tbButtons">
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
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td className="tbButtons">
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
            <>
              <progress></progress>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}

const UserComponent = () => {
  return <LayoutComponent page={User} name={"This is the Member List page"} />;
};

export default UserComponent;
