import { useEffect, useState } from "react";
import { TiTickOutline } from "react-icons/ti";
import { MdOutlineGppGood } from "react-icons/md";
import doc from "../images/High_five.jpg";

import { useLocation } from "react-router-dom";
import NavBar from "../components/Navbar";
import {
  SearchP,
  SearchT,
  SearchH1,
  SearchIcon,
  SearchCard,
  SearchContainer,
  SearchWrapper,
  MainContainer,
} from "./SlotBookingElements";

const SlotBooking = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("slotId");
  console.log(id);

  useEffect(() => {
    fetch(`http://localhost:8080/confirm_Booking/${id}`, {
      method: "get",
      headers: {
        // "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result["slot"][0]);
        console.log(result["slot"][0]);
      });
  }, []);

  return (
    <>
      <NavBar />
      <MainContainer>
        <SearchContainer>
          <h2 className="p-3">Booked Slot Details</h2>
          <SearchWrapper>
            <SearchCard>
              <div className="Container">
                <div className="row">
                  <div className="col-md-4">
                    <SearchIcon src={doc} />
                    <SearchH1>
                      <br />
                      Booking Conformed
                      <TiTickOutline size={25} />
                    </SearchH1>
                  </div>
                  <div className="col-md-6">
                    <SearchP>
                      <strong>
                        Name: <h5>{data.ShopName}</h5>
                      </strong>
                    </SearchP>
                    <strong>Address: </strong>
                    <h5>{data.location}</h5>
                    <SearchP>
                      <strong>₹ {data.cost}/- only</strong>
                      <br />
                      <p>Additional charges may be applicable</p>
                    </SearchP>
                    <SearchT>Thankyou for Choosing WashUp.</SearchT>
                  </div>
                </div>
              </div>
            </SearchCard>
          </SearchWrapper>
        </SearchContainer>
      </MainContainer>
    </>
  );
};

export default SlotBooking;
