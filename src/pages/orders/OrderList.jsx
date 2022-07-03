import React, {useState, useEffect} from 'react';
import {DataGrid, GridRowsProp, GridColDef} from '@mui/x-data-grid';
import {Link} from 'react-router-dom';
import './OrderList.style.css';
import ApiDataService from '../../api/ApiDataService';

export default function OrderList() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        ApiDataService.getOrders()
            .then(response => {
                setOrders(response.data);
                console.log(response)
            });
    }, []);

    const deleteOrder = (id) => {
        ApiDataService.deleteOrder(id)
            .then(responce => console.log(responce.data));
        setOrders([]);
    };

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'Id', width: 80},
        {
            field: 'customer', headerName: 'Customer', width: 150, renderCell: (params) => {
                return (
                    <div class="UserListUser">
                        {params.row.firstName} {params.row.lastName}
                    </div>
                )
            }
        },
        {field: 'description', headerName: 'Description', width: 150},
        {field: 'date', headerName: 'Date', width: 150},
        {field: 'deliveryMethod', headerName: 'Delivery Method', width: 150},
        {field: 'deliveryAddress', headerName: 'Address', width: 300},
        {field: 'totalPrice', headerName: 'Price', width: 100},
        {field: 'orderStatus', headerName: 'Status', width: 150},
        {
            field: 'delete', headerName: 'Delete', width: 130, renderCell: (params) => {
                return (
                    <>
                        <Link to={'/order/' + params.row.id}>
                            <button className="UserListEdit">Edit</button>
                        </Link>
                        <button className='UserListDelete' onClick={() => deleteOrder(params.row.id)}><span
                            class="material-icons-round">delete_forever</span></button>
                    </>
                );
            }
        }
    ];

    const rows: GridRowsProp = orders;

    return (
        <div className='orderList'>
            <div className="header">
                <h1>Orders</h1>
                <Link to='/addOrder'>
                    <button className="orderAddButton">Add</button>
                </Link>
            </div>
            <div style={{height: 600, width: '100%'}}>
                <DataGrid rows={rows} columns={columns} checkboxSelection disableSelectionOnClick/>
            </div>
        </div>
    );

}