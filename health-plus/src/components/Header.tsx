import {IonButton} from "@ionic/react";
import { useHistory } from 'react-router-dom';

const Header: React.FC = () => {
    const history = useHistory();
    const handleLogout = () => {
        history.push('/login')
    }
    return (<IonButton onClick={handleLogout}>Logout</IonButton>)
}

export default Header;