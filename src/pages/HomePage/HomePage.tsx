import { useUploadDocument } from "@/hooks";
import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import DocumentIcon from "@heroicons/react/24/outline/DocumentIcon";
import LockClosedIcon from "@heroicons/react/24/outline/LockClosedIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import {
  documentFormSchema,
  type DocumentFormValues,
} from "./documentFormSchema";

type LoadingState = "idle" | "processing-file" | "submitting";

export function HomePage() {
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");

  const uploadMutation = useUploadDocument();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<DocumentFormValues>({
    resolver: zodResolver(documentFormSchema),
    defaultValues: {
      name: "",
      cpf: "",
      file: undefined,
    },
  });

  const fileValue = watch("file");

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      setLoadingState("processing-file");

      setValue("file", acceptedFiles[0], { shouldValidate: true });

      // Simulate file processing (e.g. validation, reading)
      setTimeout(() => {
        setLoadingState("idle");
      }, 800);
    },
    [setValue],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxFiles: 1,
    disabled: loadingState === "processing-file" || uploadMutation.isPending,
    noClick: loadingState === "processing-file" || uploadMutation.isPending,
    noKeyboard: loadingState === "processing-file" || uploadMutation.isPending,
  });

  const onSubmit = async (data: DocumentFormValues) => {
    setLoadingState("submitting");

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("cpf", data.cpf.replace(/\D/g, ""));
    if (data.file) {
      formData.append("file", data.file);
    }

    try {
      await uploadMutation.mutateAsync(formData);
      reset({ name: "", cpf: "", file: undefined });
    } finally {
      setLoadingState("idle");
    }
  };

  const isSubmitting =
    loadingState === "submitting" || uploadMutation.isPending;
  const isProcessingFile = loadingState === "processing-file";
  const hasFile = fileValue instanceof File;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="mx-auto max-w-md px-6 py-12">
        <div className="rounded-xl bg-white p-8 shadow-lg ring-1 ring-gray-200/50">
          <h1 className="mb-6 text-xl font-semibold text-gray-900">
            Add Documents
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                {...register("name")}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="cpf"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                CPF
              </label>
              <input
                id="cpf"
                type="text"
                placeholder="000.000.000-00"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                {...register("cpf")}
              />
              {errors.cpf && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.cpf.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Attach Documents
              </label>
              <div
                {...getRootProps()}
                className={`flex min-h-[140px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed transition-colors ${
                  isDragActive
                    ? "border-blue-600 bg-blue-50"
                    : hasFile
                      ? "border-blue-500 bg-blue-50/50"
                      : "border-blue-400 bg-blue-50/30 hover:bg-blue-50/50"
                } ${isProcessingFile || isSubmitting ? "cursor-not-allowed opacity-70" : ""}`}
              >
                <input {...getInputProps()} />
                {isProcessingFile ? (
                  <div className="flex flex-col items-center gap-2">
                    <ArrowPathIcon className="h-8 w-8 animate-spin text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">
                      Processing file...
                    </span>
                  </div>
                ) : hasFile ? (
                  <div className="flex flex-col items-center gap-2">
                    <DocumentIcon className="h-8 w-8 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">
                      {fileValue?.name}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-blue-700">
                      Drop here
                    </span>
                    <DocumentIcon className="h-6 w-6 text-blue-600" />
                  </div>
                )}
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                <span>Accepted File Types: .doc and .docx only</span>
                <span className="flex items-center gap-1">
                  <LockClosedIcon className="h-3.5 w-3.5" />
                  Secure
                </span>
              </div>
              {errors.file && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.file.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <ArrowPathIcon className="h-5 w-5 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Upload"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
