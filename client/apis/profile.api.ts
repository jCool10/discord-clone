import { Profile, SuccessResponse } from "@/types";
import { http } from "@/utils/http";

export const profileApi = {
  checkProfile: (body: Pick<Profile, "id" | "name" | "imageUrl" | "email">) =>
    http.post<SuccessResponse<Profile>>("/api/profile", body),
};
