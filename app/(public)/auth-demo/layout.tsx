import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Auth Demo | Clinigen App',
  description: 'Demonstration of authentication in Clinigen App',
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