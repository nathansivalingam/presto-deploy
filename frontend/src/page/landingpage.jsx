import React from 'react';
import { Link } from "react-router-dom";
import { Box, Background, GlobalBodyStyle } from "../styles/styledComponents"

const LandingPage = function({ token }) {

    return <>
        <GlobalBodyStyle/>
        <Background>
           <Box>
                <h2>Welcome To Presto</h2>
                <Link to='/register'>Register</Link>
                <Link to='/login'>Login</Link>
            </Box>
        </Background>
       
       
    </>;
};

export default LandingPage