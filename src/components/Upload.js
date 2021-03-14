import React from "react";
import { connect } from "react-redux";
import { Button, Form, Icon, Message } from "semantic-ui-react";

//import { fileService } from "../services/file.service";
import { userService } from "../services/user.service";
import { upload } from "../actions/file.actions";

class Upload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null,
      selectedDirectoryId: null,
      isFileSelected: null,
      fileUploadSuccessful: false,
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

    this.props
      .upload(formData, this.state.selectedDirectoryId)
      .then((response) => {
        this.setState({ fileUploadSuccessful: true });
        this.setState({ isFileSelected: null });
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
    console.log(this.props.message);

    return (
      <Form
        success={this.state.fileUploadSuccessful}
        error={this.props.message.message !== ""}
        onSubmit={this.onFileUpload}
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
          <input type="file" id="file" hidden onChange={this.onFileChange} />
          {this.selectedFileDetails()}
          <Button color="teal" style={{ marginTop: "20px" }} type="submit">
            Upload
          </Button>
        </Form.Field>
        {this.isFileSelectedValidation()}
        <Message error content={this.props.message.message} />
        <Message success content="File Uploaded Successfully!" />
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.message,
  };
};

export default connect(mapStateToProps, { upload })(Upload);
