import { Button, Card, Form, Input, message } from "antd";
import { ArrowRightOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { login } from '../api/Service/AuthService/AuthService'

const LoginCard = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

const handleLogin = async (values) => {
  try {
    const { username, password } = values;

    const response = await login({ username, password });
    console.log("Login response:", response);

    if (!response || response.success === false) {
      message.error(response?.message || "Login failed");
      return;
    }

    // Token is inside response.data
    const result = response.data;

    if (!result || result.success === false) {
      message.error(result?.message || "Login failed");
      return;
    }

    const { token, data } = result;

    if (!token || !data?.user || !Array.isArray(data.branches)) {
      console.error("Unexpected login response structure:", response);
      message.error("Invalid login response from server");
      return;
    }

    const defaultBranch = data.branches.find(
      (branch) =>
        Number(branch.branchId) === Number(data.defaultBranchId)
    );

    if (!defaultBranch) {
      message.error("No accessible default branch found");
      return;
    }

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("subscription", JSON.stringify(data.subscription));
    localStorage.setItem("branches", JSON.stringify(data.branches));
    localStorage.setItem("activeBranch", JSON.stringify(defaultBranch));

    console.log("Login successful");
    // message.success("Login successful");
    navigate("/admin");
  } catch (error) {
    console.error("Login error:", error);

    message.error(
      error?.response?.data?.message ||
      error?.message ||
      "Unable to login. Please try again."
    );
  }
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
