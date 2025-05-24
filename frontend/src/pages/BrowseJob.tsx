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

interface Job {
  title: string;
  skills: string[];
  budget: string;
  rating: number;
  image: string;
}

const BrowseJob: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [skills, setSkills] = useState("");
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Initialize jobs data
    const initialJobs: Job[] = [
      {
        title: "Solana dApp Developer",
        skills: ["Rust", "Solana", "React"],
        budget: "2.5-4.0 SOL",
        rating: 4.9,
        image:
          "https://readdy.ai/api/search-image?query=Abstract%20digital%20representation%20of%20blockchain%20development%20with%20code%20elements%20and%20Solana%20logo%2C%20professional%20tech%20illustration%20with%20clean%20minimal%20background%2C%20high%20quality%203D%20render%20with%20subtle%20lighting&width=400&height=250&seq=2&orientation=landscape",
      },
      {
        title: "NFT Collection Designer",
        skills: ["Illustration", "NFT", "Blockchain"],
        budget: "3.0-5.0 SOL",
        rating: 4.8,
        image:
          "https://readdy.ai/api/search-image?query=Modern%20digital%20art%20creation%20studio%20with%20NFT%20artwork%20displays%2C%20professional%20creative%20workspace%20with%20digital%20tablets%20and%20screens%20showing%20colorful%20abstract%20designs%2C%20clean%20minimal%20background%20with%20subtle%20lighting&width=400&height=250&seq=3&orientation=landscape",
      },
      {
        title: "Smart Contract Auditor",
        skills: ["Security", "Solidity", "Audit"],
        budget: "5.0-8.0 SOL",
        rating: 5.0,
        image:
          "https://readdy.ai/api/search-image?query=Cybersecurity%20concept%20with%20digital%20locks%20and%20code%20inspection%2C%20professional%20tech%20security%20visualization%20with%20blockchain%20elements%2C%20clean%20minimal%20background%20with%20blue%20digital%20elements&width=400&height=250&seq=4&orientation=landscape",
      },
      {
        title: "Web3 Marketing Specialist",
        skills: ["Marketing", "Discord", "Web3"],
        budget: "2.0-3.5 SOL",
        rating: 4.7,
        image:
          "https://readdy.ai/api/search-image?query=Digital%20marketing%20workspace%20with%20analytics%20dashboards%20and%20social%20media%20elements%2C%20professional%20marketing%20visualization%20with%20cryptocurrency%20symbols%2C%20clean%20minimal%20background%20with%20subtle%20lighting&width=400&height=250&seq=5&orientation=landscape",
      },
      //add new from here
      {
        title: "Smart Contract Developer",
        skills: ["Solidity", "Ethereum", "Web3.js", "Hardhat"],
        budget: "2.5-4.0 SOL",
        rating: 4.9,
        image:
          "https://readdy.ai/api/search-image?query=Modern%20blockchain%20development%20workspace%20with%20multiple%20screens%20showing%20smart%20contract%20code%20and%20crypto%20trading%20charts%2C%20clean%20minimal%20desk%20setup%20with%20advanced%20monitoring%20tools%2C%20professional%20Web3%20development%20environment%20with%20soft%20lighting&width=600&height=400&seq=1&orientation=landscape",
      },
      {
        title: "DeFi Protocol Engineer",
        skills: ["Rust", "Solana", "DeFi", "TokenEconomics"],
        budget: "2.5-4.0 SOL",
        rating: 4.9,
        image:
          "https://readdy.ai/api/search-image?query=Decentralized%20finance%20workspace%20with%20multiple%20monitors%20displaying%20DeFi%20protocols%20and%20yield%20farming%20analytics%2C%20modern%20tech%20office%20with%20blockchain%20architecture%20diagrams%2C%20professional%20development%20setup%20with%20ambient%20lighting&width=600&height=400&seq=2&orientation=landscape",
      },
      {
        title: "NFT Platform Developer",
        skills: ["ERC721", "IPFS", "React", "Node.js"],
        budget: "2.5-4.0 SOL",
        rating: 4.9,
        image:
          "https://readdy.ai/api/search-image?query=NFT%20development%20workspace%20with%20digital%20art%20and%20smart%20contract%20code%20on%20displays%2C%20modern%20creative%20tech%20environment%2C%20professional%20NFT%20platform%20development%20setup%20with%20soft%20natural%20lighting&width=600&height=400&seq=3&orientation=landscape",
      },
      {
        title: "Blockchain Security Engineer",
        skills: ["Security Auditing", "Solidity", "MetaMask", "DeFi"],
        budget: "2.5-4.0 SOL",
        rating: 4.9,
        image:
          "https://readdy.ai/api/search-image?query=Blockchain%20security%20workspace%20with%20security%20analysis%20tools%20and%20vulnerability%20scanning%20displays%2C%20modern%20cybersecurity%20office%20environment%2C%20professional%20security%20testing%20setup%20with%20ambient%20lighting&width=600&height=400&seq=4&orientation=landscape",
      },
      {
        title: "Web3 Frontend Developer",
        skills: ["React", "ethers.js", "Web3-React", "TypeScript"],
        budget: "2.5-4.0 SOL",
        rating: 4.9,
        image:
          "https://readdy.ai/api/search-image?query=Web3%20frontend%20development%20workspace%20with%20dApp%20interfaces%20and%20blockchain%20integration%20code%2C%20modern%20tech%20office%20with%20clean%20design%20mockups%2C%20professional%20development%20environment%20with%20soft%20lighting&width=600&height=400&seq=5&orientation=landscape",
      },
      {
        title: "DAO Developer",
        skills: ["Governance", "Smart Contracts", "Snapshot", "Aragon"],
        budget: "2.5-4.0 SOL",
        rating: 4.9,
        image:
          "https://readdy.ai/api/search-image?query=DAO%20development%20workspace%20with%20governance%20dashboards%20and%20voting%20mechanism%20displays%2C%20modern%20decentralized%20organization%20office%2C%20professional%20blockchain%20workspace%20with%20ambient%20lighting&width=600&height=400&seq=6&orientation=landscape",
      },
      {
        title: "Layer 2 Protocol Engineer",
        skills: ["Optimism", "zkSync", "Polygon", "Scaling"],
        budget: "2.5-4.0 SOL",
        rating: 4.9,
        image:
          "https://readdy.ai/api/search-image?query=Layer%202%20blockchain%20development%20workspace%20with%20scaling%20solution%20architectures%20and%20optimization%20code%2C%20modern%20tech%20office%20with%20network%20diagrams%2C%20professional%20development%20setup%20with%20soft%20lighting&width=600&height=400&seq=7&orientation=landscape",
      },
      {
        title: "Cross-chain Bridge Developer",
        skills: ["Polkadot", "Cosmos", "Bridge Protocols", "Rust"],
        budget: "2.5-4.0 SOL",
        rating: 4.9,
        image:
          "https://readdy.ai/api/search-image?query=Cross-chain%20development%20workspace%20with%20multiple%20blockchain%20network%20displays%20and%20bridge%20protocol%20diagrams%2C%20modern%20tech%20environment%20with%20interoperability%20visualizations%2C%20professional%20workspace%20with%20ambient%20lighting&width=600&height=400&seq=8&orientation=landscape",
      },
    ];

    // Load jobs from localStorage and combine with initial jobs
    const savedJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
    const allJobs = [...initialJobs, ...savedJobs];
    setJobs(allJobs);

    // Handle search parameters from URL
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get("search") || "";
    const skills = searchParams.get("skills") || "";

    if (searchTerm || skills) {
      handleSearch(searchTerm, skills);
    }
  }, [location.search]);

  const handleSearch = (searchTerm: string, skills: string) => {
    setSearchTerm(searchTerm);
    setSkills(skills);
  };

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedJob(null);
  };

  const handleEnroll = (job: Job) => {
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
      job.skills.some((skill) =>
        skill.toLowerCase().includes(skills.toLowerCase())
      );
    return matchesSearch && matchesSkills;
  });

  return (
    <div className="min-h-screen w-full bg-black">
      <Navbar />
      <Hero />
      <SearchSection onSearch={handleSearch} jobs={jobs} />

      {/* Featured Jobs Section */}
      <div className="py-20 bg-white w-full">
        <div className="w-full px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredJobs.map((job, index) => (
              <Card
                key={index}
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
                bodyStyle={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {job.skills.map((skill, idx) => (
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
                      {job.budget}
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
