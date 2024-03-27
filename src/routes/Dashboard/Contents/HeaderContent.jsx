import {
  MessageOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Flex, Typography } from "antd";
import Search from "antd/es/transfer/search";

const HeaderContents = (props) => {
  return (
  
      <Flex
        align="center"
        justify="space-between"
        gap="3rem"
        className="header"
      >
        <Typography.Title level={2}>{props.HeaderName}</Typography.Title>
        <Flex align="end" gap="3rem">
          <Search placeholder="Search" />

          <Flex align="top" gap="10px">
            <MessageOutlined
              className="header-icon"
              style={{ fontSize: "1.2rem" }}
            />
            <NotificationOutlined
              className="header-icon"
              style={{ fontSize: "1.2rem" }}
            />
            <Avatar
              icon={<UserOutlined />}
              className="header-icon"
              style={{ fontSize: "1.3rem" }}
            />
          </Flex>
        </Flex>
      </Flex>
  
  );
};

export default HeaderContents;
