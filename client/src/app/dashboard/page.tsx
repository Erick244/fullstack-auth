import DashboardPage from "@/components/dashboard/DashboardPage";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Dashboard() {
    const token = cookies().get("fullstack-auth-token");

    if (!token) {
        redirect("/auth");
    }

    return <DashboardPage />;
}
