import React from "react";

import "../../styles/taskPageStyle.scss";

export default function DraggableFeatures({
  itemDetails,
  itemStage,
  setRenderEditDelete,
  onArrowSelect,
}) {
  const handleDeleteTask = async () => {
    const deleteTaskHeader = new Headers();
    deleteTaskHeader.append(
      "Authorization",
      "Bearer " + sessionStorage.getItem("sessionkey")
    );
    deleteTaskHeader.append("Content-Type", "application/json");

    let requestOptions = {
      method: "DELETE",
      headers: deleteTaskHeader,
      redirect: "follow",
    };

    await fetch(
      "https://api-nodejs-todolist.herokuapp.com/task/" + itemDetails,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setRenderEditDelete(itemDetails))
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="mt-3">
      <button className="me-1">Edit</button>
      <button className="me-1" onClick={handleDeleteTask}>
        Delete
      </button>
      <button
        className="me-1"
        disabled={itemStage === "0"}
        onClick={() => onArrowSelect("back", itemDetails)}
      >
        {"<-"}
      </button>
      <button
        className="me-1"
        disabled={itemStage === "3"}
        onClick={() => onArrowSelect("next", itemDetails)}
      >
        {"->"}
      </button>
    </div>
  );
}
