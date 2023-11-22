import React from "react";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import ItemColumn from "../Columns/ItemColumn/ItemColumn";
import "./ListColumn.scss";

export default function ListColumn({ listCol }) {
  return (
    <div className="list-column">
      <SortableContext
        items={listCol.map((item) => item._id)}
        strategy={horizontalListSortingStrategy}
      >
        {listCol.map((column, index) => (
          <ItemColumn
            key={index}
            column={column}
            listCol={listCol}
          ></ItemColumn>
        ))}
      </SortableContext>
    </div>
  );
}
