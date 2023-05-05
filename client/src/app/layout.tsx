import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import AuthContextProvider from "@/contexts/AuthContext";
import ApolloClientProvider from "@/components/clients/ApolloClientProvider";
import ToastClientContainer from "@/components/clients/ToastClientContainer";

export const metadata = {
    title: {
        default: "Fullstack Auth",
        template: "%s | Fullstack Auth",
    },
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
                    <ToastClientContainer />
                    <AuthContextProvider>{children}</AuthContextProvider>
                </ApolloClientProvider>
            </body>
        </html>
    );
}
