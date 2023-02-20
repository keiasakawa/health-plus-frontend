import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import './RecommendationTab.css';
import TabBar from '../../components/TabBar';
import RecommendedMeal from './heuristics'
import { HealthKit, HealthKitOptions } from '@awesome-cordova-plugins/health-kit'

const RecommendationTab: React.FC = () => {

  HealthKit.available().then(available => {
    if (available) {
      var options: HealthKitOptions = {
        readTypes: [
          'HKQuantityTypeIdentifierHeight',
          'HKQuantityTypeIdentifierBodyMass',
          'HKQuantityTypeIdentifierActiveEnergyBurned'
        ],
        writeTypes: ['HKQuantityTypeIdentifierHeight',
        'HKQuantityTypeIdentifierBodyMass',
        'HKQuantityTypeIdentifierActiveEnergyBurned']
      }
        // HealthKit.requestAuthorization(options).then(_ => {
        //   loadHealthData();
        // })
      }
    }
  )

  // TODO: Get ID !!!!!
  const data = RecommendedMeal();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {data.map(recipe => {
          return (
            <>
            { /* THIS IS WHAT THE END PRODUCT SHOULD IDEALLY LOOK LIKE  */ }
            <IonCard>
              <img alt= "Recipe" src={recipe.image} />
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
      <TabBar />
    </IonPage>
  );
};

export default RecommendationTab;
