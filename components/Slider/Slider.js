"use client"
import React, { useEffect, useRef } from 'react';
import './style.css';

const Slider = () => {
    const slideContainerRef = useRef(null);
    const slideRef = useRef(null);
    const nextBtnRef = useRef(null);
    const prevBtnRef = useRef(null);
    const interval = 5000;
    const slidesRef = useRef([]);
    let index, slideId, slideWidth;

    useEffect(() => {
        const slideContainer = slideContainerRef.current;
        const slide = slideRef.current;
        const nextBtn = nextBtnRef.current;
        const prevBtn = prevBtnRef.current;

        if (!slideContainer || !slide || !nextBtn || !prevBtn) {
            // Elements are not yet available, exit early
            return;
        }

        const slides = slide.querySelectorAll(`.slide`);
        slidesRef.current = Array.from(slides);
        index = 1;

        const firstClone = slidesRef.current[0].cloneNode(true);
        const lastClone = slidesRef.current[slidesRef.current.length - 1].cloneNode(true);

        firstClone.id = 'first-clone';
        lastClone.id = 'last-clone';

        slide.appendChild(firstClone);
        slide.prepend(lastClone);

        slideWidth = slidesRef.current[index].clientWidth;

        slide.style.transform = `translateX(${-slideWidth * index}px)`;

        const startSlide = () => {
            slideId = setInterval(() => {
                moveToNextSlide();
            }, interval);
        };

        slide.addEventListener('transitionend', () => {
            if (slidesRef.current[index].id === 'first-clone') {
                slide.style.transition = 'none';
                index = 1;
                slide.style.transform = `translateX(${-slideWidth * index}px)`;
            }

            if (slidesRef.current[index].id === 'last-clone') {
                slide.style.transition = 'none';
                index = slidesRef.current.length - 2;
                slide.style.transform = `translateX(${-slideWidth * index}px)`;
            }
        });

        const moveToNextSlide = () => {
            if (index >= slidesRef.current.length - 1) return;
            index++;
            slide.style.transition = '.7s ease-out';
            slide.style.transform = `translateX(${-slideWidth * index}px)`;
        };

        const moveToPreviousSlide = () => {
            if (index <= 0) return;
            index--;
            slide.style.transition = '.7s ease-out';
            slide.style.transform = `translateX(${-slideWidth * index}px)`;
        };

        slideContainer.addEventListener('mouseenter', () => {
            clearInterval(slideId);
        });

        slideContainer.addEventListener('mouseleave', startSlide);
        nextBtn.addEventListener('click', moveToNextSlide);
        prevBtn.addEventListener('click', moveToPreviousSlide);

        startSlide();

        return () => {
            slideContainer.removeEventListener('mouseenter', () => {
                clearInterval(slideId);
            });
            slideContainer.removeEventListener('mouseleave', startSlide);
            nextBtn.removeEventListener('click', moveToNextSlide);
            prevBtn.removeEventListener('click', moveToPreviousSlide);
        };
    }, []);

    return (
        <div className="container" ref={slideContainerRef}>

            <div className="slides" ref={slideRef}>
                <div className="slide">
                    <img src="/slide-1.png" alt="" />
                </div>
                <div className="slide">
                    <img src="/slide-2.png" alt="" />
                </div>
                <div className="slide">
                    <img src="/slide-3.png" alt="" />
                </div>
                <div className="slide">
                    <img src="/slide-4.png" alt="" />
                </div>
                <div className="slide">
                    <img src="/slide-1.png" alt="" />
                </div>
                <div className="slide">
                    <img src="/slide-2.png" alt="" />
                </div>
                <div className="slide">
                    <img src="/slide-3.png" alt="" />
                </div>
                <div className="slide">
                    <img src="/slide-4.png" alt="" />
                </div>
                <div className="slide">
                    <img src="/slide-1.png" alt="" />
                </div>
                <div className="slide">
                    <img src="/slide-2.png" alt="" />
                </div>
                <div className="slide">
                    <img src="/slide-3.png" alt="" />
                </div>
                <div className="slide">
                    <img src="/slide-4.png" alt="" />
                </div>
            </div>
            <div className="slideControls">
                <button id="prev-btn" ref={prevBtnRef}>
                </button>
                <button id="next-btn" ref={nextBtnRef}>
                </button>
            </div>
        </div>
    );
};

export default Slider;
