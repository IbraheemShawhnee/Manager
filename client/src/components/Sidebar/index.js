import React from 'react'
import axios from "axios";
import { IconContext } from "react-icons/lib";
import {
    SidebarContainer,
    Icon,
    CloseIcon,
    SidebarWrapper,
    SidebarMenu,
    SidebarLink,
    SideBtnWrapper,
    SideBtn,
} from './SidebarElements';

const Sidebar = (props) => {
    const logout = async () => {
        await axios.get("/api/logout");
        window.open("/", "_self");
    };
    return (
        <>
            <IconContext.Provider value={{ color: "#fff" }}>
                <SidebarContainer isOpen={props.isOpen} onClick={props.toggle}>
                    <Icon onClick={props.toggle}>
                        <CloseIcon />
                    </Icon>
                    <SidebarWrapper>
                        <SidebarMenu>
                            {props.user ? <>
                                {(props.user.isAdmin || props.user.isSuper) ?
                                    <>
                                        <SidebarLink to="/">
                                            Home
                                        </SidebarLink>
                                        <SidebarLink to="/bills">
                                            Bills
                                        </SidebarLink>
                                        <SidebarLink to="/workers">
                                            Workers
                                        </SidebarLink>
                                        <SidebarLink to="/logs">
                                            Logs
                                        </SidebarLink>
                                        <SidebarLink to="/payees">
                                            Payees
                                        </SidebarLink>
                                        <SidebarLink to="/cheques">
                                            Cheques
                                        </SidebarLink>
                                    </>
                                    :
                                    <>
                                        <SidebarLink to="/myLogs">
                                            My Logs
                                        </SidebarLink>
                                    </>
                                }
                                <SidebarLink to="/changePassword">
                                    Change Password
                                </SidebarLink>
                                <SideBtnWrapper>
                                    <SideBtn onClick={logout} to="/">Logout</SideBtn>
                                </SideBtnWrapper>
                            </> :
                                <SideBtnWrapper>
                                    <SideBtn to="/login">Login</SideBtn>
                                </SideBtnWrapper>
                            }
                        </SidebarMenu>
                    </SidebarWrapper>
                </SidebarContainer>
            </IconContext.Provider>
        </>
    )
}

export default Sidebar;

