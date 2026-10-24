import { useState } from "react";
import ForgotPasswordRequest from "./ForgotPasswordRequest";
import ForgotPasswordSent from "./ForgotPasswordSent";
import ResetPasswordForm from "./ResetPasswordForm";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

const ForgotPasswordFlow = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  return (
    <div className="forgot-password-container">
      {step === 1 && (
        <ForgotPasswordRequest
          onSuccess={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <ForgotPasswordSent
          onResend={() => setStep(1)}
          onBack={() => navigate("/login")}  
        />
      )}

      {step === 3 && (
        <ResetPasswordForm
          onSubmit={() => {
            // TODO: Integrate with backend reset-token validation + password update
            // For now, just simulate navigation back to login
            navigate("/login");
          }}
        />
      )}
    </div>
  );
};

export default ForgotPasswordFlow;
