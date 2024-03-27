import { Button, Flex, Input } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import { account } from "../utils/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import Loader from "../components/Loader";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  const customStyle = {
    padding: "15px",
    fontSize: "1rem",
  };

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

  async function handleLogin() {
    try {
      if (account?.currentUser) {
        toast.info("You are already logged in");
      } else {
        const x = await signInWithEmailAndPassword(account, email, password);
        console.log(x);
        toast.loading("Logging in...");
      }
      const timer = setTimeout(() => {
        toast.success("Logged in successfully");
        setTimeout(() => {
          return <Loader />;
        }, 2000);
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      toast.error("An error occurred during login. Please try again later.");
      console.error("Error during login:", err);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields");
    } else {
      handleLogin();
    }
  }

  return (
    <>
      <Toaster
        position="top-right"
        richColors
        toastOptions={{ style: customStyle }}
        expand={true}
      />
      <div className="form LoginForm">
        <Flex>
          <Flex>
            <form className="regForm" onSubmit={handleSubmit}>
              <h1>Welcome Back</h1>
              <label htmlFor="phone">Enter your Email:</label>
              <Input
                type="email"
                placeholder="john@example.com"
                className="LoginInputs"
                onChange={(e) => setEmail(e.target.value)}
                style={{ border: "1px solid #000" }}
                required
              />
              <label htmlFor="email">Enter your Password:</label>
              <Input.Password
                className="LoginInputs"
                onChange={(e) => setPassword(e.target.value)}
                style={{ border: "1px solid #000" }}
                required
              />
              <p>
                Don't have an account?{" "}
                <Link
                  to="/register"
                  style={{
                    color: "var(--primary-color)",
                    textDecoration: "underline",
                    marginLeft: ".3rem",
                  }}
                >
                  Register here
                </Link>
              </p>
              <Button
                type="primary"
                htmlType="submit"
                className="btn LoginInputs"
              >
                Login
              </Button>
            </form>
          </Flex>
        </Flex>
      </div>
    </>
  );
};

export default Login;
