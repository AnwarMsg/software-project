import * as React from 'react';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { MenuItem, Typography, Grid } from '@mui/material';
import AppNavbar from '../components/AppNavbar';
import Header from '../components/Header';
import MainGrid from '../components/MainGrid';
import SideMenu from '../components/SideMenu';
import AppTheme from '../shared-theme/AppTheme';
import DriverEarningsChart from '../components/DriverEarningsChart'; // <-- Import DriverEarningsChart here
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from '../shared-theme/customizations';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function DriverDashboard(props) {
  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu>
          <MenuItem>Dashboard Overview</MenuItem>
          <MenuItem>Upcoming Rides</MenuItem>
          <MenuItem>Earnings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Settings</MenuItem>
        </SideMenu>
        <AppNavbar />
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header>
              <Typography variant="h6">Welcome, Driver</Typography>
              <Typography variant="subtitle2">Total Earnings: $500</Typography>
            </Header>
            <MainGrid>
              <Grid item>
                <DriverEarningsChart /> {/* Custom component for earnings chart */}
              </Grid>
              <Grid item>
                <UpcomingRides /> {/* Custom component for upcoming rides */}
              </Grid>
              <Grid item>
                <TripHistory /> {/* Custom component for completed trip history */}
              </Grid>
            </MainGrid>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
