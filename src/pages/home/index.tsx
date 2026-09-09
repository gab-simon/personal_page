import Header from "../../components/header";
import Hero from "../../components/hero";
import Profile from "../../components/profile";
import Footer from "../../components/footer";

const Home = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main>
      <Hero />
      <Profile />
    </main>
    <Footer />
  </div>
);

export default Home;
