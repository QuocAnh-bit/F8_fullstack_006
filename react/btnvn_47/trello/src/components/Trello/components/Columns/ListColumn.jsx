import React from "react";

import ItemColumn from "../Columns/ItemColumn/ItemColumn";
import "./ListColumn.scss";
import { Droppable } from "react-beautiful-dnd";

export default function ListColumn({ listCol }) {
  return (
    <Droppable droppableId="columns" direction="horizontal" type="column">
      {(provided) => (
        <div
          className="list-column"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {listCol.map((column, index) => (
            <ItemColumn
              key={column.column}
              indexCol={index}
              column={column}
            ></ItemColumn>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
