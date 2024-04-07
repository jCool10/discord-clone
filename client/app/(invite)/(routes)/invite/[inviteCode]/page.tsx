import { serversApi } from "@/apis/server.api";
import { redirect } from "next/navigation";

interface Props {
  params: {
    inviteCode: string;
  };
}

const InviteCodePage = async ({ params: { inviteCode } }: Props) => {
  if (!inviteCode) {
    return redirect("/");
  }

  const existingServerResponse = await serversApi.getServerByInviteCode({
    inviteCode,
  });

  const existingServer = existingServerResponse.data?.data;

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  const serverResponse = await serversApi.updateServerByInviteCode({
    inviteCode,
  });

  const server = serverResponse.data?.data;

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return null;
};

export default InviteCodePage;
