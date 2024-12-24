import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import { SmoothHorizontalScrolling } from '~/utils';
import { useViewPort } from '../hook';
import { Link } from 'react-router-dom';

function StorysRow(props) {
    const { storys, title, isNetflix } = props;

    const sliderRef = useRef();
    const storyRef = useRef();
    const [dragDown, setDragDown] = useState(0);
    const [dragMove, setDragMove] = useState(0);
    const [isDrag, setIsDrag] = useState(false);
    const [windowWidth] = useViewPort();
    
    const handleScrollRight = () => {
        const maxScrollLeft = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
        if (sliderRef.current.scrollLeft < maxScrollLeft) {
            SmoothHorizontalScrolling(
                sliderRef.current,
                250,
                storyRef.current.clientWidth * 2,
                sliderRef.current.scrollLeft,
            );
        }
    };

    const handleScrollLeft = () => {
        if (sliderRef.current.scrollLeft > 0) {
            SmoothHorizontalScrolling(
                sliderRef.current,
                250,
                -storyRef.current.clientWidth * 2,
                sliderRef.current.scrollLeft,
            );
        }
    };

    useEffect(() => {
        if (isDrag) {
            if (dragMove < dragDown) handleScrollRight();
            if (dragMove > dragDown) handleScrollLeft();
        }
    }, [dragDown, dragMove, isDrag]);

    const onDragStart = (e) => {
        setIsDrag(true);
        setDragDown(e.screenX);
    };

    const onDragEnd = () => {
        setIsDrag(false);
    };

    const onDragEnter = (e) => {
        setDragMove(e.screenX);
    };

    return (
        <StoryContainer draggable="false">
            <h1 className="heading">{title}</h1>
            <StoryList
                ref={sliderRef}
                draggable="true"
                onDragEnd={onDragEnd}
                onDragStart={onDragStart}
                onDragEnter={onDragEnter}
                style={
                    storys && storys.length > 0
                        ? {
                              gridTemplateColumns: `repeat(${storys.length},
                        ${
                            windowWidth > 1200
                                ? '360px'
                                : windowWidth > 992
                                ? '300px'
                                : windowWidth > 768
                                ? '250px'
                                : '200px'
                        }
                    )`,
                          }
                        : {}
                }
            >
                {storys &&
                    storys.map((story, index) => (
                        <Link key={index} to={`/novel/detail/${story._id}`}>
                            <div ref={storyRef} draggable="false" className="storyItem">
                                <img src={story.poster_img} alt="" draggable="false" />
                                <div className="nameStory">{story.name}</div>
                            </div>
                        </Link>
                    ))}
            </StoryList>
            <div className={`btnLeft ${isNetflix && 'isNetflix'}`} onClick={handleScrollLeft}>
                <FaChevronLeft />
            </div>
            <div className={`btnRight ${isNetflix && 'isNetflix'}`} onClick={handleScrollRight}>
                <FaChevronRight />
            </div>
        </StoryContainer>
    );
}

export default StorysRow;

const StoryContainer = styled.div`
    background-color: var(--color-background);
    color: var(--color-white);
    padding: 20px 20px 0;
    position: relative;
    height: 100%;
    width: 100%;

    .heading {
        font-size: 18px;
        user-select: none;
        color: white;
    }
    .btnLeft {
        position: absolute;
        top: 50%;
        left: 30px;
        z-index: 20;
        transform-origin: center;
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.5);
        height: 70px;
        width: 50px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translateY(-20%);

        &:hover {
            background-color: rgba(0, 0, 0, 0.8);
        }

        &:hover sgv {
            opacity: 1;
            transform: scale(1.2);
        }
        sgv {
            opacity: 0.7;
            font-size: 50px;
            transition: all 0.3s linear;
        }
        &.isNetflix {
            height: 100px;
            width: 50px;
        }
    }
    .btnRight {
        position: absolute;
        top: 50%;
        right: 30px;
        z-index: 20;
        transform-origin: center;
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.5);
        height: 70px;
        width: 50px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translateY(-20%);

        &:hover {
            background-color: rgba(0, 0, 0, 0.8);
        }

        &:hover sgv {
            opacity: 1;
            transform: scale(1.2);
        }
        sgv {
            opacity: 0.7;
            font-size: 50px;
            transition: all 0.3s linear;
        }
    }
`;

const StoryList = styled.div`
    display: grid;
    gap: 6px;

    transition: all 0.3s linear;
    user-select: none;
    overflow-y: hidden;
    overflow-x: hidden;
    padding-top: 28px;
    padding-bottom: 28px;
    scroll-behavior: smooth;

    &:hover .storyItem {
        opacity: 0.5;
    }
    .storyItem {
        transform: scale(1);
        max-width: 400px;
        max-height: 400px;
        width: 300px;
        height: 400px;
        transition: all 0.3s linear;
        user-select: none;
        overflow: hidden;
        border-radius: 6px;
        transform: center left;
        position: relative;

        &:hover {
            opacity: 1;
            transform: scale(1.1);
            z-index: 10;
        }
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .nameStory {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 4px;
            text-align: center;
            font-size: 14px;
            color: var(--color-white);
            background-color: rgba(0, 0, 0, 0.65);
        }
    }
`;