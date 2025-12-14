"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer, useRef, useEffect } from "react";
import "./image-zoomr.css";
import type { IImageZoomer } from "./interface";
import { initialState } from "./initial-state";
import { zoomReducer } from "./zoomr-reducer";

export const ImageZoomr = ({
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
}: IImageZoomer) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [state, dispatch] = useReducer(zoomReducer, initialState(initialZoom));

  useEffect(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) {
        dispatch({ type: "SET_READY", payload: true });
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    dispatch({ type: "RESET", payload: { initialZoom } });
  }, [src, initialZoom]);

  useEffect(() => {
    if (!enableZoom || !state.zoomVisible || !containerRef.current) return;

    const el = containerRef.current;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -zoomStep : zoomStep;

      dispatch({
        type: "SET_CURRENT_ZOOM",
        payload: Math.max(
          minZoom,
          Math.min(maxZoom, state.currentZoom + delta)
        ),
      });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [
    enableZoom,
    state.zoomVisible,
    state.currentZoom,
    zoomStep,
    minZoom,
    maxZoom,
  ]);

  useEffect(() => {
    if (!enableZoom || !state.zoomVisible || !src) return;
    let cancelled = false;
    const img = new Image();
    img.src = src;
    img.onload = () => {
      if (!cancelled) dispatch({ type: "SET_ZOOM_LOADED", payload: true });
    };
    return () => {
      cancelled = true;
    };
  }, [enableZoom, state.zoomVisible, src]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !enableZoom) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    dispatch({ type: "SET_ZOOM_POS", payload: { x, y } });
    dispatch({
      type: "SET_BACKGROUND_POS",
      payload: { x: (x / rect.width) * 100, y: (y / rect.height) * 100 },
    });
  };

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    dispatch({ type: "SET_LOADED", payload: true });
    dispatch({ type: "SET_ERROR", payload: false });
    onLoad?.(e);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    dispatch({ type: "SET_LOADED", payload: false });
    dispatch({ type: "SET_ERROR", payload: true });
    onError?.(e);
  };

  return (
    <div
      ref={containerRef}
      className={`image-container ${containerClass}`}
      onMouseEnter={(e) => {
        if (enableZoom) dispatch({ type: "SET_ZOOM_VISIBLE", payload: true });
        onMouseEnter?.(e as any);
      }}
      onMouseLeave={(e) => {
        dispatch({ type: "SET_ZOOM_VISIBLE", payload: false });
        dispatch({ type: "SET_ZOOM_LOADED", payload: false });
        dispatch({ type: "SET_CURRENT_ZOOM", payload: initialZoom });
        onMouseLeave?.(e as any);
      }}
      onMouseMove={enableZoom ? handleMove : undefined}
      style={{ width, height, maxWidth, maxHeight, borderRadius }}
    >
      {(!state.ready || !state.loaded || state.error) && (
        <div className={`skeleton ${skeletonClass}`} />
      )}

      {state.ready && src && !state.error && (
        <img
          src={src}
          alt={alt}
          {...imgProps}
          className={`image ${
            state.loaded ? "loaded" : "loading"
          } ${imageClass}`}
          onLoad={handleLoad}
          onError={handleError}
          style={{ objectFit, objectPosition, borderRadius }}
        />
      )}

      {enableZoom &&
        state.zoomVisible &&
        state.loaded &&
        state.zoomLoaded &&
        !state.error && (
          <div
            className="zoom-box"
            style={{
              width: zoomSize,
              height: zoomSize,
              left: state.zoomPos.x - zoomSize / 2,
              top: state.zoomPos.y - zoomSize / 2,
              backgroundImage: `url(${src})`,
              backgroundPosition: `${state.backgroundPos.x}% ${state.backgroundPos.y}%`,
              backgroundSize: `${state.currentZoom}%`,
              borderRadius,
              ...zoomBoxStyle,
            }}
          />
        )}
    </div>
  );
};
