import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar } from '@ionic/react';
import './Search.css';
import {useState} from 'react';
import ExploreContainer from '../../components/ExploreContainer'

const Search: React.FC = () => {
  const [search, useSearch] = useState('')
  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Tab 2</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <IonSearchbar></IonSearchbar>
    </IonContent>
  </IonPage>
  );
};

export default Search;
