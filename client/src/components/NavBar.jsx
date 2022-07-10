import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import './navBar.css';
const NavBar = (props) => {
    const logout = async () => {
        await axios.get("/api/logout");
        window.open("/", "_self");
    };
    return (
        <nav>
            <h2>Manager
                {
                    props.user ? (<span> - {props.user.name}</span>) : (<span></span>)
                }
            </h2>
            <ul className="nav-links">
                {
                    props.user ? (
                        <>
                            {(props.user.isAdmin || props.user.isSuper) &&
                                (<>
                                    <Link className="link" to="/">
                                        <li>Home</li>
                                    </Link>
                                    <Link className="link" to="/bills">
                                        <li>Bills</li>
                                    </Link>
                                    <Link className="link" to="/workers">
                                        <li>Workers</li>
                                    </Link>
                                    <Link className="link" to="/logs">
                                        <li>Logs</li>
                                    </Link>
                                    <Link className="link" to="/payees">
                                        <li>Payees</li>
                                    </Link>
                                    <Link className="link" to="/cheques">
                                        <li>Cheques</li>
                                    </Link>
                                </>
                                )
                            }
                            <Link className="link" to="/">
                                <li onClick={logout}>Logout</li>
                            </Link>
                        </>
                    ) : (
                        <Link className="link" to="/login">
                            <li>Login</li>
                        </Link>
                    )
                }
                {props.user && (props.user.isAdmin || props.user.isSuper) &&
                    <Link className="link" to="/register">
                        <li>Register</li>
                    </Link>
                }
            </ul>
        </nav>
    )
}

export default NavBar;

