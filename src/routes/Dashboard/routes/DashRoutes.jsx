import LoansComponent from "./LoansComponent";
import PaymentsComponent from "./PaymentComponent";
import Dashboard from "../Dashboard";
import { Route, Routes } from "react-router-dom";
import UserComponent from "./UsersComponent";
import AccountsComponents from "./AccountsComponent";
import UserDashboard from "../UserDashboard";
import ProfileComponent from "./ProfileComponent";

const DashboardRoutes = () => {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Dashboard />} />
        <Route path={"/profile"} element={<ProfileComponent />} />
        <Route path={"/transactions"} element={<PaymentsComponent />} />
        <Route path={"/loans"} element={<LoansComponent />} />
        <Route path={"/payments"} element={<AccountsComponents />} />
        <Route path={"/notification"} element={<UserComponent />} />
      </Routes>
    </>
  );
};

export default DashboardRoutes;
