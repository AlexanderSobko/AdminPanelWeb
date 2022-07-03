import React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

export default function Orders() {

    const rows: GridRowsProp = [
  {id:1,customer:'Alexander Sobko', description: 'dic', deliveryMethod: 'some', adress: 'fdjfn', totalPrice: 232323, orderStatus: "deliverd"}
];

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Id', width: 150 },
        { field: 'customer', headerName: 'Customer', width: 150 },
        { field: 'description', headerName: 'Description', width: 150 },
        { field: 'deliveryMethod', headerName: 'Delivery Method', width: 150 },
        { field: 'address', headerName: 'Address', width: 150 },
        { field: 'deliveryMethod', headerName: 'Delivery Method', width: 150 },
        { field: 'totalPrice', headerName: 'Price', width: 150 },
        { field: 'orderStatus', headerName: 'Status', width: 150 }
    ];

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
