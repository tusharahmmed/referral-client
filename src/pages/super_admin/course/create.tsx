import Form from "@/components/form/Form";
import FormInput from "@/components/form/FormInput";
import FormInputNumber from "@/components/form/FormInputNumber";
import FormMultiSelectField from "@/components/form/FormMultiSelectField";
import FormSelectField from "@/components/form/FormSelectField";
import FormTextArea from "@/components/form/FormTextArea";
import FBreadCrumb from "@/components/ui/FBreadCrumb";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useCreateCourseMutation } from "@/rtk/features/api/courseApi";
import { createCourseRequestSchema } from "@/schemas/course_request";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const CreateUserPage = () => {
  const [createCourse] = useCreateCourseMutation();
  const router = useRouter();

  const onSubmit = async (values: any) => {
    message.loading("Creating...");
    try {
      const res = await createCourse(values).unwrap();
      if (res?.id) {
        message.success("Course created successfully!");
        router.push("/super_admin/course");
      }
    } catch (err: any) {
      console.error(err.message);
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
          {
            label: "course",
            link: "/super_admin/course",
          },
        ]}
      />
      <h1 className="text-2xl font-medium my-2">Create Course</h1>

      <div>
        <Form
          submitHandler={onSubmit}
          resolver={yupResolver(createCourseRequestSchema)}
        >
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              Course Information
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput type="text" name="name" size="large" label="Name" />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="instructor"
                  size="large"
                  label="Instructor"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInputNumber name="price" size="large" label="Price" />
              </Col>
              <Col
                className="gutter-row"
                span={24}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="thumbnail"
                  size="large"
                  label="Image"
                />
              </Col>
              <Col
                className="gutter-row"
                span={24}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormTextArea name="description" label="Description" rows={4} />
              </Col>
            </Row>
          </div>

          <Button htmlType="submit" type="primary">
            Create
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateUserPage;

CreateUserPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
