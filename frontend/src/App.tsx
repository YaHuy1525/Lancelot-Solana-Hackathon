import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletConfig } from "./config/wallet";
import { WalletProvider } from "./contexts/WalletContext";
import HomePage from "./pages/HomePage";
import BrowseJob from "./pages/BrowseJob";

import "./styles/index.css";

// import "@fortawesome/fontawesome-free/css/all.min.css";

const App: React.FC = () => {
  return (
    <WalletConfig>
      <WalletProvider>
        <BrowserRouter>
          <div className="App">
            {/* <HomePage /> */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/browse-job" element={<BrowseJob />} />
            </Routes>
          </div> 
        </BrowserRouter>
      </WalletProvider>
    </WalletConfig>
  );
};

export default App;
