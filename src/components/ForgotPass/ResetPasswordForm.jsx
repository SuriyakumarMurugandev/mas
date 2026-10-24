import { Card, Form, Input, Button, Typography } from "antd";
import { LockOutlined } from "@ant-design/icons";
import "./ForgotPassword.css";

const { Title, Text } = Typography;

const ResetPasswordForm = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    if (values.password !== values.confirmPassword) {
      form.setFields([
        { name: "confirmPassword", errors: ["Passwords do not match"] },
      ]);
      return;
    }
    // TODO: Integrate with backend API to validate reset token and update password
    onSubmit();
  };

  return (
    <div className="forgot-password-container">
      <Card className="forgot-password-card">
        <div className="forgot-password-icon purple">
          <LockOutlined />
        </div>
        <Title level={3} className="forgot-password-heading">Set a new password</Title>

        <Form form={form} layout="vertical" onFinish={handleSubmit} className="forgot-password-form">
          <Form.Item
            name="password"
            rules={[{ required: true, min: 8, message: "Password must be at least 8 characters" }]}
          >
            <Input.Password placeholder="New password" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[{ required: true, message: "Please confirm your password" }]}
          >
            <Input.Password placeholder="Confirm password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="forgot-password-button">
            Update password
          </Button>
        </Form>

        <Text type="secondary" className="forgot-password-note">
          Use at least 8 characters with a mix of letters, numbers, and symbols.
        </Text>
      </Card>
    </div>
  );
};

export default ResetPasswordForm;
