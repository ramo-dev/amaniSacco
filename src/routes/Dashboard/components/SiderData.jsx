import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  BookOutlined,
  MoneyCollectOutlined,
  AccountBookOutlined,
  UsergroupAddOutlined,
  LogoutOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Flex, Menu } from "antd";
import "../DashboardStyles.css";
import { signOut } from "firebase/auth";
import { account } from "../../../utils/firebase";
import { toast } from "sonner";

const SiderData = (props) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [signOutKey, setSignOutKey] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const handleMenuClick = (path) => {
    setCurrentPath(path);
    nav(path);
  };

  async function handleLogout() {
    try {
      setSignOutKey("/")
      const x = await signOut(account)
      toast.loading("SignIn Out....")
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <Flex align="center" justify="center">
        <div className="logo">
          <Link to="/">
            <h1>Some Logo</h1>
          </Link>
        </div>
      </Flex>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        className="menu-bar"
        onClick={(e) => handleMenuClick(e.key)}
        selectedKeys={[currentPath]}
        items={[
          {
            key: "/dashboard",
            label: "Dashboard",
            icon: <HomeOutlined />,
          },
          {
            key: "/dashboard/profile",
            label: "Profile",
            icon: <UsergroupAddOutlined />,
          },
          {
            key: "/dashboard/transactions",
            label: "Transactions",
            icon: <AccountBookOutlined />,
          },
          {
            key: "/dashboard/loans",
            label: "Loans",
            icon: <BookOutlined />,
          },
          {
            key: "/dashboard/payments",
            label: "Payments",
            icon: <UserSwitchOutlined />,
          },
          {
            key: "/dashboard/notification",
            label: "Notifications",
            icon: <MoneyCollectOutlined />,
          },
          {
            key: signOutKey,
            label: "Logout",
            icon: <LogoutOutlined />,
            onClick: handleLogout,
          },
        ]}
      />
    </>
  );
};

export default SiderData;
