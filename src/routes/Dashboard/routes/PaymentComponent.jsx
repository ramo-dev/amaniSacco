import LayoutComponent from "../Layout";

const PaymentsComponent = () => {
    return (
      <>
        <LayoutComponent page={Payments} name={"This is the Payment page"} />
      </>
    );
}
 const Payments = () => {
   return (
     <div>
       <h1>Payments</h1>
     </div>
   );
 };
export default PaymentsComponent;