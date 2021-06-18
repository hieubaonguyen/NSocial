import {useState, useEffect, Fragment, SyntheticEvent, useContext} from 'react';
import './styles.css';
import 'semantic-ui-css/semantic.min.css';
import { IActivity } from '../Models/Activity';
import NavBar from '../../Features/Nav/NavBar';
import { Container } from 'semantic-ui-react';
import DashBoardActivities from '../../Features/Activities/DashBoard/DashBoardActivities';
import LoadingComponent from '../Layout/LoadingComponent';
import {observer} from 'mobx-react-lite';
import ActivityStore from '../stores/ActivityStore';

const App = () => {

  const activityStore = useContext(ActivityStore);
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  
  if(activityStore.loadingInitial) return <LoadingComponent content="Loading Activities..."/>

  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop:"7em"}}>
        <DashBoardActivities />
      </Container>
    </Fragment>
  );
}

export default observer(App);
