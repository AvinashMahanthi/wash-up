import { React, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
// import AdminNavbar from "../components/AdminNavbar/Navbar";

import {
  Container,
  FormWrap,
  FormContent,
  FormController,
  FormH1,
  FormLabel,
} from "./SigninElements";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminSignIn = () => {
  const history = useHistory();
  // const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    //Email check
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      toast.error("Please Enter the Valid Email!");
      return;
    }
    fetch("http://localhost:8080/admin/auth/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          toast.error(data.error);
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("admin", JSON.stringify(data.user));
          toast.success("Loged inn sucessfully 😋");
          history.push("/");
          // navigate("/");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      {/* <AdminNavbar /> */}
      <Container>
        <FormWrap>
          <FormContent>
            <FormController action="#">
              <div className="container">
                <FormH1>
                  <h2 style={{ fontWeight: "bold" }}>Admin Login</h2>
                </FormH1>
                <Form onSubmit={handleOnSubmit}>
                  <Form.Group className="mb-3">
                    <FormLabel>
                      <Form.Label style={{ fontWeight: "bold" }}>
                        Email
                      </Form.Label>
                    </FormLabel>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {/* <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text> */}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <FormLabel>
                      <Form.Label style={{ fontWeight: "bold" }}>
                        Password
                      </Form.Label>
                    </FormLabel>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
                <ToastContainer
                  autoClose={5000}
                  position="top-center"
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
              </div>
            </FormController>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default AdminSignIn;
