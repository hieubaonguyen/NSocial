import {useState, useEffect, Fragment} from 'react';
import './styles.css';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import { IActivity } from '../Models/Activity';
import NavBar from '../../Features/Nav/NavBar';
import { Container } from 'semantic-ui-react';
import DashBoardActivities from '../../Features/DashBoard/Activities/DashBoardActivities';

const App = () => {

  const [activities, setActivities] = useState<IActivity[]>([]);

  useEffect(() => {
    axios.get<IActivity[]>('https://localhost:44383/activities')
        .then(response => {
          setActivities(response.data);
        });
  }, []);

  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop:"7em"}}>
        <DashBoardActivities activities={activities}/>
      </Container>
    </Fragment>
  );
}

export default App;
