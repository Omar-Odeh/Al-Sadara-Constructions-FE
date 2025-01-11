import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import Chevron from "@/icons/Chevron";

interface Props {
  containerClassName?: string;
  images: string[];
  children: ReactNode;
}

function Carousel({ containerClassName = "", images, children }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [blockTransition, setBlockTransition] = useState(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout>();
  const [imgIndex, setImgIndex] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();

  const initInterval = () => {
    return setInterval(() => updateImgIndex(1), 5000);
  };

  const resetInterval = () => {
    clearInterval(intervalId);
    setIntervalId(initInterval());
  };

  const scrollToImg = (index: number) => {
    const container = containerRef.current;
    const imgWrapper = container?.childNodes[index];
    if (!imgWrapper) return;
    const { clientWidth: containerWidth } = container;
    const { clientWidth: wrapperWidth } = imgWrapper as HTMLDivElement;
    const offset = containerWidth - (images.length - index) * wrapperWidth;
    container.style.transform = `translateX(${Math.max(offset, 0)}px)`;
  };

  const updateImgIndex = useCallback(
    (delta: number) => {
      if (blockTransition) return;
      setImgIndex((prev) => {
        const newIndex = (images.length + prev + delta) % images.length;
        scrollToImg(newIndex);
        return newIndex;
      });
    },
    [blockTransition]
  );

  const handleResize = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    setBlockTransition(true);
    container.classList.add("!duration-0");
    scrollToImg(imgIndex);
    setTimeout(() => container.classList.remove("!duration-0"));
    timerId && clearTimeout(timerId);
    setTimerId(setTimeout(() => setBlockTransition(false), 300));
  }, [imgIndex, timerId]);

  useEffect(() => {
    const intId = initInterval();
    !intervalId && setIntervalId(intId);
    window.addEventListener("resize", handleResize);
    return () => {
      clearInterval(intId);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize, updateImgIndex]);

  return (
    <div className={`overflow-hidden relative ${containerClassName}`}>
      <div
        className="flex items-center justify-between px-4 md:px-6 gap-x-4 
                  absolute inset-0 z-10 bg-primary/40 text-white"
      >
        <button
          onClick={() => {
            resetInterval();
            updateImgIndex(-1);
          }}
          className="grid place-items-center w-8 h-8 rounded-full transition-colors hover:bg-white/30"
        >
          <Chevron className="rotate-180" />
        </button>
        <div className="space-y-4 text-center">{children}</div>
        <button
          onClick={() => {
            resetInterval();
            updateImgIndex(1);
          }}
          className="grid place-items-center w-8 h-8 rounded-full transition-colors hover:bg-white/10"
        >
          <Chevron />
        </button>
      </div>
      <div
        ref={containerRef}
        style={{ minWidth: `${images.length * 100}%` }}
        className="h-full flex transition-transform duration-500"
      >
        {images.map((img, index) => (
          <div
            key={index}
            style={{ width: `${100 / images.length}%` }}
            className="h-full"
          >
            <img
              className="min-w-full min-h-full object-cover"
              src={img}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
