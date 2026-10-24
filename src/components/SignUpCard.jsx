import { Button, Card, Form, Input, Row, Col } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined, MailOutlined, PhoneOutlined, UserOutlined, EnvironmentOutlined } from "@ant-design/icons";
import axios from "axios";

const SignUpCard = ({ companyType, onSuccess, onBack }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    const payload = { ...values, companyType };
    try {
      // Replace this URL with your real registration endpoint.
      // await axios.post("/api/signup", payload);
      console.info("Signup payload ready:", { ...payload, password: undefined });
      onSuccess?.();
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <Card className="auth-card signup-form-card" bordered={false}>
      <button type="button" className="auth-back-button" onClick={onBack}><ArrowLeftOutlined /> Change business type</button>
      <div className="auth-card-heading">
        <span className="auth-card-kicker">YOUR NEXT CHAPTER STARTS HERE</span>
        <h2>Create your <span>account</span></h2>
        <p>Tell us a little about yourself and your business.</p>
      </div>

      <Form layout="vertical" form={form} onFinish={handleSubmit} requiredMark={false}>
        <Row gutter={[18, 0]}>
          <Col xs={24} md={12}>
            <Form.Item label="First name" name="firstName" rules={[{ required: true, message: "Enter your first name." }]}>
              <Input size="large" prefix={<UserOutlined />} placeholder="First name" autoComplete="given-name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Last name" name="lastName" rules={[{ required: true, message: "Enter your last name." }]}>
              <Input size="large" placeholder="Last name" autoComplete="family-name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Work email" name="email" rules={[{ required: true, type: "email", message: "Enter a valid email address." }]}>
              <Input size="large" prefix={<MailOutlined />} placeholder="you@company.com" autoComplete="email" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Mobile number" name="mobile" rules={[{ required: true, message: "Enter your mobile number." }]}>
              <Input size="large" prefix={<PhoneOutlined />} placeholder="Mobile number" autoComplete="tel" />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item label="Business address" name="address" rules={[{ required: true, message: "Enter your business address." }]}>
              <Input size="large" prefix={<EnvironmentOutlined />} placeholder="Street, city and postal code" autoComplete="street-address" />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <div className="signup-selected-type">Selected business type <strong>{companyType?.replace("-", " ")}</strong></div>
          </Col>
          <Col xs={24}>
            <Button type="primary" htmlType="submit" size="large" block className="auth-submit">
              Create account <ArrowRightOutlined />
            </Button>
          </Col>
        </Row>
      </Form>
      <p className="auth-privacy-note">Your details are used to set up your OneOrbit workspace.</p>
    </Card>
  );
};

export default SignUpCard;
