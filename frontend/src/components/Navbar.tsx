import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-black shadow-md z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-white hover:text-green-500 transition-colors"
            >
              Lancelot
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <Link
                to="/browse-job"
                className="text-gray-400 hover:text-white font-medium cursor-pointer whitespace-nowrap"
              >
                Browse Jobs
              </Link>
              <Link
                to="/post-work"
                className="text-gray-400 hover:text-white font-medium cursor-pointer whitespace-nowrap"
              >
                Post Work
              </Link>
              <a
                href="/#how-it-work" 
                className="text-gray-400 hover:text-white font-medium cursor-pointer whitespace-nowrap scroll-smooth"
              >
                How It Works
              </a>
            </div>
          </div>
          <div>
            <WalletMultiButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
