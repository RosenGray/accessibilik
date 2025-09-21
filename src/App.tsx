import { FC } from "react";
import Accessibilik from "../lib/main";
import "./index.css";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router";

const Home: FC = () => {
  return <div>Home</div>;
};
const About: FC = () => {
  return <div>About</div>;
};
const Contact: FC = () => {
  return <div>Contact</div>;
};

function Header() {
  return (
    <nav>
      {/* NavLink makes it easy to show active states */}
      <Link to="/">Home</Link>
      <h1>Hello h1</h1>
      <br />
      <Link to="/about">About</Link>
      <h2>Hello h2</h2>
      <br />
      <Link to="/contact">Contact</Link>
      <h3>Hello h3</h3>
    </nav>
  );
}

const App: FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Accessibilik />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
