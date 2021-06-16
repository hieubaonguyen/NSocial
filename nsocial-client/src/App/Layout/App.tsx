import {useState, useEffect, Fragment, SyntheticEvent} from 'react';
import './styles.css';
import 'semantic-ui-css/semantic.min.css';
import { IActivity } from '../Models/Activity';
import NavBar from '../../Features/Nav/NavBar';
import { Container } from 'semantic-ui-react';
import DashBoardActivities from '../../Features/Activities/DashBoard/DashBoardActivities';
import agent from '../api/agent';
import LoadingComponent from '../Layout/LoadingComponent';

const App = () => {

  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

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
    agent.Activities.list()
        .then(response => {
          let activities: IActivity[] = [];
          response.forEach((activity) => {
            activity.date = activity.date.split('.')[0];
            activities.push(activity);
          });
          setActivities(activities);
        }).then(() => setLoading(false));
  }, []);

  
  if(loading) return <LoadingComponent content="Loading Activities..."/>

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{marginTop:"7em"}}>
        <DashBoardActivities 
          activities={activities}
          handleSelectActivity={handleSelectActivity}  
          selectedActivity={selectedActivity!}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          handleCreateActivity={handleCreateActivity}
          handleEditActivity={handleEditActivity}
          handleDeleteActivity={handleDeleteActivity}
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
}

export default App;
