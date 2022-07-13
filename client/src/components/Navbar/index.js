import React from 'react'
import { FaBars } from 'react-icons/fa'
import axios from "axios";

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
    return (
        <>
            <Nav>
                <NavbarContainer>
                    <NavLogo to="/">Manager</NavLogo>
                    <MobileIcon onClick={props.toggle}>
                        <FaBars onClick={props.toggle}/>
                    </MobileIcon>
                    <NavMenu>
                        {
                            props.user ? <>
                                {(props.user.isAdmin || props.user.isSuper) ?
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
                                <NavbarBtnWrapper>
                                    <NavbarBtn onClick={logout} to="/">Logout</NavbarBtn>
                                </NavbarBtnWrapper>
                            </> :
                                <>
                                    <NavbarBtnWrapper>
                                        <NavbarBtn to="/login">Login</NavbarBtn>
                                    </NavbarBtnWrapper>
                                </>
                        }
                    </NavMenu>
                </NavbarContainer>
            </Nav>
        </>
    )
}

export default Navbar;

