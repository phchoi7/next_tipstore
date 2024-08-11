'use client';
import { useState } from 'react';
import { Paper, Box, Grid, TextField, MenuItem, Button, Typography } from '@mui/material';
import PageContainer from '@/app/components/container/PageContainer';
import DashboardCard from '@/app/components/shared/DashboardCard';

const carOptions = [
  { label: '2024 Tesla Model 3 RWD', battery: 51 },
  { label: '2024 Tesla Model 3 Performance', battery: 75 },
  { label: '2024 Tesla Model 3 Long Range AWD', battery: 75 },
];

const costOptions = [
  { label: '以HK$/kWh 計算', value: 'perKwh' },
  { label: '以每小時 HKD 計算', value: 'perHour' },
  { label: '以每15分鐘 HKD 計算', value: 'per15Min' },
  { label: '以每半小時 HKD 計算', value: 'per30Min' },
];

const Shadow = () => {
  const [selectedCar, setSelectedCar] = useState(carOptions[0]);
  const [parkingCost, setParkingCost] = useState<number>(0);
  const [chargingCost, setChargingCost] = useState<number>(0);
  const [costFormat, setCostFormat] = useState<string>(costOptions[0].value);
  const [efficiency, setEfficiency] = useState<string>('');
  const [totalCost, setTotalCost] = useState<number>(0);
  const [costPerKwh, setCostPerKwh] = useState<number>(0);

  const calculateCost = () => {
    const efficiencyNumber = parseFloat(efficiency); // Convert efficiency to a number
    if (!efficiencyNumber) return; // Handle cases where efficiency is not a valid number

    const chargingTime = selectedCar.battery / efficiencyNumber;
    let totalChargingCost = 0;

    if (costFormat === 'perKwh') {
      totalChargingCost = selectedCar.battery * (chargingCost || 0);
    } else if (costFormat === 'perHour') {
      totalChargingCost = chargingTime * (chargingCost || 0);
    } else if (costFormat === 'per15Min') {
      totalChargingCost = chargingTime * 4 * (chargingCost || 0); // 1 hour = 4 * 15 mins
    } else if (costFormat === 'per30Min') {
      totalChargingCost = chargingTime * 2 * (chargingCost || 0); // 1 hour = 2 * 30 mins
    }

    const totalParkingCost = chargingTime * (parkingCost || 0);
    const finalTotalCost = totalParkingCost + totalChargingCost;

    setTotalCost(finalTotalCost);
    setCostPerKwh(finalTotalCost / selectedCar.battery);
  };

  return (
    <PageContainer title="Tesla Charging Cost Calculator" description="Calculate the charging cost">
      <DashboardCard title="Tesla Charging Cost Calculator">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              select
              label="Select Tesla Model"
              value={selectedCar.label}
              onChange={(e) => setSelectedCar(carOptions.find((car) => car.label === e.target.value) || carOptions[0])}
              fullWidth
            >
              {carOptions.map((option) => (
                <MenuItem key={option.label} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Parking Cost per Hour (HKD)"
              type="number"
              value={parkingCost}
              onChange={(e) => setParkingCost(parseFloat(e.target.value))}
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              label="Charging Cost Format"
              value={costFormat}
              onChange={(e) => setCostFormat(e.target.value)}
              fullWidth
            >
              {costOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Charging Cost (HKD)"
              type="number"
              value={chargingCost}
              onChange={(e) => setChargingCost(parseFloat(e.target.value))}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Efficiency (kW)"
              type="number"
              value={efficiency}
              onChange={(e) => setEfficiency(e.target.value)}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={calculateCost} fullWidth>
              Calculate
            </Button>
          </Grid>

          {totalCost !== null && (
            <>
              <Grid item xs={12}>
                <Typography variant="h6">Total Charging Cost: HKD {totalCost.toFixed(2)}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Cost per kWh: HKD {costPerKwh.toFixed(2)}/kWh</Typography>
              </Grid>
            </>
          )}
        </Grid>
      </DashboardCard>
    </PageContainer>
  );
};

export default Shadow;
