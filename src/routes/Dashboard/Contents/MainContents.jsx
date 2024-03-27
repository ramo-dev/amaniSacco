import {  Card, Divider, Flex, Typography } from "antd";
import { MainContentsData } from "./MainContentsDash/MainContentsData";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



const MainContents = () => {
  const nav = useNavigate()
  function handleClick(path){
    nav(path);
    console.log(path)
    // alert(path)
  }

  return (
    <>
      <Flex gap="1rem" style={{ padding: "1rem" }} wrap="wrap">
        {MainContentsData.map((data, index) => (
          <Card
            style={{
              background: data.bg,
              width: "300px",
              height: "200px",
              color: "white",
              borderRadius: "20px",
            }}
            key={index}
            hoverable
            onClick={()=>handleClick(data.Path)}
          >
            <Typography.Text
              style={{ color: "white", fontSize: "1.4rem", fontWeight: "200" }}
              className="dashBoard-card"
            >
              {data.title}
            </Typography.Text>
            <Typography.Title
              style={{ color: "white", fontSize: "1.5rem", fontWeight: "600" }}
              className="dashBoard-card"
            >
              {data.cost}
            </Typography.Title>
            <Divider
              style={{ background: "grey", width: "100%", marginTop: "20px" }}
            />
            <Flex
              align="center"
              justify="center"
       
            >
              <Typography.Text
                style={{ border: "none", background: "none", color: "white" , fontSize: "0.96rem"}}
              >
                view {data.title}
              </Typography.Text>
            </Flex>
          </Card>
        ))}
      </Flex>
    </>
  );
};

export default MainContents;
