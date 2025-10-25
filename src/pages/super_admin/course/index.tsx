import ActionBar from "@/components/ui/ActionBar";
import FBreadCrumb from "@/components/ui/FBreadCrumb";
import FTable from "@/components/ui/FTable";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Button, Input, message } from "antd";
import Link from "next/link";
import { useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useDebounced } from "@/rtk/hooks";
import FModal from "@/components/ui/FModal";
import dayjs from "dayjs";

import { ICourse, IMeta } from "@/types";
import {
  useDeleteCouseMutation,
  useGetAllCourseQuery,
} from "@/rtk/features/api/courseApi";
import Image from "next/image";

const UserListPage = () => {
  const query: Record<string, any> = {};
  const [deleteCourse] = useDeleteCouseMutation();

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sort, setSort] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sort"] = sort;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const { data, isLoading } = useGetAllCourseQuery({ ...query });

  const courses = data?.course;
  const meta = data?.meta as IMeta;

  console.log(courses, meta);

  const columns = [
    {
      title: "Image",
      dataIndex: "thumbnail",
      render: (src: string) => (
        <Image
          src={src}
          // layout="responsive"
          alt="course"
          width={100}
          height={40}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (data: string): string =>
        `${data?.split(" ").slice(0, 10).join(" ")}...`,
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Instructor",
      dataIndex: "instructor",
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Updated at",
      dataIndex: "updatedAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },

    {
      title: "Action",
      // dataIndex: "id",
      render: function (record: any) {
        // console.log(data);

        return (
          <>
            <Button
              type="primary"
              onClick={() => {
                setOpen(true);
                setUserId(record.id);
              }}
              danger
              style={{ marginLeft: "3px" }}
            >
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];
  const onPaginationChange = (page: number, pageSize: number) => {
    // console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    if (order === "ascend") {
      setSort(`${field}`);
    } else {
      setSort(`-${field}`);
    }
  };

  const resetFilters = () => {
    setSort("");
    setSearchTerm("");
  };

  const deleteUserHandler = async (id: string) => {
    try {
      const res = await deleteCourse(id).unwrap();
      if (res) {
        message.success("User Successfully Deleted!");
        setOpen(false);
      }
    } catch (error: any) {
      setOpen(false);
      // console.log(error);
      message.error(error.message);
    }
  };

  return (
    <div>
      <FBreadCrumb
        items={[
          {
            label: "super_admin",
            link: "/profile",
          },
        ]}
      />
      <ActionBar title="Course List">
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
          value={searchTerm}
        />
        <div>
          <Link href="/super_admin/course/create">
            <Button type="primary">Create Course</Button>
          </Link>
          {(!!sort || !!searchTerm) && (
            <Button
              style={{ margin: "0px 5px" }}
              type="primary"
              onClick={resetFilters}
            >
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </ActionBar>

      <FTable
        loading={isLoading}
        columns={columns}
        dataSource={courses}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
        rowKey="id"
      />

      <FModal
        title="Remove quote"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteUserHandler(userId)}
      >
        <p className="my-5">Do you want to remove this course?</p>
      </FModal>
    </div>
  );
};

export default UserListPage;

UserListPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
