import React, { useState } from "react";
import {
  MailOutlined,
  MoneyCollectOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import "../App.css";

const items = [
  {
    label: "Google Maps",
    key: "SubMenu",
    icon: <SettingOutlined />,
    children: [
      {
        type: "group",
        label: "",
        children: [
          { label: <Link to="/">Google Maps</Link>, key: "setting:1" },
          {
            label: <Link to="/customization">Customization</Link>,
            key: "setting:1",
          },
          {
            label: <Link to="/event-locator">Event Locator</Link>,
            key: "setting:1",
          },
          {
            label: <Link to="/field-services">Field Services</Link>,
            key: "setting:1",
          },
          {
            label: <Link to="/real-estate">Real Estate</Link>,
            key: "setting:1",
          },
          {
            label: (
              <Link to="/real-time-position">Real Time Position Tracking</Link>
            ),
            key: "setting:1",
          },
          {
            label: <Link to="/reverse-geocode">Reverse Geocode</Link>,
            key: "setting:1",
          },
        ],
      },
    ],
  },
  {
    label: "Payments",
    key: "SubMenu2",
    icon: <MoneyCollectOutlined />,
    children: [
      {
        type: "group",
        label: "",
        children: [
          {
            label: <Link to="/mpesa">Mpesa</Link>,
            key: "mail",
            icon: <MailOutlined />,
          },
          {
            label: <Link to="/stripe">Stripe</Link>,
            key: "mail",
            icon: <MailOutlined />,
          },
          {
            label: <Link to="/paystack">PayStack</Link>,
            key: "mail",
            icon: <MailOutlined />,
          },
          {
            label: <Link to="/pesapal">PesaPal</Link>,
            key: "mail",
            icon: <MailOutlined />,
          },
          {
            label: <Link to="/currency">Currency</Link>,
            key: "mail",
            icon: <MailOutlined />,
          },
          {
            label: <Link to="/intasend">Intasend</Link>,
            key: "mail",
            icon: <MailOutlined />,
          },
          {
            label: <Link to="/binance">Binance</Link>,
            key: "mail",
            icon: <MailOutlined />,
          },
          {
            label: <Link to="/buni">Buni</Link>,
            key: "mail",
            icon: <MailOutlined />,
          },
        ],
      },
    ],
  },

  {
    label: <Link to="/cloudinary">Cloudinary</Link>,
    key: "mail",
    icon: <MailOutlined />,
  },
  {
    label: <Link to="/pdfreader">PDFReader</Link>,
    key: "mail",
    icon: <MailOutlined />,
  },
  {
    label: <Link to="/email">Email</Link>,
    key: "mail",
    icon: <MailOutlined />,
  },

  {
    label: <Link to="/chats">Chats</Link>,
    key: "mail",
    icon: <MailOutlined />,
  },
  {
    label: <Link to="/table">Table</Link>,
    key: "mail",
    icon: <MailOutlined />,
  },
  {
    label: <Link to="/upload">Upload PDF</Link>,
    key: "mail",
    icon: <MailOutlined />,
  },

  {
    label: <Link to="/chat">Socket Chat</Link>,
    key: "mail",
    icon: <MailOutlined />,
  },
];

function MenuList() {
  const [current, setCurrent] = useState("mail");

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </>
  );
}

export default MenuList;
