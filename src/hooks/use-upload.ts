"use client";

import axios, { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";

export function useUpload() {
  const { t } = useTranslation();
  const { toast } = useToast();

  const handleError = (error?: unknown) => {
    const msgCode = ((error as AxiosError)?.response?.data as any)?.message;
    const msgDetails = t(`error.${msgCode}`).includes("error.")
      ? ""
      : t(`error.${msgCode}`);
    toast({
      variant: "destructive",
      title: t("error.somethingWentWrong"),
      ...(msgDetails && { description: msgDetails }),
    });
    return "";
  };

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios.post<
        { message: string } & (
          | { success: false }
          | { success: true; file: Express.Multer.File }
        )
      >(`http://localhost:5000/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        return `images/${res.data.file.filename}`;
      }
      return handleError();
    } catch (error: unknown) {
      return handleError(error);
    }
  };

  return handleUpload;
}
