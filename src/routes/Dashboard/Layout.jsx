import { Button, Flex, Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { useState } from "react";
import SiderContent from "../Dashboard/components/SideContent";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import HeaderContents from "./Contents/HeaderContent";

const LayoutComponent = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="sider"
      >
        <SiderContent />
        <Button
          type="text"
          icon={collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="triger-btn"
        />
      </Sider>
      <Layout>
        <Header
          className="header"
          style={{
            padding: "1rem",
            display: "flex",
            textAlign: "center",
            height: "10vh",
          }}
        >
          <HeaderContents HeaderName={props.name} />
        </Header>
        <Content className="content">
          <Flex gap="large">
            <props.page />
          </Flex>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
