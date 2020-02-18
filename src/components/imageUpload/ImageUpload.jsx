import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import "./imageUpload.css";

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      allowedFiles: null,
      isFileSize: null,
      status: false,
      primaryFiles: null,
    };
  }

  componentDidMount() {
    if (this.props.currentUser.role === 'Non Premium') {
      this.setState({ allowedFiles: 2 })
    }
    if (this.props.currentUser.role === "Premium") {
      this.setState({ allowedFiles: 4 })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(!prevProps.changePrimary && this.props.changePrimary)
    {
      let files = this.state.files;
      files.map((file, i) => {
        file.primary = false;
        return file;
      })
      this.setState({ files });
    }
  }

  onDrop = (files) => {
    if (files.length + this.props.fileLength > this.state.allowedFiles) {
      this.setState({ isFileSize: true })
    }
    else {
      files.map((file, i) => Object.assign(file, {
        preview: URL.createObjectURL(file),
        primary: (this.props.createListProps && i === 0 ? true : false)
      }));
      this.setState({ files }, () => {
        this.props.onSendUploadedFiles(this.state.files);
        this.setState({ isFileSize: false })
      })
    };
  }

  checkPrimary = (index) => {
    this.props.updatePrimary();
    let files = this.state.files;
    files.map((file, i) => {
      file.primary = (index === i) ? true : false;
      return file;
    })
    this.setState({ files }, () => {
      this.props.onSendUpdatedFiles({files: this.state.files, unchangingprops: true});
    });
  }

  render() {
    const maxSize = 20971520; /* 20 MB */
    const files = this.state.files.map((file, i) => (
      <li key={file.name}>
        {
          file.primary &&
          <span className="badge badge-primary">Primary</span>
        }
        <img className="position-relative cursor-pointer" onClick={() => this.checkPrimary(i)} alt="" src={file.preview} width="100" height="100" />
      </li>
    ));

    return (
      <>
        <Dropzone
          onDrop={this.onDrop}
          accept="image/*"
          multiple
          minSize={0}
          maxSize={maxSize}>
          {({ getRootProps, getInputProps, isDragReject, rejectedFiles, }) => {
            const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;

            return (
              <section className="container main-border mb-4">
                <div {...getRootProps({ className: 'dropzone' })}>
                  <input {...getInputProps()} />
                  {isDragReject && <p>File type not accepted, sorry!</p>}
                  {isFileTooLarge && (
                    <div className="text-danger text-center mt-2">
                      File is too large. Up to 20MB file size allowed.
                </div>
                  )}
                  {this.state.isFileSize && (
                    <div className="text-danger text-center mt-2">
                      Uploaded photos are greater than allowed photo uploads.
                </div>
                  )}
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
                <aside >
                  <h4>Files</h4>
                  <ul className="img_files">{files}</ul>
                </aside>
              </section>
            )
          }
          }
        </Dropzone>
      </>
    );
  }
}

export default ImageUpload;