import {IonButton, IonText, IonToolbar} from "@ionic/react";
import { useHistory } from 'react-router-dom';

const Header: React.FC = () => {
    const history = useHistory();
    const handleLogout = () => {
        history.push('/login')
    }
    return (
        <IonToolbar>
            {/* <img src='../healthcare-icon.png' /> */}
            {/* <IonText class='ion-text-justify'>Health+</IonText> */}
            <IonButton onClick={handleLogout} class='ion-float-right' fill="outline">Logout</IonButton>
        </IonToolbar>
    )
}

export default Header;