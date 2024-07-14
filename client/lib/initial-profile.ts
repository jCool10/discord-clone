import { profileApi } from "@/apis/profile.api";
import { serversApi } from "@/apis/server.api";
import { http } from "@/utils/http";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import axios from "axios";
import { cookies } from "next/headers";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return redirectToSignIn();
  }

  await profileApi.checkProfile({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    imageUrl: user.imageUrl,
    email: user.emailAddresses[0].emailAddress,
  });

  const servers = await serversApi.findServersByProfile();

  // const servers = await http.get("/api/servers/profile/all");

  return servers.data.data;
};
