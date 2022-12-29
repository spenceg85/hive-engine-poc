import { Navbar, Dropdown, Avatar, Text, Button } from '@nextui-org/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { AcmeLogo } from "./AcmeLogo.js";
import { Layout } from "./Layout.js";
import Map from "./Map.jsx";
import { icons } from "./Icons.js";
import React from 'react';
import dynamic from 'next/dynamic';
import {Login} from './Login.js';


export default function Home() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  const MapWithNoSSR = dynamic(() => import("./Map.jsx"), {
    ssr: false
  });

  const loginHandler = () => {
    setLoggedIn(true);
  }

  const collapseItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <>
  
    {loggedIn ? (
    <Layout>
    <Navbar isBordered variant="sticky">
      <Navbar.Toggle showIn="xs" />
      <Navbar.Brand
        css={{
          "@xs": {
            w: "12%",
          },
        }}
      >
        {/* <AcmeLogo /> */}
        <Image src="/img/hiveLogo.png" width={100} height={60} style={{borderRadius: "5%", marginRight: "12px"}} alt="hive logo"/>
        {/* <Text b color="inherit" hideIn="xs"> */}
        <Image src="/img/hiveLogo3.png" width={170} height={40} alt="hive logo words"/>
        {/* </Text> */}
      </Navbar.Brand>
      <Navbar.Content
        enableCursorHighlight
        activeColor="primary"
        hideIn="xs"
        variant="highlight-rounded"
      >
        <Navbar.Link isActive href="#">Home</Navbar.Link>
        <Navbar.Link href="#">
          Customers
        </Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">About Hive Engine</Navbar.Link>
        <Navbar.Link href="#">The Buzz</Navbar.Link>
      </Navbar.Content>
      <Navbar.Content
        css={{
          "@xs": {
            w: "12%",
            jc: "flex-end",
          },
        }}
      >
        <Dropdown placement="bottom-right">
          <Navbar.Item>
            <Dropdown.Trigger>
              <Avatar
                bordered
                as="button"
                color="primary"
                size="md"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </Dropdown.Trigger>
          </Navbar.Item>
          <Dropdown.Menu
            aria-label="User menu actions"
            color="primary"
            onAction={(actionKey) => console.log({ actionKey })}
          >
            <Dropdown.Item key="profile" css={{ height: "$18" }}>
              <Text b color="inherit" css={{ d: "flex" }}>
                Signed in as
              </Text>
              <Text b color="inherit" css={{ d: "flex" }}>
                zoey@example.com
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key="settings" withDivider>
              My Settings
            </Dropdown.Item>
            <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
            <Dropdown.Item key="analytics" withDivider>
              Analytics
            </Dropdown.Item>
            <Dropdown.Item key="system">System</Dropdown.Item>
            <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
            <Dropdown.Item key="help_and_feedback" withDivider>
              Help & Feedback
            </Dropdown.Item>
            <Dropdown.Item key="logout" withDivider color="error">
              Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Content>
      <Navbar.Collapse>
        {collapseItems.map((item, index) => (
          <Navbar.CollapseItem
            key={item}
            activeColor="secondary"
            css={{
              color: index === collapseItems.length - 1 ? "$error" : "",
            }}
            isActive={index === 2}
          >
            <Link
              color="inherit"
              // css={{
              //   minWidth: "100%",
              // }}
              href="#"
            >
              {item}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar> 
    <main>
      <div id="map" style={{height: "92vh", width: "100vw"}}>
        <MapWithNoSSR />
      </div>
    </main>
  </Layout>) : ( <Login submit={() => loginHandler()}></Login>)}
  </>
  )
}
