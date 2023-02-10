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
  
  const RegisterPage: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
            <IonToolbar>
            <IonTitle class="ion-text-center">Health +</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
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
                Register
              </IonButton>
            </IonCol>
          </IonRow>
        </IonContent>
      </IonPage>
    );
  };
  
  export default RegisterPage;
  