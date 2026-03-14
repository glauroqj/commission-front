import { z } from "zod";

const ACCEPTED_FILE_TYPES = [".doc", ".docx"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const documentFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  cpf: z
    .string()
    .min(11, "CPF must have at least 11 digits")
    .max(14, "CPF must have at most 14 characters")
    .regex(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$|^\d{11}$/, "Invalid CPF format"),
  file: z
    .custom<File | undefined>()
    .refine((f) => f instanceof File, "Document is required")
    .refine(
      (f) => {
        if (!(f instanceof File)) return false;
        const ext = "." + f.name.split(".").pop()?.toLowerCase();
        return ACCEPTED_FILE_TYPES.includes(ext);
      },
      { message: "Accepted file types: .doc and .docx only" },
    )
    .refine(
      (f) => f instanceof File && f.size <= MAX_FILE_SIZE,
      { message: "File size must be less than 5MB" },
    ),
});

export type DocumentFormValues = z.infer<typeof documentFormSchema>;
