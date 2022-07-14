import React, { useState, useContext } from 'react'
import Video from "../../videos/video.mp4"
import {
    HomeContainer,
    HomeBg,
    VideoBg,
    HomeContent,
    HomeH1,
    HomeP,
    HomeBtnWrapper,
    HomeBtn,
    ArrowForward,
    ArrowRight,
    FooterP
} from "./LandingPageElements";

import { UserContext } from "../../App";

function Home() {
    const u = useContext(UserContext);
    const { user } = useContext(UserContext);
    const year = new Date().getFullYear();
    const [hover, setHover] = useState(false);
    const onHover = () => {
        setHover(!hover);
    };
    document.title = "Manager";
    return (
        <HomeContainer>
            <HomeBg>
                <VideoBg autoPlay loop muted src={Video} type="video/mp4" />
            </HomeBg>
            <HomeContent>
                <HomeH1>
                    AL-ANABOSI
                </HomeH1>
                <HomeP>
                    Welcome to the Manager App <br />
                    Let's get Working!
                </HomeP>
                <HomeBtnWrapper>
                    <HomeBtn to="/myLogs"
                        onMouseEnter={onHover}
                        onMouseLeave={onHover}
                        // primary="true"
                        big="true"
                    >
                        View Your Work Logs {hover ? <ArrowForward /> : <ArrowRight />}
                    </HomeBtn>
                </HomeBtnWrapper>
                <FooterP>&copy; Assad Anabosi {year}
                    {user &&
                        <span> - Currently logged in as {user.username}</span>
                    }
                </FooterP>
            </HomeContent>
        </HomeContainer>
    )
}

export default Home
