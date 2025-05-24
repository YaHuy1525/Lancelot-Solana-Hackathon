import React, { useEffect, useState } from "react";
import { Button, Card, Tag, Divider, Input } from "antd";
import { useLocation } from "react-router-dom";
import { StarFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
// Import Ant Design styles
import "antd/dist/reset.css";
// Import Tailwind CSS
import "../styles/index.css";
// Import wallet styles
import "../styles/wallet.css";
// Import components
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchSection from "../components/SearchSection";
import JobDetailsModal from "../components/JobDetailsModal";

import jobService from "../services/jobService";
import type { Job as BackendJob } from "../services/jobService";

// Modal Job type (from JobDetailsModal)
interface ModalJob {
  _id: string; // Added to pass to CreateContract
  title: string;
  skills: string[];
  budget: string;
  rating: number;
  image: string;
}

/**
 * UI-specific job type for this page.
 * - Keeps all BackendJob properties (including budget as number)
 * - Adds image (string), skills (string[]), and budgetDisplay (string) for UI
 */
type UIJob = BackendJob & {
  image: string;
  skills: string[];
  budgetDisplay: string;
};

const BrowseJob: React.FC = () => {
  const [jobs, setJobs] = useState<UIJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<ModalJob | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setError(null);

    jobService
      .browsejob()
      .then((backendJobs) => {
        console.log("Fetched backendJobs:", backendJobs); // Log raw data
        // Map backend jobs to UIJob type
        const mappedJobs: UIJob[] = backendJobs.map((job) => ({
          ...job,
          image:
            job.image ||
            "https://readdy.ai/api/search-image?query=blockchain%20job&width=400&height=250",
          skills: ((job as any).required_skills || job.skills || []),
          budgetDisplay: typeof job.budget === "number" ? `${job.budget} SOL` : "N/A",
        }));
        console.log("Mapped UI jobs:", mappedJobs); // Log mapped data
        setJobs(mappedJobs);

        // Handle search parameters from URL
        const searchParams = new URLSearchParams(location.search);
        const searchTerm = searchParams.get("search") || "";
        const skills = searchParams.get("skills") || "";

        if (searchTerm || skills) {
          handleSearch(searchTerm, skills);
        }
      })
      .catch((err) => {
        console.error("Error fetching or mapping jobs:", err); // Log the actual error
        setError("Failed to fetch jobs from server. Check console for details.");
        setJobs([]);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line
  }, [location.search]);

  const handleSearch = (searchTerm: string, skills: string) => {
    setSearchTerm(searchTerm);
    setSkills(skills);
  };

  const handleJobClick = (job: UIJob) => {
    // Map UIJob to ModalJob type
    const modalJob: ModalJob = {
      _id: job._id, // Pass the original job ID
      title: job.title,
      skills: job.skills,
      budget: job.budgetDisplay,
      rating: job.rating,
      image: job.image,
    };
    setSelectedJob(modalJob);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedJob(null);
  };

  const handleEnroll = (job: ModalJob) => {
    // TODO: Implement enrollment logic
    console.log("Enrolling in job:", job.title);
    handleModalClose();
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSkills =
      !skills ||
      job.skills.some((skill: string) =>
        skill.toLowerCase().includes(skills.toLowerCase())
      );
    return matchesSearch && matchesSkills;
  });

  return (
    <div className="min-h-screen w-full bg-black">
      <Navbar />
      <Hero />
      <SearchSection
        onSearch={handleSearch}
        jobs={jobs.map((job) => ({
          title: job.title,
          skills: job.skills,
          budget: job.budgetDisplay,
          rating: job.rating,
          image: job.image,
        }))}
      />

      {/* Featured Jobs Section */}
      <div className="py-20 bg-white w-full">
        <div className="w-full px-4">
          {loading ? (
            <div className="text-center py-10 text-lg text-gray-700">Loading jobs...</div>
          ) : error ? (
            <div className="text-center py-10 text-lg text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredJobs.map((job, index) => (
                <Card
                  key={job._id || index}
                  hoverable
                  onClick={() => handleJobClick(job)}
                  cover={
                    <div className="h-48 overflow-hidden">
                      <img
                        alt={job.title}
                        src={job.image}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  }
                  className="shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full"
                  styles={{
                    body: {
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    },
                  }}
                >
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {job.skills.map((skill: string, idx: number) => (
                        <Tag
                          key={idx}
                          className="rounded-full px-3 py-1 bg-gray-100 text-gray-800"
                        >
                          {skill}
                        </Tag>
                      ))}
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center text-gray-600">
                        <i className="fas fa-coins text-yellow-500 mr-2 custom-green-icon"></i>
                        {job.budgetDisplay}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <StarFilled className="text-yellow-500 mr-1" />
                        {job.rating}
                      </div>
                    </div>
                  </div>
                  <Button
                    type="primary"
                    block
                    className="!rounded-button bg-green-500 border-none hover:bg-green-600 cursor-pointer whitespace-nowrap mt-auto"
                  >
                    View Details
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Job Details Modal */}
      <JobDetailsModal
        job={selectedJob}
        visible={isModalVisible}
        onClose={handleModalClose}
        onEnroll={handleEnroll}
      />

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 w-full">
        <div className="w-full px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Lancelot</h3>
              <p className="mb-4">
                The premier Web3 freelancing platform powered by Solana
                blockchain technology.
              </p>
              <div className="flex space-x-4">
                <Link
                  to="https://github.com/SnowAceAlex/Lancelot-Solana-Hackathon.git"
                  className="text-gray-400 hover:text-white text-xl cursor-pointer"
                >
                  <i className="fab fa-github"></i>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Resources</h3>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Legal</h3>
              <a href="#" className="hover:text-white cursor-pointer">
                Terms of Service
              </a>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Subscribe</h3>
              <p className="mb-4">
                Stay updated with the latest opportunities and platform news.
              </p>
              <div className="flex">
                <Input
                  placeholder="Your email"
                  className="rounded-l-lg border-gray-700 bg-gray-800 text-white placeholder:text-white"
                />
                <Button
                  type="primary"
                  className="!rounded-button !rounded-l-none bg-green-500 border-none hover:bg-green-600 cursor-pointer whitespace-nowrap"
                >
                  Subscribe
                </Button>
              </div>
              <div className="mt-6">
                <p className="text-sm">Payment Methods</p>
                <div className="flex space-x-3 mt-2">
                  <i className="fab fa-cc-visa text-2xl"></i>
                  <i className="fab fa-cc-mastercard text-2xl"></i>
                  <i className="fab fa-cc-paypal text-2xl"></i>
                  <i className="fab fa-bitcoin text-2xl"></i>
                </div>
              </div>
            </div>
          </div>
          <Divider className="border-gray-700 mt-12 mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 Lancelot. All rights reserved.</p>
            <p className="mt-4 md:mt-0">
              Built on <span className="text-green-500">Solana</span> blockchain
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BrowseJob;
