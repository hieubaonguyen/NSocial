import { observer } from "mobx-react-lite";
import { Fragment, useEffect, useState } from "react";
import { Grid, Header, Button } from "semantic-ui-react";
import PhotoUploadWidgetDropZone from "./PhotoUploadWidgetDropZone";
import PhotoUploadWidgetCropper from "./PhotoUploadWidgetCropper";

interface IProps {
  uploadPhoto: (file: Blob) => void;
  uploadingPhoto: boolean;
}

const PhotoUploadWidget: React.FC<IProps> = ({
  uploadPhoto,
  uploadingPhoto,
}) => {
  const [files, setFiles] = useState<any[]>([]);
  const [image, setImage] = useState<Blob | null>(null);

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  });

  return (
    <Fragment>
      <Grid>
        <Grid.Column width={4}>
          <Header color="teal" sub content="Step 1 - Add Photo" />
          <PhotoUploadWidgetDropZone setFiles={setFiles} />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color="teal" content="Step 2 - Resize image" />
          {files.length > 0 && (
            <PhotoUploadWidgetCropper
              setImage={setImage}
              imagePreview={files[0].preview}
            />
          )}
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color="teal" content="Step 3 - Preview & Upload" />
          {files.length > 0 && (
            <Fragment>
              <div
                className="img-preivew"
                style={{ minHeight: "200px", overflow: "hidden" }}
              />
              <Button.Group widths={2}>
                <Button
                  icon="check"
                  positive
                  loading={uploadingPhoto}
                  onClick={() => uploadPhoto(image!)}
                />
                <Button
                  icon="close"
                  disabled={uploadingPhoto}
                  onClick={() => setFiles([])}
                />
              </Button.Group>
            </Fragment>
          )}
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default observer(PhotoUploadWidget);
