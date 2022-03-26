import 'antd/dist/antd.css';
import logo from './logo.svg';
import './App.css';
import { DataGrid } from '@mui/x-data-grid';
import { Table, Tag, Space, Button, Modal } from 'antd';
import React, { useState, useEffect } from 'react';


function App() {
  const [modal, contextHolder] = Modal.useModal();
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

  function info(data) {
    Modal.info({
      title: 'Patient info',
      content: (
        <div>
          <p><Tag color="blue">Fisrt Name:</Tag> {data.first_name}</p>
          <p><Tag color="blue">Last Name:</Tag> {data.first_name}</p>
          <p><Tag color="blue">E-Mail:</Tag> {data.email}</p>
          <p><Tag color="blue">Gender:</Tag> {data.gender}</p>
        </div>
      ),
      onOk() {},
    });
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'E-Mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Gender',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Show More',
      dataIndex: 'show_more',
      key: 'show_more',
      render: (label, record) => {
        console.log(record)
        return (
            <Button type="primary" onClick={() => {info(record)}}>
              Show info
            </Button>
        );
      },
    },
  ];


  return (
    <div style={{ height: 400, width: '100%' }}>
      {patients && <Table
        dataSource={patients}
        columns={columns}
      />}
    </div>
  );
}

export default App;
