import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonSelect, IonSelectOption, IonRow, IonButton, IonCol, IonInput } from '@ionic/react';
import './EditProfile.css';
import Header from '../../components/Header'
import { useState, useEffect } from 'react';
import {instance} from '../../utils'
import LoginFilter from '../../filter/LoginFilter'

const EditProfile: React.FC = () => {
  const [goal, setGoal] = useState('');
  const [allergies, setAllergies] = useState([]);
  const [weight, setWeight] = useState('');
  const [mealsPerDay, setMealsPerDay] = useState('');;

//   const values = { 'Milk': false, 'Eggs': false, 'Fish (e.g., bass, flounder, cod)': false,
//   'Wheat': false, ' Crustacean shellfish (e.g., crab, lobster, shrimp)': false, 'Tree nuts (e.g., almonds, walnuts, pecans)': false, 'Peanuts': false, 'Soybeans': false
// }
//   const select = new Map<string, boolean>(Object.entries(values))

  const getInfo = async() => {
    try {
      const headers = {
        Authorization: "Bearer " + localStorage.getItem("token")
      };
      let res = await instance.get('users/info', {
        headers: headers
      });
      setGoal(res.data[0].fitness_goal);
      setAllergies(res.data[0].allergies);
      setWeight(res.data[0].weight);
      setMealsPerDay(res.data[0].meals_per_day);
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
      meals_per_day: mealsPerDay
    };
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token")
    };
    try {
      await instance.put('/users/info', infoData, {
        headers: headers
      });
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
            <IonSelect value={goal} onIonChange={e => setGoal(e.detail.value)}>
                <IonSelectOption>
                    Lose Weight
                </IonSelectOption>
                <IonSelectOption>
                    Gain Weight
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
          <IonItem className="mealsPerDay-component">
            <IonLabel position="stacked">How many meals do you eat in a day?</IonLabel>
            <IonInput type="number" value={mealsPerDay} onIonChange={e => setMealsPerDay(e.detail.value!)}>
            </IonInput>
          </IonItem>
          <IonItem className="allergies-component" lines="full">
            <IonLabel>Allergies</IonLabel>
            <IonSelect className="my-select" multiple={true} value={allergies} onIonChange={e => setAllergies(e.detail.value)}>
              {/* {Object.keys(select).map(function(key, index) {
                const props = {
                  selected: select.get(key)
                }
                console.log('hello');
                return(
                <IonSelectOption {...props}>{key}</IonSelectOption>
                )
              })} */}
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
              <IonButton type="submit" color="danger" expand="block" onClick={handleInfo}>
                Save
              </IonButton>
            </IonCol>
          </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default LoginFilter(EditProfile);
