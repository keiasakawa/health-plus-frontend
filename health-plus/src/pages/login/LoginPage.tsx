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
  IonText,
  useIonViewWillEnter
} from "@ionic/react";
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react'
import { BsPersonCircle } from "react-icons/bs";
import {instance} from '../../utils';
import { HealthKit, HealthKitOptions } from '@awesome-cordova-plugins/health-kit';
//import { HealthKit } from '@ionic-native/health-kit';



export function hideTabs() {
  const tabsEl = document.querySelector('ion-tab-bar');
  if (tabsEl) {
    tabsEl.hidden = true;
  }
}

const LoginPage: React.FC = () => {
  useIonViewWillEnter(() => hideTabs())
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory();


  const handleSignIn = async() => {
    //let hk = new HealthKit();
    if (email === '' || password === '') {
      setMessage('Enter email/password');
      return;
    }

    const loginData = {
      email: email,
      password: password,
    };

    try {
      console.log("Attemping to login...");
      const response = await instance.post('users/login', loginData);
      localStorage.setItem('token', response.data.token);
      setMessage('');
      window.location.replace('/recommendations');
    }
    catch (err){
      if (err instanceof Error) {
        setMessage(err.message);
        console.log(err.message);
      }
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">Health +</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRow>
          <IonCol class="ion-text-center">
            <BsPersonCircle size={70} />
          </IonCol>
        </IonRow>
        <IonItem lines="full">
          <IonLabel position="floating">Email</IonLabel>
          <IonInput type="email" required value={email} onIonChange={(e) => setEmail(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem lines="full">
          <IonLabel position="floating">Password</IonLabel>
          <IonInput type="password" required value={password} onIonChange={(e) => setPassword(e.detail.value!)}></IonInput>
        </IonItem>
        <IonRow>
          <IonText>
            {message}
          </IonText>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonButton type="submit" color="danger" expand="block" onClick={handleSignIn}>
              Sign In
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow class="ion-align-items-center">
          <IonCol class="ion-text-center">
            <IonButton href='/register'>Don't have an account?</IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};



export default LoginPage;
