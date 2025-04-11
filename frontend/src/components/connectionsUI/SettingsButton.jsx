import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";

export default function SettingsButton() {
 
  return (
    <Menu className="relative" as="div">
      <MenuButton className="inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold  shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-light1 data-[open]:bg-light1 data-[focus]:outline-1 data-[focus]:outline-white">
        <EllipsisHorizontalIcon className="h-6 w-6 text-dark" />
      </MenuButton>

      <MenuItems
        anchor="bottom end"
        className="absolute z-10 mt-2 w-40 right-0  bg-light1 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <MenuItem>
          <button className="w-full text-left  px-3 py-2 hover:bg-gray-100 rounded-md text-sm text-dark">
            <PencilIcon className="size-4" />
            Edit
          </button>
        </MenuItem>
        <MenuItem>
          <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md text-sm text-dark">
            <TrashIcon className="size-4" />
            Delete
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
