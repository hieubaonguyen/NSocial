import { Fragment } from "react";
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

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Fragment>
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
                <Route
                  exact
                  path="/activities"
                  component={DashBoardActivities}
                />
                <Route path="/activities/:id" component={ActivityDetail} />
                <Route
                  key={location.key}
                  path={["/create-activities", "/manage/:id"]}
                  component={CreateActivity}
                />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
