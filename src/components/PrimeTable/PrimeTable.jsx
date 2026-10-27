
import React, { useMemo, useState } from "react";
import {
  Table,
  Input,
  Button,
  Space,
  Card,
  Typography,
  Modal,
  Form,
  Select,
  InputNumber,
  DatePicker,
  Popconfirm,
  Tag,
  Tooltip,
  Empty,
  message,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const PrimeTable = ({
  title,
  description,
  initialData = [],
  fields = [],
  rowKey = "id",
  onCreate,
  onUpdate,
  onDelete,
  extraActions,
}) => {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();

  const filteredData = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return data;

    return data.filter((record) =>
      Object.values(record).some((value) =>
        String(value ?? "").toLowerCase().includes(query)
      )
    );
  }, [data, search]);

  const openCreate = () => {
    setEditingRecord(null);
    form.resetFields();
    setModalOpen(true);
  };

  const openEdit = (record) => {
    setEditingRecord(record);

    const values = { ...record };

    fields.forEach((field) => {
      if (field.type === "date" && values[field.name]) {
        values[field.name] = dayjs(values[field.name]);
      }
    });

    form.setFieldsValue(values);
    setModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      fields.forEach((field) => {
        if (field.type === "date" && values[field.name]) {
          values[field.name] = values[field.name].format("YYYY-MM-DD");
        }
      });

      if (editingRecord) {
        const updated = { ...editingRecord, ...values };

        if (onUpdate) {
          await onUpdate(updated);
        } else {
          setData((current) =>
            current.map((item) =>
              item[rowKey] === editingRecord[rowKey] ? updated : item
            )
          );
        }

        message.success("Record updated successfully");
      } else {
        const created = {
          ...values,
          [rowKey]: `${Date.now()}`,
        };

        if (onCreate) {
          await onCreate(created);
        } else {
          setData((current) => [created, ...current]);
        }

        message.success("Record created successfully");
      }

      setModalOpen(false);
      form.resetFields();
    } catch (error) {
      // Ant Design handles field validation errors.
      if (error?.errorFields) return;

      message.error("Unable to save the record");
    }
  };

  const handleDelete = async (record) => {
    try {
      if (onDelete) {
        await onDelete(record);
      } else {
        setData((current) =>
          current.filter((item) => item[rowKey] !== record[rowKey])
        );
      }

      setSelectedRowKeys((current) =>
        current.filter((key) => key !== record[rowKey])
      );

      message.success("Record deleted successfully");
    } catch {
      message.error("Unable to delete the record");
    }
  };

  const exportCSV = () => {
    if (!filteredData.length) {
      message.info("No records to export");
      return;
    }

    const escapeCSV = (value) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const headers = fields.map((field) => field.label);
    const rows = filteredData.map((record) =>
      fields.map((field) => escapeCSV(record[field.name]))
    );

    const csv = [
      headers.map(escapeCSV).join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.csv`;
    link.click();

    URL.revokeObjectURL(url);
  };

  const renderField = (field) => {
    switch (field.type) {
      case "select":
        return (
          <Select
            placeholder={`Select ${field.label}`}
            options={(field.options || []).map((option) =>
              typeof option === "string"
                ? { label: option, value: option }
                : option
            )}
            showSearch
            optionFilterProp="label"
          />
        );

      case "number":
        return <InputNumber style={{ width: "100%" }} min={0} />;

      case "date":
        return <DatePicker style={{ width: "100%" }} />;

      case "textarea":
        return <Input.TextArea rows={3} />;

      default:
        return <Input placeholder={`Enter ${field.label}`} />;
    }
  };

  const columns = [
    ...fields.map((field) => ({
      title: field.label,
      dataIndex: field.name,
      key: field.name,
      sorter: (a, b) =>
        String(a[field.name] ?? "").localeCompare(
          String(b[field.name] ?? ""),
          undefined,
          { numeric: true }
        ),
      render: (value) => {
        if (field.type === "status") {
          const color =
            String(value).toLowerCase() === "active" ||
            String(value).toLowerCase() === "paid"
              ? "success"
              : String(value).toLowerCase() === "pending"
              ? "warning"
              : String(value).toLowerCase() === "cancelled"
              ? "error"
              : "processing";

          return <Tag color={color}>{value || "—"}</Tag>;
        }

        if (field.type === "currency" && value !== undefined) {
          return Number.isFinite(Number(value))
            ? Number(value).toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 2,
              })
            : value;
        }

        return value ?? "—";
      },
    })),
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 110,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => openEdit(record)}
            />
          </Tooltip>

          <Popconfirm
            title="Delete this record?"
            description="This action cannot be undone."
            okText="Delete"
            okButtonProps={{ danger: true }}
            onConfirm={() => handleDelete(record)}
          >
            <Tooltip title="Delete">
              <Button type="text" danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card className="prime-table-card" bordered={false}>
      <div className="prime-table-heading">
        <div>
          <Title level={4} style={{ margin: 0 }}>
            {title}
          </Title>
          {description && <Text type="secondary">{description}</Text>}
        </div>

        <Space wrap>
          {extraActions}
          <Button icon={<DownloadOutlined />} onClick={exportCSV}>
            Export
          </Button>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => setSearch("")}
          >
            Reset
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={openCreate}
          >
            Add New
          </Button>
        </Space>
      </div>

      <div className="prime-table-toolbar">
        <Input
          allowClear
          prefix={<SearchOutlined />}
          placeholder={`Search ${title.toLowerCase()}...`}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          style={{ maxWidth: 360 }}
        />

        <Text type="secondary">
          {filteredData.length} records
          {selectedRowKeys.length
            ? ` · ${selectedRowKeys.length} selected`
            : ""}
        </Text>
      </div>

      <Table
        rowKey={rowKey}
        columns={columns}
        dataSource={filteredData}
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        scroll={{ x: "max-content" }}
        size="middle"
        locale={{
          emptyText: <Empty description="No records found" />,
        }}
        pagination={{
          defaultPageSize: 10,
          pageSizeOptions: ["10", "20", "50", "100"],
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}–${range[1]} of ${total} records`,
        }}
      />

      <Modal
        title={editingRecord ? `Edit ${title}` : `Add ${title}`}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          form.resetFields();
        }}
        onOk={handleSave}
        okText={editingRecord ? "Save Changes" : "Create"}
        destroyOnHidden
        width={620}
      >
        <Form form={form} layout="vertical" requiredMark="optional">
          <div className="prime-form-grid">
            {fields.map((field) => (
              <Form.Item
                key={field.name}
                name={field.name}
                label={field.label}
                rules={[
                  {
                    required: field.required,
                    message: `${field.label} is required`,
                  },
                ]}
              >
                {renderField(field)}
              </Form.Item>
            ))}
          </div>
        </Form>
      </Modal>
    </Card>
  );
};

export default PrimeTable;
