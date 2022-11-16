import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {
  SearchP,
  SearchH2,
  SearchIcon,
  SearchCard,
  SearchContainer,
  SearchWrapper,
  MainContainer,
  ImgContainer,
} from "./SearchServicesElements";
import { Container, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";

// import { Data } from "./Data";
import doc from "../../images/carwash.jpg";
import header_img from "../../images/carwash.jpg";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { RiCustomerServiceFill } from "react-icons/ri";

import SlotBooking from "../../SlotBooking";
import NavBar from "../Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SearchServices = () => {
  const history = useHistory();
  const [serviceData, setServiceData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  // const [query, setQuery] = useState([]);
  // const centres = [
  //   {
  //     _id: "62c61b7dd4119c67c199e434",
  //     name: "We Care Car Wash",
  //     email: "WeCareCarWash@gmail.com",
  //     phone: 4584884865,
  //     location: "chennai",
  //     costPerCar: 499,
  //     __v: 0,
  //   },
  //   {
  //     _id: "62c61bbdd4119c67c199e436",
  //     name: "Venky Car Wash",
  //     email: "VenkyCarWash@gmail.com",
  //     phone: 4584884865,
  //     location: "Banglore",
  //     costPerCar: 599,
  //     __v: 0,
  //   },
  //   {
  //     _id: "62c61bd2d4119c67c199e438",
  //     name: "Meera Car Wash",
  //     email: "Meera CarWash@gmail.com",
  //     phone: 4584884865,
  //     location: "Banglore",
  //     costPerCar: 799,
  //     __v: 0,
  //   },
  //   {
  //     _id: "62c61be8d4119c67c199e43a",
  //     name: "Chandana Car Wash",
  //     email: "ChandanaCarWash@gmail.com",
  //     phone: 4584884865,
  //     location: "Banglore",
  //     costPerCar: 799,
  //     __v: 0,
  //   },
  //   {
  //     _id: "62c61c28d4119c67c199e43c",
  //     name: "Raghava Car Wash",
  //     email: "RaghavaCarWash@gmail.com",
  //     phone: 4584884865,
  //     location: "Hyderabad",
  //     costPerCar: 799,
  //     __v: 0,
  //   },
  //   {
  //     _id: "62c61c40d4119c67c199e43e",
  //     name: "Sindhu Car Wash",
  //     email: "SindhuCarWash@gmail.com",
  //     phone: 4584884865,
  //     location: "Hyderabad",
  //     costPerCar: 1299,
  //     __v: 0,
  //   },
  //   {
  //     _id: "62c6707a030e131aa956074f",
  //     name: "Sindhu Car Wash",
  //     email: "Sindhu_CarWash@gmail.com",
  //     phone: 4584884865,
  //     location: "Orissa",
  //     costPerCar: 1299,
  //     __v: 0,
  //   },
  //   {
  //     _id: "62c67139030e131aa9560752",
  //     name: "Sindhu Car Wash",
  //     email: "srilankaCarWash@gmail.com",
  //     phone: 4584884865,
  //     location: "srilanka",
  //     costPerCar: 1299,
  //     __v: 0,
  //   },
  //   {
  //     _id: "62c6dc74c9771cc604e11cfc",
  //     name: "abc Car Wash",
  //     email: "ABCCarWash@gmail.com",
  //     phone: 4584884865,
  //     location: "Vizag",
  //     costPerCar: 1299,
  //     __v: 0,
  //   },
  //   {
  //     _id: "62c6de8150234070a5abfb35",
  //     name: "abc Car Wash",
  //     email: "ABCD@gmail.com",
  //     phone: 4584884865,
  //     location: "Vizag",
  //     costPerCar: 1299,
  //     __v: 0,
  //   },
  // ];

  useEffect(() => {
    fetch("http://localhost:8080/GetServices/", {
      method: "get",
      headers: {
        // "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setServiceData(result.centres);
        setFilterData(result.centres);
      });
  }, []);

  const searchSecificService = (searchFilter) => {
    // setQuery(searchFilter);
    if (searchFilter !== " ") {
      const newServiceList = serviceData.filter((services) => {
        // console.log(services.location.toLowerCase());
        return services.location
          .toLowerCase()
          .includes(searchFilter.toLowerCase());
      });
      setServiceData(newServiceList);
      // console.log(serviceData);
    } else {
      setServiceData(filterData);
    }
  };

  // const sendAsProp = () => {
  //   fetch("")
  // }

  const bookSlot = (item) => {
    // console.log(item);
    fetch("http://localhost:8080/bookSlot", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        ShopName: item.name,
        timeTaken: 2,
        location: item.location,
        NamePlate: "TN 15 zs 6767",
        cost: item.costPerCar,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data._id);
        toast.success("Booking sucessfull 😋");
        history.push(`/confirm_Booking?slotId=${data.data._id}`);
      });
  };

  return (
    <>
      <NavBar />
      <MainContainer>
        <SearchContainer>
          <h2 className="p-3">Car Cares Near You</h2>
          <Form className="d-flex mx-4 mb-4">
            <Form.Control
              type="search"
              placeholder="Search places"
              className="me-2"
              aria-label="Search"
              onInput={(e) => {
                searchSecificService(e.target.value);
              }}
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <SearchWrapper>
            {serviceData.map((item) => {
              // console.log(item)
              return (
                <SearchCard key={item._id}>
                  <div className="Container">
                    <div className="row">
                      <div className="col-md-4">
                        <SearchIcon src={doc} />
                        <SearchH2>
                          <br />
                          <RiCustomerServiceFill size={25} />
                          Telugu, Hindhi and English
                        </SearchH2>
                      </div>
                      <div className="col-md-6">
                        <SearchP>
                          <h3>{item.name}</h3>
                        </SearchP>
                        <strong>Includes: </strong>
                        <br />
                        <br />

                        <Container className="fluid">
                          <Row>
                            <Col sm={6}>
                              <h6 className="pr-3">
                                <BsFillCheckCircleFill
                                  style={{ color: "green" }}
                                />
                                Car wash
                              </h6>
                            </Col>
                            <Col sm={6}>
                              <h6>
                                <BsFillCheckCircleFill
                                  style={{ color: "green" }}
                                />
                                Wiper fluid Replacement
                              </h6>
                            </Col>
                          </Row>
                          <Row>
                            <Col sm={6}>
                              <h6>
                                <BsFillCheckCircleFill
                                  style={{ color: "green" }}
                                />
                                Free pickup & Drop
                              </h6>
                            </Col>
                            <Col sm={6}>
                              <h6>
                                <BsFillCheckCircleFill
                                  style={{ color: "green" }}
                                />
                                Car wash
                              </h6>
                            </Col>
                          </Row>
                        </Container>
                        <br />
                        <SearchP>
                          <strong>Location: </strong>
                          {item.location}
                        </SearchP>
                        <SearchP>
                          <strong>₹{item.costPerCar}</strong> Additional charges
                          may be applicable
                        </SearchP>
                        <Button
                          onClick={() => {
                            <SlotBooking />;
                            bookSlot(item);
                            // history.push("/confirm_Booking/");
                          }}
                        >
                          Book Slot
                        </Button>
                      </div>
                    </div>
                  </div>
                </SearchCard>
              );
            })}
          </SearchWrapper>
        </SearchContainer>
      </MainContainer>
    </>
  );
};

export default SearchServices;
