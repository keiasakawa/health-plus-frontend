import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonSelect, IonSelectOption, IonRow, IonButton, IonCol, IonInput } from '@ionic/react';
import './EditProfile.css';
import Header from '../../components/Header'
import { useState } from 'react';

const EditProfile: React.FC = () => {
  const [goal, setGoal] = useState('')
  const [allergies, setAllergies] = useState([])
  const [disabled, setDisabled] = useState(true)
  const [weight, setWeight] = useState('')

  const handleInfo = () => {
      
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <Header />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem className="fitness-goal-component" lines="full">
            <IonLabel>Goal</IonLabel>
            <IonSelect onIonChange={e => setGoal(e.detail.value)}>
                <IonSelectOption>
                    Lose Weight
                </IonSelectOption>
                <IonSelectOption>
                    Gain Weight/Muscle
                </IonSelectOption>
                <IonSelectOption>
                    Maintain Weight
                </IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem className="weight-component">
            <IonLabel position="stacked">What is your weight? (In pounds)</IonLabel>
            <IonInput type="number" value={weight} onIonChange={e => setWeight(e.detail.value!)}>
            </IonInput>
          </IonItem>
          <IonItem className="allergies-component" lines="full">
            <IonLabel>Allergies</IonLabel>
            <IonSelect className="my-select" multiple={true} onIonChange={e => setAllergies(e.detail.value)}>
                <IonSelectOption>
                    Milk
                </IonSelectOption>
                <IonSelectOption>
                    Eggs
                </IonSelectOption>
                <IonSelectOption>
                    Fish (e.g., bass, flounder, cod)
                </IonSelectOption>
                <IonSelectOption>
                    Wheat
                </IonSelectOption>
                <IonSelectOption>
                  Crustacean shellfish (e.g., crab, lobster, shrimp)
                </IonSelectOption>
                <IonSelectOption>
                  Tree nuts (e.g., almonds, walnuts, pecans)
                </IonSelectOption>
                <IonSelectOption>
                    Peanuts
                </IonSelectOption>
                <IonSelectOption>
                    Soybeans
                </IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonRow>
            <IonCol>
              <IonButton type="submit" color="danger" expand="block">
                Save
              </IonButton>
            </IonCol>
          </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default EditProfile;
