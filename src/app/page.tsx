'use client';
import { Grid, Box } from '@mui/material';

// components
import SalesOverview from '@/app/components/dashboard/SalesOverview';
import YearlyBreakup from '@/app/components/dashboard/YearlyBreakup';
import RecentTransactions from '@/app/components/dashboard/RecentTransactions';
import ProductPerformance from '@/app/components/dashboard/ProductPerformance';
import Blog from '@/app/components/dashboard/Blog';
import MonthlyEarnings from './components/dashboard/MonthlyEarnings';
import PageContainer from './components/container/PageContainer';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getAllMatchList');
        const data: allMatchResponse = await response.json();
        console.log(data);
        setMatchList(data.rows);
      } catch (error) {
        console.error('Error fetching match list:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
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
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
