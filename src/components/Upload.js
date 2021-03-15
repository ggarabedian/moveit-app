import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Icon, Message } from "semantic-ui-react";

import { userService } from "../services/user.service";
import { upload } from "../actions/file.actions";
import { clearMessage, setMessage } from "../actions/message.actions";
import { SUCCESS_CATEGORY, ERROR_CATEGORY } from "../actions/categories";

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

  return (
    <Form
      success={category === SUCCESS_CATEGORY}
      error={category === ERROR_CATEGORY}
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
      <Message error content={message} />
      <Message success content={message} />
    </Form>
  );
};

export default Upload;
