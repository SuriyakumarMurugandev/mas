
import { useState } from "react";
import {Image,Card,Form,Input,Select,Button,Row,Col,Steps,Space,Typography,Divider,Popconfirm,Tag,message} from "antd";
import {ArrowLeftOutlined,ArrowRightOutlined,PlusOutlined,DeleteOutlined,BankOutlined,ShopOutlined,
    EnvironmentOutlined,UserOutlined,MailOutlined,PhoneOutlined,LockOutlined,CheckCircleOutlined,CheckOutlined,} from "@ant-design/icons";
import { register } from "../api/Service/AuthService/AuthService";
import background from "../assets/signup-back.png";
import Logo from "../assets/Logowhite.png";
import "./AuthPages.css";
import tamilNaduLocations from "../api/data/tamilNaduLocations.json";
import { useNavigate } from "react-router-dom";


const { Title, Text } = Typography;

const BUSINESS_TYPES = [
  { value: "medical", label: "Medical Shop" },
  { value: "hospital", label: "Hospital" },
  { value: "departmental", label: "Departmental Store" },
  { value: "restaurant", label: "Restaurant" },
];

const createBranch = () => ({
  branchName: "",
  address: "",
  district: "",
  taluk: ""
});

const createBusiness = () => ({
  businessName: "",
  businessType: undefined,
  branches: [createBranch()],
});

const SUBSCRIPTION_PLANS = [
  {
    id: 1,
    code: "trial",
    name: "Trial Plan",
    description: "14-day trial",
    price: 0,
    billingCycle: "trial",
    durationDays: 14,
    maxUsers: 5,
    maxBranches: 1,
    featured: false,
  },
  {
    id: 2,
    code: "basic",
    name: "Basic Plan",
    description: "Small business",
    price: 499,
    billingCycle: "monthly",
    durationDays: null,
    maxUsers: 5,
    maxBranches: 1,
    featured: false,
  },
  {
    id: 3,
    code: "pro",
    name: "Pro Plan",
    description: "Growing business",
    price: 1999,
    billingCycle: "monthly",
    durationDays: null,
    maxUsers: 50,
    maxBranches: 10,
    featured: true,
  },
  {
    id: 4,
    code: "enterprise",
    name: "Enterprise Plan",
    description: "Large business",
    price: 9999,
    billingCycle: "yearly",
    durationDays: null,
    maxUsers: null,
    maxBranches: null,
    featured: false,
  },
];

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

