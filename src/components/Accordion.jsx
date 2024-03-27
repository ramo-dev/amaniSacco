import React, { Component } from "react";
import "./accordion.css";
import { Flex } from "antd";

class Accordion extends Component {
  render() {
    return (
      <div id="accordion">
        <Header />
        <AccordionApp />
      </div>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <div className="accordionHeader">
        <Flex vertical>
          <h1>Have any Queries?</h1>
          <p>Check out some of the answered Faqs</p>
        </Flex>
      </div>
    );
  }
}

class AccordionApp extends Component {
  state = {
    hiddenTexts: [
      {
        label: "What is a SACCO?",
        value:
          "A SACCO, or Savings and Credit Cooperative Organization, is a financial institution that promotes savings among its members and provides them with affordable credit facilities.",
      },
      {
        label: "How do I become a member of the SACCO?",
        value:
          "To become a member of the SACCO, you typically need to meet certain eligibility criteria set by the organization. This often includes being within a specific community or profession. You'll need to fill out a membership application form and may be required to make an initial deposit.",
      },
      {
        label: "What are the benefits of joining a SACCO?",
        value:
          "Access to affordable credit facilities for various needs such as education, housing, or business.\nOpportunity to earn competitive interest rates on savings.\nParticipation in decision-making processes through voting rights.",
      },
      {
        label: "How do I save with the SACCO?",
        value:
          "Saving with the SACCO is simple. You can deposit money into your savings account either through cash deposits at the SACCO office or through electronic transfers. Regular saving helps you build your savings balance and may also make you eligible for loans.",
      },
      {
        label: "Is my money safe with the SACCO?",
        value:
          "SACCOs are regulated and supervised by relevant government authorities to ensure the safety of members' funds. Additionally, SACCOs may have insurance coverage or other risk management mechanisms in place to protect members' savings. However, it's essential to inquire about the regulatory status and risk management practices of your specific SACCO.",
      },
    ],
  };

  render() {
    return (
      <div className="accordion">
        {this.state.hiddenTexts.map((hiddenText, index) => (
          <AccordionItem key={index} hiddenText={hiddenText} />
        ))}
      </div>
    );
  }
}

class AccordionItem extends Component {
  state = {
    visibility: false,
  };

  handleToggleVisibility = () => {
    this.setState((prevState) => ({
      visibility: !prevState.visibility,
    }));
  };

  render() {
    const { label, value } = this.props.hiddenText;
    const activeStatus = this.state.visibility ? "active" : "";

    return (
      <div>
        <button
          className="accordion__button"
          onClick={this.handleToggleVisibility}
        >
          {label}
          <span
            className={this.state.visibility ? "fa fa-minus" : "fa fa-plus"}
          ></span>
        </button>
        <p className={`accordion__content ${activeStatus}`}>{value}</p>
      </div>
    );
  }
}

export default Accordion;
