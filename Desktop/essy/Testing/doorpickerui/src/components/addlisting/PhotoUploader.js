import React, { useContext, useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { BsCloudUpload } from "react-icons/bs";
import S3 from "react-aws-s3";
import { addImage } from "../../store/api/post";
import { UserContext } from "../../context/UserProvider";
import { DRAFT_SET } from "../../context/actions";
import { useHistory } from "react-router-dom";
const config = {
  bucketName: process.env.REACT_APP_bucket,
  dirName: "picker",
  region: "us-east-1",
  accessKeyId: process.env.REACT_APP_aws_key,
  secretAccessKey: process.env.REACT_APP_aws_secret,
  s3Url: "https://essluploads.s3.amazonaws.com",
};
const ReactS3Client = new S3(config);

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 0,
  marginRight: 0,
  width: "100%",
  height: "auto",
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
  alignItems: "start",
};

const img = {
  display: "block",
  width: "150px",
  maxWidth: "200px",
  height: "150px",
};

function PhotoUploader(props) {
  const { done, next } = props;
  const [state, dispatch] = useContext(UserContext);
  const { draft, user } = state;
  const [files, setFiles] = useState([]);
  const history = useHistory();
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const imgs = [];
      setFiles(
        acceptedFiles.map((file) => {
          const s3 = s3Upload(file, file.name);
          Object.assign(imgs, s3.location);
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
        })
      );
      storeImage(imgs);
    },
  });
  const storeImage = async (imgs = []) => {
    const r = await addImage({ id: draft.id, images: imgs });
    dispatch({ type: DRAFT_SET, data: r.data });
    done();
  };

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt="Author Profile" />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );
  const s3Upload = (file, fileName) => {
    ReactS3Client.uploadFile(file, fileName)
      .then((data) => {
        console.log(data, " upload succesful");
        return data.location;
      })
      .catch((err) => console.error(err, " upload failed "));
  };

  return (
    <>
      <div className="billing-form-item">
        <div className="billing-title-wrap">
          <h3 className="widget-title pb-0">Photo</h3>
          <div className="title-shape margin-top-10px"></div>
        </div>
        <div className="billing-content">
          <div className="row">
            <div className="col-lg-12">
              <div className="drag-and-drop-wrap text-center">
                {user?.id ? (
                  <>
                    <div className="drag-and-drop-file">
                      <div {...getRootProps({ className: "dropzone" })}>
                        <input {...getInputProps()} />
                        <span className="drag-drop-icon">
                          <BsCloudUpload />
                        </span>
                        <h3>You can drag & drop all files here to upload</h3>
                      </div>
                      <aside style={thumbsContainer}>{thumbs}</aside>
                    </div>
                  </>
                ) : (
                  <Alert variant="warning">
                    <Button
                      variant="link"
                      style={{ marginLeft: "4px", textDecoration: "none" }}
                      onClick={() =>
                        history.push("/login", {
                          from: "/add-listing/new",
                        })
                      }
                    >
                      You are not logged in! Go to login
                    </Button>
                  </Alert>
                )}
              </div>
            </div>
          </div>
          <Button onClick={() => next()}>Done</Button>
        </div>
      </div>
    </>
  );
}

export default PhotoUploader;