const initialOrganization = {
  organizationName: "",
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  address: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  // const { message } = App.useApp();
  const [form] = Form.useForm();

  const [currentStep, setCurrentStep] = useState(0);
  const [organization, setOrganization] = useState(
    initialOrganization
  );
  const [businesses, setBusinesses] = useState([
    createBusiness(),
  ]);
  const [selectedPlanCode, setSelectedPlanCode] = useState("trial");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const updateBusiness = (businessIndex, field, value) => {
    setBusinesses((previous) =>
      previous.map((business, index) =>
        index === businessIndex
          ? { ...business, [field]: value }
          : business
      )
    );
  };

  const addBusiness = () => {
    setBusinesses((previous) => [
      ...previous,
      createBusiness(),
    ]);
  };

  const removeBusiness = (businessIndex) => {
    setBusinesses((previous) =>
      previous.filter((_, index) => index !== businessIndex)
    );
  };

const updateBranch = (
  businessIndex,
  branchIndex,
  fieldOrChanges,
  value
) => {
  // Supports both updateBranch(businessIndex, branchIndex, { district })
  // and updateBranch(businessIndex, branchIndex, "branchName", value).
  const changes =
    typeof fieldOrChanges === "string"
      ? { [fieldOrChanges]: value }
      : fieldOrChanges;

  setBusinesses((previous) =>
    previous.map((business, bIndex) => {
      if (bIndex !== businessIndex) return business;

      return {
        ...business,
        branches: business.branches.map((branch, brIndex) =>
          brIndex === branchIndex
            ? { ...branch, ...changes }
            : branch
        ),
      };
    })
  );
};

  const addBranch = (businessIndex) => {
    setBusinesses((previous) =>
      previous.map((business, index) =>
        index === businessIndex
          ? {
              ...business,
              branches: [
                ...business.branches,
                createBranch(),
              ],
            }
          : business
      )
    );
  };

  const removeBranch = (businessIndex, branchIndex) => {
    setBusinesses((previous) =>
      previous.map((business, index) =>
        index === businessIndex
          ? {
              ...business,
              branches: business.branches.filter(
                (_, bIndex) => bIndex !== branchIndex
              ),
            }
          : business
      )
    );
  };

  const validateBusinesses = () => {
    if (businesses.length === 0) {
      message.error("Add at least one business.");
      return false;
    }

    for (let i = 0; i < businesses.length; i += 1) {
      const business = businesses[i];

      if (!business.businessName.trim()) {
        message.error(`Enter a name for Business ${i + 1}.`);
        return false;
      }

      if (!business.businessType) {
        message.error(`Select a type for Business ${i + 1}.`);
        return false;
      }

      if (business.branches.length === 0) {
        message.error(
          `Add at least one branch to ${business.businessName}.`
        );
        return false;
      }

      for (let j = 0; j < business.branches.length; j += 1) {
        const branch = business.branches[j];

        if (!branch.branchName.trim() || !branch.address.trim()) {
          message.error(
            `Complete the name and address of Branch ${j + 1} in ${business.businessName}.`
          );
          return false;
        }
        if (!branch.district) {
          message.error(
            `Select a district for Branch ${j + 1} in ${business.businessName}.`
          );
          return false;
        }

        if (!branch.taluk) {
          message.error(
            `Select a taluk for Branch ${j + 1} in ${business.businessName}.`
          );
          return false;
        }
      }
    }

    return true;
  };

  const nextStep = async () => {
    if (currentStep === 0) {
      try {
        const values = await form.validateFields();

        setOrganization(values);
        setCurrentStep(1);
      } catch {
        // Ant Design displays validation errors.
      }

      return;
    }

    if (currentStep === 1) {
      if (!validateBusinesses()) return;
      setCurrentStep(2);
      return;
    }

    if (currentStep === 2) {
      if (!selectedPlanCode) {
        message.error("Please select a subscription plan.");
        return;
      }
      setCurrentStep(3);
    }
  };

  const previousStep = () => {
    setCurrentStep((step) => Math.max(0, step - 1));
  };

const handleSubmit = async () => {
  if (!validateBusinesses()) {
    setCurrentStep(1);
    return;
  }

  const selectedPlan = SUBSCRIPTION_PLANS.find(
    (plan) => plan.code === selectedPlanCode
  );

  if (!selectedPlan) {
    message.error("Please select a valid subscription plan.");
    return;
  }

  const payload = {
    organization: {
      organizationName: organization.organizationName,
      firstName: organization.firstName,
      lastName: organization.lastName,
      email: organization.email,
      mobile: organization.mobile,
      address: organization.address,
      password: organization.password,
    },
    businesses: businesses.map((business) => ({
      businessName: business.businessName.trim(),
      businessType: business.businessType,
      branches: business.branches.map((branch) => ({
        branchName: branch.branchName.trim(),
        address: branch.address.trim(),
        district: branch.district,
        taluk: branch.taluk,
      })),
    })),
    subscription: {
      planId: selectedPlan.id,
      planCode: selectedPlan.code,
      billingCycle: selectedPlan.billingCycle,
    },
  };

  try {
    setSubmitting(true);

    const response = await register(payload);

    // Supports either a direct object or an Axios response.
    const result = response?.data ?? response;

    if (result?.success === true) {
      message.success(
        result.message || "Organization registered successfully."
      );
      navigate('/login')
      // Optionally navigate to the login page here.
    } else {
      message.error(
        result?.message || "Registration failed. Please try again."
      );
    }
  } catch (error) {
    console.error("Registration request failed:", error);

    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Unable to register. Please try again.";

    message.error(errorMessage);
  } finally {
    setSubmitting(false);
  }
};

  return (
    <main
      className="auth-page signup-page"
      style={{ "--auth-background": `url(${background})` }}
    >
      <div className="auth-background-overlay" />

      <a className="signup-logo" href="/" aria-label="OneOrbit home">
        <Image src={Logo} preview={false} alt="OneOrbit" />
      </a>

      <div className="signup-content-wrap">
        <div className="signup-page-heading">
          <span className="auth-eyebrow">
            <span /> GET YOUR BUSINESS CONNECTED
          </span>

          <h1>
            Let’s build your <span>workspace.</span>
          </h1>

          <p>
            Register your organization, businesses and branches
            in one place.
          </p>
        </div>

        <div className="signup-content-row">
          <Card className="auth-card signup-form-card" bordered={false}>
            {/* <Steps
              current={currentStep}
              size="small"
              items={[
                { title: "Organization" },
                { title: "Businesses" },
                { title: "Subscription" },
                { title: "Review" },
              ]}
            />

            <Divider /> */}

            {currentStep === 0 && (
              <>
                <div className="auth-card-heading">
                  <span className="auth-card-kicker">
                    STEP 01 / ORGANIZATION
                  </span>
                  <Title level={3}>Organization details</Title>
                  <Text type="secondary">
                    Create your organization owner account.
                  </Text>
                </div>

                <Form
                  form={form}
                  layout="vertical"
                  requiredMark={false}
                  initialValues={organization}
                >
                  <Row gutter={[16, 0]}>
                    <Col xs={24}>
                      <Form.Item
                        label="Organization name"
                        name="organizationName"
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "Enter your organization name.",
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          prefix={<BankOutlined />}
                          placeholder="e.g. Velan Enterprises"
                        />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item
                        label="First name"
                        name="firstName"
                        rules={[
                          { required: true, whitespace: true },
                        ]}
                      >
                        <Input
                          size="large"
                          prefix={<UserOutlined />}
                          placeholder="First name"
                        />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Last name"
                        name="lastName"
                        rules={[
                          { required: true, whitespace: true },
                        ]}
                      >
                        <Input
                          size="large"
                          placeholder="Last name"
                        />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Work email"
                        name="email"
                        rules={[
                          { required: true, type: "email" },
                        ]}
                      >
                        <Input
                          size="large"
                          prefix={<MailOutlined />}
                          placeholder="you@company.com"
                        />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Mobile number"
                        name="mobile"
                        rules={[{ required: true, whitespace: true }]}
                      >
                        <Input
                          size="large"
                          prefix={<PhoneOutlined />}
                          placeholder="Mobile number"
                        />
                      </Form.Item>
                    </Col>

                    <Col xs={24}>
                      <Form.Item
                        label="Organization address"
                        name="address"
                        rules={[
                          { required: true, whitespace: true },
                        ]}
                      >
                        <Input
                          size="large"
                          prefix={<EnvironmentOutlined />}
                          placeholder="Street, city and postal code"
                        />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                          { required: true },
                          {
                            min: 8,
                            message: "Use at least 8 characters.",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input.Password
                          size="large"
                          prefix={<LockOutlined />}
                          autoComplete="new-password"
                          placeholder="Create password"
                        />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Confirm password"
                        name="confirmPassword"
                        dependencies={["password"]}
                        rules={[
                          { required: true },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue("password") === value
                              ) {
                                return Promise.resolve();
                              }

                              return Promise.reject(
                                new Error("Passwords do not match.")
                              );
                            },
                          }),
                        ]}
                        hasFeedback
                      >
                        <Input.Password
                          size="large"
                          autoComplete="new-password"
                          placeholder="Confirm password"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </>
            )}

            {currentStep === 1 && (
              <>
                <div className="auth-card-heading">
                  <span className="auth-card-kicker">
                    STEP 02 / BUSINESS SETUP
                  </span>
                  <Title level={3}>Your businesses</Title>
                  <Text type="secondary">
                    Add each business and its branches. Every business
                    must have at least one branch.
                  </Text>
                </div>

                <Space direction="vertical" size="large" className="signup-business-list">
                  {businesses.map((business, businessIndex) => (
                    <Card
                      key={businessIndex}
                      size="small"
                      title={
                        <Space>
                          <ShopOutlined />
                          Business {businessIndex + 1}
                          <Tag>{business.branches.length} branches</Tag>
                        </Space>
                      }
                      extra={
                        businesses.length > 1 && (
                          <Popconfirm
                            title="Remove this business and its branches?"
                            onConfirm={() =>
                              removeBusiness(businessIndex)
                            }
                          >
                            <Button
                              danger
                              type="text"
                              icon={<DeleteOutlined />}
                              aria-label="Remove business"
                            />
                          </Popconfirm>
                        )
                      }
                    >
                      <Row gutter={[12, 0]}>
                        <Col xs={24} md={12}>
                          <label className="signup-field-label">
                            Business name
                          </label>
                          <Input
                            size="large"
                            value={business.businessName}
                            placeholder="e.g. Velan Medicals"
                            onChange={(event) =>
                              updateBusiness(
                                businessIndex,
                                "businessName",
                                event.target.value
                              )
                            }
                          />
                        </Col>

                        <Col xs={24} md={12}>
                          <label className="signup-field-label">
                            Business type
                          </label>
                          <Select
                            size="large"
                            className="signup-full-width"
                            value={business.businessType}
                            options={BUSINESS_TYPES}
                            placeholder="Select business type"
                            onChange={(value) =>
                              updateBusiness(
                                businessIndex,
                                "businessType",
                                value
                              )
                            }
                          />
                        </Col>
                      </Row>
                      <Divider orientation="left" plain>
                        Branches
                      </Divider>

                      <Space
                        direction="vertical"
                        size="middle"
                        className="signup-full-width"
                      >
                        {business.branches.map((branch, branchIndex) => (
                          <Card
                            key={branchIndex}
                            size="small"
                            className="signup-branch-card"
                            title={`Branch ${branchIndex + 1}`}
                            extra={
                              business.branches.length > 1 && (
                                <Button
                                  danger
                                  type="text"
                                  icon={<DeleteOutlined />}
                                  aria-label="Remove branch"
                                  onClick={() =>
                                    removeBranch(
                                      businessIndex,
                                      branchIndex
                                    )
                                  }
                                />
                              )
                            }
                          >
                            <Form layout="vertical" component={false}>
                              <Row gutter={[12, 0]}>
                                <Col xs={24}>
                                  <Form.Item
                                    label="Branch name"
                                    required
                                  >
                                    <Input
                                      size="large"
                                      value={branch.branchName}
                                      placeholder="e.g. Coimbatore Main Branch"
                                      onChange={(event) =>
                                        updateBranch(
                                          businessIndex,
                                          branchIndex,
                                          "branchName",
                                          event.target.value
                                        )
                                      }
                                    />
                                  </Form.Item>
                                </Col>

                                <Col xs={24}>
                                  <Form.Item
                                    label="Branch address"
                                    required
                                  >
                                    <Input
                                      size="large"
                                      prefix={<EnvironmentOutlined />}
                                      value={branch.address}
                                      placeholder="Street, city and postal code"
                                      onChange={(event) =>
                                        updateBranch(
                                          businessIndex,
                                          branchIndex,
                                          "address",
                                          event.target.value
                                        )
                                      }
                                    />
                                  </Form.Item>
                                </Col>

                                <Col xs={24} md={12}>
                                  <Form.Item label="District" required>
                                    <Select
                                      size="large"
                                      placeholder="Select district"
                                      value={branch.district || undefined}
                                      options={Object.keys(
                                        tamilNaduLocations["Tamil Nadu"]
                                      ).map((district) => ({
                                        label: district,
                                        value: district,
                                      }))}
                                      onChange={(district) =>
                                        updateBranch(
                                          businessIndex,
                                          branchIndex,
                                          {
                                            district,
                                            taluk: "",
                                          }
                                        )
                                      }
                                    />
                                  </Form.Item>
                                </Col>

                                <Col xs={24} md={12}>
                                  <Form.Item label="Taluk" required>
                                    <Select
                                      size="large"
                                      placeholder={
                                        branch.district
                                          ? "Select taluk"
                                          : "Select district first"
                                      }
                                      disabled={!branch.district}
                                      value={branch.taluk || undefined}
                                      options={(
                                        tamilNaduLocations["Tamil Nadu"][
                                          branch.district
                                        ] || []
                                      ).map((taluk) => ({
                                        label: taluk,
                                        value: taluk,
                                      }))}
                                      onChange={(taluk) =>
                                        updateBranch(
                                          businessIndex,
                                          branchIndex,
                                          { taluk }
                                        )
                                      }
                                    />
                                  </Form.Item>
                                </Col>
                              </Row>
                            </Form>
                          </Card>
                        ))}
                      </Space>

                      <Button
                        type="dashed"
                        block
                        icon={<PlusOutlined />}
                        onClick={() => addBranch(businessIndex)}
                        style={{ marginTop: 16 }}
                      >
                        Add branch
                      </Button>
                    </Card>
                  ))}
                </Space>

                <Button
                  type="dashed"
                  block
                  size="large"
                  icon={<PlusOutlined />}
                  onClick={addBusiness}
                  style={{ marginTop: 20 }}
                >
                  Add another business
                </Button>
              </>
            )}

            {currentStep === 2 && (
              <>
                <div className="auth-card-heading">
                  <span className="auth-card-kicker">
                    STEP 03 / SUBSCRIPTION
                  </span>
                  <Title level={3}>Choose your plan</Title>
                  <Text type="secondary">
                    Select the subscription that fits your organization. You can review your choice before creating the workspace.
                  </Text>
                </div>

                <Row gutter={[16, 16]}>
                  {SUBSCRIPTION_PLANS.map((plan) => {
                    const selected = selectedPlanCode === plan.code;
                    return (
                      <Col xs={24} sm={12} key={plan.code}>
                        <Card
                          hoverable
                          onClick={() => setSelectedPlanCode(plan.code)}
                          style={{
                            height: "100%",
                            cursor: "pointer",
                            border: selected ? "2px solid #314F9D" : "1px solid #e5e7eb",
                            boxShadow: selected ? "0 0 0 2px rgba(49,79,157,0.08)" : "none",
                          }}
                          bodyStyle={{ padding: 20 }}
                        >
                          <Space direction="vertical" size={10} style={{ width: "100%" }}>
                            <Row align="middle" justify="space-between" wrap={false}>
                              <Title level={4} style={{ margin: 0 }}>{plan.name}</Title>
                              {selected ? <CheckCircleOutlined style={{ color: "#314F9D", fontSize: 20 }} /> : null}
                            </Row>
                            {plan.featured && <Tag color="blue">RECOMMENDED</Tag>}
                            <Text type="secondary">{plan.description}</Text>
                            <div>
                              <Title level={2} style={{ margin: "4px 0" }}>
                                {formatPrice(plan.price)}
                                <Text type="secondary" style={{ fontSize: 13, fontWeight: 400 }}>
                                  {plan.billingCycle === "monthly" ? " / month" : plan.billingCycle === "yearly" ? " / year" : " / 14 days"}
                                </Text>
                              </Title>
                            </div>
                            <Divider style={{ margin: "4px 0" }} />
                            <Space direction="vertical" size={8}>
                              <Text><CheckOutlined /> {plan.maxUsers == null ? "Unlimited users" : `${plan.maxUsers} users included`}</Text>
                              <Text><CheckOutlined /> {plan.maxBranches == null ? "Unlimited branches" : `${plan.maxBranches} branch${plan.maxBranches === 1 ? "" : "es"} included`}</Text>
                              {plan.durationDays && <Text><CheckOutlined /> {plan.durationDays}-day trial period</Text>}
                            </Space>
                            <Button
                              block
                              type={selected ? "primary" : "default"}
                              onClick={(event) => {
                                event.stopPropagation();
                                setSelectedPlanCode(plan.code);
                              }}
                            >
                              {selected ? "Selected plan" : "Choose plan"}
                            </Button>
                          </Space>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </>
            )}

            {currentStep === 3 && (
              <>
                <div className="auth-card-heading">
                  <span className="auth-card-kicker">
                    STEP 04 / FINAL REVIEW
                  </span>
                  <Title level={3}>Review your workspace</Title>
                  <Text type="secondary">
                    Check your organization, branches and subscription before creating your account.
                  </Text>
                </div>

                <Card size="small" title="Organization">
                  <Text strong>{organization.organizationName}</Text>
                  <br />
                  <Text>
                    {organization.firstName} {organization.lastName}
                  </Text>
                  <br />
                  <Text type="secondary">{organization.email}</Text>
                  <br />
                  <Text type="secondary">{organization.mobile}</Text>
                  <br />
                  <Text type="secondary">{organization.address}</Text>
                </Card>

                <Divider />

                {(() => {
                  const selectedPlan = SUBSCRIPTION_PLANS.find(
                    (plan) => plan.code === selectedPlanCode
                  );
                  return (
                    <Card size="small" title="Subscription plan" style={{ marginBottom: 16 }}>
                      <Row align="middle" justify="space-between" gutter={[12, 8]}>
                        <Col>
                          <Title level={5} style={{ margin: 0 }}>{selectedPlan?.name}</Title>
                          <Text type="secondary">{selectedPlan?.description}</Text>
                        </Col>
                        <Col>
                          <Title level={4} style={{ margin: 0 }}>
                            {formatPrice(selectedPlan?.price ?? 0)}
                            <Text type="secondary" style={{ fontSize: 12, fontWeight: 400 }}>
                              {selectedPlan?.billingCycle === "monthly" ? " / month" : selectedPlan?.billingCycle === "yearly" ? " / year" : " / 14 days"}
                            </Text>
                          </Title>
                        </Col>
                      </Row>
                      <Text type="secondary">
                        {selectedPlan?.maxUsers == null ? "Unlimited users" : `${selectedPlan?.maxUsers} users`} · {selectedPlan?.maxBranches == null ? "Unlimited branches" : `${selectedPlan?.maxBranches} branches`}
                      </Text>
                      <div style={{ marginTop: 8 }}>
                        <Button type="link" onClick={() => setCurrentStep(2)} style={{ padding: 0 }}>Change plan</Button>
                      </div>
                    </Card>
                  );
                })()}

                <Title level={5}>
                  Businesses ({businesses.length})
                </Title>

                {businesses.map((business, index) => (
                  <Card
                    key={index}
                    size="small"
                    style={{ marginBottom: 12 }}
                    title={business.businessName}
                    extra={
                      <Tag color="blue">
                        {
                          BUSINESS_TYPES.find(
                            (type) =>
                              type.value === business.businessType
                          )?.label
                        }
                      </Tag>
                    }
                  >
                    {business.branches.map((branch, branchIndex) => (
                      <div key={branchIndex} style={{ marginBottom: 12 }}>
                        <Space align="start">
                          <EnvironmentOutlined />
                          <div>
                            <Text strong>{branch.branchName}</Text>
                            <br />
                            <Text type="secondary">
                              {branch.address}
                            </Text>
                            <br />
                            <Text type="secondary">
                              {branch.taluk}, {branch.district}
                            </Text>
                          </div>
                        </Space>
                      </div>
                    ))}
                  </Card>
                ))}

                <Text type="secondary">
                  Your organization, businesses and branches will be
                  submitted together.
                </Text>
              </>
            )}

            <Divider />

            <Row justify="space-between" gutter={[12, 12]}>
              <Col>
                {currentStep > 0 && (
                  <Button
                    size="large"
                    icon={<ArrowLeftOutlined />}
                    onClick={previousStep}
                    disabled={submitting}
                  >
                    Back
                  </Button>
                )}
              </Col>

              <Col>
                {currentStep < 3 ? (
                  <Button
                    type="primary"
                    size="large"
                    onClick={nextStep}
                  >
                    Continue <ArrowRightOutlined />
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    size="large"
                    loading={submitting}
                    icon={<CheckCircleOutlined />}
                    onClick={handleSubmit}
                  >
                    Create workspace
                  </Button>
                )}
              </Col>
            </Row>
          </Card>
        </div>
      </div>

      <div className="auth-footer-note signup-footer-note">
        OneOrbit <span>✳</span> Your workday, better connected.
      </div>
    </main>
  );
};

export default SignUp;
