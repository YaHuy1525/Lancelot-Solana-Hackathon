import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Steps,
  Timeline,
  Button,
  Upload,
  message,
  Progress,
  Tag,
  Space,
  Divider,
} from "antd";
import {
  AlertOutlined,
  FileTextOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  UploadOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import Navbar from "../components/Navbar";

const { Step } = Steps;

const DisputeResolutionPage: React.FC = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = React.useState(0);
  const [showAllJury, setShowAllJury] = React.useState(false);
  const [jurySelectionStarted, setJurySelectionStarted] = React.useState(false);
  const [selectedCount, setSelectedCount] = React.useState(0);

  // Mock data for the dispute
  const disputeData = {
    jobTitle: "Frontend Development",
    client: "0x1357...2468",
    budget: "2.5 SOL",
    issue: "Payment Delayed",
    status: "Under Review",
    evidenceSubmitted: 2,
    totalEvidenceRequired: 3,
    votingProgress: 4,
    totalVotes: 7,
    timeRemaining: "23:45:12",
    juryMembers: [
      "0xA1B2...C3D4",
      "0xE5F6...7890",
      "0x1234...5678",
      "0x9ABC...DEF0",
      "0x2468...1357",
      "0xAAAA...BBBB",
      "0xCCCC...DDDD",
    ],
  };

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (
      jurySelectionStarted &&
      selectedCount < disputeData.juryMembers.length
    ) {
      timer = setTimeout(() => {
        setSelectedCount((prev) => prev + 1);
      }, 800); // 0.8s per member for demo
    }
    return () => clearTimeout(timer);
  }, [jurySelectionStarted, selectedCount, disputeData.juryMembers.length]);

  const steps = [
    {
      title: "Dispute Triggered",
      description: "Job flagged as disputed",
      content: (
        <Card className="mt-4">
          <Timeline
            items={[
              {
                color: "red",
                children: (
                  <div>
                    <h4 className="font-medium">Dispute Initiated</h4>
                    <p className="text-gray-600">
                      Job flagged as disputed due to payment delay
                    </p>
                    <p className="text-gray-400 text-sm">2 hours ago</p>
                  </div>
                ),
              },
              {
                color: "blue",
                children: (
                  <div>
                    <h4 className="font-medium">Initial Evidence Submitted</h4>
                    <p className="text-gray-600">
                      Screenshots of communication and work deliverables
                    </p>
                    <p className="text-gray-400 text-sm">1 hour ago</p>
                  </div>
                ),
              },
            ]}
          />
        </Card>
      ),
    },
    {
      title: "Evidence Collection",
      description: "Gathering supporting materials",
      content: (
        <Card className="mt-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Evidence Progress</h4>
              <Tag color="blue">
                {disputeData.evidenceSubmitted}/
                {disputeData.totalEvidenceRequired} Submitted
              </Tag>
            </div>
            <Progress
              percent={Math.round(
                (disputeData.evidenceSubmitted /
                  disputeData.totalEvidenceRequired) *
                  100
              )}
              status="active"
            />
            <Upload>
              <Button icon={<UploadOutlined />}>Upload Evidence</Button>
            </Upload>
            <p className="text-gray-500 text-sm">
              Time remaining: {disputeData.timeRemaining}
            </p>
          </div>
        </Card>
      ),
    },
    {
      title: "DAO Jury Formation",
      description: "Selecting jury members",
      content: (
        <Card className="mt-4">
          <div className="space-y-4">
            <h4 className="font-medium">Jury Selection in Progress</h4>
            <p className="text-gray-600">
              Randomly selecting 7 DAO token holders to form the jury
            </p>
            {!jurySelectionStarted ? (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mb-2"
                onClick={() => {
                  setJurySelectionStarted(true);
                  setSelectedCount(0);
                }}
              >
                Start Jury Selection
              </button>
            ) : null}
            <Progress
              percent={Math.round(
                (selectedCount / disputeData.juryMembers.length) * 100
              )}
              status={
                selectedCount < disputeData.juryMembers.length
                  ? "active"
                  : "success"
              }
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>
                {selectedCount}/{disputeData.juryMembers.length} Members
                Selected
              </span>
              <span>
                {selectedCount < disputeData.juryMembers.length
                  ? `Selecting...`
                  : "Selection Complete"}
              </span>
            </div>
            <div className="mt-2">
              <h5 className="font-medium mb-1">Selected Jury Members:</h5>
              <ul>
                {disputeData.juryMembers.slice(0, selectedCount).map((id) => (
                  <li key={id} className="text-gray-700 text-sm mb-1">
                    <span className="inline-block bg-gray-100 rounded px-2 py-1 mr-2 font-mono">
                      {id}
                    </span>
                  </li>
                ))}
                {showAllJury &&
                  disputeData.juryMembers.slice(selectedCount).map((id) => (
                    <li key={id} className="text-gray-700 text-sm mb-1">
                      <span className="inline-block bg-gray-100 rounded px-2 py-1 mr-2 font-mono">
                        {id}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </Card>
      ),
    },
    {
      title: "Voting Period",
      description: "Jury members casting votes",
      content: (
        <Card className="mt-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Voting Progress</h4>
              <Tag color="blue">
                {disputeData.votingProgress}/{disputeData.totalVotes} Votes
              </Tag>
            </div>
            <Progress
              percent={Math.round(
                (disputeData.votingProgress / disputeData.totalVotes) * 100
              )}
              status="active"
            />
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Tag color="green" className="text-lg">
                  3
                </Tag>
                <p className="text-sm text-gray-600">For Freelancer</p>
              </div>
              <div className="text-center">
                <Tag color="red" className="text-lg">
                  1
                </Tag>
                <p className="text-sm text-gray-600">For Employer</p>
              </div>
              <div className="text-center">
                <Tag color="gold" className="text-lg">
                  0
                </Tag>
                <p className="text-sm text-gray-600">Need More Info</p>
              </div>
            </div>
          </div>
        </Card>
      ),
    },
    {
      title: "Resolution",
      description: "Finalizing the decision",
      content: (
        <Card className="mt-4">
          <div className="space-y-4">
            <h4 className="font-medium">Resolution in Progress</h4>
            <p className="text-gray-600">
              Smart contract is executing the final decision
            </p>
            <Progress percent={80} status="active" />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Releasing funds</span>
                <CheckCircleOutlined className="text-green-500" />
              </div>
              <div className="flex justify-between">
                <span>Updating reputation</span>
                <ClockCircleOutlined className="text-blue-500" />
              </div>
              <div className="flex justify-between">
                <span>Recording on-chain</span>
                <ClockCircleOutlined className="text-blue-500" />
              </div>
            </div>
          </div>
        </Card>
      ),
    },
    {
      title: "Appeal",
      description: "Optional appeal process",
      content: (
        <Card className="mt-4">
          <div className="space-y-4">
            <h4 className="font-medium">Appeal Process</h4>
            <p className="text-gray-600">
              If you disagree with the decision, you can appeal to the DAO
              council
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-medium mb-2">Appeal Requirements:</h5>
              <ul className="list-disc list-inside text-gray-600">
                <li>New evidence not previously considered</li>
                <li>Appeal fee: 0.5 SOL</li>
                <li>Must be submitted within 24 hours</li>
              </ul>
            </div>
            <Button type="primary" danger>
              Submit Appeal
            </Button>
          </div>
        </Card>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            Back to Profile
          </Button>

          <Card className="mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {disputeData.jobTitle}
                </h1>
                <p className="text-gray-600">Client: {disputeData.client}</p>
              </div>
              <Space>
                <Tag color="red">{disputeData.issue}</Tag>
                <Tag color="blue">{disputeData.status}</Tag>
              </Space>
            </div>
            <Divider />
            <div className="flex justify-between text-gray-600">
              <div>
                <span className="font-medium">Budget:</span>{" "}
                {disputeData.budget}
              </div>
              <div>
                <span className="font-medium">Time Remaining:</span>{" "}
                {disputeData.timeRemaining}
              </div>
            </div>
          </Card>

          <Steps
            current={currentStep}
            onChange={setCurrentStep}
            items={steps.map((step) => ({
              title: step.title,
            }))}
            className="custom-dispute-steps"
          />

          <div className="mt-6">
            <div className="text-gray-600 mb-4 text-lg font-medium">
              {steps[currentStep].description}
            </div>
            {steps[currentStep].content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisputeResolutionPage;
