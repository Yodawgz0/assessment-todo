import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "../styles/dashboardStyle.scss";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import AddTaskPop from "../components/taskMgmtPage/AddTaskPop";

export default function DashboardPage() {
  const navigate = useNavigate();

  const [todoTask, setTodoTask] = useState(0);
  const [showAddTaskPop, setShowAddTaskPop] = useState(false);

  const handleAddTaskPop = () => setShowAddTaskPop(!showAddTaskPop);

  async function fetchCountTask() {
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
    let combinedTaskData = [];
    await fetch(
      "https://api-nodejs-todolist.herokuapp.com/task",
      requestOptionsTask
    )
      .then((response) => response.json())
      .then((result) => {
        result.data.forEach((element) => {
          const parsedData = JSON.parse(element.description);
          combinedTaskData.push(parsedData.addTaskVals);
        });
        setTodoTask(combinedTaskData);
      })
      .catch((error) => console.log("error", error));
  }

  async function handleLogout() {
    let userLogoutHeader = new Headers();
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
  useEffect(() => {
    fetchCountTask();
  }, [showAddTaskPop]);

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
