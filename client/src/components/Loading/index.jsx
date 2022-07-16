import React, { useContext } from 'react'
import {
    LoadingContainer,
    LoadingMenu,
    LoadingCenter
} from './LoadingElements';
import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => {
    return (
        <>
            <LoadingContainer>
                <LoadingMenu>
                    <LoadingCenter>
                        <ClipLoader size={300} color={"#01bf71"}cssOverride={false}/>
                    </LoadingCenter>
                </LoadingMenu>
            </LoadingContainer>
        </>
    )
}

export default Loading;

