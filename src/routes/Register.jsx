import { Button, Flex, Input } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { account, db } from "../utils/firebase";
import { toast, Toaster } from "sonner";
import { collection, doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { SendSms } from "../components/SendSms";
// import SendSms from "../components/SendSms";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formHomeData } = location.state || {};
  const [userId, setUserId] = useState(null);
  const [count, setCount] = useState(0);
  const collectionRef = collection(db, "users");
  

// custom styling for the toaster
    const customStyle = {
      padding: "15px",
      fontSize: "1rem",
    };



  const [formData, setFormData] = useState({
    phone: (formHomeData && formHomeData.phone) || "",
    password: "",
    confPassword: "",
    email: (formHomeData && formHomeData.email) || "",
    firstname: (formHomeData && formHomeData.name) || "",
    secondname: "",
    idNumber: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(account, (user) => {
      if (user) {
        toast.info("You are already logged in");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const {
    phone,
    password,
    confPassword,
    email,
    firstname,
    secondname,
    idNumber,
  } = formData;

  async function registerUser() {
    toast.dismiss();
    try {
      const resp = await createUserWithEmailAndPassword(
        account,
        email,
        password
      );
      console.error(resp);
      if (resp) {
        toast.success("User registered successfully");
        SendSms(firstname, phone, "http://localhost:5050/welcome");
        try {
          await setDoc(doc(collectionRef, resp.user.uid), {
            firstname: firstname,
            secondname: secondname,
            email: email,
            idNumber: idNumber,
            phoneNumber: phone,
          });
        } catch (err) {
          console.error(err);
        }
        setTimeout(() => {
          toast.loading("Redirecting...");
        }, 2000);
      }
      setUserId(resp.$id);
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);

      return () => clearTimeout(timer);
    } catch (err) {
      console.error(err);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setCount(count + 1);
    if (count == 5) {
      toast.error("Too many attempts, Please try again later");
      // console.log(count);
      return;
    }
    if (
      !phone ||
      !password ||
      !email ||
      !firstname ||
      !secondname ||
      !idNumber
    ) {
      toast.error("Please fill in all fields");
    } else if (phone.length === 9 || phone.length === 11) {
      toast.error("Phone number must be 10 digits");
    } else if (idNumber.length !== 8) {
      toast.error("ID number must be 8 digits");
    } else if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
    } else if (password !== confPassword) {
      toast.error("Passwords do not match");
    } else {
      // toast.loading("Logging in...");
      registerUser();
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // useEffect(() => {
  //   console.log("Form data updated:", formData); // Debug statement
  //   // querySsdfsd();
  // }, [formData]);

  return (
    <>
      <Toaster richColors position="top-right" expand={true} toastOptions={{style : customStyle}}/>
      <div className="form formstyle">
        <Flex justify="center">
          <Flex>
            <form className="regForm" onSubmit={handleSubmit}>
              <h2>Register Today</h2>
              <Flex gap="large" wrap="wrap" justify="space-between">
                <Flex vertical style={{ height: "40px" }}>
                  <label htmlFor="firstname">Enter your First Name:</label>
                  <input
                    type="text"
                    name="firstname"
                    placeholder="Eg. John"
                    value={firstname}
                    onChange={handleChange}
                  />
                </Flex>
                <Flex vertical style={{ height: "40px" }}>
                  <label htmlFor="secondname">Enter your Surname:</label>
                  <input
                    type="text"
                    name="secondname"
                    placeholder="Eg. Doe"
                    value={secondname}
                    onChange={handleChange}
                  />
                </Flex>
              </Flex>
              <Flex vertical className="idNumber">
                <label htmlFor="id">Enter your ID number:</label>
                <input
                  type="tel"
                  name="idNumber"
                  placeholder="Eg. 12345678"
                  value={idNumber}
                  onChange={handleChange}
                />
              </Flex>
              <Flex vertical>
                <label htmlFor="email">Enter your Email:</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Eg. johndoe@example.com"
                  value={email}
                  onChange={handleChange}
                />
              </Flex>
              <Flex vertical>
                <label htmlFor="phone">Enter your phone number:</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Eg. 0712345678"
                  value={phone}
                  onChange={handleChange}
                />
              </Flex>
              <Flex
                gap="2rem"
                style={{ height: "3rem" }}
                justify="space-between"
              >
                <Flex vertical>
                  <label htmlFor="password">New Password:</label>
                  <Input.Password
                    name="password"
                    value={password}
                    onChange={handleChange}
                  />
                </Flex>
                <Flex vertical>
                  <label htmlFor="password">Confirm Password:</label>
                  <Input.Password
                    name="confPassword"
                    value={confPassword}
                    onChange={handleChange}
                  />
                </Flex>
              </Flex>
              <Flex style={{ marginBottom: "-2.2rem" }}>
                <p>Have an account?</p>
                <Link
                  to="/login"
                  style={{
                    color: "var(--text)",
                    textDecoration: "underline",
                    marginLeft: ".5rem",
                  }}
                >
                  Login here
                </Link>
              </Flex>
              <Button className="btn" htmlType="submit">
                Register
              </Button>
            </form>
          </Flex>
        </Flex>
      </div>
    </>
  );
};

export default Register;
