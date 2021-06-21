import { Fragment } from "react";
import "./styles.css";
import "semantic-ui-css/semantic.min.css";
import NavBar from "../../Features/Nav/NavBar";
import { Container } from "semantic-ui-react";
import DashBoardActivities from "../../Features/Activities/DashBoard/DashBoardActivities";
import { observer } from "mobx-react-lite";
import { Route, RouteComponentProps, withRouter } from "react-router-dom";
import HomePage from "../../Features/Home/HomePage";
import CreateActivity from "../../Features/Activities/Form/ActivityForm";
import ActivityDetail from "../../Features/Activities/Detail/ActivityDetail";

const App: React.FC<RouteComponentProps> = ({ location }) => {

  return (
    <Fragment>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Route exact path="/activities" component={DashBoardActivities} />
              <Route path="/activities/:id" component={ActivityDetail} />
              <Route
                key={location.key}
                path={["/create-activities", "/manage/:id"]}
                component={CreateActivity}
              />
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
