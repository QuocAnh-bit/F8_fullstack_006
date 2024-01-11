"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { getMindMap, updateMindMap } from "@/utils/api/dataApi";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Radio,
  Button,
  RadioGroup,
  useDisclosure,
  Input,
  Textarea,
} from "@nextui-org/react";

export default function ModalShare({
  onSave,
  idMindMap,
  handleClick,
  setStatusSave,
}) {
  const router = useRouter();

  const [mode, setMode] = useState("private");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [form, setForm] = useState({});

  useEffect(() => {
    const DataLocalStorage = async () => {
      const storedDatas = await getMindMap(idMindMap);
      if (storedDatas) {
        setForm({
          urlShare: window.location.href,
          imgShare: `https://f8-fullstack-006-qrjxa.vercel.app/_next/static/media/homeImg.6fe82082.jpg`,
          titleShare: storedDatas.name,
          decsShare: storedDatas.dec,
        });
      }
    };

    DataLocalStorage();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave();
    const a = await updateMindMap(idMindMap, { mode: form });
    if (a === 1) {
      setStatusSave(false);
      toast.error("Vui lòng thử lại");
    } else {
      setStatusSave(false);
      toast.success("Lưu thành công");
    }
  };
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setForm((item) => ({ ...item, [name]: value }));
  };

  return (
    <>
      <Button onPress={onOpen}>Chia sẻ</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center">
                <RadioGroup
                  defaultValue="private"
                  orientation="horizontal"
                  onChange={(e) => setMode(e.target.value)}
                >
                  <Radio value="private">Riêng tư</Radio>
                  <Radio value="public">Công khai</Radio>
                </RadioGroup>
              </ModalHeader>
              <ModalBody>
                {mode === "private" ? (
                  <>
                    <div>
                      Nếu chọn riêng tư, chỉ có bạn mới được quyền xem Mindmap
                      này
                    </div>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Trở Lại
                      </Button>
                      <Button
                        color="primary"
                        onPress={onClose}
                        onClick={handleClick}
                      >
                        Lưu
                      </Button>
                    </ModalFooter>
                  </>
                ) : (
                  <>
                    <form
                      action=""
                      className="flex flex-col gap-2"
                      onSubmit={handleSubmit}
                    >
                      <div>
                        <label htmlFor="">Liên kết chia sẻ</label>
                        <input
                          type="text"
                          readOnly
                          className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          defaultValue={`${form.urlShare}`}
                          name="urlShare"
                        />
                      </div>
                      <div>
                        <label htmlFor="">Tiêu đề</label>
                        <input
                          type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          defaultValue={`${form.titleShare}`}
                          name="titleShare"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="">Mô tả</label>
                        <textarea
                          name="decsShare"
                          onChange={handleChange}
                          id=""
                          required
                          placeholder={`${form.decsShare}`}
                          className="resize-none h-28 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        ></textarea>
                      </div>
                      <div>
                        <label htmlFor="">Ảnh hiển thị</label>
                        <input
                          onChange={handleChange}
                          name="imgShare"
                          defaultValue={`${form.imgShare}`}
                          type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                      </div>
                      <ModalFooter>
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
                          Trở Lại
                        </Button>
                        <Button color="primary" type="submit">
                          Lưu
                        </Button>
                      </ModalFooter>
                    </form>
                  </>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
