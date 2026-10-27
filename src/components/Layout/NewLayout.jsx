
import React, { useMemo, useState } from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  Typography,
  Avatar,
  Dropdown,
  Select,
  Space,
  Button,
  Card,
  Row,
  Col,
  Statistic,
  Badge,
  Tooltip,
  message,
} from "antd";
import {
  DashboardOutlined,
  FileTextOutlined,
  TeamOutlined,
  CreditCardOutlined,
  UndoOutlined,
  BarChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  UserOutlined,
  ShopOutlined,
  EnvironmentOutlined,
  LogoutOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  InboxOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { theme } from "antd";
import UniversalTable from "../PrimeTable/PrimeTable";
import "./NewLayout.css";
import logo from "../../assets/Logowhite.png";

// Keep your existing menuItems array above this component.
const menuItems = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    label: "Dashboard",
  },

  {
    key: "sales",
    icon: <ShoppingCartOutlined />,
    label: "Sales",
    children: [
      { key: "new-invoice", label: "New Invoice" },
      { key: "sales-list", label: "Invoices / Sales List" },
      { key: "quotation", label: "Quotation" },
      { key: "sales-return", label: "Sales Return" },
    ],
  },

  {
    key: "purchase",
    icon: <InboxOutlined />,
    label: "Purchase",
    children: [
      { key: "new-purchase", label: "New Purchase" },
      { key: "purchase-list", label: "Purchase List" },
      { key: "purchase-return", label: "Purchase Return" },
    ],
  },

  {
    key: "products",
    icon: <FileTextOutlined />,
    label: "Products / Services",
    children: [
      { key: "items", label: "Items / Services" },
      { key: "categories", label: "Categories" },
      { key: "units", label: "Units" },
      { key: "price-list", label: "Price List" },
    ],
  },

  {
    key: "customers",
    icon: <UserOutlined />,
    label: "Customers",
  },

  {
    key: "suppliers",
    icon: <TeamOutlined />,
    label: "Suppliers",
  },

  {
    key: "payments",
    icon: <CreditCardOutlined />,
    label: "Payments",
    children: [
      { key: "customer-payments", label: "Customer Payments" },
      { key: "supplier-payments", label: "Supplier Payments" },
      { key: "cash-bank", label: "Cash / Bank" },
    ],
  },

  {
    key: "returns",
    icon: <UndoOutlined />,
    label: "Returns",
    children: [
      { key: "sales-returns", label: "Sales Returns" },
      { key: "purchase-returns", label: "Purchase Returns" },
    ],
  },

  {
    key: "reports",
    icon: <BarChartOutlined />,
    label: "Reports",
    children: [
      { key: "sales-report", label: "Sales Report" },
      { key: "purchase-report", label: "Purchase Report" },
      { key: "stock-report", label: "Stock Report" },
      { key: "profit-loss", label: "Profit & Loss" },
      { key: "customer-ledger", label: "Customer Ledger" },
      { key: "supplier-ledger", label: "Supplier Ledger" },
    ],
  },

  {
    key: "settings",
    icon: <SettingOutlined />,
    label: "Settings",
    children: [
      { key: "company-profile", label: "Company Profile" },
      { key: "tax-settings", label: "Tax / GST Settings" },
      { key: "users", label: "Users & Roles" },
      { key: "invoice-settings", label: "Invoice Settings" },
    ],
  },
];


const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

// Replace these sample values with data from your API.
const businesses = [
  { value: "1", label: "Velan Medicals" },
  { value: "2", label: "Velan Supermarket" },
];

const branchesByBusiness = {
  "1": [
    { value: "101", label: "Main Branch" },
    { value: "102", label: "Town Branch" },
  ],
  "2": [
    { value: "201", label: "Supermarket - Main" },
  ],
};

const profileItems = [
  {
    key: "profile",
    icon: <UserOutlined />,
    label: "My Profile",
  },
  {
    key: "settings",
    icon: <SettingOutlined />,
    label: "Account Settings",
  },
  {
    key: "logout",
    icon: <LogoutOutlined />,
    label: "Logout",
    danger: true,
  },
];

