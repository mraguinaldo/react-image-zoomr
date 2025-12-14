export type ZoomAction =
  | { type: "SET_READY"; payload: boolean }
  | { type: "SET_LOADED"; payload: boolean }
  | { type: "SET_ERROR"; payload: boolean }
  | { type: "SET_ZOOM_VISIBLE"; payload: boolean }
  | { type: "SET_ZOOM_LOADED"; payload: boolean }
  | { type: "SET_ZOOM_POS"; payload: { x: number; y: number } }
  | { type: "SET_BACKGROUND_POS"; payload: { x: number; y: number } }
  | { type: "SET_CURRENT_ZOOM"; payload: number }
  | { type: "RESET"; payload: { initialZoom: number } };
