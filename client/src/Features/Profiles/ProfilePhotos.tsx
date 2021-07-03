import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Card, Grid, Header, Tab, Image, Button } from "semantic-ui-react";
import { RootStoreContext } from "../../App/stores/RootStore";
import PhotoUploadWidget from "../../App/Commons/PhotoUpload/PhotoUploadWidget";

const ProfilePhotos = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    profile,
    isCurrentUser,
    uploadingPhoto,
    uploadPhoto,
    setMainPhoto,
    loading,
    deletePhoto
  } = rootStore.profileStore;

  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [targetSetMain, setTargetSetMain] = useState<string | null>(null);
  const [targetDelete, setTargetDelete] = useState<string | null>(null);

  const handleUploadPhoto = (file: Blob) => {
    uploadPhoto(file).then(() => setAddPhotoMode(false));
  };

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
              uploadingPhoto={uploadingPhoto}
              uploadPhoto={handleUploadPhoto}
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
                          loading={targetSetMain === photo.id && loading}
                          onClick={(e) => {
                            setMainPhoto(photo);
                            setTargetSetMain(e.currentTarget.name);
                          }}
                        />
                        <Button
                          name={photo.id}
                          disabled={photo.isMain}
                          basic
                          negative
                          icon="trash"
                          loading={targetDelete === photo.id && loading}
                          onClick={(e) => {
                            setTargetSetMain(null);
                            deletePhoto(photo);
                            setTargetDelete(e.currentTarget.name);
                          }}
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
