import { AppProps } from "next/app";
import { useEffect, useLayoutEffect, useState } from "react";
import "../styles/tailwind.scss";
import "../styles/globals.css";

import { PersonalInfoClass } from "../utils/Classes/Personalization/PersonalInfoClass";
import { usePersonalizationHook } from "../utils/Hooks/usePersonalizationHook";
function MyApp({ Component, pageProps }: AppProps) {
  const pii = usePersonalizationHook();
  useEffect(() => {
    if (!pii?.theme) {
      PersonalInfoClass.getInstance().saveInfoToStorage({
        theme: window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
      });
    }
  }, []);
  console.log(pii);
  return (
    <div
      className={`w-full h-full overflow-auto ${pii?.theme}`}
      id={'themedContainer'}
    >
      
      <Component {...pageProps} />
    </div>
  );
}
export default MyApp;
