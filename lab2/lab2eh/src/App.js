import logo from './logo.svg';
import './App.css';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';


function App() {
  const [patients, setPatients] = useState(0);

  useEffect(() => {
    getPatients()
  }, [])

  const getPatientsFromServer = async () => {
    const URL = 'https://alexgr.ro/ehealth/patients.json'
    const res = await fetch(URL, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    );

    return res
  }

  const getPatients = () => {
    getPatientsFromServer().then(res => {
      if (res.status === 200) {
        res.json()
          .then(res => {
            console.log(res)
            setPatients(res)
          })
      }
    })
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 130 },
    { field: 'first_name', headerName: 'First Name', width: 130 },
    { field: 'last_name', headerName: 'Last Name', width: 130 },
    { field: 'email', headerName: 'E-Mail Address', width: 250 },
    { field: 'gender', headerName: 'Gender', width: 130 },
  ];


  return (
    <div style={{ height: 400, width: '100%' }}>
      {patients && <DataGrid
        rows={patients}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />}
    </div>
  );
}

export default App;
