import React from "react";
import { Link } from "react-router-dom";
import { Segment, Header, Icon, Button } from "semantic-ui-react";

const NotFound = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="search" />
        Oops - we've looked everywhere but couldn't find this.
      </Header>
      <Segment.Inline>
        <Button as={Link} to="/activities" primary>
          Return to Activities page
        </Button>
      </Segment.Inline>
    </Segment>
  );
};

export default NotFound;
