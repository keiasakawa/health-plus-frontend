import './RegisterPage.css';
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
    useIonViewWillEnter,
    IonNote
  } from "@ionic/react";
  import {useState} from 'react';
  import {instance} from '../../utils';
  import { useHistory } from 'react-router-dom';

  export function hideTabs() {
    const tabsEl = document.querySelector('ion-tab-bar');
    if (tabsEl) {
      tabsEl.hidden = true;
    }
  }
  
  const RegisterPage: React.FC = () => {

    useIonViewWillEnter(() => hideTabs())

    const [message, setMessage] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleRegister = async() => {
      const registerData = {
        email: email,
        password: password,
      };

      if (email === '' || password === '') {
        setMessage('Please enter email/password');
        return;
      }

      try {
        await instance.post('users/register', registerData);
        const response = await instance.post('users/login', registerData);
        localStorage.setItem('token', response.data.token);
        history.push('/info');
      }
      catch (err: any){
        setMessage(err.response.data.error);
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
          <IonItem lines="full">
            <IonLabel position="floating">Email</IonLabel>
            <IonInput type="email" required value={email} onIonChange={(e) => setEmail(e.detail.value!)}></IonInput>
            <IonNote slot="helper">Enter a valid email</IonNote>
            <IonNote slot="error">Invalid email</IonNote>
          </IonItem>
          <IonItem lines="full">
            <IonLabel position="floating">Password</IonLabel>
            <IonInput type="password" required value={password} onIonChange={(e) => setPassword(e.detail.value!)}></IonInput>
          </IonItem>
        <IonRow class="message">
          <IonText>
            {message}
          </IonText>
        </IonRow>
          <IonRow>
            <IonCol>
              <IonButton type="submit" color="danger" expand="block" onClick={handleRegister}>
                Register
              </IonButton>
            </IonCol>
          </IonRow>
        </IonContent>
      </IonPage>
    );
  };
  
  export default RegisterPage;
  