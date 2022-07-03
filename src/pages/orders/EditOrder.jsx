import {useState, useEffect} from 'react';
import './EditOrder.style.css'
import {useParams} from 'react-router-dom';
import {DataGrid, GridRowsProp, GridColDef} from '@mui/x-data-grid';
import ApiDataService from '../../api/ApiDataService';

export default function NewUser() {

    const id = useParams().id;

    const mousse = ["\"Медовый апельсин\"", "\"Ананасовый сорбет\"", "\"Дабл эпл\"", "\"Три шоколада\"", "\"Клубничный Шейк\"", "\"Лимонный блюз\"", "\"Бейлис\""];
    const biscuit = ["\"Молочный пломбир с карамелизированным бананом\"", "\"Классический ванильный\"", "\"Шоколадные тропики\"", "\"Рафаэлло\"", "\"Красный бархат с вишней\"", "\"Малиновый бабл\"", "\"Сникерс\"", "\"Кофейная груша\"", "\"Хрустящая вишня\""];


    const [order, setOrder] = useState({});

    useEffect(() => {
        ApiDataService.getOrder(id)
            .then(response => {
                setOrder(response.data);
                setDescription(response.data.patisseries);
                setStatus(response.data.orderStatus)
            });
    }, [id]);

    const [description, setDescription] = useState([]);
    const [deliveryMethod, setDeliveryMethod] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [price, setPrice] = useState("");
    const [status, setStatus] = useState();

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'Id', width: 80},
        {field: 'patisserieType', headerName: 'Type', width: 150},
        {field: 'patisserieSubType', headerName: 'SubType', width: 200},
        {
            field: 'size',
            headerName: 'Size',
            width: 150,
            editable: true,
            type: 'singleSelect',
            valueOptions: (params) => {
                return params.row.patisserieType === 'CHOCOLATE' ? ['Big', 'Small'] : ["none"];
            }
        },
        {
            field: 'flavor',
            headerName: 'Flavor',
            width: 300,
            editable: true,
            type: 'singleSelect',
            valueOptions: (params) => {
                return params.row.patisserieSubType === 'MOUSSE_CAKE' ? mousse : params.row.patisserieSubType === 'BISCUIT_CAKE' ? biscuit : ["none"];
            }
        },
        {field: 'price', headerName: 'Price', width: 200, editable: true},
        {
            field: 'delete', headerName: 'Delete', renderCell: (params) => {
                return (
                    <button className='UserListDelete' onClick={() => deletePatisserie(params.row.id)}>
                        <span class="material-icons-round">delete_forever</span>
                    </button>
                );
            }
        }
    ];

    const rows: GridRowsProp = description;

    const deletePatisserie = (id) => {
        setDescription(description.filter(o => o.id !== id))
    };

    const putEditedOrder = () => {
        order.patisseries = description;
        order.price = price !== "" ? price : order.price;
        order.deliveryMethod = deliveryMethod !== "" ? deliveryMethod : order.deliveryMethod;
        order.deliveryAddress = deliveryAddress !== "" ? deliveryAddress : order.deliveryAddress;
        order.orderStatus = status !== "" ? status : order.orderStatus;
        console.log(order);
        ApiDataService.editOrder(id, order)
            .then(resp => console.log(resp))
    };

    return (
        <div className="editOrder">
            <div className="orderTitleContainer">
                <h1 className='orderTitle'>Edit Order</h1>
                <button className="orderSubmitButton" onClick={putEditedOrder}>Update</button>
            </div>
            <form>
                <div className="userUpdateItem">
                    <label>Delivery Method</label>
                    <input type="text"
                           value={deliveryMethod}
                           placeholder={order.deliveryMethod}
                           onChange={event => setDeliveryMethod(event.target.value)}
                           className='UserUpdateInput'/>
                </div>
                <div className="userUpdateItem">
                    <label>Address</label>
                    <input type="text"
                           value={deliveryAddress}
                           placeholder={order.deliveryAddress}
                           onChange={event => setDeliveryAddress(event.target.value)}
                           className='UserUpdateInput'/>
                </div>
                <div className="userUpdateItem">
                    <label>Price</label>
                    <input type="text"
                           value={price}
                           placeholder={order.price}
                           onChange={event => setPrice(event.target.value)}
                           className='UserUpdateInput'/>
                </div>
                <div className="userUpdateItem">
                    <label>Status</label>
                    <select className='statusSelect' value={status} onChange={(event) => setStatus(event.target.value)}>
                        <option value="PENDING_PAYMENT">Pending Payment</option>
                        <option value="PROCESSING">Processing</option>
                        <option value="READY_TO_DELIVER">Ready To Deliver</option>
                        <option value="DELIVERED">Delivered</option>
                    </select>
                </div>
                <div className="userUpdateItem">
                    <label>Description</label>
                    <div style={{height: 600, width: '100%'}}>
                        <DataGrid rows={rows} columns={columns} checkboxSelection disableSelectionOnClick/>
                    </div>
                </div>
            </form>
        </div>
    )
}
