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
                <LoadingCenter>
                    <ClipLoader size={300} color={"#000"} cssOverride={false} />
                </LoadingCenter>
            </LoadingContainer>
        </>
    )
}

export default Loading;

