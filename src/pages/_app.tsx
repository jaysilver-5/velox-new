import "@/styles/globals.css";
import { useEffect } from "react";
import { ClerkProvider, useAuth } from '@clerk/nextjs';
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../store';

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const protectedRoutes = ["/dashboard", "/earnings", "/trade", "/profile", "/my-profile"];
  const signUpRoute = "/sign-up"; // Define your sign-up route here

  useEffect(() => {
    if (isLoaded) {
      if (!isSignedIn && protectedRoutes.includes(router.pathname)) {
        router.push('/sign-in');
      } else if (isSignedIn && ["/sign-up", "/sign-in"].includes(router.pathname)) {
        router.push('/dashboard');
      }
    }
  }, [isLoaded, isSignedIn, router.pathname]);

  // Check if loading or if user is not signed in and attempting to access a protected route
  if (!isLoaded || (!isSignedIn && protectedRoutes.includes(router.pathname))) {
    return null; // You can return a loading spinner here if you want
  }

  return <>{children}</>;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ClerkProvider>
          <AuthGuard>
            <Component {...pageProps} />
          </AuthGuard>
        </ClerkProvider>
      </PersistGate>
    </Provider>
  );
}
