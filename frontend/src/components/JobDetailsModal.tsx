import React from "react";
import { Modal, Button, Tag, Divider } from "antd";
import { StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface Job {
  title: string;
  skills: string[];
  budget: string;
  rating: number;
  image: string;
}

interface JobDetailsModalProps {
  job: Job | null;
  visible: boolean;
  onClose: () => void;
  onEnroll: (job: Job) => void;
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({
  job,
  visible,
  onClose,
  onEnroll,
}) => {
  const navigate = useNavigate();

  if (!job) return null;

  const handleEnroll = () => {
    onEnroll(job);
    navigate("/create-contract", { state: { jobDetails: job } });
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
      className="job-details-modal"
    >
      <div className="p-4">
        <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
          <img
            src={job.image}
            alt={job.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <i className="fas fa-coins text-yellow-500 mr-2"></i>
                <span>{job.budget}</span>
              </div>
              <div className="flex items-center">
                <StarFilled className="text-yellow-500 mr-1" />
                <span>{job.rating}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, idx) => (
                <Tag
                  key={idx}
                  className="rounded-full px-3 py-1 bg-gray-100 text-gray-800"
                >
                  {skill}
                </Tag>
              ))}
            </div>
          </div>

          <Divider />

          <div>
            <h3 className="text-lg font-semibold mb-3">Job Description</h3>
            <p className="text-gray-600">
              We are looking for a skilled {job.title} to join our team. The
              ideal candidate should have experience in {job.skills.join(", ")}{" "}
              and be passionate about blockchain technology.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Responsibilities</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Develop and maintain blockchain-based applications</li>
              <li>Write clean, efficient, and well-documented code</li>
              <li>Collaborate with cross-functional teams</li>
              <li>Participate in code reviews and technical discussions</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Requirements</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Strong experience with {job.skills.join(", ")}</li>
              <li>Understanding of blockchain technology and Web3</li>
              <li>Experience with smart contract development</li>
              <li>Good communication and problem-solving skills</li>
            </ul>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              size="large"
              onClick={onClose}
              className="!rounded-button border-gray-300"
            >
              Close
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={handleEnroll}
              className="!rounded-button bg-green-500 border-none hover:bg-green-600"
            >
              Enroll Now
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default JobDetailsModal;
