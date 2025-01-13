import { useEffect, useCallback, RefObject } from 'react';

export const useInfiniteScroll = (
  ref: RefObject<HTMLElement>,
  onIntersect: () => void,
  enabled = true
) => {
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && enabled) {
        onIntersect();
      }
    },
    [onIntersect, enabled]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const option = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [ref, handleObserver]);
};
