"use client";

import { useParams, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import { Button, Spinner } from "@nextui-org/react";
import { getMindMap, updateMindMap } from "@/utils/api/dataApi";
import ModalShare from "./ModalShare";
import { useUser } from "@auth0/nextjs-auth0/client";

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
  const { user } = useUser();
  const router = useRouter();
  const { getNode } = useReactFlow();

  const [userEdit, setUserEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const { id: idMindMap } = params;

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const { screenToFlowPosition } = useReactFlow();

  const [rfInstance, setRfInstance] = useState(null);
  const [statusSave, setStatusSave] = useState(false);

  const [storedDatas, setStoredDatas] = useState(null);

  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");

  useEffect(() => {
    const DataLocalStorage = async () => {
      const storedDatas = await getMindMap(idMindMap);
      setLoading(false);
      if (storedDatas) {
        setNodes(storedDatas.nodes);
        setEdges(storedDatas.edges);
        setStoredDatas(storedDatas);
        setEditName(storedDatas.name);
        setEditDesc(storedDatas.dec);
      }
    };

    DataLocalStorage();
  }, []);

  useEffect(() => {
    const checkUserId = () => {
      if (user && storedDatas) {
        const userLogin = user.sub;
        const isOwner = userLogin === storedDatas.userID;
        isOwner ? setUserEdit(true) : setUserEdit(false);
      }
    };

    checkUserId();
  }, [user, storedDatas]);

  const onSave = useCallback(async () => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      setStatusSave(true);
      await setStoredDatas((item) => {
        item.nodes = flow.nodes;
        item.edges = flow.edges;
        item.name = editName;
        item.dec = editDesc;
        return item;
      });

      const a = await updateMindMap(idMindMap, {
        nodes: storedDatas.nodes,
        edges: storedDatas.edges,
        name: storedDatas.name,
        dec: storedDatas.dec,
      });

      if (a === 1) {
        setStatusSave(false);
        return 1;
      }

      setLocalStorage("datas", storedDatas);
    }
  }, [rfInstance, editName, editDesc, storedDatas, idMindMap]);

  const handleClick = async () => {
    const checkSave = await onSave();
    console.log(checkSave);
    if (checkSave === 1) {
      toast.error("Vui Lòng thử lại");
    } else {
      setStatusSave(false);
      toast.success("Lưu thành công");
    }
  };

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

  function handleNodesChange(changes) {
    const nextChanges = changes.reduce((acc, change) => {
      if (change.type === "remove") {
        const node = getNode(change.id);
        if (node.id !== "0") {
          return [...acc, change];
        }
        return acc;
      }

      return [...acc, change];
    }, []);

    onNodesChange(nextChanges);
  }

  return (
    <>
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center ">
          {" "}
          <Spinner label="Loading..." color="warning" size="lg" />
        </div>
      )}
      <div className="mt-3 flex w-full justify-between">
        <div className="w-full">
          {userEdit ? (
            <>
              <input
                className="text-2xl font-bold  focus:outline-none w-full"
                onChange={(e) => {
                  setEditName(e.target.value);
                }}
                defaultValue={editName}
              />
              <input
                className="  focus:outline-none w-full"
                onChange={(e) => setEditDesc(e.target.value)}
                defaultValue={editDesc}
              />
            </>
          ) : (
            <>
              <input
                readOnly
                className="text-2xl font-bold  focus:outline-none w-full"
                onChange={(e) => {
                  setEditName(e.target.value);
                }}
                defaultValue={editName}
              />
              <input
                readOnly
                className="  focus:outline-none w-full"
                onChange={(e) => setEditDesc(e.target.value)}
                defaultValue={editDesc}
              />
            </>
          )}
        </div>
        <div className="flex gap-3">
          {userEdit && (
            <Button
              onClick={handleClick}
              isLoading={statusSave ? true : false}
              color="success"
              className="text-white font-bold"
            >
              {statusSave ? "Đang lưu ... " : "Lưu thay đổi"}
            </Button>
          )}
          {userEdit && (
            <ModalShare
              setStatusSave={setStatusSave}
              handleClick={handleClick}
              onSave={onSave}
              nameMindMap={editName}
              descMindMap={editDesc}
              idMindMap={idMindMap}
            />
          )}
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
          onNodesChange={handleNodesChange}
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
        <ToastContainer />
      </div>
    </>
  );
};

export default () => (
  <ReactFlowProvider>
    <MindMap />
  </ReactFlowProvider>
);
