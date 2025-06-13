import { getUserLocations } from "@/services/admin/getUserLocations";
import { UserLocation } from "@/types/UserLocation";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";


export const useUserLocations = (user: User | null) => {
  const [userLocations, setUserLocations] = useState<UserLocation[]>([]);

  useEffect(() => {
    const fetchUserLocations = async () => {
      if (!user) return;
      const token = await user.getIdToken();
      const usersData = await getUserLocations(token);
      setUserLocations(
        usersData.map((value) => ({
          id: value.id + "",
          nombre: value.name,
          address: value.location.address,
          city: value.location.city,
          state: value.location.state,
          country: value.location.country,
          postalCode: value.location.postalCode,
        }))
      );
    };
    fetchUserLocations();
  }, [user]);

  return { userLocations };
};