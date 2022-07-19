import React, {useContext} from 'react'
import { useDispatch } from 'react-redux';
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
import { logoutUser } from '../../features/Users/userSlice';
import { UserContext } from '../../App';
const Sidebar = (props) => {
    const {user} = useContext(UserContext);
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(logoutUser());
    };
    return (
        <>
                <SidebarContainer isOpen={props.isOpen} onClick={props.toggle}>
                    <Icon onClick={props.toggle}>
                        <CloseIcon />
                    </Icon>
                    <SidebarWrapper>
                        <SidebarMenu>
                            {user ? <>
                                {(user.isAdmin || user.isSuper) ?
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
        </>
    )
}

export default Sidebar;

