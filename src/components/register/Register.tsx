import styles from "@/styles/register/register.module.scss";
import Form from "../form/Form";
import FormInput from "../form/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { message } from "antd";
import {
  useUserLoginMutation,
  useUserSignupMutation,
} from "@/rtk/features/api/authApi";
import { useRouter } from "next/navigation";
import { storeUserInfo } from "@/services/auth.service";
import { useSearchParams } from "next/navigation";
import { registerRequestSchema } from "@/schemas/register_request";
import Link from "next/link";

const Register = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const referralCode = searchParams.get("ref");
  console.log(referralCode);

  const [userSignUP] = useUserSignupMutation();

  const onSubmit = async (data: any) => {
    // if has reffer code
    if (referralCode) {
      data.referred_user_code = referralCode;
    }

    message.loading("login.....");
    try {
      const res = await userSignUP({ ...data }).unwrap();
      // console.log(res);
      if (res?.accessToken) {
        router.push("/profile");
        message.success("Congratulations!");
      }
      storeUserInfo({ accessToken: res?.accessToken });
      // console.log(res);
    } catch (err: any) {
      // console.error(err);
      message.error(err.message);
    }
  };

  return (
    <section className={`${styles.section} section_padding`}>
      <div className={styles.sectionTitle}>
        <h2>Sign Up</h2>
      </div>
      <div className={styles.formWraper}>
        <Form
          submitHandler={onSubmit}
          resolver={yupResolver(registerRequestSchema)}
          //   defaultValues={defaultValues}
        >
          <div className={styles.inputWraper}>
            <FormInput name="name" label="Name" />
          </div>
          <div className={styles.inputWraper}>
            <FormInput type="email" name="email" label="Email" />
          </div>
          <div className={styles.inputWraper}>
            <FormInput type="password" name="password" label="Password" />
          </div>
          <div className={styles.submit}>
            <button type="submit">Sign up</button>
          </div>
        </Form>
        {referralCode ? null : (
          <div className={styles.linkSection}>
            <span className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="">
                Log in
              </Link>
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Register;
