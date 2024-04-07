import { Channel } from "@/types";
import { http } from "@/utils/http";

export const channelApi = {
  getChannelById: (params: Pick<Channel, "id">) =>
    http.get(`/api/channels/${params.id}`),
};
