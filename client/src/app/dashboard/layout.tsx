import Header, { Title } from "@/components/template/dashboard/Header";
import DropDownMenu from "@/components/dashboard/menu/DropDownMenu";
import { DashboardIcon } from "@/components/utilities/Icons";
import LogOutItem from "@/components/utilities/LogOutItem";

interface DashboardLayoutProps {
	children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="h-screen bg-gradient-to-r to-slate-500 from-gray-500">
            <Header>
                <Title title="Dashboard" icon={DashboardIcon} />
                <DropDownMenu>
                    <LogOutItem />
                </DropDownMenu>
            </Header>
            {children}
        </div>
    );
}
