import { redirect } from "next/navigation";
import { InitialModal } from "@/components/modals/initial-modal";
import { initialProfile } from "@/lib/initial-profile";

const SetupPage = async () => {
  const server = await initialProfile();

  if (server) {
    return redirect(`/servers/${server[0].id}`);
  }

  return <InitialModal />;
};

export default SetupPage;
