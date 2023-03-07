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

const RecipePage: React.FC = () => {
    const { id: mealId } = useParams<{id: string }>();

    const [data, setData] = useState<any>({})
    const history = useHistory();

    const handleMeal = async() => {
        try {
            const res = await instance.get(`meals/${mealId}`);
            setData(res.data)
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

export default RecipePage;
