import 'sweetalert2/dist/sweetalert2.min.css';
import './globals.css';

export const metadata = {
  title: {
    template: '%s | ACW',
    default: 'ACW',
  },
  description: '학생들의 출석을 관리합니다.',
};
export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
