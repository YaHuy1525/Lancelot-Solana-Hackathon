import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Input,
  Form,
  notification,
  Card,
  Steps,
  Descriptions,
  Tag,
} from "antd";
import { useWallet } from "@solana/wallet-adapter-react";
import { StarFilled } from "@ant-design/icons";
import Navbar from "../components/Navbar";
import WalletConnectionAlert from "../components/WalletConnectionAlert";

const { TextArea } = Input;
const { Step } = Steps;

interface Job {
  title: string;
  skills: string[];
  budget: string;
  rating: number;
  image: string;
}

interface ContractFormData {
  proposal: string;
  estimatedTime: string;
  availability: string;
}

const CreateContract: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { connected } = useWallet();
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get job details from location state
  const jobDetails = location.state?.jobDetails as Job;

  if (!jobDetails) {
    navigate("/browse-job");
    return null;
  }

  const handleSubmit = async (values: ContractFormData) => {
    try {
      setIsSubmitting(true);
      // TODO: Implement smart contract creation logic here
      console.log("Creating contract with values:", values);

      // Simulate contract creation
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Show success notification
      notification.success({
        message: "Application Submitted Successfully!",
        description:
          "Your application has been sent to the employer. You will be notified when they review it.",
        duration: 5,
      });

      // Navigate back to browse jobs
      navigate("/browse-job");
    } catch (error) {
      notification.error({
        message: "Application Failed",
        description:
          "There was an error submitting your application. Please try again.",
        duration: 5,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    {
      title: "Job Details",
      content: (
        <div className="space-y-6">
          <div className="relative h-64 rounded-lg overflow-hidden">
            <img
              src={jobDetails.image}
              alt={jobDetails.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-2xl font-bold mb-2">{jobDetails.title}</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <i className="fas fa-coins text-yellow-500 mr-2"></i>
                  <span>{jobDetails.budget}</span>
                </div>
                <div className="flex items-center">
                  <StarFilled className="text-yellow-500 mr-1" />
                  <span>{jobDetails.rating}</span>
                </div>
              </div>
            </div>
          </div>

          <Descriptions title="Job Information" bordered>
            <Descriptions.Item label="Required Skills" span={3}>
              <div className="flex flex-wrap gap-2">
                {jobDetails.skills.map((skill, idx) => (
                  <Tag
                    key={idx}
                    className="rounded-full px-3 py-1 bg-gray-100 text-gray-800"
                  >
                    {skill}
                  </Tag>
                ))}
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="Budget" span={3}>
              {jobDetails.budget}
            </Descriptions.Item>
            <Descriptions.Item label="Rating" span={3}>
              {jobDetails.rating} / 5.0
            </Descriptions.Item>
          </Descriptions>

          <Card className="bg-gray-50">
            <h4 className="font-semibold mb-2">Smart Contract Features</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Escrow-based payment system</li>
              <li>Automated milestone releases</li>
              <li>Dispute resolution mechanism</li>
              <li>Secure fund storage</li>
            </ul>
          </Card>
        </div>
      ),
    },
    {
      title: "Your Proposal",
      content: (
        <div className="space-y-6">
          <Form.Item
            name="proposal"
            label="Your Proposal"
            rules={[{ required: true, message: "Please enter your proposal" }]}
          >
            <TextArea
              rows={6}
              placeholder="Describe why you're the best fit for this job and how you plan to approach it"
            />
          </Form.Item>

          <Form.Item
            name="estimatedTime"
            label="Estimated Time to Complete"
            rules={[{ required: true, message: "Please enter estimated time" }]}
          >
            <Input placeholder="e.g., 2 weeks, 1 month" />
          </Form.Item>

          <Form.Item
            name="availability"
            label="Your Availability"
            rules={[
              { required: true, message: "Please enter your availability" },
            ]}
          >
            <TextArea
              rows={3}
              placeholder="Describe your availability and working hours"
            />
          </Form.Item>
        </div>
      ),
    },
    {
      title: "Review & Submit",
      content: (
        <div className="space-y-6">
          <Card className="bg-gray-50">
            <h4 className="font-semibold mb-4">Contract Terms</h4>
            <div className="space-y-4">
              <p className="text-gray-600">
                By submitting this application, you agree to the following
                terms:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>
                  The employer will review your proposal and may request
                  additional information
                </li>
                <li>
                  If accepted, funds will be held in escrow until project
                  completion
                </li>
                <li>Payment will be released according to agreed milestones</li>
                <li>Both parties can raise disputes if terms are not met</li>
              </ul>
            </div>
          </Card>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">
              Smart Contract Benefits
            </h4>
            <ul className="list-disc list-inside text-green-700 space-y-1">
              <li>Secure payment through Solana blockchain</li>
              <li>Transparent milestone tracking</li>
              <li>Automated payment releases</li>
              <li>Built-in dispute resolution</li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  const next = () => {
    form.validateFields().then(() => {
      setCurrentStep(currentStep + 1);
    });
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  if (!connected) {
    return (
      <WalletConnectionAlert message="Please connect your wallet to apply for this job" />
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Apply for {jobDetails.title}
          </h1>

          <Steps current={currentStep} className="mb-8">
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            {steps[currentStep].content}

            <div className="flex justify-between mt-8">
              {currentStep > 0 && (
                <Button
                  size="large"
                  onClick={prev}
                  className="!rounded-button border-gray-300"
                >
                  Previous
                </Button>
              )}
              {currentStep < steps.length - 1 ? (
                <Button
                  type="primary"
                  size="large"
                  onClick={next}
                  className="!rounded-button bg-green-500 border-none hover:bg-green-600 ml-auto"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  loading={isSubmitting}
                  className="!rounded-button bg-green-500 border-none hover:bg-green-600 ml-auto"
                >
                  Submit Application
                </Button>
              )}
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateContract;
