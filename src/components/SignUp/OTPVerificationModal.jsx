import React, { useEffect, useState } from "react";
import { Card, Typography, Input, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const OTPVerificationModal = ({ isOpen, onClose, onVerify }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(""); // State to track the error message
  const navigate = useNavigate()

  const handleVerify = async () => {
    try {
      await onVerify(otp); // Call the onVerify function
      setError(""); // Clear the error if verification is successful
      navigate("/sign-in")
    } catch (err) {
      setError("Invalid OTP. Please try again."); // Set error if verification fails
      throw err
    }
  };

  useEffect(() => {
    console.log(otp)
  },[otp])

  if (!isOpen) return null; // Do not render the modal if not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Card className="w-96 p-6">
        <Typography variant="h4" className="mb-4 text-center">
          OTP Verification
        </Typography>
        <Typography variant="small" color="gray" className="text-center mb-6">
          Enter the 6-digit code sent to your email.
        </Typography>
        <Input
          label="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          size="lg"
          className="mb-4"
        />
        {error && (
          <Typography color="red" className="text-center mb-4">
            {error}
          </Typography>
        )}
        <div className="flex gap-4 justify-center mt-4">
          <Button color="blue" onClick={handleVerify}>
            Verify
          </Button>
          <Button variant="outlined" color="red" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default OTPVerificationModal;
