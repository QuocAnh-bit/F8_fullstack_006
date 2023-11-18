import React from "react";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import ItemColumn from "./ItemColumn";

export default function ListColumn({ listCol }) {
  return (
    <div className="list-column">
      <SortableContext
        items={listCol.map((item) => item._id)}
        strategy={horizontalListSortingStrategy}
      >
        {listCol.map(({ columnName, _id }, index) => (
          <ItemColumn key={index} columnName={columnName} id={_id}></ItemColumn>
        ))}
      </SortableContext>
    </div>
  );
}
