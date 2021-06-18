import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Button, Card, Image } from "semantic-ui-react";
import ActivityStore from "../../../App/stores/ActivityStore";

const ActivityDetail = () => {
  
  const activityStore = useContext(ActivityStore);
  const {selectedActivity: activity, cancelSelectedActivity, openEditForm} = activityStore;

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{activity!.title}</Card.Header>
        <Card.Meta>
          <span>{activity!.date}</span>
        </Card.Meta>
        <Card.Description>
          {activity!.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
            <Button onClick={cancelSelectedActivity} basic color="grey" content="Cancel"/>
            <Button onClick={openEditForm} basic color="blue" content="Edit"/>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetail);
