import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "../styles/taskPageStyle.scss";
import DraggableFeatures from "../components/taskMgmtPage/DraggableFeatures";

export default function TaskMainPage() {
  const [todoTaskList, setTodoTaskList] = useState([]);
  const [renderEditDelete, setRenderEditDelete] = useState("");
  const [columns, setColumns] = useState([]);
  const columnsSet = ["Backlog", "Todo", "Ongoing", "Completed"];

  async function fetchtodoList() {
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
          parsedData.addTaskVals["id"] = element._id;
          combinedTaskData.push(parsedData.addTaskVals);
        });
        setTodoTaskList(combinedTaskData);
      })
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    fetchtodoList();
  }, [renderEditDelete]);
  useEffect(() => {
    setColumns(todoTaskList);
  }, [todoTaskList]);
  useEffect(() => {}, [columns]);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;

    if (source.droppableId !== destination.droppableId) {
      columns.forEach((element) => {
        if (element.taskName === draggableId) {
          element.taskStage = destination.droppableId;
        }
      });
      setColumns(columns);
    } else {
      columns.forEach((element) => {
        if (element.taskName === draggableId) {
          element.taskStage = destination.droppableId;
        }
      });
      setColumns(columns);
    }
  };

  const onArrowSelect = (arrowType, itemID) => {
    if (arrowType === "next") {
      columns.forEach((element) => {
        if (element.id === itemID) {
          element.taskStage = `${parseInt(element.taskStage) + 1}`;
          console.log(element.taskStage);
        }
      });
      setColumns(columns);
    } else {
      columns.forEach((element) => {
        if (element.id === itemID) {
          element.taskStage = `${parseInt(element.taskStage) - 1}`;
        }
      });
      console.log(columns);
      setColumns(columns);
    }
  };

  return (
    <div className="todoMgmt_Container">
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {columnsSet.map((column, indexColumn) => {
          return (
            <div
              className="todoMgmt_Container__columnsContainer"
              key={indexColumn}
            >
              <h2>{column}</h2>
              <div className="todoMgmt_Container__columnsContainer__column">
                <Droppable droppableId={"" + indexColumn} key={indexColumn}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
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
                        {columns.map((item, indexTask) => {
                          return item.taskStage === indexColumn + "" ? (
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
                                        itemDetails={item.id}
                                        itemStage={item.taskStage}
                                        setRenderEditDelete={
                                          setRenderEditDelete
                                        }
                                        onArrowSelect={onArrowSelect}
                                      />
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
      </DragDropContext>
    </div>
  );
}
