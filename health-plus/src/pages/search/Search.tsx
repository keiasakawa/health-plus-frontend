import { IonContent, IonRow, IonCol, IonHeader, IonPage, IonButton, IonToolbar, IonSearchbar, IonList, IonItem, IonLabel, IonToggle, IonCard,  IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle, IonInput, IonText} from '@ionic/react';
import './Search.css';
import {useState, useEffect} from 'react';
import Header from '../../components/Header'
import { instance } from '../../utils';
import { RangeValue } from '@ionic/core';
import { useHistory } from 'react-router-dom';
import LoginFilter from '../../filter/LoginFilter'

const Search: React.FC = () => {
  const [search, setSearch] = useState('')
  const [showFilters, setShowFilters] = useState(false);
  const [data, setData] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [pagination, setPagination] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
 const [minFats, setMinFats] = useState(0)
 const [maxFats, setMaxFats] = useState(100)
 const history = useHistory();

  useEffect(()=> {
    handleSearch()
  }, [currentPage])

  useEffect(() => {
    setMinFats(0);
    setMaxFats(100);
  }, []);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleSearch = async() => {
    const searchData = {
      meal_name: search.toLowerCase(),
      offset: currentPage,
    };
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token")
    };
    try {
    if (search !== ''){
      const results = await instance.post('meals', searchData, {headers});
      setData(results.data.meals)
      setPagination(true)
      setTotalPages(Math.ceil(results.data.count / itemsPerPage))
    }
  }
  catch (err){
    if (err instanceof Error) {
      console.log(err.message)
    }
  }

  }

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    console.log("Previous: ", currentPage)
    setCurrentPage(currentPage + 1);
    console.log("Next: ", currentPage)
  };

  const redirect = (id: string) => {
    history.push(`meal/${id}`)
  }

  const renderCards = () => {
    return data.map(recipe => {
      return(
        <IonCard key={recipe.id} onClick={() => {redirect(recipe.id);}}>
          <img width="20%" alt= "Recipe" src={recipe.image_url} />
          <IonCardHeader>
            <IonCardTitle>{recipe.meal_name}</IonCardTitle>
            <IonCardSubtitle>Calories: {recipe.calories}, Protein: {recipe.protein}, Carbohydrates: {recipe.carbohydrates}, Fats: {recipe.total_fat}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            {recipe.meal_description}
          </IonCardContent>
        </IonCard> 
      )
    })
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
      <IonButton onClick={handleSearch}>Search</IonButton>
        {renderCards()}
        {pagination &&  <><IonButton onClick={handlePrevPage} disabled={currentPage === 1}>Prev</IonButton><IonButton onClick={handleNextPage} disabled={currentPage === totalPages}>Next</IonButton></>}
    </IonContent>
  </IonPage>
  );
};

export default LoginFilter(Search);
