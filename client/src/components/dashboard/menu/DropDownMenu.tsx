"use client";
import ClientGravatar from "@/components/utilities/ClientGravatar";
import { AngleDownIcon } from "@/components/utilities/Icons";
import Spinner from "@/components/utilities/Spinner";
import { useAuthContext } from "@/contexts/AuthContext";
import { useState } from "react";

const classes = {
    containerMenu: `
		mr-2 relative z-10
	`,
    menuPreview: `
		flex items-center gap-2
		w-40 sm:w-48 p-1
		bg-gray-700 text-white active:bg-gray-700/70
		rounded  cursor-pointer hover:shadow-md
	`,
    gravatar: `
		h-8 w-8 rounded-full
	`,
    previewNickname: `
		w-28 overflow-hidden
		whitespace-nowrap text-ellipsis
	`,
    containerDropdownMenu(conditional: boolean) {
        const defaultClasses = `
			flex flex-col gap-2
			w-full absolute p-2
			bg-gray-600  shadow-lg rounded-b
		`;

        const conditionalClasses = conditional
            ? "opacity-0 translate-y-[-30px] invisible"
            : "opacity-100 visible";

        return defaultClasses + conditionalClasses;
    },
    dropDownMenuItem: `
		flex justify-between items-center
		cursor-pointer rounded
		bg-white/20 hover:bg-white/30
		p-1 text-white
	`,
};

function useDropDownMenu() {
    const [hiddenMenu, setHiddenMenu] = useState<boolean>(true);

    function toggleHiddenMenu() {
        setHiddenMenu((state) => !state);
    }

    return {
        hiddenMenu,
        toggleHiddenMenu,
    };
}

type MenuPreviewProps = {
    hiddenMenu: boolean;
    onClick: () => void;
    email: string | undefined;
    name: string | undefined;
};

function MenuPreview({ hiddenMenu, onClick, email, name }: MenuPreviewProps) {
    return (
        <div className={classes.menuPreview} onClick={onClick}>
            {!email && !name ? (
                <Spinner />
            ) : (
               <ClientGravatar email={email ?? ""} className={classes.gravatar} />
            )}
            <div className={classes.previewNickname}>{name}</div>
            <i className={hiddenMenu ? "rotate-0" : "rotate-180"}>
                {AngleDownIcon}
            </i>
        </div>
    );
}

type MenuItemProps = {
    label: string;
    icon: JSX.Element;
    action: () => void;
};

export function MenuItem({ action, icon, label }: MenuItemProps) {
    return (
        <div className={classes.dropDownMenuItem} onClick={action}>
            {label} <i>{icon}</i>
        </div>
    );
}

type ContainerItemsProps = {
    hiddenMenu: boolean;
    children: React.ReactNode;
};

function ContainerItems({ children, hiddenMenu }: ContainerItemsProps) {
    return (
        <div className={classes.containerDropdownMenu(hiddenMenu)}>
            {children}
        </div>
    );
}

interface DropDownMenuProps {
    children: React.ReactNode;
}

export default function DropDownMenu({ children }: DropDownMenuProps) {
    const { hiddenMenu, toggleHiddenMenu } = useDropDownMenu();
    const { user } = useAuthContext();

    return (
        <div className={classes.containerMenu}>
            <MenuPreview
                onClick={toggleHiddenMenu}
                hiddenMenu={hiddenMenu}
                email={user?.email}
                name={user?.name}
            />
            <ContainerItems hiddenMenu={hiddenMenu}>{children}</ContainerItems>
        </div>
    );
}
