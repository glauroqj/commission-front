import { api } from "@/infra/http";

export interface Commission {
  id: string;
  name: string;
  [key: string]: unknown;
}

export interface CreateCommissionPayload {
  name: string;
  [key: string]: unknown;
}

export async function getCommissions(): Promise<Commission[]> {
  const { data } = await api.get<Commission[]>("/commissions");
  return data;
}

export async function getCommissionById(id: string): Promise<Commission> {
  const { data } = await api.get<Commission>(`/commissions/${id}`);
  return data;
}

export async function createCommission(
  payload: CreateCommissionPayload,
): Promise<Commission> {
  const { data } = await api.post<Commission>("/commissions", payload);
  return data;
}
