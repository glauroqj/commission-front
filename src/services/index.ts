export { api } from "@/infra/http";
export {
  createCommission,
  getCommissionById,
  getCommissions,
  type Commission,
  type CreateCommissionPayload,
} from "./commissionService";
export {
  uploadDocument,
  type UploadDocumentResponse,
} from "./documentService";
