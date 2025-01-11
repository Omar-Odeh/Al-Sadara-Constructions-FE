import { useEffect } from "react";

export function useWindowResize({
  callback,
  dependency = [],
}: {
  callback: () => void;
  dependency?: any[];
}) {
  useEffect(() => {
    callback();
    window.addEventListener("resize", callback);
    return () => window.removeEventListener("resize", callback);
  }, [...dependency]);
}
