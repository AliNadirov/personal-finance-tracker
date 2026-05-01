import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/storage";

export function useCurrentUser() {
  const [currentUser, setCurrentUserState] = useState(getCurrentUser());

  useEffect(() => {
    const handleUserUpdate = () => {
      setCurrentUserState(getCurrentUser());
    };

    window.addEventListener("budgetbee:user-updated", handleUserUpdate);
    window.addEventListener("storage", handleUserUpdate);

    return () => {
      window.removeEventListener("budgetbee:user-updated", handleUserUpdate);
      window.removeEventListener("storage", handleUserUpdate);
    };
  }, []);

  return currentUser;
}