import { ellipse, square, triangle } from 'ionicons/icons';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react'

const TabBar: React.FC = () => {
  return(
    <IonTabs>
      <IonRouterOutlet></IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="recommendations" href="/recommendations">
            <IonIcon icon={triangle} />
            <IonLabel>Tab 1</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={ellipse} />
            <IonLabel>Tab 2</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={square} />
            <IonLabel>Tab 3</IonLabel>
          </IonTabButton>
        </IonTabBar>
    </IonTabs>
  )
}

export default TabBar;