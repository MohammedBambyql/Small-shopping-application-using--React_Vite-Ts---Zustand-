import { UserIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useStore } from "@/store/store";

import { useShallow } from "zustand/react/shallow";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useEffect } from "react";

export function User() {
  const { setAddress, address, fullName, userName, fetchUser } = useStore(
    useShallow((state) => ({
      setAddress: state.setAddress,
      address: state.address,
      fullName: state.fullName,
      userName: state.userName,
      fetchUser: state.fetchUser,
    }))
  );
  useEffect(() => {
    async function fetchData() {
      await fetchUser();
    }

    fetchData();
  }, [fetchUser]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"secondary"} size={"icon"}>
          <UserIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="space-y-2 w-96"
        style={{
          maxHeight: "24rem",
          overflowY: "scroll",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className=" flex gap-2 items-center">
          <p>{fullName}</p>
          <p className=" text-sm">{userName}</p>
        </div>
        <Label htmlFor="address">Your Address:</Label>
        <Input
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </PopoverContent>
    </Popover>
  );
}
