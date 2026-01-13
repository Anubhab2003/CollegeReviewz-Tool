import { BrowserRouter, Routes, Route } from "react-router-dom";
import AssessmentPage from "./pages/AssessmentPage";
import ReportPage from "./pages/ReportPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AssessmentPage />} />
        <Route path="/report" element={<ReportPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
