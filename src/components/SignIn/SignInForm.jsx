import React from "react";
import { Card, Input, Checkbox, Typography } from "@material-tailwind/react";
import { NavLink, Form, useActionData, useNavigate } from "react-router-dom";
import SubmitBtn from "../../shared/components/Partials/SubmitBtn";

const SignInForm = () => {
  const actionData = useActionData();
  const navigate = useNavigate();

  if (actionData?.success) {
    navigate("/schedule");
  }

  return (
    <Card
      color="transparent"
      shadow={false}
      className="container flex flex-col items-center justify-center mx-auto mb-28"
    >
      <div className="p-10 my-10 border border-black rounded-xl">
        <Typography variant="h4" color="blue-gray">
          Sign In
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Welcome back! Sign In your account to continue.
        </Typography>

        <Form
          method="POST"
          action="/sign-in"
          className="w-full max-w-screen-lg mt-2 mb-2"
        >
          {actionData?.errors?.api && (
            <p className="text-sm text-center text-red-500">
              {actionData.errors.api}
            </p>
          )}
          <div className="flex flex-col gap-6 mb-1">
            {/* Email Section */}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Email
            </Typography>
            <div className="flex flex-row gap-2">
              <Input
                size="lg"
                placeholder="e.g. Juan Dela Cruz"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900 flex-1"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                name="email"
              />
            </div>
            {actionData?.errors?.email && (
              <p className="text-sm text-red-500">{actionData.errors.email}</p>
            )}

            {/* Password Section */}
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
          </div>

          {/* Remember Me */}
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                Remember me?
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />

          {/* Sign-In Button */}
          <SubmitBtn
            label="Sign In"
            id="Sign-In"
            type="submit"
            className="mt-6"
          />

          {/* Sign-Up Link */}
          <Typography color="gray" className="mt-4 font-normal text-center">
            Don't have an Account?{" "}
            <NavLink to={"/sign-up"} className="font-medium text-gray-900">
              Sign Up
            </NavLink>
          </Typography>
        </Form>
      </div>
    </Card>
  );
};

export default SignInForm;

import { authApi } from "../../config/axios";

export const login = async ({ request }) => {
  try {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    // Validation
    const errors = {};
    if (!email) errors.email = "Email is required.";
    if (!password) errors.password = "Password is required.";

    if (Object.keys(errors).length > 0) {
      return { errors }; // Return validation errors
    }

    // API Request
    const response = await authApi.post("/signin", { email, password });
    const { data } = response;

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    return { success: true }; // Indicate success
  } catch (error) {
    return { errors: { api: "Incorrect email or password." } };
  }
};
