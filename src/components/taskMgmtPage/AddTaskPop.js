import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddTaskPop = ({ showAddTaskPop, setShowAddTaskPop }) => {
  const dayToday = new Date();
  const [addTaskVals, setaddTaskVals] = useState({
    taskName: "",
    taskDetails: "",
    priority: "",
    taskStage: "",
    deadline: dayToday,
  });

  const [isLoadingAdd, setisLoadingAdd] = useState(false);
  const handleClosePop = () => {
    setShowAddTaskPop(false);
  };

  const handleAddTaskApi = async (event) => {
    event.preventDefault();
    setisLoadingAdd(true);
    let addTaskHeader = new Headers();
    addTaskHeader.append(
      "Authorization",
      "Bearer " + sessionStorage.getItem("sessionkey")
    );
    addTaskHeader.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      description: JSON.stringify({ addTaskVals }),
    });

    const requestOptions = {
      method: "POST",
      headers: addTaskHeader,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      "https://api-nodejs-todolist.herokuapp.com/task",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          alert("Task is Added Successfully");
        }
      })
      .catch((error) => console.log("error", error));

    handleClosePop();
  };

  return (
    <>
      <Modal show={showAddTaskPop} onHide={handleClosePop}>
        <Modal.Header>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddTaskApi}>
            <Form.Group className="mb-3">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="name"
                required
                placeholder="Title"
                autoFocus
                value={addTaskVals.taskName}
                onChange={(e) =>
                  setaddTaskVals({ ...addTaskVals, taskName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Task Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                required
                minLength="10"
                value={addTaskVals.taskDetails}
                onChange={(e) =>
                  setaddTaskVals({
                    ...addTaskVals,
                    taskDetails: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Select
              className="mb-5"
              aria-label="Default select example"
              value={addTaskVals.priority}
              required
              onChange={(e) =>
                setaddTaskVals({ ...addTaskVals, priority: e.target.value })
              }
            >
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </Form.Select>

            <Form.Select
              className="mb-5"
              aria-label="Default select example"
              value={addTaskVals.taskStage}
              required
              onChange={(e) =>
                setaddTaskVals({ ...addTaskVals, taskStage: e.target.value })
              }
            >
              <option value="">Select Stage of Task</option>
              <option value="0">Backlog</option>
              <option value="1">ToDo</option>
              <option value="2">OnGoing</option>
              <option value="3">Completed</option>
            </Form.Select>
            <Form.Group className="mb-3 d-flex flex-row">
              <Form.Label>Deadline:</Form.Label>
              <DatePicker
                className="ms-3"
                selected={addTaskVals.deadline}
                value={addTaskVals.deadline}
                onChange={(date) =>
                  setaddTaskVals({ ...addTaskVals, deadline: date })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3 d-flex flex-row justify-content-end">
              <Button variant="secondary" onClick={handleClosePop}>
                Close
              </Button>
              <Button className="mx-3" type="submit" disabled={isLoadingAdd}>
                {isLoadingAdd ? "Adding...." : "Save Changes"}
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddTaskPop;
