'use client';
import { useState } from 'react';
import { Typography, Grid, TextField, Button, Box } from '@mui/material';
import PageContainer from '@/app/components/container/PageContainer';
import DashboardCard from '@/app/components/shared/DashboardCard';

const EVCalculator = () => {
  const [homeOdds, setHomeOdds] = useState(2.22);
  const [drawOdds, setDrawOdds] = useState(3.99);
  const [awayOdds, setAwayOdds] = useState(3.4);
  const [impliedProbabilities, setImpliedProbabilities] = useState<any>({});
  const [assumedProbabilities, setAssumedProbabilities] = useState<any>({ home: '', draw: '', away: '' });
  const [results, setResults] = useState<any>(null);

  const calculateImpliedProbability = (odds: number) => {
    return 1 / odds;
  };

  const calculateEV = (probability: number, odds: number) => {
    return probability * odds - 1;
  };

  const calculateKelly = (probability: number, odds: number) => {
    return (odds * probability - (1 - probability)) / odds;
  };

  const handleCalculateImplied = () => {
    const home = calculateImpliedProbability(homeOdds);
    const draw = calculateImpliedProbability(drawOdds);
    const away = calculateImpliedProbability(awayOdds);
    setImpliedProbabilities({ home, draw, away });
  };

  const handleFinalCalculate = () => {
    const home = parseFloat(assumedProbabilities.home) || impliedProbabilities.home;
    const draw = parseFloat(assumedProbabilities.draw) || impliedProbabilities.draw;
    const away = parseFloat(assumedProbabilities.away) || impliedProbabilities.away;
    const sum = home + draw + away;

    const adjustedHomeProb = home / sum;
    const adjustedDrawProb = draw / sum;
    const adjustedAwayProb = away / sum;

    const homeEV = calculateEV(adjustedHomeProb, homeOdds);
    const drawEV = calculateEV(adjustedDrawProb, drawOdds);
    const awayEV = calculateEV(adjustedAwayProb, awayOdds);

    const homeKelly = calculateKelly(adjustedHomeProb, homeOdds);
    const drawKelly = calculateKelly(adjustedDrawProb, drawOdds);
    const awayKelly = calculateKelly(adjustedAwayProb, awayOdds);

    setResults({
      adjustedHomeProb,
      adjustedDrawProb,
      adjustedAwayProb,
      homeEV,
      drawEV,
      awayEV,
      homeKelly,
      drawKelly,
      awayKelly,
    });
  };

  return (
    <PageContainer title="EV Calculator" description="Calculate Expected Value and Kelly Criterion">
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <DashboardCard title="Match Betting EV and Kelly Criterion Calculator">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Home Win Odds"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={homeOdds}
                  onChange={(e) => setHomeOdds(parseFloat(e.target.value))}
                  sx={{ mb: 3 }}
                />
                <TextField
                  label="Assumed Home Probability"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={assumedProbabilities.home}
                  onChange={(e) => setAssumedProbabilities({ ...assumedProbabilities, home: e.target.value })}
                  sx={{ mb: 3 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Draw Odds"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={drawOdds}
                  onChange={(e) => setDrawOdds(parseFloat(e.target.value))}
                  sx={{ mb: 3 }}
                />
                <TextField
                  label="Assumed Draw Probability"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={assumedProbabilities.draw}
                  onChange={(e) => setAssumedProbabilities({ ...assumedProbabilities, draw: e.target.value })}
                  sx={{ mb: 3 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Away Win Odds"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={awayOdds}
                  onChange={(e) => setAwayOdds(parseFloat(e.target.value))}
                  sx={{ mb: 3 }}
                />
                <TextField
                  label="Assumed Away Probability"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={assumedProbabilities.away}
                  onChange={(e) => setAssumedProbabilities({ ...assumedProbabilities, away: e.target.value })}
                  sx={{ mb: 3 }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                  <Button variant="contained" color="primary" onClick={handleCalculateImplied}>
                    Calculate Implied Probabilities
                  </Button>
                  <Button variant="contained" color="secondary" onClick={handleFinalCalculate} sx={{ ml: 2 }}>
                    Calculate Final Results
                  </Button>
                </Box>
              </Grid>
              {impliedProbabilities.home && (
                <Grid item xs={12}>
                  <Typography variant="h6">Implied Probabilities</Typography>
                  <Typography>Home: {Math.round(impliedProbabilities.home * 10000) / 100}%</Typography>
                  <Typography>Draw: {Math.round(impliedProbabilities.draw * 10000) / 100}%</Typography>
                  <Typography>Away: {Math.round(impliedProbabilities.away * 10000) / 100}%</Typography>
                </Grid>
              )}
              {results && (
                <Grid item xs={12}>
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography variant="h6">Adjusted Probabilities</Typography>
                    <Typography>Home: {(results.adjustedHomeProb * 100).toFixed(2)}%</Typography>
                    <Typography>Draw: {(results.adjustedDrawProb * 100).toFixed(2)}%</Typography>
                    <Typography>Away: {(results.adjustedAwayProb * 100).toFixed(2)}%</Typography>
                    <Typography variant="h6">Expected Value (EV)</Typography>
                    <Typography>Home Win: {results.homeEV.toFixed(4)}</Typography>
                    <Typography>Draw: {results.drawEV.toFixed(4)}</Typography>
                    <Typography>Away Win: {results.awayEV.toFixed(4)}</Typography>
                    <Typography variant="h6">Kelly Criterion</Typography>
                    <Typography>Home Win: {results.homeKelly.toFixed(4)}</Typography>
                    <Typography>Draw: {results.drawKelly.toFixed(4)}</Typography>
                    <Typography>Away Win: {results.awayKelly.toFixed(4)}</Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default EVCalculator;
