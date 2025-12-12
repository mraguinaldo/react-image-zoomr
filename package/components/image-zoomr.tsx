/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import type { IImageZoomer } from "./interface";

export function ImageZoomr({
  containerClass = "",
  imageClass = "",
  skeletonClass = "",
  enableZoom = true,
  initialZoom = 200,
  zoomStep = 25,
  minZoom = 150,
  maxZoom = 600,
  zoomSize = 400,

  width,
  height,
  maxWidth,
  maxHeight,
  borderRadius,
  objectFit,
  objectPosition,

  onMouseEnter,
  onMouseLeave,
  onLoad,
  onError,

  src,
  alt = "",
  zoomBoxStyle,
  ...imgProps
}: IImageZoomer) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const [zoomVisible, setZoomVisible] = useState(false);
  const [zoomLoaded, setZoomLoaded] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [backgroundPos, setBackgroundPos] = useState({ x: 50, y: 50 });
  const [currentZoom, setCurrentZoom] = useState(initialZoom);

  const imgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enableZoom || !zoomVisible) return;

    const blockScroll = (e: WheelEvent) => e.preventDefault();
    document.addEventListener("wheel", blockScroll, { passive: false });

    return () => {
      document.removeEventListener("wheel", blockScroll);
    };
  }, [zoomVisible, enableZoom]);

  useEffect(() => {
    if (!zoomVisible || !enableZoom) return;

    const img = new window.Image();
    img.src = src ?? "";
    img.onload = () => setZoomLoaded(true);
  }, [zoomVisible, src, enableZoom]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgContainerRef.current || !enableZoom) return;
    const rect = imgContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    setZoomPos({ x, y });
    setBackgroundPos({ x: xPercent, y: yPercent });
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!zoomVisible || !enableZoom) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -zoomStep : zoomStep;
    setCurrentZoom((prev: any) => {
      const newZoom = prev + delta;
      return Math.max(minZoom, Math.min(maxZoom, newZoom));
    });
  };

  const handleEnter = () => {
    if (enableZoom) setZoomVisible(true);
    onMouseEnter?.(undefined as any);
  };

  const handleLeave = () => {
    setZoomVisible(false);
    setZoomLoaded(false);
    setCurrentZoom(initialZoom);
    onMouseLeave?.(undefined as any);
  };

  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setLoaded(true);
    onLoad?.(event);
  };

  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setError(true);
    setLoaded(false);
    onError?.(event);
  };

  if (!src || src.trim().length === 0) return null;

  return (
    <div
      className={`image-container ${containerClass}`}
      ref={imgContainerRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onMouseMove={enableZoom ? handleMouseMove : undefined}
      onWheel={enableZoom ? handleWheel : undefined}
      style={{
        width,
        height,
        maxWidth,
        maxHeight,
        borderRadius,
      }}
    >
      {(!loaded || error) && <div className={`skeleton ${skeletonClass}`} />}
      {!error && (
        <img
          src={src}
          alt={alt}
          {...imgProps}
          className={`image ${loaded ? "loaded" : "loading"} ${imageClass}`}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            objectFit,
            objectPosition,
            borderRadius,
          }}
        />
      )}
      {enableZoom && zoomVisible && loaded && !error && (
        <>
          {!zoomLoaded && (
            <div
              className="zoom-loading"
              style={{
                left: zoomPos.x - 16,
                top: zoomPos.y - 16,
              }}
            />
          )}
          {zoomLoaded && (
            <div
              className="zoom-box"
              style={{
                width: zoomSize,
                height: zoomSize,
                left: zoomPos.x - zoomSize / 2,
                top: zoomPos.y - zoomSize / 2,
                backgroundImage: `url(${src})`,
                backgroundPosition: `${backgroundPos.x}% ${backgroundPos.y}%`,
                backgroundSize: `${currentZoom}%`,
                borderRadius,
                ...zoomBoxStyle,
              }}
            />
          )}
        </>
      )}
    </div>
  );
}
