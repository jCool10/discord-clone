"use client";

import { serversApi } from "@/apis/server.api";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";

interface Props {
  params: {
    serverId: string;
  };
}

const ServerIdPage = ({ params }: Props) => {
  const { data: serverData } = useQuery({
    queryKey: ["server", { id: params.serverId }],
    queryFn: () => serversApi.findServerByIdAndProfile({ id: params.serverId }),
  });

  const initialChannel = serverData?.data.data.channels[0];

  if (initialChannel?.name !== "general") {
    return null;
  }

  return redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`);
};

export default ServerIdPage;
