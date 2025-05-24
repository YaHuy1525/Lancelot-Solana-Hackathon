import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Card,
  Avatar,
  Statistic,
  Row,
  Col,
  Divider,
  Timeline,
  Button,
  Modal,
  Table,
  Tag,
  Badge,
} from "antd";
import {
  UserOutlined,
  WalletOutlined,
  StarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  FileTextOutlined,
  DollarOutlined,
  HistoryOutlined,
  AlertOutlined,
  HourglassOutlined,
} from "@ant-design/icons";
import Navbar from "../components/Navbar";
import WalletConnectionAlert from "../components/WalletConnectionAlert";
import { useNavigate } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const { publicKey, connected } = useWallet();
  const [modalVisible, setModalVisible] = useState<string | null>(null);
  const navigate = useNavigate();

  // Mock data for ongoing jobs
  const ongoingJobs = [
    {
      key: "1",
      title: "Solana dApp Development",
      client: "0x1234...5678",
      budget: "0.86 SOL",
      deadline: "2024-04-15",
      status: "In Progress",
    },
    {
      key: "2",
      title: "NFT Marketplace Integration",
      client: "0x8765...4321",
      budget: "0.5 SOL",
      deadline: "2024-04-20",
      status: "In Progress",
    },
  ];

  // Mock data for completed jobs
  const completedJobs = [
    {
      key: "1",
      title: "Smart Contract Audit",
      client: "0x9876...5432",
      budget: "0.62 SOL",
      completedDate: "2024-03-01",
      rating: 5,
    },
    {
      key: "2",
      title: "DeFi Protocol Development",
      client: "0x2468...1357",
      budget: "0.9 SOL",
      completedDate: "2024-02-15",
      rating: 4,
    },
  ];

  // Mock data for disputes
  const disputes = [
    {
      key: "1",
      title: "Frontend Development",
      client: "0x1357...2468",
      budget: "0.8 SOL",
      issue: "Payment Delayed",
      status: "Under Review",
    },
  ];

  const ongoingColumns = [
    {
      title: "Job Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
    },
    {
      title: "Budget",
      dataIndex: "budget",
      key: "budget",
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "deadline",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <Tag color="blue">{status}</Tag>,
    },
  ];

  const completedColumns = [
    {
      title: "Job Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
    },
    {
      title: "Budget",
      dataIndex: "budget",
      key: "budget",
    },
    {
      title: "Completed Date",
      dataIndex: "completedDate",
      key: "completedDate",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => (
        <div className="flex items-center">
          <StarOutlined className="text-yellow-500 mr-1" />
          {rating}/5
        </div>
      ),
    },
  ];

  const disputeColumns = [
    {
      title: "Job Title",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: any) => (
        <Button
          type="link"
          onClick={() => {
            setModalVisible(null);
            navigate(`/dispute-resolution/${record.key}`);
          }}
        >
          {text}
        </Button>
      ),
    },
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
    },
    {
      title: "Budget",
      dataIndex: "budget",
      key: "budget",
    },
    {
      title: "Issue",
      dataIndex: "issue",
      key: "issue",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <Badge status="processing" text={status} />,
    },
  ];

  const recentActivities = [
    {
      type: "payment",
      title: "Payment Received",
      description: "Received payment for Smart Contract Development",
      amount: "0.68 SOL",
      time: "2 hours ago",
      icon: <DollarOutlined className="text-green-500" />,
    },
    {
      type: "job",
      title: "Job Completed",
      description: "Completed Solana dApp Development project",
      time: "1 day ago",
      icon: <CheckCircleOutlined className="text-blue-500" />,
    },
    {
      type: "application",
      title: "Job Application",
      description: "Applied for NFT Collection Designer position",
      time: "2 days ago",
      icon: <FileTextOutlined className="text-purple-500" />,
    },
    {
      type: "payment",
      title: "Payment Received",
      description: "Received payment for Frontend Development",
      amount: "0.3 SOL",
      time: "3 days ago",
      icon: <DollarOutlined className="text-green-500" />,
    },
    {
      type: "job",
      title: "Job Started",
      description: "Started working on DeFi Protocol Integration",
      time: "1 week ago",
      icon: <ClockCircleOutlined className="text-yellow-500" />,
    },
  ];

  if (!connected) {
    return (
      <WalletConnectionAlert message="Please connect your wallet to view your profile" />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white border-gray-200 shadow-sm">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <Avatar
                size={120}
                icon={<UserOutlined />}
                className="bg-grey-800"
              />
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {publicKey?.toString().slice(0, 4)}...
                  {publicKey?.toString().slice(-4)}
                </h1>
                <p className="text-gray-600 mb-4">Solana Developer</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <span className="px-4 py-2 bg-gray-100 rounded-full text-gray-700">
                    Rust
                  </span>
                  <span className="px-4 py-2 bg-gray-100 rounded-full text-gray-700">
                    Solana
                  </span>
                  <span className="px-4 py-2 bg-gray-100 rounded-full text-gray-700">
                    React
                  </span>
                  <span className="px-4 py-2 bg-gray-100 rounded-full text-gray-700">
                    NodeJS
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <div className="mt-8">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={6}>
                <Card className="bg-white border-gray-200 shadow-sm">
                  <Statistic
                    title={
                      <span className="text-gray-600">Wallet Balance</span>
                    }
                    value="6.86"
                    precision={2}
                    suffix="SOL"
                    valueStyle={{ color: "#111827" }}
                    prefix={<WalletOutlined className="text-green-500" />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card className="bg-white border-gray-200 shadow-sm">
                  <Statistic
                    title={<span className="text-gray-600">Rating</span>}
                    value="4.8"
                    precision={1}
                    valueStyle={{ color: "#111827" }}
                    prefix={<StarOutlined className="text-green-500" />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card className="bg-white border-gray-200 shadow-sm">
                  <Statistic
                    title={
                      <span className="text-gray-600">Jobs Completed</span>
                    }
                    value={2}
                    valueStyle={{ color: "#111827" }}
                    prefix={<ClockCircleOutlined className="text-green-500" />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card className="bg-white border-gray-200 shadow-sm">
                  <Statistic
                    title={<span className="text-gray-600">Total Earned</span>}
                    value="0.98"
                    precision={2}
                    suffix="SOL"
                    valueStyle={{ color: "#111827" }}
                    prefix={<WalletOutlined className="text-green-500" />}
                  />
                </Card>
              </Col>
            </Row>
          </div>

          <Divider className="border-gray-200" />

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Job Management
            </h2>
            <Card className="bg-white border-gray-200 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button
                  type="primary"
                  icon={<HourglassOutlined />}
                  className="h-32 flex flex-col items-center justify-center !bg-blue-500 hover:!bg-blue-600"
                  onClick={() => setModalVisible("ongoing")}
                >
                  <span className="text-lg font-medium">Ongoing Jobs</span>
                  <span className="text-sm opacity-80">2 Active Projects</span>
                </Button>
                <Button
                  type="primary"
                  icon={<CheckCircleOutlined />}
                  className="h-32 flex flex-col items-center justify-center !bg-green-500 hover:!bg-green-600"
                  onClick={() => setModalVisible("completed")}
                >
                  <span className="text-lg font-medium">Completed Jobs</span>
                  <span className="text-sm opacity-80">2 Projects</span>
                </Button>
                <Button
                  type="primary"
                  icon={<HistoryOutlined />}
                  className="h-32 flex flex-col items-center justify-center !bg-purple-500 hover:!bg-purple-600"
                  onClick={() => setModalVisible("history")}
                >
                  <span className="text-lg font-medium">Job History</span>
                  <span className="text-sm opacity-80">View All Jobs</span>
                </Button>
                <Button
                  type="primary"
                  icon={<AlertOutlined />}
                  className="h-32 flex flex-col items-center justify-center !bg-red-500 hover:!bg-red-600"
                  onClick={() => setModalVisible("disputes")}
                >
                  <span className="text-lg font-medium">Disputes</span>
                  <span className="text-sm opacity-80">1 Pending Review</span>
                </Button>
              </div>
            </Card>
          </div>

          <Divider className="border-gray-200" />

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Recent Activity
            </h2>
            <Card className="bg-white border-gray-200 shadow-sm">
              <Timeline
                items={recentActivities.map((activity) => ({
                  color:
                    activity.type === "payment"
                      ? "green"
                      : activity.type === "job"
                      ? "blue"
                      : "purple",
                  dot: activity.icon,
                  children: (
                    <div className="mb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-gray-900 font-medium">
                            {activity.title}
                          </h3>
                          <p className="text-gray-600">
                            {activity.description}
                          </p>
                        </div>
                        <div className="text-right">
                          {activity.amount && (
                            <span className="text-green-500 font-medium block">
                              {activity.amount}
                            </span>
                          )}
                          <span className="text-gray-400 text-sm">
                            {activity.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ),
                }))}
              />
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        title="Ongoing Jobs"
        open={modalVisible === "ongoing"}
        onCancel={() => setModalVisible(null)}
        footer={null}
        width={800}
      >
        <Table
          dataSource={ongoingJobs}
          columns={ongoingColumns}
          pagination={false}
        />
      </Modal>

      <Modal
        title="Completed Jobs"
        open={modalVisible === "completed"}
        onCancel={() => setModalVisible(null)}
        footer={null}
        width={800}
      >
        <Table
          dataSource={completedJobs}
          columns={completedColumns}
          pagination={false}
        />
      </Modal>

      <Modal
        title="Job History"
        open={modalVisible === "history"}
        onCancel={() => setModalVisible(null)}
        footer={null}
        width={800}
      >
        <div className="space-y-4">
          <h3 className="text-lg font-medium">All Jobs</h3>
          <Table
            dataSource={[...ongoingJobs, ...completedJobs]}
            columns={ongoingColumns}
            pagination={{ pageSize: 5 }}
          />
        </div>
      </Modal>

      <Modal
        title="Disputes"
        open={modalVisible === "disputes"}
        onCancel={() => setModalVisible(null)}
        footer={null}
        width={800}
      >
        <Table
          dataSource={disputes}
          columns={disputeColumns}
          pagination={false}
        />
      </Modal>
    </div>
  );
};

export default ProfilePage;
