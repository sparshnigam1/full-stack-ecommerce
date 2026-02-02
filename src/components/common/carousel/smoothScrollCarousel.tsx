import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import React, {
  ComponentPropsWithRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

type PropType = {
  slides: any[];
  options?: EmblaOptionsType;
  speed?: number | undefined;
  delay?: number | undefined;
  showNavButtons?: boolean;
  showNavDots?: boolean;
};

const SmoothScrollCarousel: React.FC<PropType> = ({
  slides,
  options,
  speed = 1,
  delay,
  showNavButtons = true,
  showNavDots = true,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll({
      playOnInit: true,
      speed: speed,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  ]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton({
    emblaApi,
    delay,
  });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons({ emblaApi, delay });

  useEffect(() => {
    if (!emblaApi) return;
    const autoScroll = emblaApi.plugins()?.autoScroll;
    if (!autoScroll) return;

    const node = emblaApi.rootNode();

    const stop = () => autoScroll.stop();
    const play = () => autoScroll.play();

    node.addEventListener("mouseenter", stop);
    node.addEventListener("mouseleave", play);

    return () => {
      node.removeEventListener("mouseenter", stop);
      node.removeEventListener("mouseleave", play);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const autoScroll = emblaApi.plugins()?.autoScroll;
    if (!autoScroll) return;

    let resumeTimeout: NodeJS.Timeout | null = null;

    const stopAndResume = () => {
      autoScroll.stop();

      if (resumeTimeout) clearTimeout(resumeTimeout);

      // Resume after 5 seconds
      resumeTimeout = setTimeout(() => {
        autoScroll.play();
      }, delay || 2500);
    };

    const prevBtn = document.querySelector(".embla__prev");
    const nextBtn = document.querySelector(".embla__next");

    prevBtn?.addEventListener("click", stopAndResume);
    nextBtn?.addEventListener("click", stopAndResume);

    return () => {
      prevBtn?.removeEventListener("click", stopAndResume);
      nextBtn?.removeEventListener("click", stopAndResume);
      if (resumeTimeout) clearTimeout(resumeTimeout);
    };
  }, [emblaApi]);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom -ml-4">
          {slides.map((elem, index) => elem)}
        </div>
      </div>

      <div className="flex justify-center md:justify-between items-center gap-5 w-full min-w-0 max-w-md lg:max-w-3xl px-6">
        {showNavButtons && (
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        )}
        <div className="flex flex-wrap sm:flex-nowrap justify-center gap-4">
          {showNavDots &&
            scrollSnaps.map((_, i) => (
              <button
                type="button"
                key={i}
                onClick={() => onDotButtonClick(i)}
                className={`h-2 w-2 rounded-full transition-all cursor-pointer ${
                  selectedIndex === i
                    ? "bg-primary ring-3 ring-ring"
                    : "bg-primary-lightest"
                }`}
              />
            ))}
        </div>
        {showNavButtons && (
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        )}
      </div>
    </div>
  );
};

export default SmoothScrollCarousel;

// -------------------------------------------------------------------------------------------------------------

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
  delay?: number;
};

export const usePrevNextButtons = ({
  emblaApi,
  onButtonClick,
  delay,
}: {
  emblaApi: EmblaCarouselType | undefined;
  onButtonClick?: (emblaApi: EmblaCarouselType) => void;
  delay?: number;
}): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;

    const autoScroll = emblaApi?.plugins()?.autoScroll;
    autoScroll?.stop();
    autoScroll?.play(delay || 2500);
    emblaApi.scrollPrev();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick, delay]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;

    const autoScroll = emblaApi?.plugins()?.autoScroll;
    autoScroll?.stop();
    autoScroll?.play(delay || 2500);
    emblaApi.scrollNext();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick, delay]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    queueMicrotask(() => {
      onSelect(emblaApi);
    });
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type PrevButtonPropType = ComponentPropsWithRef<"button">;

export const PrevButton: React.FC<PrevButtonPropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button
      type="button"
      {...restProps}
      className="p-2.5 md:p-4.5 flex items-center justify-center rounded-full bg-white text-primary hover:bg-primary-dark hover:text-white transition cursor-pointer shadow-elevation-3 active:bg-primary active:text-white disabled:bg-white disabled:text-primary disabled:cursor-not-allowed embla__prev"
    >
      <LuChevronLeft size={22} />
    </button>
  );
};

export const NextButton: React.FC<PrevButtonPropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button
      type="button"
      {...restProps}
      className="p-2.5 md:p-4.5 flex items-center justify-center rounded-full bg-white text-primary hover:bg-primary-dark hover:text-white transition cursor-pointer shadow-elevation-3 active:bg-primary active:text-white disabled:bg-white disabled:text-primary disabled:cursor-not-allowed embla__next"
    >
      <LuChevronRight size={22} />
    </button>
  );
};

// -------------------------------------------------------------------------------------------------------------

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
  delay?: number | undefined;
};

export const useDotButton = ({
  emblaApi,
  onButtonClick,
  delay,
}: {
  emblaApi: EmblaCarouselType | undefined;
  onButtonClick?: (emblaApi: EmblaCarouselType) => void;
  delay?: number | undefined;
}): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;

      const autoScroll = emblaApi?.plugins()?.autoScroll;
      autoScroll?.stop();
      autoScroll?.play(delay || 2500);
      emblaApi.scrollTo(index);
      if (onButtonClick) onButtonClick(emblaApi);
    },
    [emblaApi, onButtonClick, delay],
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  // Subscribe for updates
  useEffect(() => {
    if (!emblaApi) return;

    queueMicrotask(() => {
      onInit(emblaApi);
      onSelect(emblaApi);
    });
    emblaApi.on("reInit", onInit).on("select", onSelect);

    return () => {
      emblaApi.off("reInit", onInit).off("select", onSelect);
    };
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};
