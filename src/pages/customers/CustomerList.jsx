import React, {useState, useEffect} from 'react';
import {DataGrid, GridRowsProp, GridColDef} from '@mui/x-data-grid';
import ApiDataService from '../../api/ApiDataService';
import './CustomerList.style.css';
import {Link} from 'react-router-dom';

export default function Customers() {

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'Id', width: 100},
        {
            field: 'customer', headerName: 'Customer', width: 250, renderCell: (params) => {
                return (
                    <div class="UserListUser">
                        <img class='UserListImg' src={`data:image/*;base64,${params.row.photo}`} alt=""/>
                        {params.row.firstName} {params.row.lastName}
                    </div>
                )
            }
        },
        {field: 'telegramId', headerName: 'Telegram Id', width: 150},
        {field: 'phoneNumber', headerName: 'Phone', width: 200},
        {field: 'deliveryMethod', headerName: 'Delivery Method', width: 200},
        {field: 'deliveryAddress', headerName: 'Delivery Address', width: 335},
        {
            field: 'delete', headerName: 'Delete', width: 125, renderCell: (params) => {
                return (
                    <>
                        <Link to={'/customer/' + params.row.id}>
                            <button className="UserListEdit">Edit</button>
                        </Link>
                        <button className='UserListDelete' onClick={() => deleteCustomer(params.row.id)}><span
                            class="material-icons-round">delete_forever</span></button>
                    </>
                );
            }
        }
    ];

    const deleteCustomer = (id) => {
        console.log(id)
        ApiDataService.deleteCustomer(id)
            .then(responce => console.log(responce.data));
        setCustomers([])
    }

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        ApiDataService.getCustomers()
            .then(responce => {
                setCustomers(responce.data);
                console.log(responce.data);
            })
            .catch(err => {
                console.log(err);
                ApiDataService.handleError(err);
            })
    }, [customers]);

    const rows: GridRowsProp = customers;

    return (
        <div className='customerList'>
            <div className="header">
                <h1>Customers</h1>
                <Link to='/add-customer'>
                    <button className="userAddButton">Add</button>
                </Link>
            </div>
            <div style={{height: 640, width: '100%'}}>
                <DataGrid rows={rows} columns={columns} checkboxSelection disableSelectionOnClick/>
            </div>
        </div>
    );
}
