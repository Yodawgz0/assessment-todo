import React from "react";
import "../../styles/taskPageStyle.scss";

export default function DraggableFeatures({
  itemDetails,
  itemStage,
  onArrowSelect,
  handleDeleteTask,
}) {
  return (
    <div className="mt-3">
      <button className="me-1">Edit</button>
      <button className="me-1" onClick={() => handleDeleteTask(itemDetails)}>
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
