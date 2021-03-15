import { fileService } from "../services/file.service";
import { UPLOAD_SUCCESS, UPLOAD_FAIL, SET_MESSAGE } from "./types";

export const upload = (formData, baseDirectoryId) => (dispatch) => {
  return fileService
    .uploadFile(formData, baseDirectoryId)
    .then((data) => {
      dispatch({
        type: UPLOAD_SUCCESS,
        payload: { file: data },
      });

      return Promise.resolve();
    })
    .catch((error) => {
      const errorMessage = error.response.data.detail;

      dispatch({
        type: UPLOAD_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: errorMessage,
      });
    });
};
