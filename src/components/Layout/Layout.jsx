import React, { useState } from "react";
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  UserOutlined,
  TeamOutlined,
  InboxOutlined,
  CreditCardOutlined,
  BarChartOutlined,
  SettingOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Breadcrumb, theme, Image, Flex } from "antd";
import './Layout.css';
import logo from '../../assets/Logowhite.png'

const { Header, Content, Footer, Sider } = Layout;

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

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
<Sider
  collapsible
  collapsed={collapsed}
  onCollapse={setCollapsed}
  className="custom-sider"
  width={220}
>
  {/* Fixed logo */}
  <div className="sider-logo">
    <Image src={logo} preview={false} style={{ height: 40 }} />
  </div>

  {/* Scrollable menu */}
  <Menu
    mode="inline"
    items={menuItems}
    className="custom-menu sider-menu"
  />
</Sider>


      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer,height:50 }} className="fixed-header"  />

        <Content style={{ margin: "0 16px", }} className="main-content">
          <Breadcrumb
            style={{ margin: "16px 0" }}
            items={[{ title: "User" }, { title: "Bill" }]}
          />

          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Bill is a cat.
          </div>
        </Content>

        <Footer style={{ textAlign: "center" }} className="fixed-footer">
          BK Coders ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
