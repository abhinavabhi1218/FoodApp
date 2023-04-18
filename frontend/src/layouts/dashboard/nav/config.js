// component
import SvgColor from '../../../components/svg-color';


// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Generate QR Code',
    path: '/qrcode',
    icon: icon('qr'),
  },
  {
    title: 'QR Reports',
    path: '/qrreports',
    icon: icon('claims'),
  },
  {
    title: 'Game',
    path: 'game/',
    icon: icon('game'),
  },
  {
    title: 'Scan QR',
    path: '/qrscanner',
    icon: icon('qr'),
  },
  
  {
    title: 'Claim Requests',
    path: '',
    icon: icon('claims'),
  },
  {
    title: 'Accepted',
    path: '',
    icon: icon('accepted'),
  },
  {
    title: 'Rejected',
    path: '',
    icon: icon('rejected'),
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
