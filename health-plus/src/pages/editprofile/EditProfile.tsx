import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonSelect, IonSelectOption, IonRow, IonButton, IonCol } from '@ionic/react';
import './EditProfile.css';

const EditProfile: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem className="fitness-goal-component" lines="full">
            <IonLabel>Goal</IonLabel>
            <IonSelect>
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
          <IonItem className="allergies-component" lines="full">
            <IonLabel>Allergies</IonLabel>
            <IonSelect className="my-select" multiple={true}>
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
