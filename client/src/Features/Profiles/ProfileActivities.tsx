import { observer } from "mobx-react-lite";
import { format } from "date-fns";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Grid, Header, Tab, TabProps, Image } from "semantic-ui-react";
import { IUserActivity } from "../../App/Models/Profile";
import { RootStoreContext } from "../../App/stores/RootStore";

const panes = [
  { menuItem: "Future Events", pane: { key: "futureEvents" } },
  { menuItem: "Past Events", pane: { key: "pastEvents" } },
  { menuItem: "Hosting", pane: { key: "hosted" } },
];

const ProfileActivities = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadUserActivities, profile, loadingActivities, userActivities } =
    rootStore.profileStore!;

  useEffect(() => {
    loadUserActivities(profile!.userName);
  }, [loadUserActivities, profile]);

  const handleTabChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    data: TabProps
  ) => {
    let predicate;
    switch (data.activeIndex) {
      case 1:
        predicate = "past";
        break;
      case 2:
        predicate = "hosting";
        break;
      default:
        predicate = "future";
        break;
    }
    loadUserActivities(profile!.userName, predicate);
  };

  return (
    <Tab.Pane loading={loadingActivities}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="calendar" content={"Activities"} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            panes={panes}
            menu={{ secondary: true, pointing: true }}
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
          <br />
          <Card.Group itemsPerRow={4}>
            {userActivities.map((activity: IUserActivity) => (
              <Card
                as={Link}
                to={`/activities/${activity.id}`}
                key={activity.id}
              >
                <Image
                  src={`/assets/categoryImages/${activity.category}.jpg`}
                  style={{ minHeight: 100, objectFit: "cover" }}
                />
                <Card.Content>
                  <Card.Header textAlign="center">{activity.title}</Card.Header>
                  <Card.Meta textAlign="center">
                    <div>{format(new Date(activity.date), "do LLL")}</div>
                    <div>{format(new Date(activity.date), "h:mm a")}</div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfileActivities);
