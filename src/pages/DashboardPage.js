import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "../styles/dashboardStyle.scss";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
export default function DashboardPage() {
  const navigate = useNavigate();

  const [todoTask, setTodoTask] = useState({});

  window.onload = async function fetchCountTask() {
    const fetchCountTaskHeader = new Headers();
    fetchCountTaskHeader.append(
      "Authorization",
      sessionStorage.getItem("sessionkey")
    );
    fetchCountTaskHeader.append("Content-Type", "application/json");

    const requestOptionsTask = {
      method: "GET",
      headers: fetchCountTaskHeader,
      redirect: "follow",
    };

    await fetch(
      "https://api-nodejs-todolist.herokuapp.com/task",
      requestOptionsTask
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setTodoTask(result);
      })
      .catch((error) => console.log("error", error));
  };

  async function handleLogout() {
    var userLogoutHeader = new Headers();
    userLogoutHeader.append(
      "Authorization",
      "Bearer " + sessionStorage.getItem("sessionkey")
    );

    var requestOptions = {
      method: "POST",
      headers: userLogoutHeader,
      redirect: "follow",
    };

    await fetch(
      "https://api-nodejs-todolist.herokuapp.com/user/logout",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        sessionStorage.removeItem("sessionkey");
        navigate(0);
        navigate("/LogIn");
      })
      .catch((error) => console.log("error", error));
  }
  return (
    <div className="dashBoard__Container">
      <button
        className="regContainer__form__submitButton dashBoard_logout_button"
        onClick={handleLogout}
      >
        <span className="regContainer__form__submitButton__text">Log Out</span>
      </button>
      <h3 className="dashBoard__Container__Header">Welcome to the DashBoard</h3>
      {todoTask.length ? (
        <Card className="mt-5" style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Tasks At Hand</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Number of Tasks : {todoTask.count ? todoTask.count : 0}
            </Card.Subtitle>
            <Card.Text></Card.Text>
            <Button variant="primary">+ Add Tasks</Button>
            <Button
              className="m-2"
              disabled={!todoTask.count}
              variant="primary"
            >
              View Tasks
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
              <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
              <Placeholder xs={8} />
            </Placeholder>
            <Placeholder.Button variant="primary" xs={6} />
          </Card.Body>
        </Card>
      )}
    </div>
  );
}
