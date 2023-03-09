import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonRow,
    IonCol,
    IonItem,
    IonIcon,
    IonButton,
    IonLabel,
    IonCardContent,
    IonText,
    useIonViewWillEnter,
    IonCardTitle,
    IonCard,
    IonList,
    IonListHeader
  } from "@ionic/react";
  import {instance} from '../../utils'
  import { useParams, useHistory } from 'react-router-dom';
  import {useState, useEffect} from 'react'
  import LoginFilter from '../../filter/LoginFilter'

const RecipePage: React.FC = () => {
    const { id: mealId } = useParams<{id: string }>();

    const [data, setData] = useState<any>({})
    const [allergies, setAllergies] = useState(new Set());
    const history = useHistory();

    const map = {'milk': 'Milk', 
    'eggs': 'Eggs', 
    'fish': 'Fish (e.g., bass, flounder, cod)', 
    'bass': 'Fish (e.g., bass, flounder, cod)', 
    'flounder': 'Fish (e.g., bass, flounder, cod)', 
    'halibut': 'Fish (e.g., bass, flounder, cod)', 
    'cod': 'Fish (e.g., bass, flounder, cod)', 
    'wheat': 'Wheat', 
    'crab': 'Crustacean shellfish (e.g., crab, lobster, shrimp)',
    'lobster': 'Crustacean shellfish (e.g., crab, lobster, shrimp)', 
    'shrimp': 'Crustacean shellfish (e.g., crab, lobster, shrimp)', 
    'nut': 'Tree nuts (e.g., almonds, walnuts, pecans)', 
    'almond': 'Tree nuts (e.g., almonds, walnuts, pecans)', 
    'walnut': 'Tree nuts (e.g., almonds, walnuts, pecans)', 
    'pecan': 'Tree nuts (e.g., almonds, walnuts, pecans)', 
    'peanut': 'Peanuts', 
    'soybean': 'Soybeans'}
    const commonAllergies2 = new Map(Object.entries(map));

    const commonAllergies = ['milk', 'eggs', 'fish', 'bass', 'flounder', 'halibut', 'cod', 'wheat', 'crab', 'lobster', 'shrimp', 'nut', 'almond', 'walnut', 'pecan', 'peanut', 'soybean']


    const handleWarning = (data: any) => {
            const ingredients = data!.recipe_ingedients
            console.log(ingredients)
            let warnings = new Set();
            for (let i = 0; i < commonAllergies.length; i ++) {
                for ( let j = 0; j < ingredients.length; j ++) {
                    if (ingredients[j].toLowerCase().includes(commonAllergies[i])) {
                        warnings.add(commonAllergies2.get(commonAllergies[i]))
                    }
                }
            }
            setAllergies(warnings)
    }

    const handleMeal = async() => {
        const headers = {
            Authorization: "Bearer " + localStorage.getItem("token")
          };
        try {
            const res = await instance.get(`meals/${mealId}`, {headers: headers});
            setData(res.data)
            handleWarning(res.data)
        }
        catch (err){
            if (err instanceof Error) {
                console.log(err.message)
            }
        }
    }

    const handleNavigation = () => {
        history.push('/search')
    }

    useEffect(() => {
        handleMeal()
    }, [mealId])

    return (
        <IonPage>
          <IonHeader>
              <IonToolbar>
                <IonRow>
                <IonButton onClick={() => handleNavigation()}>Back</IonButton>
                <IonTitle class="ion-text-center" size="large">{data!.meal_name}</IonTitle>
                </IonRow>
              </IonToolbar>
          </IonHeader>
          <IonContent class="ion-text-center" fullscreen>
            <IonRow>
                <IonCol>
                <img src={data!.image_url} width="50%" />
                </IonCol>
            </IonRow>
            <IonRow> 
                <IonCol>
                <IonText><p>{data!.meal_description}</p></IonText>
                </IonCol>
            </IonRow>
            <IonRow class="ion-text-center"> 
                <IonCol class="ion-text-wrap">
                    {allergies.size !== 0 && 
                                <IonCard class="ion-text-wrap" color="danger">
                                    <IonCardTitle>Warning. May contain the following.</IonCardTitle>
                                    <IonCardContent>
                                    {Array.from(allergies).map((ingredient:any) => {
                                return (
                                        <IonText>{ingredient} </IonText>
                                )
                            })}
                                    </IonCardContent>
                                </IonCard>
                    }               
                </IonCol>
            </IonRow>
            <IonRow> 
                <IonCol>
                    <IonList inset={true}>
                        <IonListHeader>
                            <IonLabel>
                                <h1>Ingredients</h1>
                            </IonLabel>
                        </IonListHeader>
                        {data!.recipe_ingedients?.map((ingredient:any) => {
                            return (
                                <IonItem>
                                    <IonText>{ingredient}</IonText>
                                </IonItem>
                            )
                        })}
                    </IonList>
                </IonCol>
            </IonRow>
            <IonRow> 
                <IonCol>
                <IonListHeader><IonLabel><h1>Instructions</h1></IonLabel></IonListHeader>
                    {data!.recipe_instructions?.map((ingredient:string, index:number) => {
                        return (
                            <IonItem>
                                <IonText class="ion-margin-vertical">{index + 1}. {ingredient}</IonText>
                            </IonItem>
                        )
                    })}
                </IonCol>
            </IonRow>
          </IonContent>
        </IonPage>
      );
}

export default LoginFilter(RecipePage);
