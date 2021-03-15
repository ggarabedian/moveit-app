import express from "../apis/express";
import { userService } from "./user.service";

function uploadFile(formData, directoryId) {
  const config = userService.getRequestConfig();

  return express.post(`/folders/${directoryId}/files`, formData, config);
}

export const fileService = {
  uploadFile,
};
