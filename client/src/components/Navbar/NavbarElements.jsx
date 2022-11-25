import styled from "styled-components";
import { NavLink as Link } from 'react-router-dom';


export const Nav = styled.nav`
    /* box-shadow: 0 0 36px 1px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(20px); */
    /* background: transparent; */
    backdrop-filter: blur(6px);;
    background: rgba(10, 10, 10, .65);
    border-bottom: 2px solid rgba(255, 255, 255, .09);
    box-shadow: 0 8px 32px rgb(2, 4, 24);
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    position: sticky;
    top: 0;
    z-index: 10;

    @media screen and (max-width: 960px) {
        transition: 0.8s all ease;
    }
`

export const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 80px;
    z-index: 1;
    width: 100%;
    padding: 0 24px;
    max-width: 1100px;

`

export const NavLogo = styled(Link)`
    color: #fff;
    cursor: pointer;
    font-size: 1.5rem;
    display: flex;
    justify-self: flex-start;
    align-items: center;
    margin-left: 24px;
    font-weight: bold;
    text-decoration: none;
    &:hover{
        color: #010606;
        /* color: #01bf71; */
    }
`

export const MobileIcon = styled.div`
    height: 25px;
    display: none;
    @media screen and (max-width: 900px) {
            display: block;
            color: #fff;
            position: absolute;
            top: 0;
            right: 0;
            transform: translate(-100%, 60%);
            font-size: 1.8rem;
            cursor: pointer;
    }
    &:hover{
        color: #010606;
        /* color: #01bf71; */
    }
`

export const NavMenu = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;
    margin-right: -22px;
    @media screen and (max-width: 900px) {
        display: none;
    }
`

export const NavItem = styled.li`
    height: 80px;
`

export const NavLinks = styled(Link)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    &:hover{
        color: #010606;
        /* color: #01bf71; */
    }
    &[class*="active"] {
        border-bottom: 3px solid #010606;
    /* border-bottom:  3px solid #01bf71; */
  }
`;

export const NavbarBtnWrapper = styled.div`
    display: flex;
    align-items: center;
    @media screen and (max-width: 900px){
        display: none;
    }
`

export const NavbarBtn = styled(Link)`
    border-radius: 50px;
    background: #010606;
    /* background: #01bf71; */
    white-space: nowrap;
    padding: 10px 22px;
    color: #fff;
    font-size: 16px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }

`