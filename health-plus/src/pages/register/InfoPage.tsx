import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonRow,
    IonCol,
    IonItem,
    IonText,
    IonButton,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    useIonViewWillEnter
  } from "@ionic/react";
  import { useState, useEffect } from 'react';
  import './InfoPage.css'
  import { useHistory } from 'react-router-dom';
  import {instance} from '../../utils'

  export function hideTabs() {
    const tabsEl = document.querySelector('ion-tab-bar');
    if (tabsEl) {
      tabsEl.hidden = true;
    }
  }
  
  const InfoPage: React.FC = () => {
    useIonViewWillEnter(() => hideTabs())

    const [goal, setGoal] = useState('')
    const [allergies, setAllergies] = useState([])
    const [disabled, setDisabled] = useState(true)
    const [weight, setWeight] = useState('');
    const [mealsPerDay, setMealsPerDay] = useState('');
    
    const handleInfo = async() => 
    {
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
        await instance.post('users/info', infoData, {
          headers: headers
        });
        window.location.replace('/recommendations')
      }
      catch (err){
        if (err instanceof Error) {
          console.log(err.message)
        }
      }
    }

    useEffect(() => {
      console.log(weight)
      setDisabled(goal === '' || weight === '')
    }, [goal, weight]);

    return (
      <IonPage>
        <IonHeader>
            <IonToolbar>
            <IonTitle class="ion-text-center">Health +</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
        <IonText class = "ion-text-center"><h1>Before we start, let's get some info!</h1></IonText>
          <IonItem className="fitness-goal-component" lines="full">
            <IonLabel>What is your goal? (This can be changed at anytime)</IonLabel>
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
          <IonItem className="mealsPerDay-component">
            <IonLabel position="stacked">How many meals do you eat in a day?</IonLabel>
            <IonInput type="number" value={mealsPerDay} onIonChange={e => setMealsPerDay(e.detail.value!)}>
            </IonInput>
          </IonItem>
          <IonItem className="allergies-component" lines="full">
            <IonLabel>What are your allergies? (This can be changed at anytime)</IonLabel>
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
              <IonButton disabled={disabled} type="submit" color="danger" expand="block" onClick={handleInfo}>
                Next
              </IonButton>
            </IonCol>
          </IonRow>
        </IonContent>
      </IonPage>
    );
  };
  
  export default InfoPage;
  