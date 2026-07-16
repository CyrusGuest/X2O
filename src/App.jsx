import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import GlobalMap from './pages/GlobalMap';
import ProjectDetail from './pages/ProjectDetail';
import Token from './pages/Token';
import Endorsements from './pages/Endorsements';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/map" element={<GlobalMap />} />
      <Route path="/token" element={<Token />} />
      <Route path="/endorsements" element={<Endorsements />} />
      <Route path="/project/:id" element={<ProjectDetail />} />

      {/* Backwards-compatible aliases */}
      <Route path="/all" element={<Navigate to="/marketplace" replace />} />
      <Route path="/datacenter/:id" element={<Navigate to="/marketplace" replace />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <AppRoutes />
      </Layout>
    </Router>
  );
}
