import { Button, Flex, Menu } from "antd";
import { SwapRightOutlined } from "@ant-design/icons";
import Link from "antd/es/typography/Link";
// import amaniLogo from "../assets/png/logo-no-background.png";
import amaniLogo from "../assets/png/amaniLogo.png";

const Navbar = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        behavior: "smooth",
        top: element.offsetTop - 70,
      });
    }
  };

  return (
    <Flex
      className="navbar"
      align="center"
      style={{ width: "100%" }}
      justify="center"
    >
      <Flex>
        <Link to="/" smooth={true} duration={500} offset={-70}>
          <img src={amaniLogo} alt="amani-Logo" className="logo" />
        </Link>
      </Flex>
      <Flex className="navMenu">
        <Menu mode="horizontal" style={{ width: "100%" }} className="Nav-menu">
          <Menu.Item key="About">
            <Link
              to="about"
              spy={true}
              smooth={true}
              duration={500}
              offset={-70}
              className="nav-link"
              onClick={() => scrollToSection("about")}
              style={{ fontSize: "1.2rem", color: "var(--text)" }}
            >
              About
            </Link>
          </Menu.Item>
          <Menu.Item key="Services">
            <Link
              activeClass="active"
              to="services"
              spy={true}
              smooth={true}
              duration={500}
              offset={-70}
              onClick={() => scrollToSection("services")}
              style={{ fontSize: "1.2rem", color: "var(--text)" }}
            >
              Services
            </Link>
          </Menu.Item>
          <Menu.Item key="member">
            <Link
              activeClass="active"
              to="member"
              spy={true}
              smooth={true}
              duration={500}
              offset={-70}
              onClick={() => scrollToSection("member")}
              style={{ fontSize: "1.2rem", color: "var(--text)" }}
            >
              Become a member
            </Link>
          </Menu.Item>
          <Menu.Item key="faqs">
            <Link
              activeClass="active"
              to="faqs"
              spy={true}
              smooth={true}
              duration={500}
              offset={-70}
              onClick={() => scrollToSection("faqs")}
              style={{ fontSize: "1.2rem", color: "var(--text)" }}
            >
              Faqs
            </Link>
          </Menu.Item>
          <Menu.Item key="Contact">
            <Link
              activeClass="active"
              to="contact"
              spy={true}
              smooth={true}
              duration={500}
              offset={-70}
              onClick={() => scrollToSection("contact")}
              style={{ fontSize: "1.2rem", color: "var(--text)" }}
            >
              Contact
            </Link>
          </Menu.Item>
        </Menu>
        <Button href="/login" className="btn login-btn">
          Login <SwapRightOutlined className="swipeRightIcon" />
        </Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;
