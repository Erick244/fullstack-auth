import AuthForms from "@/components/auth/forms/AuthForms";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const metadata = {
	title: "Auth"
}

export default function Auth() {
	const token = cookies().get("fullstack-auth-token");

	if (token) {
		redirect("/dashboard");
	} 
	
	return <AuthForms />;
}