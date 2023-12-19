"use client";
import { useParams } from "next/navigation";
import Head from "next/head";
import { datas } from "@/data/data";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import CustomNode from "./custom/CustomNode";
import InputNode from "./custom/InputNode";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  useNodes,
  useEdges,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";
import { Button } from "@nextui-org/react";
import { updateMindMap } from "@/utils/api/dataApi";
import ModalShare from "./ModalShare";

const nodeTypes = {
  customNode: CustomNode,
  inputNode: InputNode,
};

const minimapStyle = {
  height: 200,
  width: 200,
};

const getNodeId = () => `randomnode_${+new Date()}`;

const MindMap = () => {
  const params = useParams();
  const { id: idMindMap } = params;

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const { screenToFlowPosition } = useReactFlow();

  const [rfInstance, setRfInstance] = useState(null);
  const [index, setIndex] = useState(null);
  const [storedDatas, setStoredDatas] = useState(null);

  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");

  useEffect(() => {
    const DataLocalStorage = async () => {
      const storedDatas = await getLocalStorage("datas");
      if (storedDatas) {
        const index = storedDatas.findIndex((item) => item.id === idMindMap);
        console.log("Index:", storedDatas[index].nodes);
        setNodes(storedDatas[index].nodes);
        setEdges(storedDatas[index].edges);
        setStoredDatas(storedDatas);
        setIndex(index);
        setEditName(storedDatas[index].name);
        setEditDesc(storedDatas[index].dec);
      }
    };

    DataLocalStorage();
  }, []);

  const onSave = useCallback(async () => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      setStoredDatas((item) => {
        item[index].nodes = flow.nodes;
        item[index].edges = flow.edges;
        item[index].name = editName;
        item[index].dec = editDesc;

        return item;
      });
      console.log(storedDatas[index].dec);
      await updateMindMap(idMindMap, {
        nodes: storedDatas[index].nodes,
        edges: storedDatas[index].edges,
        name: storedDatas[index].name,
        dec: storedDatas[index].dec,
      });
      setLocalStorage("datas", storedDatas);
    }
  }, [rfInstance, editName, editDesc]);

  const onConnect = useCallback((params) => {
    // reset the start node on connections=
    connectingNodeId.current = null;
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    async (event) => {
      if (!connectingNodeId.current) return;

      const targetIsPane = event.target.classList.contains("react-flow__pane");
      /// kiểm tra xem có trong luồng chạy của react flow không
      console.log(event.target);

      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const id = getNodeId();
        const newNode = {
          id,
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          data: { label: `New Node` },
          origin: [0.5, 0.0],
          type: "customNode",
        };

        setNodes((nds) => {
          return nds.concat(newNode);
        });
        setEdges((eds) => {
          return eds.concat({
            id,
            source: connectingNodeId.current,
            target: id,
          });
        });
      }
    },
    [screenToFlowPosition]
  );

  return (
    <>
      <div className="mt-3 flex w-full justify-between">
        <div className="w-full">
          <input
            contentEditable="true"
            spellCheck="false"
            className="text-2xl font-bold  focus:outline-none w-full"
            onChange={(e) => {
              setEditName(e.target.value);
            }}
            defaultValue={editName}
          ></input>
          <input
            contentEditable="true"
            spellCheck="false"
            className="  focus:outline-none w-full"
            onChange={(e) => setEditDesc(e.target.value)}
            defaultValue={editDesc}
          ></input>
        </div>
        <div className="flex gap-3">
          <Button onClick={onSave}>Lưu thay đổi</Button>
          <ModalShare
            onSave={onSave}
            nameMindMap={editName}
            descMindMap={editDesc}
            idMindMap={idMindMap}
          />
        </div>
      </div>
      <div
        className="wrapper w-screen max-w-[1280px] h-screen max-h-[600px] my-10 "
        ref={reactFlowWrapper}
      >
        <ReactFlow
          className="z-10"
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          nodeTypes={nodeTypes}
          onInit={setRfInstance}
          fitView
        >
          <Controls />
          <MiniMap style={minimapStyle} zoomable pannable />
          <Background variant="lines" gap={12} size={1} color="#AFC8AD" />
        </ReactFlow>
      </div>
    </>
  );
};

export default () => (
  <ReactFlowProvider>
    <MindMap />
  </ReactFlowProvider>
);
