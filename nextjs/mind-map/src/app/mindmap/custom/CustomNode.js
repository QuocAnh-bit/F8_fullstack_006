import React, { memo, useCallback, useState } from "react";
import { Handle, Position, useNodeId, useEdges, useReactFlow } from "reactflow";

function CustomNode({ data }) {
  const { setNodes } = useReactFlow();
  const nodeId = useNodeId();

  const [editMode, setEditMode] = useState(false);

  const handleDbClick = (e) => {
    setEditMode(true);
  };
  const handleOnChange = useCallback(
    (e) => {
      if (e.target.value) {
        setNodes((nds) => {
          return nds.map((node) => {
            if (node.id === nodeId) {
              node.data.label = e.target.value;
            }
            return node;
          });
        });
      }
    },
    [nodeId]
  );
  return (
    <div
      className="px-4  shadow-md min-w-[122px] w-fit rounded-md bg-white border-2 border-stone-400"
      onDoubleClick={handleDbClick}
      onBlur={() => setEditMode(false)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          setEditMode(false);
        }
      }}
    >
      {editMode ? (
        <input
          type="text"
          defaultValue={data.label}
          className=" text-center w-[86px]  max-w-[150px] border-0 "
          autoFocus
          onChange={handleOnChange}
        />
      ) : (
        <div className="text-gray-500 text-center break-words max-w-[150px]">
          {data.label}
        </div>
      )}

      <Handle
        type="target"
        position={Position.Top}
        className="w-16 rounded-none	 !bg-teal-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-16 rounded-none	 !bg-teal-500"
      />
    </div>
  );
}

export default memo(CustomNode);
