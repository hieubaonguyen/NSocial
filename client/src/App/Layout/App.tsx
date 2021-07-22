import { Fragment, useContext, useEffect } from "react";
import "./styles.css";
import "semantic-ui-css/semantic.min.css";
import NavBar from "../../Features/Nav/NavBar";
import { Container } from "semantic-ui-react";
import DashBoardActivities from "../../Features/Activities/DashBoard/DashBoardActivities";
import { observer } from "mobx-react-lite";
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from "react-router-dom";
import HomePage from "../../Features/Home/HomePage";
import CreateActivity from "../../Features/Activities/Form/ActivityForm";
import ActivityDetail from "../../Features/Activities/Detail/ActivityDetail";
import NotFound from "./NotFound";
import { ToastContainer } from "react-toastify";
import ProfilePage from '../../Features/Profiles/ProfilePage';
import { RootStoreContext } from "../stores/RootStore";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from '../Commons/Modals/ModalContainer';
import PrivateRoute from './PrivateRoute';

const App: React.FC<RouteComponentProps> = ({ location }) => {

  const rootStore = useContext(RootStoreContext);
  const {appLoaded, setAppLoaded, token} = rootStore.commonStore;
  const {getUser} = rootStore.userStore;

  useEffect(() => {
    if(token){
      getUser().finally(() => setAppLoaded());
    }else{
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token])

  if(!appLoaded) return <LoadingComponent content='Loading App...'/>

  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <PrivateRoute
                  exact
                  path="/activities"
                  component={DashBoardActivities}
                />
                <PrivateRoute path="/activities/:id" component={ActivityDetail} />
                <PrivateRoute
                  key={location.key}
                  path={["/create-activities", "/manage/:id"]}
                  component={CreateActivity}
                />
                <PrivateRoute path='/profile/:userName' component={ProfilePage}/>
                <PrivateRoute component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
