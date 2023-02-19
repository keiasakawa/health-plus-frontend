import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import './RecommendationTab.css';
import TabBar from '../../components/TabBar';
import './heuristics'

const RecommendationTab: React.FC = () => {

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
                <IonCardSubtitle>Protein: {recipe.protein}, Carbohydrates: {recipe.carbs}, Fats: {recipe.fats}</IonCardSubtitle>
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
