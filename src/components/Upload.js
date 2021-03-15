import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  Icon,
  Message,
  Segment,
  Grid,
  Divider,
  Image,
} from "semantic-ui-react";

import { userService } from "../services/user.service";
import { upload } from "../actions/file.actions";
import { clearMessage, setMessage } from "../actions/message.actions";
import { SUCCESS_CATEGORY, ERROR_CATEGORY } from "../actions/categories";

import "./Upload.css";

const Upload = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [baseDirectoryId, setbaseDirectoryId] = useState(null);

  const { message, category } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    userService
      .getUserDetails()
      .then((response) => {
        console.log(response);
        setbaseDirectoryId(response.data.defaultFolderID);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    dispatch(clearMessage());
  };

  const onFileUpload = () => {
    if (selectedFile === null) {
      dispatch(setMessage("Please select a file to upload", ERROR_CATEGORY));
      return;
    }

    const formData = new FormData();

    formData.append("file", selectedFile);

    dispatch(upload(formData, baseDirectoryId)).then((response) => {
      setSelectedFile(null);
    });
  };

  const selectedFileDetails = () => {
    console.log(selectedFile);
    if (
      selectedFile &&
      (selectedFile.type === "image/png" ||
        selectedFile.type === "image/jpg" ||
        selectedFile.type === "image/jpeg")
    ) {
      return (
        <div>
          <h3>Preview</h3>
          <Image src={URL.createObjectURL(selectedFile)} size="small" wrapped />
          <p>{selectedFile.name}</p>
          <p>{selectedFile.size} bytes</p>
        </div>
      );
    } else if (selectedFile) {
      return (
        <div>
          <h3>No preview available for the selected file format</h3>
          <p>{selectedFile.name}</p>
          <p>{selectedFile.size} bytes</p>
        </div>
      );
    } else {
      return (
        <div>
          <h3>No file selected</h3>
        </div>
      );
    }
  };

  return (
    <Form
      success={category === SUCCESS_CATEGORY}
      error={category === ERROR_CATEGORY}
      onSubmit={onFileUpload}
    >
      <Segment placeholder>
        <Grid columns={2} relaxed="very" verticalAlign="middle" stackable>
          <Grid.Column>
            <Form.Field>
              <Button
                color="teal"
                as="label"
                htmlFor="file"
                type="button"
                animated="fade"
              >
                <Button.Content visible>Choose a File</Button.Content>
                <Button.Content hidden>
                  <Icon name="file" />
                </Button.Content>
              </Button>
              <input
                type="file"
                id="file"
                hidden
                onChange={onFileChange}
                onClick={(event) => {
                  event.target.value = null;
                }}
              />
              <Button
                color="teal"
                style={{ marginTop: "20px" }}
                type="submit"
                animated="fade"
              >
                <Button.Content visible>Upload</Button.Content>
                <Button.Content hidden>
                  <Icon name="cloud upload" />
                </Button.Content>
              </Button>
            </Form.Field>
          </Grid.Column>
          <Grid.Column textAlign="center" verticalAlign="middle">
            {selectedFileDetails()}
          </Grid.Column>
        </Grid>
        <Divider vertical></Divider>
      </Segment>
      <Message error content={message} />
      <Message success content={message} />
    </Form>
  );
};

export default Upload;
