"use client";
import { destroyCookie } from "nookies";
import { MenuItem } from "../dashboard/menu/DropDownMenu";
import { LogOutIcon } from "./Icons";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";

export default function LogOutItem() {
    const { logOut } = useAuthContext();

    return <MenuItem action={logOut} label="Logout" icon={LogOutIcon} />;
}
