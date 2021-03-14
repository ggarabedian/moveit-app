import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Icon, Message } from "semantic-ui-react";

import { userService } from "../services/user.service";
import { upload } from "../actions/file.actions";
import { clearMessage } from "../actions/message.actions";

const Upload = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDirectoryId, setSelectedDirectoryId] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(null);
  const [fileUploadSuccessful, setfileUploadSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    userService
      .getUserDetails()
      .then((response) => {
        console.log(response);
        setSelectedDirectoryId(response.data.defaultFolderID);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setfileUploadSuccessful(false);
    setIsFileSelected(true);
    dispatch(clearMessage());
  };

  const onFileUpload = () => {
    if (selectedFile === null) {
      setIsFileSelected(false);
      return;
    }

    const formData = new FormData();

    formData.append("file", selectedFile);

    dispatch(upload(formData, selectedDirectoryId))
      .then((response) => {
        setfileUploadSuccessful(true);
        setIsFileSelected(null);
        setSelectedFile(selectedFile);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectedFileDetails = () => {
    if (selectedFile) {
      return (
        <div>
          <h3>Selected File:</h3>
          <p>File Name: {selectedFile.name}</p>
          <p>File Size: {selectedFile.size}</p>
        </div>
      );
    } else {
      return <></>;
    }
  };

  const isFileSelectedValidation = () => {
    if (isFileSelected === false) {
      return <Message error header="Please select a file to upload" />;
    }

    return <></>;
  };

  return (
    <Form
      success={fileUploadSuccessful}
      error={message !== ""}
      onSubmit={onFileUpload}
    >
      <Form.Field>
        <h3>Select file to upload</h3>
        <Button
          color="teal"
          as="label"
          htmlFor="file"
          type="button"
          animated="fade"
        >
          <Button.Content visible>
            <Icon name="file" />
          </Button.Content>
          <Button.Content hidden>Choose a File</Button.Content>
        </Button>
        <input type="file" id="file" hidden onChange={onFileChange} />
        {selectedFileDetails()}
        <Button color="teal" style={{ marginTop: "20px" }} type="submit">
          Upload
        </Button>
      </Form.Field>
      {isFileSelectedValidation()}
      <Message error content={message} />
      <Message success content="File Uploaded Successfully!" />
    </Form>
  );
};

export default Upload;
