import React from "react";
import { Button, Form, Icon, Message } from "semantic-ui-react";

import { fileService } from "../services/file.service";
import { userService } from "../services/user.service";

class Upload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null,
      selectedDirectoryId: null,
      isFileSelected: null,
    };
  }

  componentDidMount = () => {
    userService
      .getUserDetails()
      .then((response) => {
        console.log(response);
        this.setState({ selectedDirectoryId: response.data.defaultFolderID });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
    this.setState({ isFileSelected: true });
  };

  onFileUpload = () => {
    if (this.state.selectedFile === null) {
      this.setState({ isFileSelected: false });
      return;
    }

    const formData = new FormData();

    formData.append("file", this.state.selectedFile);

    fileService
      .uploadFile(formData, this.state.selectedDirectoryId)
      .then((response) => {
        console.log(response);
        this.setState({ selectedFile: null });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  selectedFileDetails = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h3>Selected File:</h3>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Size: {this.state.selectedFile.size}</p>
        </div>
      );
    } else {
      return <></>;
    }
  };

  isFileSelectedValidation = () => {
    if (this.state.isFileSelected === false) {
      return <Message error header="Please select a file to upload" />;
    }

    return <></>;
  };

  render() {
    return (
      <Form error onSubmit={this.onFileUpload}>
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
          <input type="file" id="file" hidden onChange={this.onFileChange} />
          {this.selectedFileDetails()}
          <Button color="teal" style={{ marginTop: "20px" }} type="submit">
            Upload
          </Button>
        </Form.Field>
        {this.isFileSelectedValidation()}
      </Form>
    );
  }
}

export default Upload;
