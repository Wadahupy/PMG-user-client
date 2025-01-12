import { Card, Input, Checkbox, Typography } from "@material-tailwind/react";
import { Form, NavLink, useActionData, useNavigate } from "react-router-dom";
import SubmitBtn from "../../shared/components/Partials/SubmitBtn";
import { authApi } from "../../config/axios";
import { useState, useEffect } from "react";
import OTPVerificationModal from "./OTPVerificationModal";

const SignUpForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState(""); // State to store email
  const actionData = useActionData();
  const navigate = useNavigate();

  const handleVerifyOTP = async (otp) => {
    try {
      const response = await authApi.post("/verify", { otp, email });
      if (!response.success) {
        throw new Error("Invalid OTP"); // Throw error if OTP is invalid
      }
      setIsModalOpen(false);
      console.log(isModalOpen);
      navigate("/sign-in");
    } catch (error) {
      throw error; // Pass error back to the modal
    }
  };

  if (actionData?.success) {
    console.log(actionData.email);
  }

  useEffect(() => {
    if (actionData?.success) {
      setIsModalOpen(true);
      setEmail(actionData.email); // Set email from actionData
    }
  }, [actionData]); // Run this effect whenever actionData changes

  return (
    <>
      <Card
        color="transparent"
        shadow={false}
        className="container flex flex-col items-center justify-center mx-auto mb-28"
      >
        <div className="p-10 my-10 border border-black rounded-xl">
          <Typography variant="h4" color="blue-gray">
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Nice to meet you! Enter your details to register.
          </Typography>
          <Form
            method="POST"
            action="/sign-up"
            className="w-full max-w-screen-lg mt-8 mb-2"
          >
            <div className="flex flex-col gap-6 mb-1">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Email
              </Typography>
              <Input
                size="lg"
                placeholder="e.g. Juan Dela Cruz"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900 flex-1"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                name="email"
              />
              {actionData?.errors?.email && (
                <p className="text-sm text-red-500">
                  {actionData.errors.email}
                </p>
              )}

              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Contact No.
              </Typography>
              <Input
                size="lg"
                placeholder="09*********"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900 flex-1"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                name="number"
              />
              {actionData?.errors?.number && (
                <p className="text-sm text-red-500">
                  {actionData.errors.number}
                </p>
              )}

              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                name="password"
              />
              {actionData?.errors?.password && (
                <p className="text-sm text-red-500">
                  {actionData.errors.password}
                </p>
              )}

              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Confirm Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                name="confirmPassword"
              />
              {actionData?.errors?.confirmPassword && (
                <p className="text-sm text-red-500">
                  {actionData.errors.confirmPassword}
                </p>
              )}
            </div>

            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree to the
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-gray-900"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />

            <SubmitBtn
              label="Sign Up"
              id="Sign-Up"
              type="submit"
              className="mt-6"
            />

            <Typography color="gray" className="mt-4 font-normal text-center">
              Already have an account?{" "}
              <NavLink to="/sign-in" className="font-medium text-gray-900">
                Sign In
              </NavLink>
            </Typography>
          </Form>
        </div>
      </Card>
      <OTPVerificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onVerify={handleVerifyOTP}
      />
    </>
  );
};

export default SignUpForm;

export const register = async ({ request }) => {
  try {
    const formData = await request.formData();
    const email = formData.get("email");
    const number = formData.get("number");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    // Validation
    const errors = {};
    if (!email) errors.email = "Email is required.";
    if (!number) errors.number = "Phone number is required.";
    if (!password) errors.password = "Password is required.";
    if (password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match.";

    if (Object.keys(errors).length > 0) {
      return { errors }; // Return validation errors
    }

    // API Request
    const response = await authApi.post("/signup", { email, number, password });

    return { success: true, email }; // Indicate success
  } catch (error) {
    return { errors: { api: "Failed to register. Please try again." } };
  }
};
