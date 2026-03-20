import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Auth Demo | Halo Direct App',
  description: 'Demonstration of authentication in Halo Direct App',
};

export default function AuthDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F7F4F1]">
      <main>{children}</main>
    </div>
  );
}