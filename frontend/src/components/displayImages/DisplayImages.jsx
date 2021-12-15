import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllMediaFilesAction } from "../../redux/actions/chats.js";
import "./displayImages.css";
import FileSaver from "file-saver";
import { Close, ArrowBackIosOutlined, ArrowForwardIosOutlined, GetApp } from "@material-ui/icons";

export default function DisplayImages({ image, setDisplayImages, conversationId }) {
  const [img, setImg] = useState(image);

  const dispatch = useDispatch();
  const getAllMediaFilesState = useSelector((state) => state.getAllMediaFiles);

  useEffect(() => {
    dispatch(getAllMediaFilesAction(conversationId));
  }, [conversationId, dispatch]);

  const navigatorImg = (action) => {
    const currrenIndexImg = getAllMediaFilesState?.files?.findIndex(
      (file) => file.fileUrl === img.fileUrl
    );
    return action === "next"
      ? getAllMediaFilesState.files[currrenIndexImg + 1] &&
          setImg(getAllMediaFilesState.files[currrenIndexImg + 1])
      : getAllMediaFilesState.files[currrenIndexImg - 1] &&
          setImg(getAllMediaFilesState.files[currrenIndexImg - 1]);
  };

  return (
    <>
      {getAllMediaFilesState.success && (
        <div className="display-image__overlay">
          <div
            className="display-image__background"
            style={{ backgroundImage: `url(${img.fileUrl})` }}
          >
            <div className="display-image__background-overlay" />
          </div>
          <div className="display-image">
            {img.fileType === "image" ? (
              <img src={img.fileUrl} alt="" />
            ) : (
              <video controls muted autoPlay loop>
                <source src={img.fileUrl} />
              </video>
            )}
          </div>
          <div className="display-image__group-btn">
            <div className="display-image__top-btn">
              <div
                className="display-image__btn close"
                onClick={() => setDisplayImages({ show: false, image: null })}
              >
                <Close className="display-image__icon" />
              </div>
              <div
                className="display-image__right-btn"
                onClick={() => FileSaver.saveAs(img.fileUrl, img.fileName)}
              >
                <GetApp />
              </div>
            </div>
            <div
              className={`display-image__btn-wrap ${
                img.fileUrl ===
                  getAllMediaFilesState.files[getAllMediaFilesState.files.length - 1].fileUrl &&
                "hidden"
              }`}
            >
              <div className="display-image__nav-layout right" onClick={() => navigatorImg("next")}>
                <div className="display-image__btn next">
                  <div className="display-image__icon">
                    <ArrowForwardIosOutlined className="display-image__icon nav" />
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`display-image__btn-wrap ${
                img.fileUrl === getAllMediaFilesState.files[0].fileUrl && "hidden"
              }`}
            >
              <div
                className="display-image__nav-layout left"
                onClick={() => navigatorImg("forward")}
              >
                <div className="display-image__btn forward">
                  <ArrowBackIosOutlined className="display-image__icon nav" />
                </div>
              </div>
            </div>
          </div>
          <div className="display-image__list">
            {getAllMediaFilesState.files.map((file, index) => (
              <div className="display-image__list-item" key={index} onClick={() => setImg(file)}>
                {file.fileType === "image" ? (
                  <img src={file.fileUrl} alt="" />
                ) : file.fileType === "video" ? (
                  ""
                ) : (
                  ""
                )}
                <div
                  className={`display-image_list-item-overlay ${
                    file.fileUrl === img.fileUrl && "current"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
