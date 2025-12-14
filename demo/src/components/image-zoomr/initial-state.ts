export interface ZoomState {
  ready: boolean;
  loaded: boolean;
  error: boolean;
  zoomVisible: boolean;
  zoomLoaded: boolean;
  zoomPos: { x: number; y: number };
  backgroundPos: { x: number; y: number };
  currentZoom: number;
}

export const initialState = (initialZoom: number): ZoomState => ({
  ready: false,
  loaded: false,
  error: false,
  zoomVisible: false,
  zoomLoaded: false,
  zoomPos: { x: 0, y: 0 },
  backgroundPos: { x: 50, y: 50 },
  currentZoom: initialZoom,
});
