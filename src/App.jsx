import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Recruitment from './pages/Recruitment';

import ExecutiveBoard from './pages/ExecutiveBoard';
import Gallery from './pages/Gallery';
import JoinUs from './pages/JoinUs';
import Events from './pages/Events';
import Resources from './pages/Resources';
import { useScrollToTop } from './hooks/useScrollToTop';

function AppContent() {
  useScrollToTop();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="page flex flex-col">
      <Navbar />
      <main className={`flex-1 ${isHome ? '' : 'pt-28 md:pt-32'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recruitment" element={<Recruitment />} />

          <Route path="/executive-board" element={<ExecutiveBoard />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/sponsors" element={<JoinUs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
