import { React, useState, useEffect } from "react";
import Data from "./TableInf0";
import AdminNavbar from "./AdminNavbar";

class DisplayTable extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     list: [],
  //   };
  //   this.callAPI = this.callAPI.bind(this);
  //   this.callAPI();
  // }

  // callAPI() {
  //   fetch("http://localhost:8080/GetServices")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       this.setState({
  //         list: data.data,
  //       });
  //     });
  // }

  // useEffect(() => {
  //   fetch("http://localhost:8080/GetServices/", {
  //     method: "get",
  //     headers: {
  //       // "Content-Type": "application/json",
  //       Authorization: "Bearer " + localStorage.getItem("jwt"),
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       setServiceData(result.centres);
  //     });
  // });

  render() {
    let tb_data = Data.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.type}</td>
          <td>{item.cost}</td>
          <td>
            <button className="btn btn-primary">Complete</button>
          </td>
        </tr>
      );
    });
    return (
      <>
        <AdminNavbar />
        <div className="container pt-4">
          <h1>Todays Services</h1>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Cost</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>{tb_data}</tbody>
          </table>
        </div>
      </>
    );
  }
}

export default DisplayTable;
