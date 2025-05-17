import React from "react";
import { Button, Input, Statistic, Card, Tag, Divider } from "antd";
import { Link } from "react-router-dom";
import {
  SearchOutlined,
  ArrowRightOutlined,
  StarFilled,
} from "@ant-design/icons";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
// Import Ant Design styles
import "antd/dist/reset.css";
// Import Tailwind CSS
import "../styles/index.css";
// Import wallet styles
import "../styles/wallet.css";

const BrowseJob: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-black">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-black shadow-md z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <a className="text-2xl font-bold text-white" href="/">Lancelot</a>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white font-medium cursor-pointer whitespace-nowrap"
                >
                  Browse Jobs
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white font-medium cursor-pointer whitespace-nowrap"
                >
                  Post Work
                </a>
                <Link
                  to="/#how-it-work"
                  className="text-gray-400 hover:text-white font-medium cursor-pointer whitespace-nowrap"
                >
                  How It Works
                </Link>
              </div>
            </div>
            <div>
              <WalletMultiButton />
            </div>
          </div>
        </div>
      </nav>

    
      {/* Hero Section */}
      <div className="pt-16 relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url('https://readdy.ai/api/search-image?query=A%20minimalist%20black%20and%20white%20digital%20landscape%20with%20subtle%20geometric%20patterns%20and%20clean%20lines%2C%20modern%20professional%20aesthetic%20with%20abstract%20elements%20creating%20depth%20and%20dimension%2C%20high%20contrast%20monochromatic%20design&width=1440&height=600&seq=1&orientation=landscape')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent"></div>
        </div>
        <div className="w-full px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-24">
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4 px-4">
                Web3 Freelancing, <br />
                Powered by Solana
              </h1>
              <p className="text-xl text-gray-300 mb-8 px-4">
                Connect, Create, and Get Paid in Crypto. <br />
                The future of work is decentralized.
              </p>
              <div className="flex flex-wrap gap-4 px-4">
                <Button
                  type="primary"
                  size="large"
                  className="!rounded-button bg-green-500 text-white border-none hover:bg-green-600 text-lg h-12 px-8 flex items-center cursor-pointer whitespace-nowrap"
                >
                  Start Earning <ArrowRightOutlined className="ml-2" />
                </Button>
                <Button
                  size="large"
                  className="!rounded-button bg-transparent text-white border-2 border-white hover:bg-green-500 hover:text-white text-lg h-12 px-8 flex items-center cursor-pointer whitespace-nowrap transition-all"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center">
              {/* This is intentionally left empty as the background image serves as the right column content */}
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white py-8">
        <div className="w-full px-4">
          <div className="bg-white shadow-lg rounded-xl p-6 -mt-16 relative z-20 mx-16">
            <div className="flex flex-row gap-4">
              <Input
                size="middle"
                placeholder="Search for jobs..."
                prefix={<SearchOutlined className="text-gray-400" />}
                className="w-100 border-gray-300 rounded-lg"
              />
              <Input
                size="large"
                placeholder="Skills"
                prefix={
                  <i className="fas fa-code text-gray-400 mr-2 custom-green-icon"></i>
                }
                className="md:w-64 border-gray-300 rounded-lg"
              />
              <Button
                type="primary"
                size="large"
                className="!rounded-button bg-green-500 border-none hover:bg-green-600 h-10 px-8 flex items-center justify-center cursor-pointer whitespace-nowrap"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Jobs Section */}
            <div className="py-20 bg-white w-full">
              <div className="max-w-6xl mx-auto px-4">
                <div className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide"
                  style={{ WebkitOverflowScrolling: "touch" , scrollbarWidth: "none" }}>
                  {[
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
                        "https://readdy.ai/api/search-image?query=Blockchain%20security%20workspace%20with%20security%20analysis%20tools%20and%20vulnerability%20scanning%20displays%2C%20modern%20cybersecurity%20office%20environment%2C%20professional%20security%20testing%20setup%20with%20ambient%20lighting&width=600&height=400&seq=4&orientation=landscape",                    },
                    {
                      title: "Web3 Frontend Developer",
                      skills: ["React", "ethers.js", "Web3-React", "TypeScript"],
                      budget: "2.5-4.0 SOL",
                      rating: 4.9,
                      image:
                        "https://readdy.ai/api/search-image?query=Web3%20frontend%20development%20workspace%20with%20dApp%20interfaces%20and%20blockchain%20integration%20code%2C%20modern%20tech%20office%20with%20clean%20design%20mockups%2C%20professional%20development%20environment%20with%20soft%20lighting&width=600&height=400&seq=5&orientation=landscape",                    },
                    {
                      title: "DAO Developer",
                      skills: ["Governance", "Smart Contracts", "Snapshot", "Aragon"],
                      budget: "2.5-4.0 SOL",
                      rating: 4.9,
                      image:
                        "https://readdy.ai/api/search-image?query=DAO%20development%20workspace%20with%20governance%20dashboards%20and%20voting%20mechanism%20displays%2C%20modern%20decentralized%20organization%20office%2C%20professional%20blockchain%20workspace%20with%20ambient%20lighting&width=600&height=400&seq=6&orientation=landscape",                    },
                    {
                      title: "Layer 2 Protocol Engineer",
                      skills: ["Optimism", "zkSync", "Polygon", "Scaling"], 
                      budget: "2.5-4.0 SOL",
                      rating: 4.9,
                      image:
                        "https://readdy.ai/api/search-image?query=Layer%202%20blockchain%20development%20workspace%20with%20scaling%20solution%20architectures%20and%20optimization%20code%2C%20modern%20tech%20office%20with%20network%20diagrams%2C%20professional%20development%20setup%20with%20soft%20lighting&width=600&height=400&seq=7&orientation=landscape",                    },
                    {
                      title: "Cross-chain Bridge Developer",
                      skills: ["Polkadot", "Cosmos", "Bridge Protocols", "Rust"],
                      budget: "2.5-4.0 SOL",
                      rating: 4.9,
                      image:
                        "https://readdy.ai/api/search-image?query=Cross-chain%20development%20workspace%20with%20multiple%20blockchain%20network%20displays%20and%20bridge%20protocol%20diagrams%2C%20modern%20tech%20environment%20with%20interoperability%20visualizations%2C%20professional%20workspace%20with%20ambient%20lighting&width=600&height=400&seq=8&orientation=landscape",
                    },
                  ].map((job, index) => (
                    <div
                      className="flex-shrink-0 snap-center "
                      style={{ width: "calc(25% - 24px)" }} 
                    >
                      <Card
                        key={index} 
                        hoverable
                        style= {{ height: "100%" }}
                        cover={
                          <div className="h-48 overflow-hidden">
                            <img
                              alt={job.title}
                              src={job.image}
                              className="w-full h-full object-cover object-top"
                            />
                          </div>
                        }
                        className="shadow-sm hover:shadow-md transition-shadow min-h-[340px] flex flex-col justify-between"
                      >
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
                        <Button
                          type="primary"
                          block
                          className="!rounded-button bg-green-500 border-none hover:bg-green-600 cursor-pointer whitespace-nowrap"
                        >
                          Apply Now
                        </Button>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 w-full">
        <div className="w-full px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <h3 className="text-white text-lg font-bold mb-4">SolanceWork</h3>
              <p className="mb-4">
                The premier Web3 freelancing platform powered by Solana
                blockchain technology.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-xl cursor-pointer"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-xl cursor-pointer"
                >
                  <i className="fab fa-discord"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-xl cursor-pointer"
                >
                  <i className="fab fa-github"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-xl cursor-pointer"
                >
                  <i className="fab fa-telegram"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Support Center
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Dispute Resolution
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Subscribe</h3>
              <p className="mb-4">
                Stay updated with the latest opportunities and platform news.
              </p>
              <div className="flex">
                <Input
                  placeholder="Your email"
                  className="rounded-l-lg border-gray-700 bg-gray-800 text-white"
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
            <p>© 2025 SolanceWork. All rights reserved.</p>
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
