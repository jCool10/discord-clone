import { profileApi } from "@/apis/profile.api";
import { serversApi } from "@/apis/server.api";
import { setUserIdToLocalStorage } from "@/utils/auth";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return redirectToSignIn();
  }

  setUserIdToLocalStorage(user.id);

  await profileApi.checkProfile({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    imageUrl: user.imageUrl,
    email: user.emailAddresses[0].emailAddress,
  });

  const servers = await serversApi.findServersByProfile();

  return servers.data.data;
};
