import { Conversation } from "@/types";
import { http } from "@/utils/http";

export const conversationApi = {
  getOrCreateConversation: (
    body: Pick<Conversation, "memberOneId" | "memberTwoId">
  ) => http.post("/api/conversation", body),
};
