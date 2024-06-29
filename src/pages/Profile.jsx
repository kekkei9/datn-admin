import { useContext } from "react";

import { Avatar, Button, Card, Col, Descriptions, Radio, Row } from "antd";

import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

import BgProfile from "../assets/images/bg-profile.jpg";
import profilavatar from "../assets/images/face-1.jpg";
import { AuthContext } from "../contexts/AuthContext";

function Profile() {
  const { userInfo } = useContext(AuthContext);

  const pencil = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
        className="fill-gray-7"
      ></path>
      <path
        d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
        className="fill-gray-7"
      ></path>
    </svg>,
  ];

  return (
    <>
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      ></div>

      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar size={74} shape="square" src={profilavatar} />

                <div className="avatar-info">
                  <h4 className="font-semibold m-0">
                    {userInfo?.firstName} {userInfo?.lastName}
                  </h4>
                  <p>CEO / Co-Founder</p>
                </div>
              </Avatar.Group>
            </Col>
            <Col
              span={24}
              md={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Radio.Group defaultValue="a">
                <Radio.Button value="a">OVERVIEW</Radio.Button>
                <Radio.Button value="b">TEAMS</Radio.Button>
                <Radio.Button value="c">PROJECTS</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
        }
      ></Card>

      <Row gutter={[24, 0]}>
        <Card
          bordered={false}
          title={<h6 className="font-semibold m-0">Profile Information</h6>}
          className="header-solid h-full card-profile-information"
          extra={<Button type="link">{pencil}</Button>}
          bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
        >
          <p className="text-dark">
            {" "}
            Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is
            no. If two equally difficult paths, choose the one more painful in
            the short term (pain avoidance is creating an illusion of equality).{" "}
          </p>
          <hr className="my-25" />
          <Descriptions title="Oliver Liam">
            <Descriptions.Item label="Full Name" span={3}>
              Sarah Emily Jacob
            </Descriptions.Item>
            <Descriptions.Item label="Mobile" span={3}>
              (44) 123 1234 123
            </Descriptions.Item>
            <Descriptions.Item label="Email" span={3}>
              sarahjacob@mail.com
            </Descriptions.Item>
            <Descriptions.Item label="Location" span={3}>
              USA
            </Descriptions.Item>
            <Descriptions.Item label="Social" span={3}>
              <a href="#pablo" className="mx-5 px-5">
                {<TwitterOutlined />}
              </a>
              <a href="#pablo" className="mx-5 px-5">
                {<FacebookOutlined style={{ color: "#344e86" }} />}
              </a>
              <a href="#pablo" className="mx-5 px-5">
                {<InstagramOutlined style={{ color: "#e1306c" }} />}
              </a>
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Row>
    </>
  );
}

export default Profile;
