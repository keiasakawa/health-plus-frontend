import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
  IonItem,
  IonIcon,
  IonButton,
  IonLabel,
  IonInput,
} from "@ionic/react";
import { BsPersonCircle } from "react-icons/bs";

const LoginPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonRow>
          <IonCol class="ion-text-center">
            <BsPersonCircle size={70} />
          </IonCol>
        </IonRow>
        <IonItem lines="full">
          <IonLabel position="floating">Email</IonLabel>
          <IonInput type="text" required></IonInput>
        </IonItem>
        <IonItem lines="full">
          <IonLabel position="floating">Password</IonLabel>
          <IonInput type="password" required></IonInput>
        </IonItem>
        <IonRow>
          <IonCol>
            <IonButton type="submit" color="danger" expand="block">
              Sign In
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
