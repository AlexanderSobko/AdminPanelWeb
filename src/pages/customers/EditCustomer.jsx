import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './EditCustomer.style.css';
import ApiDataService from '../../api/ApiDataService';

export default function EditCustomer() {

    const id = useParams().id;

    const [customer, setCustomer] = useState({});

    useEffect(() => {
        ApiDataService.getCustomer(id)
            .then(response => setCustomer(response.data));
    }, [id]);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [telegramId, setTelegramId] = useState("");
    const [userName, setUserName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [deliveryMethod, setDeliveryMethod] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [photo, setPhoto] = useState('/avatar.jpg');

    const putUser = (e) => {
        e.preventDefault()
        customer.firstName = firstName ? firstName : customer.firstName;
        customer.lastName = lastName ? lastName : customer.lastName;
        customer.telegramId = telegramId ? telegramId : customer.telegramId;
        customer.userName = userName ? userName : customer.userName;
        customer.phoneNumber = phoneNumber ? phoneNumber : customer.phoneNumber;
        customer.deliveryMethod = deliveryMethod ? deliveryMethod : customer.deliveryMethod;
        customer.deliveryAddress = deliveryAddress ? deliveryAddress : customer.deliveryAddress;
        customer.photo = photo && !photo.match("/avatar.jpg") ? photo : customer.photo;
        console.log(customer);
        ApiDataService.editCustomer(customer)
            .then(resp => console.log(resp))
    };

    const imageHandler = (file) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            setPhoto(fileReader.result);
        };
    }

    return (
        <div className='user'>
            <div className="userTitleContainer">
                <h1 className='userTitle'>Edit User</h1>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img className='userShowImg' src={`data:image/jpg;base64,${customer.photo}`} alt=""/>
                        <div className="userShowTopTitle">
                            <span className="userShowUserName">{customer.firstName} {customer.lastName}</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Account Details</span>
                        <div className="userShowInfo">
                            <span className="userShowInfoTitle"><h5>Name: </h5></span>
                            <span className="userShowInfoTitle">{customer.firstName}</span>
                        </div>
                        <div className="userShowInfo">
                            <span className="userShowInfoTitle"><h5>Surname: </h5></span>
                            <span className="userShowInfoTitle">{customer.lastName}</span>
                        </div>
                        <div className="userShowInfo">
                            <span className="userShowInfoTitle"><h5>Telegram Id: </h5></span>
                            <span className="userShowInfoTitle">{customer.telegramId}</span>
                        </div>
                        <div className="userShowInfo">
                            <span className="userShowInfoTitle"><h5>Username: </h5></span>
                            <span className="userShowInfoTitle">@{customer.userName}</span>
                        </div>
                        <span className="userShowTitle">Accoun Contacts</span>
                        <div className="userShowInfo">
                <span className="userShowInfoTitle">
                  <h5>Phone: </h5>
                    {customer.phoneNumber}
                </span>
                        </div>
                        <div className="userShowInfo">
                <span className="userShowInfoTitle">
                  <h5>Delivery Method: </h5>
                    {customer.deliveryMethod}
                </span>
                        </div>
                        <div className="userShowInfo">
                <span className="userShowInfoTitle">
                  <h5>Address: </h5>
                    {customer.deliveryAddress}
                </span>
                        </div>
                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Name</label>
                                <input
                                    type="text"
                                    value={firstName}
                                    placeholder={customer.firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                    className='UserUpdateInput'/>
                            </div>
                            <div className="userUpdateItem">
                                <label>Surname</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    placeholder={customer.lastName}
                                    onChange={event => setLastName(event.target.value)}
                                    className='UserUpdateInput'/>
                            </div>
                            <div className="userUpdateItem">
                                <label>Telegram Id</label>
                                <input type="text"
                                       value={telegramId}
                                       placeholder={customer.telegramId}
                                       onChange={event => setTelegramId(event.target.value)}
                                       className='UserUpdateInput'
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Username</label>
                                <input type="text"
                                       value={userName}
                                       placeholder={customer.userName}
                                       onChange={event => setUserName(event.target.value)}
                                       className='UserUpdateInput'/>
                            </div>
                            <div className="userUpdateItem">
                                <label>Phone Number</label>
                                <input type="text"
                                       value={phoneNumber}
                                       placeholder={customer.phoneNumber}
                                       onChange={event => setPhoneNumber(event.target.value)}
                                       className='UserUpdateInput'/>
                            </div>
                            <div className="userUpdateItem">
                                <label>Delivery Method</label>
                                <input type="text"
                                       value={deliveryMethod}
                                       placeholder={customer.deliveryMethod}
                                       onChange={event => setDeliveryMethod(event.target.value)}
                                       className='UserUpdateInput'/>
                            </div>
                            <div className="userUpdateItem">
                                <label>Address</label>
                                <input type="text"
                                       value={deliveryAddress}
                                       placeholder={customer.deliveryAddress}
                                       onChange={event => setDeliveryAddress(event.target.value)}
                                       className='UserUpdateInput'/>
                            </div>
                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <img src={photo} alt="" className="userUpdateImg"/>
                                <label htmlFor="file">
                                    <span className="material-icons-round" style={{cursor: 'pointer'}}>publish</span>
                                </label>
                                <input type="file" id='file' onChange={event => imageHandler(event.target.files[0])}
                                       style={{display: 'none'}}/>
                            </div>
                            <button className="userUpdateSubmit" onClick={putUser}>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
