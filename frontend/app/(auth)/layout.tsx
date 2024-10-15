import UNavBar from '@/components/unsign-nav-bar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <UNavBar />
      {children}
    </div>
  );
}
