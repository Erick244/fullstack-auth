"use client";
import { client } from "@/lib/apollo";
import { ApolloProvider } from "@apollo/client";

interface ApolloClientProviderProps {
    children: React.ReactNode;
}

function ApolloClientProvider({ children }: ApolloClientProviderProps) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default ApolloClientProvider;
