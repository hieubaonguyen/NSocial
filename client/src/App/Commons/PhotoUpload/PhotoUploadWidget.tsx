import { observer } from "mobx-react-lite";
import React, { Fragment, useEffect, useState } from "react";
import { Grid, Header, Button, Image } from "semantic-ui-react";
import PhotoUploadWidgetDropZone from "./PhotoUploadWidgetDropZone";
import PhotoUploadWidgetCropper from "./PhotoUploadWidgetCropper";

const PhotoUploadWidget = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [image, setImage] = useState<Blob | null>(null);

  //   useEffect(() => {
  //     return files.forEach((file) => URL.revokeObjectURL(file.preview));
  //   });

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
            <div
              className="img-preivew"
              style={{ minHeight: "200px", overflow: "hidden" }}
            />
          )}
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default observer(PhotoUploadWidget);
