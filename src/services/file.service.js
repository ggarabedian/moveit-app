import http from "../apis/http";
import { userService } from "./user.service";

function uploadFile(formData, baseDirectoryId) {
  const config = userService.getRequestConfig();

  return http.post(`/folders/${baseDirectoryId}/files`, formData, config);
}

export const fileService = {
  uploadFile,
};