const flattenMenus = (items) =>
  items.flatMap((item) => [
    {
      key: item.key,
      label: item.label,
      icon: item.icon,
      parent: null,
    },
    ...(item.children || []).map((child) => ({
      ...child,
      parent: item.label,
    })),
  ]).filter((item, index, array) =>
    array.findIndex((entry) => entry.key === item.key) === index
  );

const pageFields = (key) => {
  const status = {
    name: "status",
    label: "Status",
    type: "select",
    options: ["Active", "Pending", "Completed", "Cancelled"],
  };

  const date = {
    name: "date",
    label: "Date",
    type: "date",
  };

  const amount = {
    name: "amount",
    label: "Amount (₹)",
    type: "number",
  };

  const customer = {
    name: "customer",
    label: "Customer",
  };

  const supplier = {
    name: "supplier",
    label: "Supplier",
  };

  const invoice = {
    name: "invoiceNo",
    label: "Reference No.",
  };

  const product = {
    name: "product",
    label: "Product / Service",
  };

  if (key === "items") {
    return [
      { name: "name", label: "Item Name", required: true },
      { name: "sku", label: "SKU / Code", required: true },
      {
        name: "category",
        label: "Category",
        type: "select",
        options: ["General", "Medicine", "Grocery", "Services"],
      },
      { name: "unit", label: "Unit" },
      amount,
      { name: "stock", label: "Stock Quantity", type: "number" },
      status,
    ];
  }

  if (key === "categories") {
    return [
      { name: "name", label: "Category Name", required: true },
      { name: "description", label: "Description", type: "textarea" },
      status,
    ];
  }

  if (key === "units") {
    return [
      { name: "name", label: "Unit Name", required: true },
      { name: "shortName", label: "Short Name", required: true },
      status,
    ];
  }

  if (key === "price-list") {
    return [
      product,
      { name: "priceType", label: "Price Type" },
      amount,
      date,
      status,
    ];
  }

  if (["new-invoice", "sales-list", "quotation", "sales-returns",
       "sales-return"].includes(key)) {
    return [
      invoice,
      customer,
      date,
      product,
      { name: "quantity", label: "Quantity", type: "number" },
      amount,
      status,
    ];
  }

  if (["new-purchase", "purchase-list", "purchase-return",
       "purchase-returns"].includes(key)) {
    return [
      invoice,
      supplier,
      date,
      product,
      { name: "quantity", label: "Quantity", type: "number" },
      amount,
      status,
    ];
  }

  if (["customers", "suppliers"].includes(key)) {
    const isCustomer = key === "customers";

    return [
      {
        name: "name",
        label: isCustomer ? "Customer Name" : "Supplier Name",
        required: true,
      },
      { name: "phone", label: "Phone Number", required: true },
      { name: "email", label: "Email", type: "email" },
      { name: "address", label: "Address", type: "textarea" },
      { name: "balance", label: "Opening Balance", type: "number" },
      status,
    ];
  }

  if (["customer-payments", "supplier-payments", "cash-bank"].includes(key)) {
    return [
      invoice,
      {
        name: "party",
        label: "Customer / Supplier / Account",
        required: true,
      },
      date,
      {
        name: "paymentMode",
        label: "Payment Mode",
        type: "select",
        options: ["Cash", "UPI", "Bank Transfer", "Card", "Cheque"],
      },
      amount,
      status,
    ];
  }

  if (key === "users") {
    return [
      { name: "name", label: "Full Name", required: true },
      { name: "email", label: "Email", required: true },
      { name: "role", label: "Role", required: true },
      { name: "branch", label: "Branch" },
      status,
    ];
  }

  if (key === "company-profile") {
    return [
      { name: "name", label: "Company Name", required: true },
      { name: "gstin", label: "GSTIN" },
      { name: "phone", label: "Phone Number" },
      { name: "email", label: "Email" },
      { name: "address", label: "Address", type: "textarea" },
    ];
  }

  if (key === "tax-settings") {
    return [
      { name: "name", label: "Tax Name", required: true },
      { name: "taxRate", label: "Tax Rate (%)", type: "number" },
      status,
    ];
  }

  if (key === "invoice-settings") {
    return [
      { name: "name", label: "Invoice Title", required: true },
      { name: "prefix", label: "Invoice Prefix" },
      { name: "nextNumber", label: "Next Number", type: "number" },
    ];
  }

  if (key.includes("ledger")) {
    return [
      { name: "party", label: "Customer / Supplier" },
      date,
      invoice,
      { name: "debit", label: "Debit (₹)", type: "number" },
      { name: "credit", label: "Credit (₹)", type: "number" },
    ];
  }

  if (key.includes("report") || key === "profit-loss") {
    return [
      date,
      { name: "reference", label: "Reference" },
      { name: "description", label: "Description" },
      amount,
      status,
    ];
  }

  return [
    { name: "name", label: "Name", required: true },
    { name: "description", label: "Description", type: "textarea" },
    date,
    amount,
    status,
  ];
};

