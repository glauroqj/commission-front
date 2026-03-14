import { useMutation } from "@tanstack/react-query";
import { uploadDocument } from "@/services/documentService";

export function useUploadDocument() {
  return useMutation({
    mutationFn: (formData: FormData) => uploadDocument(formData),
  });
}
