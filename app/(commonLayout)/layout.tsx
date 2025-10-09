import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
