import { BrowserRouter, Route, Routes } from "react-router-dom";
import Card from "./components/Card";
import Footer from "./components/Footer";
import Header from "./components/Header";
import RateStar from "./components/RateStar";
import Register from './components/Register';
import LoginForm from './components/Login';
import ContactUs from "./pages/ContactUs";
import Carousel from "./components/Carousel";
import "./styles/Header.css";
// import items from "./data/slide.json";
const items = [
  {
    id: 1,
    title: "Venom: The Last Dancem",
    description: "Watch the trailer",
    image:
      "https://th.bing.com/th/id/OIP.A6zGO_EAGAxKX6WEe4Y_xAHaEo?rs=1&pid=ImgDetMain",
    posterImage:
      "https://th.bing.com/th/id/OIP.OLVTLF6guU6SGCCAvQwfGAHaLH?w=183&h=274&c=7&r=0&o=5&dpr=1.6&pid=1.7",
    duration: "2:09",
    likeCount: 269,
    dislikeCount: 141,
  },
  {
    id: 2,
    title: "The Dark Kight",
    description: "Watch the trailer",
    image:
      "https://th.bing.com/th/id/OIP.jICDIARsfTYEC4-EAD-I7AHaEK?w=329&h=185&c=7&r=0&o=5&dpr=1.6&pid=1.7",
    posterImage:
      "https://th.bing.com/th/id/OIP.zVwg0iGZxaof8gbQWumGKAHaLH?w=183&h=274&c=7&r=0&o=5&dpr=1.6&pid=1.7",
    duration: "2:51",
    likeCount: 22,
    dislikeCount: 6,
  },
  // Add more items as needed
];
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/footer" element={<Footer />} />
        <Route path="/rateStar" element={<RateStar />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginForm />} />
          
        <Route path="/card" element={<Card />} />
        <Route path="/contact_us" element={<ContactUs />} />
        <Route path="/carousel" element={<Carousel items={items} />} />

        <Route path="/header" element={<Header />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
