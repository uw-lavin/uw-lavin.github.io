import {
  HashRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Recruitment from './pages/Recruitment';
import Members from './pages/Members';
import ExecutiveBoard from './pages/ExecutiveBoard';
import Gallery from './pages/Gallery';
import JoinUs from './pages/JoinUs';
import Events from './pages/Events';
import Resources from './pages/Resources';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/recruitment" element={<Recruitment />} />
            <Route path="/members" element={<Members />} />
            <Route path="/executive-board" element={<ExecutiveBoard />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/sponsors" element={<JoinUs />} />
            <Route path="/events" element={<Events />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
