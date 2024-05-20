'use client';

import { styled, Container, Box, ThemeProvider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Header from '@/app/layout/header/Header';
import Sidebar from '@/app/layout/sidebar/Sidebar';
import { baselightTheme } from '@/utils/theme/DefaultColors';
import { usePathname } from 'next/navigation';

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  backgroundColor: 'transparent',
}));

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const pathname = usePathname();

  if (pathname === '/authentication/login') {
    return (
      <html lang="en">
        <body>
          <ThemeProvider theme={baselightTheme}>{children} </ThemeProvider>
        </body>
      </html>
    );
  }
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={baselightTheme}>
          <MainWrapper className="mainwrapper">
            {/* ------------------------------------------- */}
            {/* Sidebar */}
            {/* ------------------------------------------- */}
            <Sidebar
              isSidebarOpen={isSidebarOpen}
              isMobileSidebarOpen={isMobileSidebarOpen}
              onSidebarClose={() => setMobileSidebarOpen(false)}
            />
            {/* ------------------------------------------- */}
            {/* Main Wrapper */}
            {/* ------------------------------------------- */}
            <PageWrapper className="page-wrapper">
              {/* ------------------------------------------- */}
              {/* Header */}
              {/* ------------------------------------------- */}
              <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
              {/* ------------------------------------------- */}
              {/* PageContent */}
              {/* ------------------------------------------- */}
              <Container
                sx={{
                  paddingTop: '20px',
                  maxWidth: '1200px',
                }}
              >
                {/* ------------------------------------------- */}
                {/* Page Route */}
                {/* ------------------------------------------- */}
                <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>{children}</Box>
                {/* ------------------------------------------- */}
                {/* End Page */}
                {/* ------------------------------------------- */}
              </Container>
            </PageWrapper>
          </MainWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
export const dynamic = 'force-static';
