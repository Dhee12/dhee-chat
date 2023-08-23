import React from 'react';
import {Link} from "react-router-dom";

function Header() {

    return <nav className="navbar navbar-expand-lg navbar-light header">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link to="/"><img className='logoImg' src="Dheelogo.png" alt="LOGO"/></Link>
                    </div>
                    <ul className="nav justify-content-end">
                            <li className="nav-item">
                                <Link className="nav-link" to="#">Support</Link>
                            </li>
                            <li className="nav-item">
                                <img className='userImg' src="Aang1.png" alt ="User Images"/>
                            </li>
                        </ul>
                </div>
                </nav>
}

export default Header;