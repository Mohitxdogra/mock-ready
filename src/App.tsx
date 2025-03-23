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
import ResumeBuilder from "./components/Resume/resume-builder";
import ContactUs from "./routes/ContactUs";
import { MockLoadPage } from "./routes/mock-load-page";
import { MockInterviewPage } from "./routes/mock-interview-page"; // Ensure this file exists
import { Feedback } from "./routes/feedback";
import ServicesPage from "./routes/Services";  
import About from "./routes/AboutUs";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* public routes */}
        <Route element={<PublicLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/contact" element={<ContactUs />} /> 
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<About />} />
        </Route>

        {/* authentication routes */}
        <Route element={<AuthenicationLayout />}>
          <Route path="/signin/*" element={<SignInPage />} />
          <Route path="/signup/*" element={<SignUpPage />} />
        </Route>

        {/* protected routes (example) */}
        <Route element={<ProtectRoutes> <ResumeBuilder /> </ProtectRoutes>} path="/resume-builder" />
        <Route element={<ProtectRoutes> <MainLayout /> </ProtectRoutes>}> 
        
          {/* all the Protected Routes */}
          <Route element={<Generate />} path="/generate/">
            <Route index element={<Dashboard />} />
            <Route path=":interviewId" element={<CreateEditPage />} />
            <Route path="interview/:interviewId" element={<MockLoadPage />}  />
            <Route 
              path="interview/:interviewId/start" 
              element={<MockInterviewPage />} 
            />
            <Route path="feedback/:interviewId" element={<Feedback />} />
          </Route>
        </Route> 
      </Routes>
    </Router>
  );
};

export default App;