import React, { useState } from "react";
import LayoutComponent from "../Layout";
import { Button, Flex } from "antd";
import { SendSms } from "../../../components/SendSms";
import PingLoader from "../../../components/PingLoader";
import MainContents from "../Contents/MainContents";


const LoansComponent = () => {
  return <LayoutComponent page={Loans} name={"My Loan Dashboard"} />;
};

const Loans = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    email: "",
    monthlyIncome: "",
    loanAmount: "",
    phoneNumber : '',
    idNumber : "",
    loanPurpose: "",
    referenceId : "",
    consent: false,
  });

  const[loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)          
    setTimeout(()=>{
          SendSms(
            formData.firstName,
            formData.phoneNumber,
            "http://localhost:5050/getLoan",
            {
              loanAmount: formData.loanAmount,
            }
          );
            setLoading(false);
          },3000)
          setFormData({
            firstName: "",
            secondName: "",
            email: "",
            monthlyIncome: "",
            loanAmount: "",
            phoneNumber: "",
            idNumber: "",
            loanPurpose: "",
            referenceId: "",
            consent: false,
          });

    console.log(formData);
  };

  return (
    <>
      {loading ? (
        <PingLoader />
      ) : (
        <Flex  justify="space-around" gap="1rem" style={{padding : '2rem 4rem'}}>
          <Flex className="container" vertical style={{maxWidth : '50%'}}>
            <MainContents/>
          </Flex>
          <form onSubmit={handleSubmit} className="form-container">
            <h1 style={{margin : "-2rem 1rem 1rem 1rem" ,fontSize : '2.5rem' }}>Loan Application Form</h1>
            <Flex gap="large">
              <label>
                First Name:
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </label>

              <label>
                Second Name:
                <input
                  type="text"
                  name="secondName"
                  value={formData.secondName}
                  onChange={handleChange}
                  required
                />
              </label>
            </Flex>

            <Flex gap="large">
              <label>
                Email Address:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Id Number:
                <input
                  type="number"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  required
                />
              </label>
            </Flex>
            <Flex gap="large">
              <label>
                Phone Number:
                <input
                  type="number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Referees Id:
                <input
                  type="number"
                  name="referenceId"
                  value={formData.referenceId}
                  onChange={handleChange}
                  required
                />
              </label>
            </Flex>
            <Flex gap="large">
              <label>
                Monthly Income:
                <input
                  type="number"
                  name="monthlyIncome"
                  value={formData.monthlyIncome}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Loan Amount Requested:
                <input
                  type="number"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleChange}
                  required
                />
              </label>
            </Flex>
            <label>
              Loan Purpose:
              <input
                type="text"
                name="loanPurpose"
                value={formData.loanPurpose}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                required
              />
              I agree to the terms and conditions
            </label>

            <button type="submit" className="btn">
              Submit
            </button>
          </form>
        </Flex>
      )}
    </>
  );
};

export default LoansComponent;
