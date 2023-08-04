import { FunctionComponent } from 'react';
import { Container, Paper, Typography, Box, Grid, Button } from '@mui/material';

const Players: FunctionComponent = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 7 }}>
      <Paper elevation={2} sx={{ p: 1 }}>
        <Box sx={{ pt: 1, pb: 2 }}>
          <Typography variant="h5">¿Cuántos jugadores o grupos?</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item sm={12} md={4}>
            <Button variant="contained" fullWidth color="secondary">
              1
            </Button>
          </Grid>
          <Grid item sm={12} md={4}>
            <Button variant="contained" fullWidth color="secondary">
              2
            </Button>
          </Grid>
          <Grid item sm={12} md={4}>
            <Button variant="contained" fullWidth color="secondary">
              3
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Players;
