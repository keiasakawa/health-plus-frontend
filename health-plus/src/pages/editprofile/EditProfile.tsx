import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonSelect, IonSelectOption, IonRow, IonButton, IonCol, IonInput } from '@ionic/react';
import './EditProfile.css';
import Header from '../../components/Header'
import { useState, useEffect } from 'react';
import {instance} from '../../utils'

const EditProfile: React.FC = () => {
  const [goal, setGoal] = useState('')
  const [allergies, setAllergies] = useState([])
  const [weight, setWeight] = useState('')

  const values = { 'Milk': false, 'Eggs': false, 'Fish (e.g., bass, flounder, cod)': false,
  'Wheat': false, ' Crustacean shellfish (e.g., crab, lobster, shrimp)': false, 'Tree nuts (e.g., almonds, walnuts, pecans)': false, 'Peanuts': false, 'Soybeans': false
}
  const select = new Map<string, boolean>(Object.entries(values))

  const id = localStorage.getItem('id')

  const getInfo = async() => {
    try {
      const res = await instance.get('users/info', {params: id})
      setGoal(res.data.goal)
      setAllergies(res.data.allergies)
      res.data.allergies.forEach(function(s: string) {
        select.set(s, true)
      })
      setWeight(res.data.weight)
    }
    catch (err){
      if (err instanceof Error) {
        console.log(err.message)
      }
    
  }
}

  const handleInfo = async() => {
    const infoData = {
      goal: goal,
      weight: weight,
      allergies: allergies,
    };
    try {
      await instance.post('users/info', { params: id, data: infoData});
    }
    catch (err){
      if (err instanceof Error) {
        console.log(err.message)
      }
    }
  }

  useEffect(() => {
    getInfo();
  }, []);

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
              {Object.keys(select).map(function(key, index) {
                const props = {
                  selected: select.get(key)
                }
                return(
                <IonSelectOption {...props}>{key}</IonSelectOption>
                )
              })}
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
