import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createCommission,
  getCommissionById,
  getCommissions,
  type CreateCommissionPayload,
} from "@/services/commissionService";

export function useCommissions() {
  return useQuery({
    queryKey: ["commissions"],
    queryFn: getCommissions,
  });
}

export function useCommission(id: string) {
  return useQuery({
    queryKey: ["commissions", id],
    queryFn: () => getCommissionById(id),
    enabled: !!id,
  });
}

export function useCreateCommission() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateCommissionPayload) =>
      createCommission(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["commissions"] });
    },
  });
}
