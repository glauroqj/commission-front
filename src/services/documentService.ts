import { api } from "@/infra/http";

export interface UploadDocumentResponse {
  id: string;
  name: string;
  [key: string]: unknown;
}

export async function uploadDocument(
  formData: FormData,
): Promise<UploadDocumentResponse> {
  const { data } = await api.post<UploadDocumentResponse>(
    "/documents/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return data;
}
