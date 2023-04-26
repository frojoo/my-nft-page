import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main";
import Detail from "./pages/detail";
import Header from "./components/header";
import { useState } from "react";

function App() {
  const [account, setAccount] = useState("");

  return (
    <div className="min-h-screen bg-black text-white">
      <BrowserRouter>
        <Header account={account} setAccount={setAccount} />
        <Routes>
          <Route path="/" element={<Main account={account} />} />
          <Route path="/:tokenId" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
