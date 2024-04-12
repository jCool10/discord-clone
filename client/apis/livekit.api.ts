import { http } from "@/utils/http";

export const livekitApi = {
  getToken: ({ chatId, name }: { chatId: string; name: string }) =>
    http.get(`/api/livekit?room=${chatId}&username=${name}`),
};
