import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "../styles/dashboardStyle.scss";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import AddTaskPop from "../components/taskMgmtPage/AddTaskPop";
import { useSelector } from "react-redux";
export default function DashboardPage() {
  const navigate = useNavigate();

  const [showAddTaskPop, setShowAddTaskPop] = useState(false);

  const handleAddTaskPop = () => setShowAddTaskPop(!showAddTaskPop);

  const todoTask = useSelector((state) => state.todotaskHandler.value);

  async function handleLogout() {
    let userLogoutHeader = new Headers();
    userLogoutHeader.append(
      "Authorization",
      "Bearer " + localStorage.getItem("sessionkey")
    );

    const requestOptions = {
      method: "POST",
      headers: userLogoutHeader,
      redirect: "follow",
    };

    await fetch(
      "https://api-nodejs-todolist.herokuapp.com/user/logout",
      requestOptions
    )
      .then((response) => response)
      .then((result) => {
        localStorage.removeItem("sessionkey");
        navigate(0);
        navigate("/LogIn");
      })
      .catch((error) => console.log("error", error));
  }
  useEffect(() => {}, [showAddTaskPop]);

  return (
    <div className="dashBoard__Container">
      <button
        className="regContainer__form__submitButton dashBoard_logout_button"
        onClick={handleLogout}
      >
        <span className="regContainer__form__submitButton__text">Log Out</span>
      </button>
      <h3 className="dashBoard__Container__Header">
        Welcome to your DashBoard
      </h3>
      {todoTask ? (
        <Card className="mt-5" style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Tasks At Hand</Card.Title>
            <Card.Subtitle className="mb-4 mt-3 text-muted">
              Number of created Tasks : {todoTask.length ? todoTask.length : 0}
            </Card.Subtitle>
            {todoTask.length ? (
              <>
                <Card.Text>
                  Number of Tasks done:{" "}
                  {todoTask.filter((obj) => obj.taskStage === "3").length}
                </Card.Text>
                <Card.Text>
                  Number of Pending Tasks:{" "}
                  {todoTask.filter((obj) => obj.taskStage !== "3").length}
                </Card.Text>
              </>
            ) : (
              <></>
            )}

            <Button variant="primary" onClick={handleAddTaskPop}>
              + Add Task
            </Button>
            {showAddTaskPop ? (
              <AddTaskPop
                showAddTaskPop={showAddTaskPop}
                setShowAddTaskPop={setShowAddTaskPop}
              />
            ) : (
              <></>
            )}
            <Button
              className="m-2"
              disabled={!todoTask.length}
              variant="primary"
              onClick={() => {
                navigate("/taskPage");
              }}
            >
              View Tasks
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Card className="mt-5" style={{ width: "18rem" }}>
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
            <Placeholder.Button variant="primary" xs={6} />
          </Card.Body>
        </Card>
      )}
    </div>
  );
}
