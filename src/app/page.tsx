'use client';
import { Grid, Box, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

// components
import SalesOverview from '@/app/components/dashboard/SalesOverview';
import YearlyBreakup from '@/app/components/dashboard/YearlyBreakup';
import RecentTransactions from '@/app/components/dashboard/RecentTransactions';
import ProductPerformance from '@/app/components/dashboard/ProductPerformance';
import Blog from '@/app/components/dashboard/Blog';
import MonthlyEarnings from './components/dashboard/MonthlyEarnings';
import PageContainer from './components/container/PageContainer';
import { Match } from '@/constants/interface';

interface allMatchResponse {
  rows: Match[];
  status: string;
  titleRate: string;
  titleText: string;
  total: number;
}

const Dashboard = () => {
  const [matchList, setMatchList] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getAllMatchList');
        const data: allMatchResponse = await response.json();
        console.log(data);
        setMatchList(data.rows);
      } catch (error) {
        console.error('Error fetching match list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <CircularProgress />
          <Typography variant="h6" marginLeft={2}>
            Loading...
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {/* <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid> */}
          <Grid item xs={12} lg={8}>
            <MonthlyEarnings />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid> */}
          <Grid item xs={12} lg={12}>
            <ProductPerformance matchList={matchList} />
          </Grid>
          {/* <Grid item xs={12}>
            <Blog />
          </Grid> */}
        </Grid>
      )}
    </PageContainer>
  );
};

export default Dashboard;
