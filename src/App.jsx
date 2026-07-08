import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import GlobalMap from './pages/GlobalMap';
import DataCenterDetail from './pages/DataCenterDetail';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/all" element={<GlobalMap />} />
        <Route path="/datacenter/:id" element={<DataCenterDetail />} />
        {/* Placeholder routes */}
        <Route path="/investments" element={<Home />} />
        <Route path="/watchlist" element={<Home />} />
        <Route path="/analytics" element={<Home />} />
        <Route path="/activity" element={<Home />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </Router>
  );
}
