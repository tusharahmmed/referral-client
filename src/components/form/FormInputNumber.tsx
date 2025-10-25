import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { InputNumber } from "antd";
import { useFormContext, Controller } from "react-hook-form";
interface IInputNumber {
  name: string;
  type?: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  required?: boolean;
  min?: number;
  max?: number;
}

const FormInputNumber = ({
  name,
  size = "large",
  value,
  id,
  placeholder,
  label,
  required,
  min,
  max,
}: IInputNumber) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <>
      {required ? (
        <span
          style={{
            color: "red",
          }}
        >
          *
        </span>
      ) : null}
      {label ? (
        <label className="flex justify-between pr-2 font-inter font-semibold text-[14px] text-[#0A0B0C] leading-[150%] mb-[8px] inline-block">
          {label}
          <small className="font-inter" style={{ color: "red" }}>
            {errorMessage}
          </small>
        </label>
      ) : null}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <InputNumber
            id={id}
            min={min}
            max={max}
            style={
              errorMessage
                ? { border: "1px solid red", width: "100%" }
                : { width: "100%" }
            }
            size={size}
            placeholder={placeholder}
            {...field}
            value={value ? value : field.value}
          />
        )}
      />
    </>
  );
};

export default FormInputNumber;
