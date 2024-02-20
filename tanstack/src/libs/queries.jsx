import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            staleTime:10000
        }
    }
});

export const QueryProvider=({children})=>{
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
} 

