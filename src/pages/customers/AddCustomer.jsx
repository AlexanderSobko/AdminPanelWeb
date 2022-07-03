import {useState} from 'react';
import './AddCustomer.style.css';
import ApiDataService from '../../api/ApiDataService';

export default function AddCustomer() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [telegramId, setTelegramId] = useState("");
    const [userName, setUserName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [deliveryMethod, setDeliveryMethod] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [photo, setPhoto] = useState();

    const [data, setData] = useState();

    const postNewUser = () => {
        setData({
            firstName: firstName,
            lastName: lastName,
            telegramId: telegramId,
            userName: userName,
            phoneNumber: phoneNumber,
            deliveryMethod: deliveryMethod,
            deliveryAddress: deliveryAddress,
            photo: photo ? photo.slice(22) : null
        });
        console.log(data);
        ApiDataService.addCustomer(data)
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
        <div className='newUser'>
            <h1 className="newUserTitle">New User</h1>
            <form action="src/pages/customers/AddCustomer" className="newUserForm">
                <div className="newUserItem">
                    <label>First Name</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        className='newUserInput'/>
                </div>
                <div className="newUserItem">
                    <label>Last Name</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        className='newUserInput'/>
                </div>
                <div className="newUserItem">
                    <label>Telegram Id</label>
                    <input
                        type="text"
                        value={telegramId}
                        onChange={(event) => setTelegramId(event.target.value)}
                        className='newUserInput'/>
                </div>
                <div className="newUserItem">
                    <label>User Name</label>
                    <input
                        type="text"
                        value={userName}
                        onChange={(event) => setUserName(event.target.value)}
                        className='newUserInput'/>
                </div>
                <div className="newUserItem">
                    <label>Phone Number</label>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(event) => setPhoneNumber(event.target.value)}
                        className='newUserInput'/>
                </div>
                <div className="newUserItem">
                    <label>Delivery Method</label>
                    <input
                        type="text"
                        value={deliveryMethod}
                        onChange={(event) => setDeliveryMethod(event.target.value)}
                        className='newUserInput'/>
                </div>
                <div className="newUserItem">
                    <label>Delivery Address</label>
                    <input
                        type="text"
                        value={deliveryAddress}
                        onChange={(event) => setDeliveryAddress(event.target.value)}
                        className='newUserInput'/>
                </div>
            </form>
            <div className="userUpdateUpload">
                <img src={photo ? photo : '/avatar.jpg'} alt="" className="userUpdateImg"/>
                <label htmlFor="file">
                    <span className="material-icons-round" style={{cursor: 'pointer'}}>publish</span>
                </label>
                <input
                    type="file" id='file'
                    onChange={event => imageHandler(event.target.files[0])}
                    style={{display: 'none'}}
                    accept='image/*'/>
            </div>
            <button className="newUserSubmit" onClick={() => postNewUser()}>Create</button>
        </div>
    )
}
