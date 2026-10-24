import { Card, Row, Col, Typography } from "antd";
import {
  MedicineBoxOutlined, ShopOutlined, HomeOutlined, CoffeeOutlined,
  ArrowRightOutlined, CheckCircleFilled
} from "@ant-design/icons";
import { useState } from "react";

const { Title, Text } = Typography;

const businessTypes = [
  { id: "medical", title: "Medical Shop", description: "Manage pharmacy operations", icon: <MedicineBoxOutlined />, tone: "mint" },
  { id: "hospital", title: "Hospital", description: "Bring care teams together", icon: <HomeOutlined />, tone: "blue" },
  { id: "departmental", title: "Departmental Store", description: "Keep retail operations organized", icon: <ShopOutlined />, tone: "amber" },
  { id: "restaurant", title: "Restaurant", description: "Connect your dining business", icon: <CoffeeOutlined />, tone: "rose" },
];

export default function CompanyTypeSelection({ onSelect }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (id) => {
    setSelected(id);
    onSelect?.(id);
  };

  return (
    <section className="business-type-section">
      <div className="business-type-heading">
        <span className="auth-card-kicker">STEP 01 / BUSINESS PROFILE</span>
        <Title level={2}>What kind of business <span>do you run?</span></Title>
        <Text type="secondary">Choose the category that best matches your business.</Text>
      </div>

      <Row gutter={[18, 18]}>
        {businessTypes.map((item) => (
          <Col xs={24} sm={12} lg={6} key={item.id}>
            <Card
              hoverable
              onClick={() => handleSelect(item.id)}
              className={`business-type-card ${selected === item.id ? "is-selected" : ""}`}
              bordered={false}
            >
              <div className={`business-type-icon ${item.tone}`}>{item.icon}</div>
              <div className="business-type-title">{item.title}</div>
              <p>{item.description}</p>
              <div className="business-type-select">
                {selected === item.id ? <CheckCircleFilled /> : <span>Select category</span>}
                {selected !== item.id && <ArrowRightOutlined />}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
}
