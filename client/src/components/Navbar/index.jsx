import React, { useState, useEffect, useContext } from 'react'
import { useDispatch } from 'react-redux';
// import axios from "axios";
import { FaBars } from 'react-icons/fa'
import { UserContext } from "../../App"
import { logoutUser } from '../../features/Users/userSlice';
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
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(logoutUser())
        // await axios.get("/api/logout");
        window.open("/", "_self");
    };

    const { user } = useContext(UserContext);

    return (
        <>
            <Nav>
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
                                            <NavLinks to="/logs">My Logs</NavLinks>
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

