import LayoutComponent from "./Layout";
import MainContents from "./Contents/MainContents";

const Dashboard = () => {
  return (
    <>
      <LayoutComponent
        page={MainContents}
        name={"This is the Dashboard page"}
      />
    </>
  );
};

export default Dashboard;
