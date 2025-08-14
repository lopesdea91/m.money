import { useEffect, useRef } from "react";

type Callback = () => void;
type CallbackPromise = () => Promise<void>;

function usePageInit({
  title,
  cb,
}: {
  title?: string;
  cb: Callback | CallbackPromise;
}) {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current === true) return;

    if (title) {
      window.document.title = title;
    }
    cb();
    isMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export { usePageInit };
