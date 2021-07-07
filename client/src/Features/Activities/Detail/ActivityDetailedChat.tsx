import { Fragment, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Segment, Header, Form, Button, Comment } from "semantic-ui-react";
import { RootStoreContext } from "../../../App/stores/RootStore";
import { Field, Form as FinalForm } from "react-final-form";
import TextAreaInput from "../../../App/Commons/Form/TextAreaInput";
import { observer } from "mobx-react-lite";
import { formatDistance } from "date-fns";

const ActivityDetailedChat = () => {
  const rootStore = useContext(RootStoreContext);
  const { activity, createHubConnection, stopHubConnection, addMessage } =
    rootStore.activityStore;

  useEffect(() => {
    createHubConnection();
    return () => stopHubConnection();
  }, [createHubConnection, stopHubConnection]);

  return (
    <Fragment>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached>
        <Comment.Group>
          {activity &&
            activity.comments &&
            activity.comments.map((comment) => (
              <Comment key={comment.id}>
                <Comment.Avatar src={comment.image || "/assets/user.png"} />
                <Comment.Content>
                  <Comment.Author as={Link} to={`/profile/${comment.userName}`}>
                    {comment.displayName}
                  </Comment.Author>
                  <Comment.Metadata>
                    <div>{formatDistance(new Date(comment.createdAt), new Date())}</div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.body}</Comment.Text>
                </Comment.Content>
              </Comment>
            ))}
          <FinalForm
            onSubmit={addMessage}
            render={({ handleSubmit, submitting, form }) => (
              <Form onSubmit={() => handleSubmit()!.then(form.reset)}>
                <Field
                  name="body"
                  rows={3}
                  render={TextAreaInput}
                  placeholder="Add your comment"
                />
                <Button
                  content="Add Reply"
                  labelPosition="left"
                  icon="edit"
                  primary
                  loading={submitting}
                />
              </Form>
            )}
          />
        </Comment.Group>
      </Segment>
    </Fragment>
  );
};

export default observer(ActivityDetailedChat);
