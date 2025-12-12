import type { ImgHTMLAttributes } from "react";

export interface IImageZoomer extends ImgHTMLAttributes<HTMLImageElement> {
  containerClass?: string;
  imageClass?: string;
  skeletonClass?: string;

  width?: number | string;
  height?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  borderRadius?: number | string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  objectPosition?: string;

  enableZoom?: boolean;
  initialZoom?: number;
  zoomStep?: number;
  minZoom?: number;
  maxZoom?: number;
  zoomSize?: number;
}
