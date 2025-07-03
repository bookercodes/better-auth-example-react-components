"use client";

import { authClient } from "@/lib/auth-client";
import UserDropdown from "./user-dropdown";
import { useRouter } from "next/navigation";
import SignInAndSignUpButtons from "./sign-in-and-sign-up-buttons";

export default function UserButton() {
  const session = authClient.useSession();
  const router = useRouter();

  if (session.isPending) {
    return null;
  }

  const user = session.data?.user;

  if (user) {
    return (
      <UserDropdown
        user={user}
        onSignOut={() => {
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push("/");
              },
            },
          });
        }}
      />
    );
  }

  return <SignInAndSignUpButtons />;
}
