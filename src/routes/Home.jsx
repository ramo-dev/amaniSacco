import { Button, Card, Flex, Typography } from "antd";
import Navbar from "../components/Navbar";
import Investor from "../assets/sapiens.svg";
import { Link, useNavigate } from "react-router-dom";
import { servicesData } from "../components/ServicesData";
import Accordion from "../components/Accordion";
import { useState } from "react";
import { SendSms } from "../components/SendSms";
import { Toaster, toast } from "sonner";

const Home = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [Subscribe, setSubscribe] = useState("");
  const [subPhone, setSubPhone] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const formData = { name, email, phone };
    setForm(formData);
    console.log(formData);
    navigate("/register", { state: { formHomeData: formData } });
  }

async function handleSubscribe(e) {
  e.preventDefault();
  if (subPhone === "") {
    toast.info("Please enter your phone number");
    return;
  } else {
    try {
      toast.loading("Subscribing....");
      await SendSms(name, subPhone, "http://localhost:5050/subscribe");
      setTimeout(() => {
        toast.success("Subscribed successfully");
      }, 2000);
      toast.dismiss()
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while subscribing");
    }
  }
}
    const customStyle = {
      padding: "15px",
      fontSize: "1rem",
    }

  return (
    <>
    <Toaster richColors position="top-right" toastOptions={{style : customStyle}}/>
      <div className="background"></div>
      <Navbar />
      <Flex
        align="center"
        justify="space-around"
        style={{ height: "70vh" }}
        wrap="wrap"
      >
        <Flex
          vertical
          style={{
            maxWidth: " 670px",
            padding: " 1rem 3rem",
            marginTop: "50px",
          }}
          gap="1rem"
        >
          <Typography.Title
            level={1}
            style={{
              fontSize: "3.6rem",
              whiteSpace: "wrap",
              width: "700px",
              color: "var(--text)",
            }}
          >
            Welcome to
            <span style={{ color: "var(--primary-color)" }}> Amani Sacco</span>
          </Typography.Title>
          <Typography.Text style={{ fontSize: "1.4rem", color: "var(--text)" }}>
            We are a member-owned financial institution that provides financial
            services to our members. Our mission is to promote thrift and
            provide credit to members at competitive rates.
          </Typography.Text>
          <Flex gap="1rem" style={{ margin: "1rem 0" }}>
            <Link to="/register">
              <Button className="btn">Open Account</Button>
            </Link>
            <Link to="/register">
              <Button className="btn btn-invert">Apply for a Loan</Button>
            </Link>
          </Flex>
        </Flex>
        <img
          src={Investor}
          alt="amani"
          width={750}
          style={{ filter: "brightness(0.9)" }}
        />
      </Flex>

      {/* About  */}
      <Flex
        style={{ height: "70vh", marginTop: "32vh" }}
        justify="center"
        vertical
        align="center"
        id="about"
      >
        <Typography.Title style={{ fontSize: "3rem", color: "var(--text)" }}>
          About <span style={{color : "var(--primary-color)"}}>Us</span>
        </Typography.Title>

        <Flex gap="large" style={{ padding: "1rem 10rem" , textAlign : "center"}}>
          <Typography.Text
            style={{ fontSize: "1.5rem", color: "var(--text)", width: "100%" }}
          >
            Amani Sacco stands as a beacon of financial empowerment, offering
            transformative solutions that resonate across communities. Through
            our lending services, individuals gain access to vital resources,
            enabling them to realize their aspirations, weather unforeseen
            challenges, and secure a brighter future. Complemented by robust
            educational initiatives, we empower members with the knowledge and
            tools to navigate their financial landscapes confidently. Our
            commitment extends beyond transactions, fostering meaningful
            connections through real-time chat support, ensuring that every
            member receives timely assistance and guidance.
          </Typography.Text>
        </Flex>
      </Flex>

      {/* Services  */}
      <Flex
        style={{ height: "70vh", marginTop: "32vh" }}
        justify="center"
        vertical
        align="center"
        id="services"
      >
        <Typography.Title style={{ fontSize: "3rem", color: "var(--text)" }}>
          Our Services
        </Typography.Title>

        <Flex gap="large" style={{ padding: "1rem 2rem" }}>
          {servicesData.map((service, index) => (
            <Card
              key={index}
              hoverable
              style={{
                display: "flex",
                textAlign: "center",
                borderRadius: 30,
                padding: "0rem 0 1.3rem 0",
                height: "32rem",
                background: "var(--card-color)",
                width: "26rem",
                justifyContent: "center",
              }}
            >
              <img
                alt="example"
                src={service.image}
                width={400}
                style={{ marginTop: "-2rem" }}
              />
              <Flex vertical style={{ maxWidth: " 25rem" }}>
                <Typography.Title level={3}>
                  <span
                    style={{
                      color: "var(--primary-color)",
                      fontSize: "1.6rem",
                    }}
                  >
                    {service.name}
                  </span>
                </Typography.Title>
                <Typography.Text
                  style={{ fontSize: "1.1rem", color: "var(--text)" }}
                >
                  {service.description}
                </Typography.Text>
              </Flex>
            </Card>
          ))}
        </Flex>
      </Flex>
      {/* Become a member */}
      <Flex
        align="center"
        justify="space-around"
        style={{ height: "100vh", marginTop: "100px", padding: " 1rem 3rem" }}
        wrap="wrap"
        id="member"
      >
        <Flex
          vertical
          style={{
            maxWidth: " 650px",
            padding: " 1rem 2rem",
            textAlign: "start",
          }}
          gap=".2rem"
          align="start"
          justify="center"
        >
          <Typography.Title
            level={1}
            style={{
              fontSize: "3.6rem",
              whiteSpace: "wrap",
              color: "var(--text)",
            }}
          >
            Become a{" "}
            <span style={{ color: "var(--primary-color)" }}>Member</span>
          </Typography.Title>
          <Typography.Text style={{ fontSize: "1.3rem", color: "var(--text)" }}>
            Membership in the Amani SACCO is open to all individuals who meet
            our membership criteria. As a member, you will have access to our
            financial services and the opportunity to participate in the
            governance of the SACCO.
          </Typography.Text>
        </Flex>
        <Flex>
          <form className="FormInput" onSubmit={handleSubmit}>
            <label htmlFor="name">Enter your Name:</label>
            <input
              type="text"
              placeholder="Eg.John Doe"
              name="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <label htmlFor="email">Enter your Email:</label>
            <input
              type="email"
              placeholder="Eg. johndoe@example.com"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label htmlFor="phone">Enter your phone number:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              placeholder="Eg. 0712345678"
            />
            <Link
              to={{
                pathname: "/register",
                state: { formHomeData: form },
              }}
            >
              <Button className="btn">Open Account</Button>
            </Link>
          </form>
        </Flex>
      </Flex>
      {/* FAQ */}
      <Flex id="faqs">
        <Accordion />
      </Flex>
      {/* contact us */}
      <Flex
        align="center"
        justify="space-around"
        style={{
          height: "100vh",
          padding: " 1rem 3rem 4rem 3rem",
          color: "var(--text)",
        }}
        wrap="wrap"
        id="contact"
        className="contactUs"
      >
        <Flex
          vertical
          style={{
            maxWidth: " 680px",
            padding: " 1rem 2rem",
            marginTop: "100px",
            height: "80vh",
          }}
          gap="1rem"
        >
          <Typography.Title
            level={1}
            style={{
              fontSize: "3.3rem",
              whiteSpace: "wrap",
              width: "700px",
              marginTop: "5rem",
              color: "var(--text)",
            }}
          >
            Contact <span style={{ color: "var(--primary-color)" }}>Us</span>
          </Typography.Title>
          <Typography.Text style={{ fontSize: "1.4rem", color: "var(--text)" }}>
            If you have any questions about our services or would like to learn
            more about becoming a member, please contact us using the form.
          </Typography.Text>
        </Flex>
        <Flex>
          <form className="FormInput">
            <label htmlFor="name">Enter your Name:</label>
            <input type="text" placeholder="Eg.John Doe" />
            <label htmlFor="email">Enter your Email:</label>
            <input type="email" placeholder="Eg. johndoe@example.com" />
            <label htmlFor="phone">Enter your phone number:</label>
            <input type="text" placeholder="Enter Your Message..." />
            <Button className="btn">Submit</Button>
          </form>
        </Flex>
      </Flex>
      <footer
        style={{
          width: "100%",
          padding: "2rem 2rem",
          marginTop: " 2rem",
          background: "rgba(104, 104, 104, 0.075)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Flex justify="space-around" gap="45rem" >
          <form  className="newsLetter" onSubmit={handleSubscribe}>
            <Typography.Title level={2} style={{ color: "#fff" }}>
              Subscribe to our newsletter
            </Typography.Title>
            <Flex vertical align="start">
              <input type="text" placeholder="Enter Your Phone Number" onChange={e=>setSubPhone(e.target.value)}/>
              <button className="btn" type="submit">Subscribe</button>
            </Flex>
          </form>
          <Flex align="center">
            <Typography.Text
              style={{ fontSize: "1.3rem", color: "var(--text)" }}
            >
              © 2024 Amani Sacco. All Rights Reserved.
            </Typography.Text>
          </Flex>
        </Flex>
      </footer>
    </>
  );
};

export default Home;
