import { useQuery } from 'react-query';

import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import {DataGrid} from '@mui/x-data-grid';

import Api from '../services';

import Loader from '../components/shared/Loader';
import ErrorComponent from '../components/shared/ErrorComponent';

const paginationModel = { page: 0, pageSize: 5 };

const Home = () => {

  // Get Users Data
  const { data: usersData, isError, isLoading: isUsersLoading } = useQuery(
    ['usersData'],
    () =>
      Api.user.getUsers(),
    {
      enabled: true,
      // onSuccess: data => { },
      select: data => {
        return data.map(dt => ({ ...dt, firstName: dt.name?.firstname, lastName: dt.name?.lastname }))
      },
    }
  );

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'email',
      headerName: 'Email',
      type: 'string',
      width: 150,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      type: 'string',
      width: 140,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
  ];

  return (
    <Container>
      <Typography variant="h1" mb={{ xs: 2, md: 3 }}>
        All Users
      </Typography>
      {/* Loading Case */}
      {isUsersLoading && <Loader />}

      {/* Error Case */}
      {isError && <ErrorComponent />}

      {/* Data Case */}
      {usersData && !isUsersLoading && <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{
            width: '100%',
            overflow: 'auto',
            '& .MuiDataGrid-root': {
              width: '100%',
            }
          }}>
            <DataGrid
              rows={usersData}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              sx={{ border: 0 }}
            />

          </Box>
        </Grid>
      </Grid>}
    </Container>
  )
}

export default Home