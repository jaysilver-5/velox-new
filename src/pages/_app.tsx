import "@/styles/globals.css";
import { useEffect } from "react";
import { ClerkProvider, useAuth } from '@clerk/nextjs';
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const protectedRoutes = ["/dashboard", "/earnings", "/trade", "/profile", "/my-profile"];

  useEffect(() => {
    if (isLoaded && !isSignedIn && protectedRoutes.includes(router.pathname)) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  // Check if loading or if user is not signed in and attempting to access a protected route
  if (!isLoaded || (!isSignedIn && protectedRoutes.includes(router.pathname))) {
    return null; // You can return a loading spinner here if you want
  }

  return <>{children}</>;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider>
      <AuthGuard>
        <Component {...pageProps} />
      </AuthGuard>
    </ClerkProvider>
  );
}
