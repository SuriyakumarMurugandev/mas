import { Button, Card } from "antd";
import { CheckCircleFilled, ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const RegistrationSuccess = () => {
  const navigate = useNavigate();

  return (
    <Card className="auth-card registration-success-card" bordered={false}>
      <div className="success-icon-wrap"><CheckCircleFilled /></div>
      <span className="auth-card-kicker">YOU’RE ALL SET</span>
      <h2>Registration <span>successful!</span></h2>
      <p>Your registration details have been submitted. Follow your organization’s account setup process to access your workspace.</p>
      <Button type="primary" size="large" className="auth-submit" onClick={() => navigate("/login")}>
        Back to login <ArrowRightOutlined />
      </Button>
    </Card>
  );
};

export default RegistrationSuccess;
