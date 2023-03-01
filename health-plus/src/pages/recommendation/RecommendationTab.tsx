import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent} from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import './RecommendationTab.css';
import RecommendedMeal from './heuristics';
import Header from '../../components/Header';
import { HealthKit, HealthKitOptions } from '@awesome-cordova-plugins/health-kit';
import { useEffect, useState} from 'react';

const types = [
  'HKQuantityTypeIdentifierHeight',
  'HKQuantityTypeIdentifierBodyMass',
  'HKQuantityTypeIdentifierActiveEnergyBurned',
  'HKQuantityTypeIdentifierBasalEnergyBurned'
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
  // Returns the health data needed from HealthKit to recommend a meal.
  const res = await requestAuthorization();
  if (res === false) { return; }
  const weight = (await HealthKit.readWeight({
    'requestWritePermission': false, // use if your app doesn't need to write
    'unit': 'lb'
  }))?.value;
  console.log("Weight: ", weight || "Unknown Weight");
  const gender = await HealthKit.readGender();
  console.log("The Gender: ", gender);
  const dob = (await HealthKit.readDateOfBirth()).substring(0, 10);
  console.log("Date of Birth: ", dob);
  const activeCal = await HealthKit.querySampleType({
    'startDate': new Date(new Date().getTime() - (24 * 60 * 60 * 1000)),
          'endDate': new Date(), // now
          'sampleType': 'HKQuantityTypeIdentifierActiveEnergyBurned',
          'unit': 'Cal' 
  });
  const restCal = await HealthKit.querySampleType({
    'startDate': new Date(new Date().getTime() - (24 * 60 * 60 * 1000)),
          'endDate': new Date(), // now
          'sampleType': 'HKQuantityTypeIdentifierBasalEnergyBurned',
          'unit': 'Cal'
  });
  const allCalArr = activeCal.concat(restCal);
  let total_cal = 0;
  for (const calorie_obj of allCalArr) {
    total_cal += calorie_obj?.quantity; 
  }
  console.log("Testing ", total_cal);
  return {
    weight: weight,
    gender: gender,
    dob: dob,
    total_cal: total_cal
  };
}


const RecommendationTab: React.FC = () => {
  const [mealData, setData] = useState([{
    image:'', name:'', description:'', cals:0, protein:0, carbs:0, fats:0
  }]);
  useEffect(() => {
    async function loadMealData() {
      setData(await RecommendedMeal((await getHealthData())));
    }
    loadMealData();
  }, []);
  // TODO: Get ID !!!!!
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <Header />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {mealData.map(recipe => {
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
