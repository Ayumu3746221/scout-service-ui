import { getUser } from "@/domain/user/getUser";
import Message from "@/components/message/Message";
import { redirect } from "next/navigation";

export default async function MessagesPage() {
  const currentUser = await getUser();

  if (!currentUser) {
    redirect("/login");
  }

  return (
    <div>
      <Message currentUserId={currentUser.id}></Message>
    </div>
  );
}
