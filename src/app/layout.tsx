import '@/styles/globals.css';
import type { Metadata } from 'next';
import { type ReactElement } from 'react';

// import Footer from '@/components/Footer/Footer';
// import Header from '@/components/Header/Header';

export const metadata: Metadata = {
  title: 'Minesweeper',
  description: 'template description',
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<ReactElement> => {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <div className="min-h-screen flex flex-col">
          {/* <Header /> */}
          <main className="w-full flex-1">{children}</main>
          {/* <Footer /> */}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
