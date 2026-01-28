import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./EventsSlider.scss";
import { TimelineEvent } from "../../data/types";
import ArrowSvg from "../ArrowSvg";

interface EventsSliderProps {
  events: TimelineEvent[];
}

const EventsSlider: React.FC<EventsSliderProps> = ({ events }) => {
  const swiperRef = useRef<any>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const [swiperReady, setSwiperReady] = useState(false);

  useEffect(() => {
    if (swiperReady && swiperRef.current) {
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, [swiperReady]);

  if (!events || events.length === 0) {
    return (
      <div className="events events--empty">
        <p className="events__empty-message">
          События для этого периода отсутствуют.
        </p>
      </div>
    );
  }

  return (
    <div className="events">
      <div className="events__wrer">
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          breakpoints={{
            320: {
              spaceBetween: 20,
            },
            768: {
              spaceBetween: 50, 
            },
          }}
          slidesPerView="auto"
          centeredSlides={false}
          watchOverflow={true}
          navigation={{
            prevEl: prevButtonRef.current,
            nextEl: nextButtonRef.current,
            disabledClass: "events__button--disabled",
          }}
          pagination={{ clickable: true }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setSwiperReady(true);
          }}
          onInit={(swiper) => {
            if (swiper.navigation) {
              swiper.navigation.init();
              swiper.navigation.update();
            }
          }}
        >
          {events.map((event) => (
            <SwiperSlide key={event.id} className="events__slide">
              <div className="events__item">
                <div className="events__date">{event.date}</div>
                <div className="events__description">{event.description}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          ref={prevButtonRef}
          className="events__button events__prev"
          aria-label="Предыдущие события"
        >
          <ArrowSvg
            direction="right"
            width={10}
            height={10}
            color="rgba(56, 119, 238, 1)"
          />
        </button>
        <button
          ref={nextButtonRef}
          className="events__button events__next"
          aria-label="Следующие события"
        >
          <ArrowSvg
            direction="left"
            width={10}
            height={10}
            color="rgba(56, 119, 238, 1)"
          />
        </button>
      </div>
    </div>
  );
};

export default EventsSlider;
