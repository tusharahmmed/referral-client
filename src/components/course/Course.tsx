// app/courses/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, Button, Spin, Typography, notification } from "antd";
import {
  ShoppingCartOutlined,
  StarFilled,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useGetAllCourseQuery } from "@/rtk/features/api/courseApi";
import { ICourse } from "@/types";
import styles from "@/styles/user/course.module.scss";
import Link from "next/link";
import { getUserInfo } from "@/services/auth.service";
import { usePlaceOrderMutation } from "@/rtk/features/api/orderApi";

const { Title, Paragraph } = Typography;

const Course = () => {
  const [ordering, setOrdering] = useState<string | null>(null);
  const router = useRouter();

  const { data, isLoading } = useGetAllCourseQuery(undefined);

  const [placeOrder, { data: orderData, isSuccess }] = usePlaceOrderMutation();

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: "Course Ordered!",
      });
    }
  }, [isSuccess]);

  const userDetials = getUserInfo() as any;

  const courses = data?.course as ICourse[];
  const meta = data?.meta;

  const handleBuyCourse = async (courseId: string) => {
    setOrdering(courseId);

    try {
      placeOrder({
        course_id: courseId,
        user_id: userDetials.id,
      }).unwrap();
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to place order. Please try again.",
      });
    } finally {
      setOrdering(null);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className={styles.coursesContainer}>
      <div className={styles.container}>
        <Link href={`/profile`}>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => router.back()}
            className={styles.backButton}
          >
            Back
          </Button>
        </Link>

        <div className={styles.header}>
          <Title level={1} className={styles.title}>
            Available Courses
          </Title>
          <Paragraph className={styles.subtitle}>
            Discover and enroll in our expert-led courses
          </Paragraph>
        </div>

        {/* Courses Grid */}
        <div className={styles.coursesGrid}>
          {courses?.map((course: ICourse) => (
            <div key={course._id} className={styles.cardContainer}>
              <Card
                hoverable
                className={styles.card}
                cover={
                  <div className={styles.cardImageContainer}>
                    <img
                      alt={course.name}
                      src={course.thumbnail || "/api/placeholder/300/200"}
                      className={styles.cardImage}
                      onError={(e) => {
                        e.currentTarget.src = "/api/placeholder/300/200";
                      }}
                    />
                    <div className={styles.priceBadge}>
                      {formatPrice(course.price)}
                    </div>
                  </div>
                }
                actions={[
                  <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    disabled={
                      ordering && ordering !== course._id ? true : false
                    }
                    loading={ordering === course._id}
                    onClick={() => handleBuyCourse(course._id)}
                    className={styles.actionButton}
                  >
                    Buy Now
                  </Button>,
                ]}
              >
                <div className={styles.cardContent}>
                  <div className={styles.cardTitle}>
                    <div className={styles.titleText}>{course.name}</div>
                  </div>

                  <div className={styles.cardDescription}>
                    <Paragraph
                      ellipsis={{ tooltip: course.description }}
                      className={styles.descriptionText}
                    >
                      {course.description}
                    </Paragraph>
                  </div>

                  <div className={styles.cardMeta}>
                    <span className={styles.instructor}>
                      By {course.instructor}
                    </span>
                    <div className={styles.rating}>
                      <StarFilled className={styles.starIcon} />
                      <span>4.5</span>
                    </div>
                  </div>

                  <div className={styles.updateDate}>
                    Updated: {new Date(course.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {courses?.length === 0 && (
          <div className={styles.emptyState}>
            <Title level={3} className={styles.emptyTitle}>
              No Courses Available
            </Title>
            <Paragraph className={styles.emptyText}>
              Check back later for new courses
            </Paragraph>
          </div>
        )}
      </div>
    </div>
  );
};

export default Course;
