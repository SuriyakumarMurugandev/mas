import { Card, Button, Typography, Image } from "antd";
import { MailOutlined, CheckCircleOutlined, ArrowLeftOutlined } from "@ant-design/icons";
// import background from "../../assets/signup-back.png";
import background from "../../assets/logback.jpg";
import Logo from "../../assets/Logowhite.png";
import "./ForgotPassword.css";

const { Title, Text } = Typography;

const ForgotPasswordSent = ({ onResend, onBack }) => {
  return (
        <div className="forgot-password-container" style={{ backgroundImage: `url(${background})` }}>
      <div className="forgot-password-logo">
        <Image src={Logo} preview={false} style={{ width: 150 }} />
      </div>
    <div className="forgot-password-container">
      <Card className="forgot-password-card">
        <div className="forgot-password-icon teal">
          <CheckCircleOutlined />
        </div>
        <Title level={3} className="forgot-password-heading">Check your email</Title>
        <Text type="secondary">
          If the email matches an account, you’ll receive reset instructions shortly.
        </Text>

        <div className="forgot-password-info">
          <MailOutlined /> <span>Reset instructions will be sent to your inbox.</span>
        </div>

        <Button type="primary" className="forgot-password-button" onClick={onResend}>
          Resend email
        </Button>
        <Button icon={<ArrowLeftOutlined />} onClick={onBack} className="forgot-password-back">
          Back to login
        </Button>
      </Card>
    </div>
    </div>
  );
};

export default ForgotPasswordSent;
