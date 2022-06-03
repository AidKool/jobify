import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  MenuItem,
  Container,
  Select,
  Typography,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import { useQuery } from '@apollo/client';
import { useAppContext } from '../../context/AppContext';
import { QUERY_LOGGED_IN_USER } from '../../utils/queries';
import { Alert } from '../../components';

function AddJobs() {
  const { loading, data } = useQuery(QUERY_LOGGED_IN_USER);
  const userData = data?.me || {};
  const { isLoading, showAlert, displayAlert, createJob } = useAppContext();

  const initialState = {
    position: '',
    company: '',
    location: '',
    status: 'pending',
    type: 'full-time',
  };

  const [formState, setFormState] = useState(initialState);

  useEffect(() => {
    if (data) {
      setFormState({
        position: '',
        company: '',
        location: userData.location,
        status: 'pending',
        type: 'full-time',
      });
    }
  }, [data, userData.location]);

  function handleFormChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  }

  async function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    console.log(formState);

    const { position, company, location, status, type } = formState;
    if (!position || !company || !location || !status || !type) {
      return displayAlert();
    }
    try {
      createJob({ position, company, location, status, type });
      resetForm();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  function resetForm() {
    setFormState(initialState);
  }

  return (
    <Box bgcolor="secondary.main">
      <Container maxWidth={false} sx={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center' }}>
        <Grid container display="flex" justifyContent="center">
          <Grid item xs={12} sm={9} md={7} lg={5} xl={4}>
            <Box
              onSubmit={handleFormSubmit}
              component="form"
              noValidate
              autoComplete="off"
              display="flex"
              justifyContent="center"
              flexDirection="column"
              rowGap={4}
              borderRadius="0.25rem"
              sx={{ backgroundColor: '#fff' }}
              borderTop="5px solid"
              borderColor="primary.main"
              padding={5}>
              <Typography variant="h5" textAlign="center" textTransform="capitalize">
                add job
              </Typography>
              {showAlert && <Alert />}
              <TextField
                onChange={handleFormChange}
                name="company"
                label="Company"
                value={formState.company}
                type="text"
                variant="outlined"
                color="primary"
                fullWidth
                required
                size="small"
                placeholder="Company"></TextField>
              <TextField
                onChange={handleFormChange}
                name="position"
                label="Position"
                value={formState.position}
                type="text"
                variant="outlined"
                color="primary"
                fullWidth
                required
                size="small"
                placeholder="Position"></TextField>
              <TextField
                onChange={handleFormChange}
                name="location"
                label="Location"
                value={formState.location}
                type="email"
                variant="outlined"
                color="primary"
                fullWidth
                required
                size="small"
                placeholder="Location"></TextField>
              <FormControl size="small">
                <InputLabel id="status-select-label">Status</InputLabel>
                <Select
                  labelId="status-select-label"
                  id="status-select"
                  name="status"
                  label="Status"
                  value={formState.status}
                  onChange={(event: SelectChangeEvent) => {
                    setFormState({
                      ...formState,
                      status: event.target.value,
                    });
                  }}>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="interview">Interview</MenuItem>
                  <MenuItem value="declined">Declined</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small">
                <InputLabel id="status-select-label">Type</InputLabel>
                <Select
                  labelId="type-select-label"
                  id="type-select"
                  name="type"
                  label="Type"
                  value={formState.type}
                  onChange={(event: SelectChangeEvent) => {
                    setFormState({
                      ...formState,
                      type: event.target.value,
                    });
                  }}>
                  <MenuItem value="full-time">Full Time</MenuItem>
                  <MenuItem value="part-time">Part Time</MenuItem>
                  <MenuItem value="remote">Remote</MenuItem>
                  <MenuItem value="internship">Internship</MenuItem>
                </Select>
              </FormControl>
              <Stack direction="row" spacing={2} display="flex" justifyContent="center">
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                  disableElevation
                  sx={{ bgcolor: 'primary.main', color: '#f2f2f2' }}>
                  submit
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="error"
                  disabled={isLoading}
                  disableElevation
                  onClick={resetForm}>
                  clear
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AddJobs;
