import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import './RecommendationTab.css';
import RecommendedMeal from './heuristics';
import Header from '../../components/Header';
import { HealthKit, HealthKitOptions } from '@awesome-cordova-plugins/health-kit';

const types = [
  'HKQuantityTypeIdentifierHeight',
  'HKQuantityTypeIdentifierBodyMass',
  'HKQuantityTypeIdentifierActiveEnergyBurned'
];
const options: HealthKitOptions = {
  readTypes: types,
  writeTypes: types
};


async function requestAuthorization() {
  // Need to run this before any healthkit stuff
  if (! (await HealthKit.available())) {
    console.log("HealthKit is not available on this app.");
    return false;
  }
  for (const type of types) {
    const authRes = await HealthKit.checkAuthStatus({'type': type});
    if (authRes !== 'authorized') {
      await HealthKit.requestAuthorization(options);
      // Will request everything
      // Unfortunately this function returns null even if it suceeds  -_-
      break;
    }
  }
  console.log("Good to go I think");
  return true;
}

async function getHealthData() {
  const res = await requestAuthorization();
  if (res === false) { return; }
  const weight = await HealthKit.readWeight({
    'requestWritePermission': false, // use if your app doesn't need to write
    'unit': 'lb'
  });
  console.log("How much I weigh", weight);
}


const RecommendationTab: React.FC = () => {
  requestAuthorization();

  // TODO: Get ID !!!!!
  const data = RecommendedMeal();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <Header />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {data.map(recipe => {
          return (
            <>
            <IonCard>
              <img width="20%" alt= "Recipe" src={recipe.image} />
              <IonCardHeader>
                <IonCardTitle>{recipe.name}</IonCardTitle>
                <IonCardSubtitle>Calories: {recipe.cals}, Protein: {recipe.protein}, Carbohydrates: {recipe.carbs}, Fats: {recipe.fats}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                {recipe.description}
              </IonCardContent>
            </IonCard> 
            </>
        )
        })}
      </IonContent>
    </IonPage>
  );
};

export default RecommendationTab;
