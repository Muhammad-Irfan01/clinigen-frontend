import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Toast Demo | Halo Direct App',
  description: 'Demonstration of toast notifications in Halo Direct App',
};

export default function ToastDemoLayout({
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