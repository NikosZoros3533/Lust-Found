import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import Modal from "./Modal";
import { useState } from "react";

export default function SettingsButton({ item }) {
  const [modalConfig, setModalConfig] = useState({ type: "", isOpen: false });

  function handleCloseModal() {
    setModalConfig((prevConfig) => {
      return { ...prevConfig, isOpen: false };
    });
  }

  function handleOpenModal() {
    setModalConfig((prevConfig) => {
      return { ...prevConfig, isOpen: true };
    });
  }

  function setTypeOfModal(type) {
    setModalConfig((prevConfig) => {
      return { ...prevConfig, type: type };
    });
  }

  return (
    <>
      <Menu className="relative" as="div">
        <MenuButton className="inline-flex items-center cursor-pointer gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold  shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-light1 data-[open]:bg-light1 data-[focus]:outline-1 data-[focus]:outline-white">
          <EllipsisHorizontalIcon className="h-6 w-6 text-dark" />
        </MenuButton>

        <MenuItems
          anchor="bottom end"
          className="absolute z-10 mt-2 w-40 right-0  bg-light1 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <MenuItem>
            <button
              onClick={() => {
                setTypeOfModal("edit")
                handleOpenModal();
              }}
              className="w-full text-left  px-3 py-2 hover:bg-gray-100 rounded-md text-sm text-dark"
            >
              <PencilIcon className="size-4" />
              Edit {item.type}
            </button>
          </MenuItem>
          <MenuItem>
            <button onClick={() => {
                setTypeOfModal("delete")
                handleOpenModal();
              }} className="w-full text-left  px-3 py-2 hover:bg-gray-100 rounded-md text-sm text-dark">
              <TrashIcon className="size-4" />
              Delete {item.type}
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
      <Modal
        item={item}
        type={modalConfig.type}
        isOpen={modalConfig.isOpen}
        handleClose={handleCloseModal}
      ></Modal>
    </>
  );
}
