import {useState, useEffect, Fragment} from 'react';
import './styles.css';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import { IActivity } from '../Models/Activity';
import NavBar from '../../Features/Nav/NavBar';
import { Container } from 'semantic-ui-react';
import DashBoardActivities from '../../Features/Activities/DashBoard/DashBoardActivities';

const App = () => {

  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
  }

  useEffect(() => {
    axios.get<IActivity[]>('https://localhost:44383/activities')
        .then(response => {
          setActivities(response.data);
        });
  }, []);

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
        />
      </Container>
    </Fragment>
  );
}

export default App;