const DashboardHome = () => (
  <div className="dashboard-home">
    <div className="dashboard-welcome">
      <div>
        <Text className="welcome-eyebrow">BUSINESS OVERVIEW</Text>
        <Title level={2}>Welcome back!</Title>
        <Text type="secondary">
          Here's what's happening with your business today.
        </Text>
      </div>

      <Button type="primary" icon={<PlusOutlined />}>
        Create New
      </Button>
    </div>

    <Row gutter={[16, 16]}>
      {[
        {
          title: "Total Sales",
          value: 125000,
          prefix: "₹",
          icon: <DollarOutlined />,
          color: "#314F9D",
        },
        {
          title: "Purchases",
          value: 68500,
          prefix: "₹",
          icon: <ShoppingCartOutlined />,
          color: "#0D9488",
        },
        {
          title: "Total Customers",
          value: 248,
          icon: <UserOutlined />,
          color: "#7C3AED",
        },
        {
          title: "Stock Items",
          value: 1240,
          icon: <InboxOutlined />,
          color: "#D97706",
        },
      ].map((item) => (
        <Col xs={24} sm={12} xl={6} key={item.title}>
          <Card className="stat-card" bordered={false}>
            <div className="stat-icon" style={{ color: item.color }}>
              {item.icon}
            </div>
            <Statistic
              title={item.title}
              value={item.value}
              prefix={item.prefix}
              precision={0}
              groupSeparator=","
            />
            <Text type="secondary" className="stat-caption">
              Current selected business
            </Text>
          </Card>
        </Col>
      ))}
    </Row>

    <Card bordered={false} className="dashboard-placeholder">
      <Title level={4}>Business activity</Title>
      <Text type="secondary">
        Connect your sales, purchases and inventory APIs to display
        real-time activity and performance charts here.
      </Text>
    </Card>
  </div>
);

const UserProfile = ({ onLogout }) => (
  <Card className="prime-table-card" bordered={false}>
    <Title level={4}>My Profile</Title>
    <div className="profile-summary">
      <Avatar size={76} icon={<UserOutlined />} />
      <div>
        <Title level={5} style={{ marginBottom: 4 }}>
          Account User
        </Title>
        <Text type="secondary">user@example.com</Text>
        <div>
          <Badge status="success" text="Active account" />
        </div>
      </div>
    </div>

    <Text type="secondary">
      Load and update profile details using your authenticated user API.
    </Text>

    <div style={{ marginTop: 24 }}>
      <Button danger icon={<LogoutOutlined />} onClick={onLogout}>
        Logout
      </Button>
    </div>
  </Card>
);

const NewLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [businessId, setBusinessId] = useState("1");
  const [branchId, setBranchId] = useState("101");

  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const allPages = useMemo(() => flattenMenus(menuItems), []);

  const selectedPage = allPages.find(
    (page) => page.key === selectedKey
  );

  const parentPage = menuItems.find((item) =>
    item.children?.some((child) => child.key === selectedKey)
  );

  const handleBusinessChange = (value) => {
    setBusinessId(value);
    const nextBranch = branchesByBusiness[value]?.[0]?.value;
    setBranchId(nextBranch || undefined);
  };

  const handleProfileAction = ({ key }) => {
    if (key === "profile") {
      setSelectedKey("my-profile");
    } else if (key === "settings") {
      setSelectedKey("settings");
    } else if (key === "logout") {
      // Replace this with your authentication/logout API.
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      message.success("Logged out");
      navigate("/login", { replace: true });
    }
  };

  const activeBranchOptions = branchesByBusiness[businessId] || [];

  const renderPage = () => {
    if (selectedKey === "dashboard") {
      return <DashboardHome />;
    }

    if (selectedKey === "my-profile") {
      return (
        <UserProfile
          onLogout={() => handleProfileAction({ key: "logout" })}
        />
      );
    }

    const title =
      selectedPage?.label ||
      (selectedKey === "settings" ? "Account Settings" : "Workspace");

    return (
      <UniversalTable
        key={`${businessId}-${branchId}-${selectedKey}`}
        title={title}
        description={`Manage ${title.toLowerCase()} for your selected business and branch.`}
        fields={pageFields(selectedKey)}
        initialData={[]}
        extraActions={
          selectedKey.includes("report") ||
          selectedKey === "profit-loss" ||
          selectedKey.includes("ledger") ? (
            <Button>Filter Dates</Button>
          ) : null
        }
      />
    );
  };

  return (
    <Layout className="oneorbit-layout">
      <Sider
        collapsible
        collapsed={collapsed}
        trigger={null}
        width={250}
        collapsedWidth={76}
        className="custom-sider"
      >
        <div className="sider-logo">
          <img
            src={logo}
            alt="OneOrbit"
            className={collapsed ? "logo-collapsed" : "logo-expanded"}
          />
        </div>

        <Menu
          mode="inline"
          items={menuItems}
          selectedKeys={[selectedKey]}
          defaultOpenKeys={parentPage ? [parentPage.key] : ["sales"]}
          inlineCollapsed={collapsed}
          className="custom-menu"
          onClick={({ key }) => setSelectedKey(key)}
        />

        {!collapsed && (
          <div className="sider-bottom">
            <Text>OneOrbit Business Suite</Text>
            <Text type="secondary">Manage smarter.</Text>
          </div>
        )}
      </Sider>

      <Layout className="oneorbit-main">
        <Header
          className="fixed-header"
          style={{ background: colorBgContainer }}
        >
          <div className="header-left">
            <Tooltip title={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
              <Button
                type="text"
                size="large"
                icon={
                  collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                }
                onClick={() => setCollapsed((value) => !value)}
              />
            </Tooltip>

            <div className="header-divider" />

            <Select
              className="business-select"
              value={businessId}
              options={businesses}
              onChange={handleBusinessChange}
              suffixIcon={<ShopOutlined />}
              popupMatchSelectWidth={false}
            />

            <Select
              className="branch-select"
              value={branchId}
              options={activeBranchOptions}
              onChange={setBranchId}
              suffixIcon={<EnvironmentOutlined />}
              placeholder="Select branch"
              popupMatchSelectWidth={false}
            />
          </div>

          <div className="header-right">
            <Tooltip title="Notifications">
              <Badge dot>
                <Button
                  type="text"
                  shape="circle"
                  size="large"
                  icon={<BellOutlined />}
                />
              </Badge>
            </Tooltip>

            <Dropdown
              menu={{
                items: profileItems,
                onClick: handleProfileAction,
              }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <button className="profile-trigger" type="button">
                <Avatar
                  size={36}
                  style={{
                    background: "#314F9D",
                    cursor: "pointer",
                  }}
                  icon={<UserOutlined />}
                />

                <div className="profile-trigger-text">
                  <Text strong>Account User</Text>
                  <Text type="secondary">Administrator</Text>
                </div>
              </button>
            </Dropdown>
          </div>
        </Header>

        <Content className="main-content">
          <Breadcrumb
            items={[
              { title: "OneOrbit" },
              ...(parentPage ? [{ title: parentPage.label }] : []),
              ...(selectedPage ? [{ title: selectedPage.label }] : []),
            ]}
          />

          <div className="workspace-content">{renderPage()}</div>
        </Content>

        <div className="fixed-footer">
          © {new Date().getFullYear()} OneOrbit. Empowering businesses
          with technology.
        </div>
      </Layout>
    </Layout>
  );
};

export default NewLayout;
