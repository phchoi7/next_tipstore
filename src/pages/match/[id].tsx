'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tab,
  useTheme,
  Chip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

import RootLayout from '@/app/layout';
import PageContainer from '@/app/components/container/PageContainer';
import { Match } from '@/constants/interface';
import { returnTeamIcon } from '@/utils/utils';

const COLORS = ['#4CAF50', '#FF9800', '#F44336'];

interface StatItem {
  type: string;
  matchCount: string;
  victCount: string;
  tieCount: string;
  failCount: string;
  obtainCount: string;
  loseCount: string;
  victRate?: string;
}
interface Detail {
  peilvRow: Record<string, any>;
  duList: { teamName: string; teamResult: string }[];
  tecStacLeftList: { type: string; homeCount: string; custCount: string }[];
  zhanjiRow: Record<string, any>;
}
interface BilvItem {
  title: string;
  desc: string;
}
interface ChartInfo {
  bilvList: BilvItem[];
  analyInfo: {
    keyNote: string;
    winPossibility: string;
    drawPossibility: string;
    losePossibility: string;
  };
}
interface HistoryItem {
  matchDate: string;
  matehType: string;
  homeTeam: string;
  visitTeam: string;
  result1: string;
}
interface HistoryDetail {
  hisList: HistoryItem[];
  homeStacList: StatItem[];
  custStacList: StatItem[];
}

const MatchDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query as { id?: string };
  const theme = useTheme();

  const [detail, setDetail] = useState<Detail | null>(null);
  const [chartData, setChartData] = useState<ChartInfo | null>(null);
  const [history, setHistory] = useState<HistoryDetail | null>(null);
  const [matchInfo, setMatchInfo] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'overview' | 'tech' | 'prob' | 'history' | 'form'>('overview');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([
      fetch(`/api/getBothTeamMatchDetail?rowNo=${id}`).then((r) => r.json()),
      fetch(`/api/getMatchCharts?rowNo=${id}`).then((r) => r.json()),
      fetch(`/api/getHistoryDetail?rowNo=${id}`).then((r) => r.json()),
      fetch('/api/getAllMatchList').then((r) => r.json()),
    ])
      .then(([d1, d2, d3, all]) => {
        setDetail(d1);
        setChartData(d2);
        setHistory(d3);
        const found = (all.rows as Match[]).find((m) => m.matchId === id || m.rowNo === id);
        setMatchInfo(found || null);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading || !detail || !chartData || !history || !matchInfo) {
    return (
      <RootLayout>
        <PageContainer title={id ? `Match ${id}` : 'Match Details'} description="">
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
            <CircularProgress />
          </Box>
        </PageContainer>
      </RootLayout>
    );
  }

  const { peilvRow, duList, tecStacLeftList, zhanjiRow } = detail;
  const { bilvList, analyInfo } = chartData;
  const { hisList, homeStacList, custStacList } = history;

  return (
    <RootLayout>
      <PageContainer title={`${matchInfo.homeTeam} vs ${matchInfo.visitTeam}`} description="All match data">
        {/* Fancy Gradient Header */}
        <Box
          sx={{
            p: 3,
            borderRadius: 3,
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            color: '#fff',
            mb: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            textAlign: 'center',
          }}
        >
          <Box>
            <img src={returnTeamIcon(matchInfo.homeTeam)} width={48} alt="home logo" />
            <Typography variant="h6">{matchInfo.homeTeam}</Typography>
          </Box>
          <Box>
            <Typography variant="h4" fontWeight="bold">
              VS
            </Typography>
            <Box
              sx={{
                mt: 1,
                px: 2,
                py: 1,
                background: theme.palette.info.main,
                color: '#fff',
                borderRadius: 2,
                fontWeight: 'bold',
                boxShadow: `0 0 12px ${theme.palette.info.main}`,
              }}
            >
              {matchInfo.matchTime}
            </Box>
          </Box>
          <Box>
            <img src={returnTeamIcon(matchInfo.visitTeam)} width={48} alt="away logo" />
            <Typography variant="h6">{matchInfo.visitTeam}</Typography>
          </Box>
        </Box>

        {/* Back & Tabs */}
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button startIcon={<ArrowBackIcon />} onClick={() => router.back()}>
            Back
          </Button>
          <Chip label={matchInfo.typeName} variant="outlined" color="secondary" sx={{ fontWeight: 'bold' }} />
        </Box>

        <TabContext value={tab}>
          <TabList onChange={(_, v) => setTab(v)} aria-label="tabs">
            <Tab label="Overview" value="overview" />
            <Tab label="Tech Stats" value="tech" />
            <Tab label="Probabilities" value="prob" />
            <Tab label="History" value="history" />
            <Tab label="Standings" value="form" />
          </TabList>

          {/* Overview */}
          <TabPanel value="overview">
            <Grid container spacing={2}>
              {[peilvRow, zhanjiRow].map((obj, i) => (
                <Grid item xs={12} md={6} key={i}>
                  <Card
                    sx={{
                      transition: '0.3s',
                      '&:hover': { transform: 'translateY(-5px)', boxShadow: theme.shadows[6] },
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {i === 0 ? 'Overall Record' : 'Summary Record'}
                      </Typography>
                      {Object.entries(obj).map(([k, v]) => (
                        <Typography key={k}>
                          <strong>{k}:</strong> {v ?? 'N/A'}
                        </Typography>
                      ))}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Match Types
                </Typography>
                {duList.map((d, i) => (
                  <Typography key={i}>
                    {d.teamName} — Result: {d.teamResult || 'N/A'}
                  </Typography>
                ))}
              </Grid>
            </Grid>
          </TabPanel>

          {/* Tech Stats */}
          <TabPanel value="tech">
            <Grid container spacing={2}>
              {tecStacLeftList.map((s) => (
                <Grid item xs={12} sm={6} md={4} key={s.type}>
                  <Card
                    sx={{
                      transition: '0.3s',
                      '&:hover': { transform: 'scale(1.02)', boxShadow: theme.shadows[4] },
                    }}
                  >
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {s.type}
                      </Typography>
                      <Typography>Home: {s.homeCount}</Typography>
                      <Typography>Away: {s.custCount}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          {/* Probabilities */}
          <TabPanel value="prob">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={bilvList.map((b) => ({
                        name: b.title,
                        value: parseFloat(b.desc),
                      }))}
                      dataKey="value"
                      nameKey="name"
                      outerRadius="80%"
                      label
                    >
                      {bilvList.map((_, idx) => (
                        <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Bookmaker Note
                    </Typography>
                    <div dangerouslySetInnerHTML={{ __html: analyInfo.keyNote }} />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* History */}
          <TabPanel value="history">
            <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Home</TableCell>
                    <TableCell>Away</TableCell>
                    <TableCell>Result</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {hisList.map((m) => (
                    <TableRow key={m.matchDate + m.matehType}>
                      <TableCell>{m.matchDate}</TableCell>
                      <TableCell>{m.matehType}</TableCell>
                      <TableCell dangerouslySetInnerHTML={{ __html: m.homeTeam }} />
                      <TableCell dangerouslySetInnerHTML={{ __html: m.visitTeam }} />
                      <TableCell>{m.result1}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          {/* Standings */}
          <TabPanel value="form">
            <Grid container spacing={2}>
              {[
                { title: 'Home Stats', list: homeStacList },
                { title: 'Away Stats', list: custStacList },
              ].map(({ title, list }) => (
                <Grid item xs={12} md={6} key={title}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography fontWeight="bold">{title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Type</TableCell>
                            <TableCell>Matches</TableCell>
                            <TableCell>W</TableCell>
                            <TableCell>D</TableCell>
                            <TableCell>L</TableCell>
                            <TableCell>GF</TableCell>
                            <TableCell>GA</TableCell>
                            <TableCell>Rate</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {list.map((row) => (
                            <TableRow key={row.type}>
                              <TableCell>{row.type}</TableCell>
                              <TableCell>{row.matchCount}</TableCell>
                              <TableCell>{row.victCount}</TableCell>
                              <TableCell>{row.tieCount}</TableCell>
                              <TableCell>{row.failCount}</TableCell>
                              <TableCell>{row.obtainCount}</TableCell>
                              <TableCell>{row.loseCount}</TableCell>
                              <TableCell>{row.victRate}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              ))}
            </Grid>
          </TabPanel>
        </TabContext>
      </PageContainer>
    </RootLayout>
  );
};

export default dynamic(() => Promise.resolve(MatchDetail), { ssr: false });
