'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Grid,
  Box,
  CircularProgress,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Avatar,
  Chip,
  useTheme,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import PageContainer from '@/app/components/container/PageContainer';
import { Match } from '@/constants/interface';
import { returnTeamIcon } from '@/utils/utils';

const Dashboard: React.FC = () => {
  const [matchList, setMatchList] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/getAllMatchList');
        const data = await res.json();
        setMatchList(data.rows || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const averageAccuracy =
    matchList.length > 0
      ? (matchList.reduce((sum, m) => sum + parseFloat(m.recPercent), 0) / matchList.length).toFixed(1)
      : '0';

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress size={48} />
      </Box>
    );
  }

  return (
    <PageContainer title="Match Dashboard" description="Overview of upcoming matches">
      <Box mb={4}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={4} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle2" gutterBottom>
                  Total Matches
                </Typography>
                <Typography variant="h4">{matchList.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle2" gutterBottom>
                  Avg. Confidence
                </Typography>
                <Typography variant="h4">{averageAccuracy}%</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={3} justifyContent="center">
        {matchList.map((match) => {
          const confidence = parseFloat(match.recPercent);
          const percent = parseFloat(match.recPercent) || 0;
          const homeConfidence = match.matchResult === '勝' ? percent : 100 - percent;
          const awayConfidence = match.matchResult === '負' ? percent : 100 - percent;
          const isFinished = match.matchLong !== '未';

          return (
            <Grid item xs={12} sm={6} md={4} key={match.matchId}>
              <Card
                sx={{
                  transition: 'transform 0.15s, box-shadow 0.15s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: theme.shadows[6],
                  },
                }}
              >
                <CardActionArea
                  onClick={() => router.push(`/match/${match.matchId}`)}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    textAlign: 'center',
                  }}
                >
                  {/* Teams */}
                  <Box
                    sx={{
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1,
                    }}
                  >
                    <Avatar src={returnTeamIcon(match.homeTeam)} sx={{ width: 40, height: 40 }} />
                    <Typography variant="subtitle1" noWrap>
                      {match.homeTeam}
                    </Typography>
                    <Typography variant="body2">vs</Typography>
                    <Avatar src={returnTeamIcon(match.visitTeam)} sx={{ width: 40, height: 40 }} />
                    <Typography variant="subtitle1" noWrap>
                      {match.visitTeam}
                    </Typography>
                  </Box>

                  {/* Time & Status */}
                  <Box sx={{ px: 2, width: '100%', mb: 1, display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <Chip
                      icon={<EventIcon fontSize="small" />}
                      label={match.matchTime}
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      label={isFinished ? 'Finished' : 'Upcoming'}
                      size="small"
                      color={isFinished ? 'primary' : 'default'}
                    />
                  </Box>

                  {/* Final Score (if finished) */}
                  {isFinished && match.result1 && (
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {match.result1}
                    </Typography>
                  )}

                  {/* Confidence Bars */}
                  <Box
                    sx={{
                      px: 2,
                      flexGrow: 1,
                      width: '100%',
                      mb: 2,
                      display: 'flex',
                      justifyContent: 'center',
                      gap: 1,
                    }}
                  >
                    <Chip
                      label={`Home: ${homeConfidence.toFixed(0)}%`}
                      color={match.matchResult === '勝' ? 'success' : 'default'}
                    />
                    <Chip
                      label={`Away: ${awayConfidence.toFixed(0)}%`}
                      color={match.matchResult === '負' ? 'success' : 'default'}
                    />
                  </Box>

                  {/* League */}
                  <Box sx={{ pb: 2 }}>
                    <Chip
                      icon={<SportsSoccerIcon fontSize="small" />}
                      label={match.typeName}
                      size="small"
                      color="primary"
                    />
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </PageContainer>
  );
};

export default Dashboard;
