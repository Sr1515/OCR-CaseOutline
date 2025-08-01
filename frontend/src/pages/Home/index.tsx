import { useEffect, useState } from "react";
import { Container } from "./style";

import NavBar from "../../components/Navbar";
import PopupMessage from "../../components/PopupMessage";
import { useLocation } from "react-router-dom";
import Scanner from "../../components/Scanner";


const Home = () => {
    const [popupMensagem, setPopupMensagem] = useState<string | null>(null);
    const location = useLocation();

    useEffect(() => {

        if (location.state?.message) {
            setPopupMensagem(location.state.message);
            setTimeout(() => {
                setPopupMensagem(null);
            }, 3000);
        }
    }, [location.state]);

    return (
        <>
            <Container>
                <NavBar />
                <Scanner />
            </Container>

            {popupMensagem && (
                <PopupMessage
                    message={popupMensagem}
                    onClose={() => setPopupMensagem(null)}
                    duration={3000}
                />
            )} 
        </>
    );
};

export default Home;