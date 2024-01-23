'use client'

import { ListBulletIcon, TableCellsIcon } from "@heroicons/react/24/outline";
import { Dropdown } from 'flowbite-react';

export function CustomDropdown () {
  return (
    <Dropdown label={<ListBulletIcon className="w-6 h-6 text-veryDarkGray" />} dismissOnClick={false}>
      <Dropdown.Item icon={ListBulletIcon}>Lista</Dropdown.Item>
      <Dropdown.Item icon={TableCellsIcon}>Grade</Dropdown.Item>
    </Dropdown>
  );
}
