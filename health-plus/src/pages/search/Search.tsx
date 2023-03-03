import { IonContent, IonRow, IonCol, IonHeader, IonPage, IonButton, IonToolbar, IonSearchbar, IonList, IonItem, IonLabel,IonToggle } from '@ionic/react';
import './Search.css';
import {useState} from 'react';
import Header from '../../components/Header'
import {instance} from '../../utils'

const Search: React.FC = () => {
  const [search, setSearch] = useState('')
  const [showFilters, setShowFilters] = useState(false);
  const [data, setData] = useState([])

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleSearch = async() => {
    const searchData = {
      meal_name: search
    };
    try {
    if (search !== ''){
      const results = await instance.post('meals', searchData);
      console.log(results);
    }
  }
  catch (err){
    if (err instanceof Error) {
      console.log(err.message)
    }
  }

  }

  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <Header />
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <IonSearchbar value={search} onIonChange={e => setSearch(e.target.value!)}></IonSearchbar>
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
        {!showFilters && <IonButton onClick={toggleFilters}>Apply Filters</IonButton>}
        {showFilters && <IonButton onClick={toggleFilters}>Hide Filters</IonButton>}
        <IonRow>
          <IonButton onClick={handleSearch}>Search</IonButton>
        </IonRow>
    </IonContent>
  </IonPage>
  );
};

export default Search;
