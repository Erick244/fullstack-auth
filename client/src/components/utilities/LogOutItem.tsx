"use client";
import { destroyCookie } from "nookies";
import { MenuItem } from "../dashboard/menu/DropDownMenu";
import { LogOutIcon } from "./Icons";
import { useRouter } from "next/navigation";

export default function LogOutItem() {
    const { push } = useRouter();

    function handlerLogOut() {
        destroyCookie(undefined, "fullstack-auth-token");
        push("/auth");
    }

    return <MenuItem action={handlerLogOut} label="Logout" icon={LogOutIcon} />;
}
