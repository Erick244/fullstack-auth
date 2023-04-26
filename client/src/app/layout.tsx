import "./globals.css";
import AuthContextProvider from "@/contexts/AuthContext";
import ApolloClientProvider from "@/components/apollo/ApolloClientProvider";

export const metadata = {
    title: {
		default: "Fullstack Auth",
		template: "%s | Fullstack Auth"
	}
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <ApolloClientProvider>
                    <AuthContextProvider>{children}</AuthContextProvider>
                </ApolloClientProvider>
            </body>
        </html>
    );
}
