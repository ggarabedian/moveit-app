import React from "react";

class Upload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null,
      selectedDirectoryId: null,
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
  };

  onFileUpload = () => {
    const formData = new FormData();

    formData.append("file", this.state.selectedFile);

    fileService
      .uploadFile(formData, this.state.selectedDirectoryId)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  selectedFileDetails = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h3>File Details:</h3>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Size: {this.state.selectedFile.size}</p>
        </div>
      );
    } else {
      return <></>;
    }
  };

  render() {
    return (
      <Form onSubmit={this.onFileUpload}>
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
      </Form>
    );
  }
}

export default Upload;
