import { Navigate, useRoutes, json, useParams} from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';



import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import SignupPage from './sections/auth/signup/SignupPage';
import CreateQr from './layouts/QR code/createQr';
import GameLoginForm from './sections/auth/game_signin/signin';
import Game from './layouts/game/game';
import QRReports from './layouts/reports/qrReports';
import ScanQR from './pages/qrScanner/qrScanner';


// ----------------------------------------------------------------------

export default function Router() {
  const { str } = useParams();
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'signup',
      element: <SignupPage/>
    },
    {
      path: 'qrcode',
      element:< CreateQr/>
    },
    {
      path: 'productspage',
      element: <ProductsPage />,
    },
    {
      path: 'gamesignin',
      element: <GameLoginForm />
    },
    {
      path: 'game/:str',
      element: <Game/>
    },
    {
      path: 'qrscanner',
      element: <ScanQR/>
    },
    {
      path: 'qrreports',
      element: <QRReports/>
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },

  ]);

  return routes;
}
