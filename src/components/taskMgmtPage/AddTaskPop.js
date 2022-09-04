import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useSelector, useDispatch } from "react-redux";
import { addTask } from "../../reducers/todoTasksSlice";

const AddTaskPop = ({ showAddTaskPop, setShowAddTaskPop }) => {
  const dispatchAddTask = useDispatch();
  const todoStageValues = useSelector((state) => state.todoStageConst.value);
  const dayToday = new Date();
  const [addTaskVals, setaddTaskVals] = useState({
    taskName: "",
    taskDetails: "",
    priority: "",
    taskStage: "",
    deadline: [dayToday],
  });

  const [isLoadingAdd, setisLoadingAdd] = useState(false);
  const handleClosePop = () => {
    setShowAddTaskPop(false);
  };

  const handleAddTaskApi = (event) => {
    event.preventDefault();
    setisLoadingAdd(true);
    dispatchAddTask(addTask(addTaskVals));
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
              aria-label="priority-task"
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
              aria-label="taskStage-task"
              value={addTaskVals.taskStage}
              required
              onChange={(e) =>
                setaddTaskVals({ ...addTaskVals, taskStage: e.target.value })
              }
            >
              <option value="">Select Stage of Task</option>
              {todoStageValues.map((element, index) => {
                return (
                  <option key={index} value={index}>
                    {element}
                  </option>
                );
              })}
            </Form.Select>
            <Form.Group className="mb-3 d-flex flex-row">
              <Form.Label>Deadline:</Form.Label>
              <DatePicker
                className="ms-3"
                selected={addTaskVals.deadline[0]}
                value={addTaskVals.deadline[0]}
                onChange={(date) =>
                  setaddTaskVals({
                    ...addTaskVals,
                    deadline: [date + ""],
                  })
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
