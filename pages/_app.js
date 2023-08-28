import { ThemeProvider } from "next-themes";
import "../css/tailwind.css";
import { UserProvider } from '@auth0/nextjs-auth0/client';;

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
    </UserProvider>
  );
}

export default MyApp;
