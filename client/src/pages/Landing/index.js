import React, { useState } from 'react'
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

function Home(props) {
    const year = new Date().getFullYear();
    const [hover, setHover] = useState(false);
    const onHover = () => {
        setHover(!hover);
    };
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
                    <HomeBtn to={props.user ? "/myLogs" : "/login"}
                        onMouseEnter={onHover}
                        onMouseLeave={onHover}
                        // primary="true"
                        big="true"
                    >
                        View Your Work Logs {hover ? <ArrowForward /> : <ArrowRight />}
                    </HomeBtn>
                </HomeBtnWrapper>
                <FooterP>&copy; Assad Anabosi {year}</FooterP>
            </HomeContent>
        </HomeContainer>
    )
}

export default Home
