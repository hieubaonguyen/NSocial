import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Segment, List, Item, Label, Image } from "semantic-ui-react";
import { IAttendee } from "../../../App/Models/Activity";

interface IProps {
  attendees: IAttendee[];
}

const ActivityDetailedSidebar: React.FC<IProps> = ({ attendees }) => {
  return (
    <Fragment>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {attendees && attendees.length}{" "}
        {attendees.length === 1 ? "Personal" : "People"} Going
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {attendees &&
            attendees.map((attendee) => (
              <Fragment key={attendee.userName}>
                <Item style={{ position: "relative" }}>
                  {attendee.isHost && (
                    <Label
                      style={{ position: "absolute" }}
                      color="orange"
                      ribbon="right"
                    >
                      Host
                    </Label>
                  )}
                  <Image
                    size="tiny"
                    src={attendee.image || "/assets/user.png"}
                  />
                  <Item.Content verticalAlign="middle">
                    <Item.Header as="h3">
                      <Link to={`/profile/${attendee.userName}`}>
                        {attendee.displayName}
                      </Link>
                    </Item.Header>
                    {attendee.isFollowing && (
                      <Item.Extra style={{ color: "orange" }}>
                        Following
                      </Item.Extra>
                    )}
                  </Item.Content>
                </Item>
              </Fragment>
            ))}
        </List>
      </Segment>
    </Fragment>
  );
};

export default observer(ActivityDetailedSidebar);
