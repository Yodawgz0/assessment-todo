import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "../styles/taskPageStyle.scss";
import DraggableFeatures from "../components/taskMgmtPage/DraggableFeatures";
import { Link } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import {
  changeStageTask,
  changeTaskName,
  delTask,
} from "../reducers/todoTasksSlice";

export default function TaskMainPage() {
  const columnsSet = useSelector((state) => state.todoStageConst.value);
  const todoTaskList = useSelector((state) => state.todotaskHandler.value);
  const [showAddTaskPop, setShowAddTaskPop] = useState("");
  const [editTaskVals, setEditTaskVals] = useState("");

  const handleAddTaskPop = (taskIDval) => {
    setEditTaskVals("");
    setShowAddTaskPop(taskIDval);
  };
  const dispatchtaskMainPage = useDispatch();
  const handleDeleteTask = (itemDetails) => {
    dispatchtaskMainPage(delTask(itemDetails));
  };
  const handleEditForm = (oldTaskName, newTaskName) => {
    dispatchtaskMainPage(
      changeTaskName({
        taskName: oldTaskName,
        newtaskName: newTaskName,
      })
    );
    console.log(todoTaskList);
  };
  useEffect(() => {}, [todoTaskList, showAddTaskPop]);
  const onArrowSelect = (arrowType, itemID) => {
    todoTaskList.forEach((element) => {
      if (element.taskName === itemID) {
        dispatchtaskMainPage(
          changeStageTask({
            taskName: element.taskName,
            newStage:
              arrowType === "next"
                ? `${parseInt(element.taskStage) + 1}`
                : `${parseInt(element.taskStage) - 1}`,
          })
        );
      }
    });
  };
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;

    if (source.droppableId !== destination.droppableId) {
      todoTaskList.forEach((element) => {
        if (element.taskName === draggableId) {
          if (destination.droppableId === "9") {
            handleDeleteTask(element.taskName);
            return;
          }
          dispatchtaskMainPage(
            changeStageTask({
              taskName: element.taskName,
              newStage: destination.droppableId,
            })
          );
        }
      });
    }
  };

  return (
    <>
      <div className="todoMgmt_Container">
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          {columnsSet.map((column, indexColumn) => {
            return (
              <div
                className="todoMgmt_Container__columnsContainer"
                key={indexColumn}
              >
                <h2>{column}</h2>
                <div
                  key={indexColumn}
                  className="todoMgmt_Container__columnsContainer__column"
                >
                  <Droppable droppableId={"" + indexColumn} key={indexColumn}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          key={indexColumn}
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="todoMgmt_Container__columnsContainer__column"
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightblue"
                              : "lightgrey",
                            padding: 4,
                            width: 250,
                            minHeight: 130,
                            borderRadius: 10,
                          }}
                        >
                          {todoTaskList.map((item, indexTask) => {
                            return item.taskStage === `${indexColumn}` ? (
                              <div className="todoMgmt_Container__columnsContainer__column__dragElement">
                                <Draggable
                                  key={indexTask}
                                  draggableId={item.taskName}
                                  index={indexTask}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          borderRadius: 15,
                                          userSelect: "none",
                                          padding: 16,
                                          margin: "0 0 8px 0",
                                          minHeight: "70px",
                                          backgroundColor: snapshot.isDragging
                                            ? "#263B4A"
                                            : "#1DA1F2",
                                          color: "white",
                                          ...provided.draggableProps.style,
                                        }}
                                      >
                                        {item.taskName}

                                        <DraggableFeatures
                                          itemDetails={item}
                                          onArrowSelect={onArrowSelect}
                                          handleDeleteTask={handleDeleteTask}
                                          handleAddTaskPop={handleAddTaskPop}
                                        />
                                        {showAddTaskPop === item.taskName ? (
                                          <div>
                                            <label className="mt-3">
                                              Enter task Name
                                            </label>
                                            <input
                                              value={editTaskVals}
                                              onChange={(e) =>
                                                setEditTaskVals(e.target.value)
                                              }
                                            ></input>
                                            <button
                                              disabled={!editTaskVals.length}
                                              onClick={() =>
                                                handleEditForm(
                                                  item.taskName,
                                                  editTaskVals
                                                )
                                              }
                                              className="mt-1"
                                            >
                                              submit
                                            </button>
                                          </div>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              </div>
                            ) : (
                              <></>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
          <div>
            {" "}
            <Link to="/Dashboard">
              <button className=" mt-2 me-3 regContainer__form__submitButton ">
                <span className="regContainer__form__submitButton__text">
                  Back
                </span>
              </button>
            </Link>
            <div style={{ marginTop: "400%" }}>
              <Droppable droppableId={`${9}`} key={9}>
                {(provided, snapshot) => {
                  return (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      <BsFillTrashFill
                        style={{
                          color: snapshot.isDraggingOver ? "red" : "white",
                          height: 30,
                          width: 30,
                        }}
                      />
                    </div>
                  );
                }}
              </Droppable>
            </div>
          </div>
        </DragDropContext>
      </div>
    </>
  );
}
