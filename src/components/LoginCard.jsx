import { Button, Card, Form, Input } from "antd";
import { ArrowRightOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const LoginCard = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Connect your authentication API here before navigating.
    navigate("/");
  };

  return (
    <Card className="auth-card login-card" bordered={false}>
      <div className="auth-card-heading">
        <span className="auth-card-kicker">WELCOME BACK</span>
        <h2>Log in to <span>OneOrbit</span></h2>
        <p>Your business workspace is waiting for you.</p>
      </div>

      <Form form={form} layout="vertical" onFinish={handleLogin} requiredMark={false}>
        <Form.Item label="User name" name="username" rules={[{ required: true, message: "Please enter your user name." }]}>
          <Input size="large" prefix={<UserOutlined />} placeholder="Enter your user name" autoComplete="username" />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password." }]}>
          <Input.Password size="large" prefix={<LockOutlined />} placeholder="Enter your password" autoComplete="current-password" />
        </Form.Item>

        <div className="auth-form-meta">
          <span>Secure access to your workspace</span>
          <button type="button" className="auth-text-button" onClick={() => navigate("/forgot-password")}>Forgot password?</button>
        </div>

        <Button type="primary" htmlType="submit" size="large" block className="auth-submit">
          Log in <ArrowRightOutlined />
        </Button>
      </Form>

      <div className="auth-card-bottom">
        <span>New to OneOrbit?</span>
        <button type="button" className="auth-text-button" onClick={() => navigate("/signup")}>Create an account</button>
      </div>
    </Card>
  );
};

export default LoginCard;
