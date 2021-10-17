import React from "react";

import "./Microscope.css";

const Microscope = ({ images = [], rotation = 0 }) => {
    const sectionDeg = 360 / images.length;
    const sectionPercent = (rotation / sectionDeg) % 1;

    const getRotationStyle = (rotationValue) => {
        return sectionDeg ? `rotate(${rotationValue}deg)` : "";
    };

    function getDegree(delta = 0) {
        let offset = 0;
        if (delta > 0) {
            offset = sectionDeg;
        } else if (delta < 0) {
            offset = sectionDeg * -1;
        }
        return sectionPercent * sectionDeg + offset;
    }

    // смена изображений каждые 5 градусов
    const index = Math.floor(rotation / sectionDeg);
    const prev = 0 === index ? images.length - 1 : index - 1;
    const next = images.length - 1 === index ? 0 : index + 1;

    const curRot = getRotationStyle(getDegree());
    const nextRot = getRotationStyle(getDegree(-1));
    const prevRot = getRotationStyle(getDegree(1)); // -5

    return (
        <div className="microscope">
            {images.map((image, i, all) => {
                // 5 градусов
                //const sectionDeg = 360 / all.length;

                // console.log(`rotation ${rotation}, index ${index} `);

                const isCurr = i === index;
                const isPrev = i === prev;
                const isNext = i === next;

                const getVisibility = () => {
                    return isCurr || isNext ? "visible" : "hidden";
                };

                // после 180гр отражение изображений относительно оси y
                const getScale = () => {
                    return i < all.length / 2
                        ? "rotateZ(0deg)"
                        : "rotateZ(180deg)";
                };

                const getTransform = () => {
                    let scale = getScale();
                    let rot = "";
                    if (isCurr) {
                        rot = curRot;
                    }
                    if (isPrev) {
                        rot = prevRot;
                    }
                    if (isNext) {
                        rot = nextRot;
                    }
                    return rot + " " + scale;
                };

                const getOpacity = () => {
                    if (isCurr) {
                        return 1;
                    }
                    if (sectionPercent === 0) {
                        if (!isCurr) {
                            return 0;
                        }
                    } else {
                        if (isNext) {
                            return sectionPercent;
                        }
                    }
                };

                const style = {
                    zIndex: 10 + i,
                    visibility: getVisibility(),
                    transform: getTransform(),
                    opacity: getOpacity(),
                };

                return (
                    <img
                        className={`img ${isCurr ? "yes" : ""}`}
                        style={{ ...style }}
                        src={image}
                        key={i}
                        alt=""
                    />
                );
            })}
        </div>
    );
};

export default Microscope;
