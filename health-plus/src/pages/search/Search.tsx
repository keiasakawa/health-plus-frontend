import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonList, IonItem, IonLabel,IonToggle } from '@ionic/react';
import './Search.css';
import {useState} from 'react';
import Header from '../../components/Header'

const Search: React.FC = () => {
  const [search, useSearch] = useState('')
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <Header />
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <IonSearchbar onClick={toggleFilters}></IonSearchbar>
      {showFilters && (
          <IonList>
            <IonItem>
              <IonLabel>Filter 1</IonLabel>
              <IonToggle />
            </IonItem>
            <IonItem>
              <IonLabel>Filter 2</IonLabel>
              <IonToggle />
            </IonItem>
            <IonItem>
              <IonLabel>Filter 3</IonLabel>
              <IonToggle />
            </IonItem>
          </IonList>
        )}
    </IonContent>
  </IonPage>
  );
};

export default Search;
