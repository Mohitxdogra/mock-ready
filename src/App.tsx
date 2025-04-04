import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PublicLayout } from "./layouts/public-layout";
import AuthenicationLayout from "./layouts/auth-layout";
import { SignInPage } from "./routes/sign-in";
import { SignUpPage } from "./routes/sign-up";

import ProtectRoutes from "./layouts/protected-routes";
import { MainLayout } from "./layouts/main-layout"; 
import Homepage from "./routes/home";
import { Generate } from "./components/generate";
import { Dashboard } from "./routes/dashboard";
import { CreateEditPage } from "./routes/create-edit-page";
import { MockLoadPage } from "./routes/mock-load-page";
import { MockInterviewPage } from "./routes/mock-interview-page";
import { Feedback } from "./routes/feedback";
import ServicesPage from "./routes/Services";  
import About from "./routes/AboutUs";
import { ResumeProvider } from "./context/ResumeContext";
import ResumeBuilder from "./components/Resume/ResumeBuilder";
import ContactUs from "./routes/ContactUs";
import ChatBot  from "./components/ChatBot"; // Ensure this file exists


const App = () => {
  return (
    <ResumeProvider>
      <Router>
        <ChatBot />
        <Routes>
          {/* public routes */}
          <Route element={<PublicLayout />}>
            <Route index element={<Homepage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/resumebuilder" element={<ResumeBuilder />} />
            <Route path="/contact" element={<ContactUs />} />
          </Route>

          {/* authentication routes */}
          <Route element={<AuthenicationLayout />}>
            <Route path="/signin/*" element={<SignInPage />} />
            <Route path="/signup/*" element={<SignUpPage />} />
          </Route>

          {/* protected routes */}
          <Route element={<ProtectRoutes><MainLayout /></ProtectRoutes>}>
            <Route element={<Generate />} path="/generate/">
              <Route index element={<Dashboard />} />
              <Route path=":interviewId" element={<CreateEditPage />} />
              <Route path="interview/:interviewId" element={<MockLoadPage />} />
              <Route path="interview/:interviewId/start" element={<MockInterviewPage />} />
              <Route path="feedback/:interviewId" element={<Feedback />} />
            </Route>
          </Route>
        </Routes>

        {/* 💬 Floating Chatbot visible on all pages */}
    
      </Router>
    </ResumeProvider>
  );
};

export default App;
