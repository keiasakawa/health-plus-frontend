import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { star, search, ellipsisHorizontal } from 'ionicons/icons';
import RecommendationTab from './pages/recommendation/RecommendationTab';
import Search from './pages/search/Search';
import EditProfile from './pages/editprofile/EditProfile';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import InfoPage from './pages/register/InfoPage';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/recommendations">
            <RecommendationTab />
          </Route>
          <Route exact path="/search">
            <Search />
          </Route>
          <Route path="/editprofile">
            <EditProfile />
          </Route>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/info">
            <InfoPage />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="recommendations" href="/recommendations">
            <IonIcon icon={star} />
            <IonLabel>Recommendations</IonLabel>
          </IonTabButton>
          <IonTabButton tab="search" href="/search">
            <IonIcon icon={search} />
            <IonLabel>Search</IonLabel>
          </IonTabButton>
          <IonTabButton tab="editprofile" href="/editprofile">
            <IonIcon icon={ellipsisHorizontal} />
            <IonLabel>Edit Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
        </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;