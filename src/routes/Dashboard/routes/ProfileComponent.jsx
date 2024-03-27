import LayoutComponent from "../Layout";

const ProfileComponent = () => {
    
    return (
      <>
        <LayoutComponent page={Borrowers} name={"This is the Borrowers page"} />
      </>
    );
}
 


const Borrowers = () => {
    return (
        <div>
            <h1>Profile</h1>
        </div>
    )
}
export default ProfileComponent;

