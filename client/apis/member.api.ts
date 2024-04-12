import { Member } from "@/types";
import { http } from "@/utils/http";

export const memberApi = {
  getMemberById: (params: Pick<Member, "id">) =>
    http.get(`/api/members/${params.id}`),
};
