import { Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import DashboardCard from '@/app/components/shared/DashboardCard';
import { useRouter } from 'next/navigation';

interface Match {
  matchId: string;
  rowNo: string;
  typeName: string;
  matchTime: string;
  matchResult: string;
  recPercent: string;
  homeTeam: string;
  visitTeam: string;
  result1: string | null;
}

interface ProductPerformanceProps {
  matchList: Match[];
}

const ProductPerformance: React.FC<ProductPerformanceProps> = ({ matchList }) => {
  const router = useRouter();

  const handleViewClick = (matchId: string) => {
    router.push(`/match/${matchId}`);
  };

  return (
    <DashboardCard title="Match List Performance">
      <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: 'nowrap',
            mt: 2,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  No
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Type
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Home Team
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Away Team
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Time
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Prediction
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Accuracy
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Details
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matchList.map((match) => (
              <TableRow key={match.matchId}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: '15px',
                      fontWeight: '500',
                    }}
                  >
                    {match.rowNo}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {match.typeName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    {match.homeTeam}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    {match.visitTeam}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    {match.matchTime}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    {match.matchResult}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">{match.recPercent}%</Typography>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleViewClick(match.matchId)}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default ProductPerformance;
