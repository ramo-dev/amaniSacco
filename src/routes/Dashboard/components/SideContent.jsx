import { Flex } from "antd";
import SiderData from "./SiderData";
import { Link } from "react-router-dom";

const SiderContent = () => {
  return (
    <>
      <Flex vertical>
        <SiderData/>
      </Flex>
    </>
  );
};

export default SiderContent;
