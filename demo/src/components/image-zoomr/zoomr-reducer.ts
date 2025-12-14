import { ZoomAction } from "./actions";
import { ZoomState } from "./initial-state";

export const zoomReducer = (
  state: ZoomState,
  action: ZoomAction
): ZoomState => {
  switch (action.type) {
    case "SET_READY":
      return { ...state, ready: action.payload };
    case "SET_LOADED":
      return { ...state, loaded: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_ZOOM_VISIBLE":
      return { ...state, zoomVisible: action.payload };
    case "SET_ZOOM_LOADED":
      return { ...state, zoomLoaded: action.payload };
    case "SET_ZOOM_POS":
      return { ...state, zoomPos: action.payload };
    case "SET_BACKGROUND_POS":
      return { ...state, backgroundPos: action.payload };
    case "SET_CURRENT_ZOOM":
      return { ...state, currentZoom: action.payload };
    case "RESET":
      return {
        ready: false,
        loaded: false,
        error: false,
        zoomVisible: false,
        zoomLoaded: false,
        zoomPos: { x: 0, y: 0 },
        backgroundPos: { x: 50, y: 50 },
        currentZoom: action.payload.initialZoom,
      };
    default:
      return state;
  }
};
