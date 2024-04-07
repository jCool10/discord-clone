import { Server, SuccessResponse } from "@/types";
import { http } from "@/utils/http";

export const serversApi = {
  createServer: (body: Pick<Server, "imageUrl" | "name">) =>
    http.post<SuccessResponse<Server>>("/api/servers", body),

  findServerByProfile: () =>
    http.get<SuccessResponse<Server>>("/api/servers/profile"),

  findServersByProfile: () =>
    http.get<SuccessResponse<Array<Server>>>("/api/servers/profile/all"),

  findServerByIdAndProfile: (params: Pick<Server, "id">) =>
    http.get<SuccessResponse<Server>>(`/api/servers/${params.id}`),

  getServerAndProfileById: (params: Pick<Server, "id">) =>
    http.get(`/api/servers/${params.id}/profile`),

  getServerByInviteCode: (params: Pick<Server, "inviteCode">) =>
    http.get(`/api/servers/invite-code/${params.inviteCode}`),

  updateServerByInviteCode: (params: Pick<Server, "inviteCode">) =>
    http.patch(`/api/servers/invite-code/${params.inviteCode}`),
};
