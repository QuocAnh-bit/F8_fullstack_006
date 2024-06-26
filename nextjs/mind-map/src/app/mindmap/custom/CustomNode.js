import React, { memo, useCallback, useState } from "react";
import { Handle, Position, useNodeId, useEdges, useReactFlow } from "reactflow";

function CustomNode({ data }) {
  const { setNodes } = useReactFlow();
  const nodeId = useNodeId();

  const [editMode, setEditMode] = useState(false);

  const handleOnClick = useCallback(() => {}, []);

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
      className=" shadow-md min-w-[122px] w-fit rounded-md bg-white border-2 border-stone-400 active:bg-slate-100 active:border-slate-800 hover:border-slate-500 "
      onDoubleClick={handleDbClick}
      onClick={handleOnClick}
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
          className=" text-center w-[122px] rounded-md max-w-[150px] border-0 "
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
