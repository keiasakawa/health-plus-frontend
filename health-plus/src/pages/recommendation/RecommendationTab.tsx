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
  console.log("Weight: ", weight?.value || "Unknown Weight");
  const gender = await HealthKit.readGender();
  console.log("The Gender: ", gender);
  const dob = (await HealthKit.readDateOfBirth()).substring(0, 10);
  console.log("Date of Birth: ", dob);
  const calorie_arr = await HealthKit.querySampleType({
    'startDate': new Date(new Date().getTime() - (24 * 60 * 60 * 1000)), // three days ago
          'endDate': new Date(), // now
          'sampleType': 'HKQuantityTypeIdentifierActiveEnergyBurned',
          'unit': 'Cal' // make sure this is compatible with the sampleType
  });
  let total_cal = 0;
  for (const calorie_obj of calorie_arr) {
    total_cal += calorie_obj?.quantity; 
  }
  console.log("Testing ", total_cal);
  // calories burned
  // age/dob
}


const RecommendationTab: React.FC = () => {
  getHealthData();

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
