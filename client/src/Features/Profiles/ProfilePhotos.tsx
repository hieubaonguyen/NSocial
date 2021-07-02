import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Card, Grid, Header, Tab, Image, Button } from "semantic-ui-react";
import { RootStoreContext } from "../../App/stores/RootStore";
import PhotoUploadWidget from '../../App/Commons/PhotoUpload/PhotoUploadWidget';

const ProfilePhotos = () => {

    const rootStore = useContext(RootStoreContext);
    const {profile, isCurrentUser} = rootStore.profileStore;
    const [addPhotoMode, setAddPhotoMode] = useState(true);

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16} style={{ paddingBottom: 0 }}>
          <Header floated="left" icon="image" content="Photos" />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={addPhotoMode ? "Cancel" : "Add Photo"}
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMode ? (
            <PhotoUploadWidget
            />
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile &&
                profile.photos.map((photo) => (
                  <Card key={photo.id}>
                    <Image src={photo.url} />
                    {isCurrentUser && (
                      <Button.Group fluid widths={2}>
                        <Button
                          name={photo.id}
                          disabled={photo.isMain}
                          basic
                          positive
                          content="Main"
                        />
                        <Button
                          name={photo.id}
                          disabled={photo.isMain}
                          basic
                          negative
                          icon="trash"
                        />
                      </Button.Group>
                    )}
                  </Card>
                ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfilePhotos);
