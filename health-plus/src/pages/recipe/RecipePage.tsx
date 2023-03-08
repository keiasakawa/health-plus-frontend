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
    IonInput,
    IonText,
    useIonViewWillEnter,
    IonNote,
    IonImg,
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
    const [allergies, setAllergies] = useState([]);
    const history = useHistory();

    const commonAllergies = ['milk', 'eggs', 'fish', 'bass', 'flounder', 'halibut', 'cod', 'wheat', 'crab', 'lobster', 'shrimp', 'nut', 'almond', 'walnut', 'pecan', 'peanut', 'soybean']


    const handleWarning = async(data: any) => {
        const headers = {
            Authorization: "Bearer " + localStorage.getItem("token")
          };
          try {
            let res = await instance.get('users/info', {
                headers: headers
              });
            const allergies = res.data[0].allergies;
            let warnings = new Set();
            for (let i = 0; i < commonAllergies.length; i ++) {
                for ( let j = 0; j < allergies.length; j ++) {
                    if (allergies[j].toLowerCase().includes(commonAllergies[i])) {
                        warnings.add(commonAllergies[i])
                    }
                }
            }
            console.log(warnings)
          }
          catch (err){
            if (err instanceof Error) {
              console.log(err.message)
            }
        }
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
