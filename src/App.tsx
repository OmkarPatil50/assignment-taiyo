import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactsPage from "./pages/ContactsPage";
import MainLayout from "./components/common/MainLayout";
import ChartsPage from "./pages/ChartsPage";

const App: React.FC = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<ContactsPage />} />
          <Route path="/charts" element={<ChartsPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
