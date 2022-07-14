import React, { useState, useEffect, useContext } from 'react'
import { FaBars } from 'react-icons/fa'
import axios from "axios";
import { UserContext } from "../../App"
import {
    Nav,
    NavbarContainer,
    NavLogo,
    MobileIcon,
    NavMenu,
    NavItem,
    NavLinks,
    NavbarBtnWrapper,
    NavbarBtn,

} from "./NavbarElements";

const Navbar = (props) => {
    const logout = async () => {
        await axios.get("/api/logout");
        window.open("/", "_self");
    };

    const {user} = useContext(UserContext);
    const [scrollNav, setScrollNav] = useState(false);

    const changeNav = () => {
        if (window.screenY >= 20) {
            setScrollNav(true);
        } else {
            setScrollNav(false);
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', changeNav)
    }, []);

    return (
        <>
            <Nav scrollNav={scrollNav}>
                <NavbarContainer>
                    <NavLogo to="/">Manager</NavLogo>
                    <MobileIcon onClick={props.toggle}>
                        <FaBars onClick={props.toggle} />
                    </MobileIcon>
                    <NavMenu>
                        {
                            user && <>
                                {(user.isAdmin || user.isSuper) ?
                                    <>
                                        <NavItem>
                                            <NavLinks to="/bills">Bills</NavLinks>
                                        </NavItem>
                                        <NavItem>
                                            <NavLinks to="/workers">Workers</NavLinks>
                                        </NavItem>
                                        <NavItem>
                                            <NavLinks to="/logs">Logs</NavLinks>
                                        </NavItem>
                                        <NavItem>
                                            <NavLinks to="/payees">Payees</NavLinks>
                                        </NavItem>
                                        <NavItem>
                                            <NavLinks to="/cheques">Cheques</NavLinks>
                                        </NavItem>
                                    </>
                                    :
                                    <>
                                        <NavItem>
                                            <NavLinks to="/myLogs">My Logs</NavLinks>
                                        </NavItem>
                                    </>
                                }
                                <>
                                    <NavItem>
                                        <NavLinks to="/changePassword">Change Password</NavLinks>
                                    </NavItem>
                                </>
                            </>
                        }
                    </NavMenu>
                    {user ?
                        <NavbarBtnWrapper>
                            <NavbarBtn onClick={logout} to="/">Logout</NavbarBtn>
                        </NavbarBtnWrapper>
                        :
                        <NavbarBtnWrapper>
                            <NavbarBtn to="/login">Login</NavbarBtn>
                        </NavbarBtnWrapper>
                    }
                </NavbarContainer>
            </Nav>
        </>
    )
}

export default Navbar;

