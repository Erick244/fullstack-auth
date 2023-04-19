import "./globals.css";
import ApolloClientProvider from "@/components/apollo/ApolloClientProvider";

export const metadata = {
    title: "Fullstack Auth",
    description: "Simple user auth",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <ApolloClientProvider>{children}</ApolloClientProvider>
            </body>
        </html>
    );
}
