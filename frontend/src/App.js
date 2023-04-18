import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import HeaderDashboard from './pages/HeaderDashboard';


// ----------------------------------------------------------------------

export default function App() {
  return (
    
    <HelmetProvider>

      <BrowserRouter>
    
        <ThemeProvider>
      
          <ScrollToTop />
          <StyledChart />
          <Router />
     
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
