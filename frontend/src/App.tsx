import React from "react";
import { WalletConfig } from "./config/wallet";
import { WalletProvider } from "./contexts/WalletContext";
import HomePage from "./pages/HomePage";
import "./styles/index.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

const App: React.FC = () => {
  return (
    <WalletConfig>
      <WalletProvider>
        <div className="App">
          <HomePage />
        </div>
      </WalletProvider>
    </WalletConfig>
  );
};

export default App;
