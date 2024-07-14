import { redirect } from "next/navigation";
import { InitialModal } from "@/components/modals/initial-modal";
import { initialProfile } from "@/lib/initial-profile";
import { http } from "@/utils/http";
import { currentUser } from "@clerk/nextjs";

const SetupPage = async () => {
  const server = await initialProfile();

  if (server) {
    return redirect(`/servers/${server[0].id}`);
  }

  return <InitialModal />;
};

export default SetupPage;

console.log();
