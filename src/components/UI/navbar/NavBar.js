import NavBarItem from "./NavBarItem";
import './NavBar.styles.css'
import ApiDataService from "../../../api/ApiDataService";


export default function NavBar(props) {

    function toggle() {
        props.set(!props.isOpen)
    }

    const handleSubmit = () => {
        ApiDataService.logout();
    }

    return (
        <div className={props.isOpen ? 'sidebar open' : 'sidebar'}>
            <div className='logo'>
                    <span className="material-icons-round" id="logo">filter_vintage</span>
                    <span className='logo_name'>MatteoSweets</span>
                    <span onClick={toggle} class="material-icons-round" id='btn'>menu</span>
            </div>

            <div className="navigation">
                <ul>
                    <NavBarItem name="Dashboard" iconName="dashboard" route="/"/>
                    <NavBarItem name="Customers" iconName="groups" route="/customers"/>
                    <NavBarItem name="Orders" iconName="receipt_long" route="/orders"/>
                    <NavBarItem name="Products" iconName="shopping_bag" route="/products"/>
                    <NavBarItem name="Messages" iconName="chat" route="/messages"/>
                    <NavBarItem name="Posts" iconName="post_add" route="/posts"/>
                    <NavBarItem name="Statistic" iconName="insights" route="/statistics"/>
                    <li className="profile">
                        <div className="profile-details">
                            {/* <img src="profile.jpg" alt="profileImg"/> */}
                            <div className="name_job">
                                <div className="name">Sobko Alexander</div>
                                <div className="job">Java developer</div>
                            </div>
                        </div>
                        <button className="logout" onClick={handleSubmit}>
                            <span class="material-icons-round" id="log_out">logout</span>
                        </button>
                        
                    </li>
                </ul>
            </div>
        </div>
    )
}
