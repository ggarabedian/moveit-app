import express from "../apis/express";
import { userService } from "./user.service";

function uploadFile(formData, baseDirectoryId) {
  const config = userService.getRequestConfig();

  return express.post(`/folders/${baseDirectoryId}/files`, formData, config);
}

export const fileService = {
  uploadFile,
};
