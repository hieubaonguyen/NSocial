import {useState, useEffect, Fragment, SyntheticEvent, useContext} from 'react';
import './styles.css';
import 'semantic-ui-css/semantic.min.css';
import { IActivity } from '../Models/Activity';
import NavBar from '../../Features/Nav/NavBar';
import { Container } from 'semantic-ui-react';
import DashBoardActivities from '../../Features/Activities/DashBoard/DashBoardActivities';
import agent from '../api/agent';
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

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  }

  const handleCreateActivity = (activity : IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity).then(() => {
      setActivities([activity, ...activities]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false));
  }

  const handleEditActivity = (activity : IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity).then(() => {
      setActivities([activity, ...activities.filter(a => a.id !== activity.id)]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false));
  }

  const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(a => a.id !== id)]);
      if(id === selectedActivity?.id){
        setSelectedActivity(null);
      }
    }).then(() => setSubmitting(false));
  }

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  
  if(activityStore.loadingInitial) return <LoadingComponent content="Loading Activities..."/>

  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop:"7em"}}>
        <DashBoardActivities 
          activities={activityStore.activities}
          handleSelectActivity={handleSelectActivity}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          handleEditActivity={handleEditActivity}
          handleDeleteActivity={handleDeleteActivity}
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
}

export default observer(App);
