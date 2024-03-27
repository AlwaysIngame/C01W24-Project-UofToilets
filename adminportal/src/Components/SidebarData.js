import React from "react";
import { FaToilet } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/admin/dashboard',
    icon: <MdSpaceDashboard/>,
    cName: 'side-text',
  },
  {
    title: 'Requests',
    path: '/admin/requests',
    icon: <FaToilet />,
    cName: 'side-text',
  },
]