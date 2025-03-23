import { Container } from "../components/container"; // Corrected path
import { Footer } from "../components/footer"; // Use relative path
import Header from "../components/header"; // Use relative path
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* handler to store the user */}
      <Header />
      <Container className="flex-grow">
        <main className="flex-grow">
          <Outlet />
        </main>
      </Container>
      <Footer />
    </div>
  );
};