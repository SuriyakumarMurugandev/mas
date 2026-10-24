import { Card, Form, Input, Button, Typography, Image } from "antd";
import { MailOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import background from "../../assets/logback.jpg";
// import background from "../../assets/signup-back.png";
import Logo from "../../assets/Logowhite.png";
import "./ForgotPassword.css";

const { Title, Text } = Typography;

const ForgotPasswordRequest = ({ onSuccess }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    // TODO: Integrate with backend API to send reset email
    onSuccess();
  };

  return (
    <div className="forgot-password-container" style={{ backgroundImage: `url(${background})` }}>
      <div className="forgot-password-logo">
        <Image src={Logo} preview={false} style={{ width: 150 }} />
      </div>
      <Card className="forgot-password-card">
        <div className="forgot-password-icon purple">
          <MailOutlined />
        </div>
        {/* <Text className="forgot-password-label">ACCOUNT RECOVERY</Text> */}
        <Title level={3} className="forgot-password-heading">Forgot your password?</Title>
        <Text type="secondary">
          Enter your email address below and we’ll send you instructions to reset your password.
        </Text>

        <Form form={form} layout="vertical" onFinish={handleSubmit} className="forgot-password-form">
          <Form.Item
            name="email"
            rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}
          >
            <Input prefix={<MailOutlined />} placeholder="you@company.com" />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="forgot-password-button">
            Send reset link
          </Button>
        </Form>

        <Button type="link" icon={<ArrowLeftOutlined />} href="/login" className="forgot-password-back">
          Back to login
        </Button>

        <Text type="secondary" className="forgot-password-note">
          Check your spam or junk folder if you don’t see our email within a few minutes.
        </Text>
      </Card>
    </div>
  );
};

export default ForgotPasswordRequest;
