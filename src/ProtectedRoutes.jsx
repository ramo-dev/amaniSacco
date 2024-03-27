import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import DashboardRoutes from "./routes/Dashboard/routes/DashRoutes";
import Login from "./routes/Login";
import { account } from "./utils/firebase";
import Loader from "./components/Loader";

const ProtectedRoutes = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const unsubscribe = onAuthStateChanged(account, (user) => {
        setUser(user);
        // Simulate a delay to showcase the loader
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
      return () => {
        unsubscribe();
      };
    }, 2000); // Wait for 2 seconds before setting loading to false

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`customLoader ${loading ? "loading" : ""}`}>
      {loading && <Loader />}
      {!loading && (user ? <DashboardRoutes /> : <Navigate to="/login" />)}
    </div>
  );
};

export default ProtectedRoutes;
