import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Info from "../components/Info";

import { homeObjOne, homeObjTwo, homeObjThree } from "../components/Info/Data";
import AdminNavbar from "../components/AdminNavbar/Navbar";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  var key = localStorage.key(0);

  useEffect(() => {
    // const user = JSON.parse(localStorage.getItem("user"));
    // const Admin = JSON.parse(localStorage.getItem("admin"));
    if (key == "admin") {
      setIsAdmin(true);
    }
    // const items = { ...localStorage };
    console.log(key);
  }, [key]);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* <Sidebar isOpen={isOpen} toggle={toggle} /> */}

      {/* {isAdmin ? <AdminNavbar /> : <Navbar />}
       */}
      <Navbar />

      <Hero />

      <Info {...homeObjOne} />
      <Info {...homeObjTwo} />
      {/* <Services /> */}

      <Info {...homeObjThree} />
      <Footer />
    </>
  );
};

export default Home;
