import { type MenuProps } from "antd";
import { ProfileOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "./role";

export const sidebarItems = (role: string, permissions: string[]) => {
  const query: Record<string, any> = {};
  query["status"] = "pending";

  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/profile`}>Account Profile</Link>,
          key: `/${role}/profile`,
        },
      ],
    },
  ];

  // const customerItems: MenuProps["items"] = [
  //   {
  //     label: <Link href={`/${role}/customers`}>Manage Customer Request</Link>,
  //     icon: <TableOutlined />,
  //     key: `/${role}/customers`,
  //   },
  // ];

  const userSidebarItems: MenuProps["items"] = [...defaultSidebarItems];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/${role}/user`}>Manage User</Link>,
      icon: <UserOutlined />,
      key: `/${role}/user`,
    },
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.USER) return userSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
