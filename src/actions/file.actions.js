import { fileService } from "../services/file.service";
import { UPLOAD_SUCCESS, UPLOAD_FAIL, SET_MESSAGE } from "./types";
import { SUCCESS_CATEGORY, ERROR_CATEGORY } from "./categories";

export const upload = (formData, baseDirectoryId) => (dispatch) => {
  return fileService
    .uploadFile(formData, baseDirectoryId)
    .then((data) => {
      dispatch({
        type: UPLOAD_SUCCESS,
        payload: { file: data },
      });

      dispatch({
        type: SET_MESSAGE,
        payload: "File Uploaded Successfully!",
        category: SUCCESS_CATEGORY,
      });

      return Promise.resolve();
    })
    .catch((error) => {
      const message = error.response.data.detail;

      dispatch({
        type: UPLOAD_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
        category: ERROR_CATEGORY,
      });
    });
};
