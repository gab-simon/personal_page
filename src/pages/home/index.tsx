import Header from "../../components/header";
import FloatingActions from "../../components/fabs";
import Me from "../../components/me";
import Work from "../../components/work";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Me />
      <Work />
      <FloatingActions />
    </div>
  );
};

export default Home;
