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
    IonNote
  } from "@ionic/react";
  import {instance} from '../../utils'
  import { useParams } from 'react-router-dom';
  import {useState, useEffect} from 'react'

const RecipePage: React.FC = () => {
    const { id: mealId } = useParams<{id: string }>();

    const [data, setData] = useState<any>({})

    const handleMeal = async() => {
        try {
            const res = await instance.get(`meals/${mealId}`);
            console.log(res)
            setData(res.data)
        }
        catch (err){
            if (err instanceof Error) {
                console.log(err.message)
            }
        }
    }

    useEffect(() => {
        handleMeal()
    }, [])

    return (
        <IonPage>
          <IonHeader>
              <IonToolbar>
              <IonTitle class="ion-text-center">{data!.meal_name}</IonTitle>
              </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
          </IonContent>
        </IonPage>
      );
}

export default RecipePage;
