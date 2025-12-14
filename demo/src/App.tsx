import "./App.css";
import "@mraguinaldo/react-image-zoomr/dist/index.css";
import { ImageZoomr } from "@mraguinaldo/react-image-zoomr";

function App() {
  return (
    <>
      <ImageZoomr
        src="/test-image.jpg"
        alt="Foto"
        width={400}
        height={600}
        enableZoom={true}
        borderRadius={12}
        zoomSize={200}
        loading="lazy"
        zoomBoxStyle={{ border: 1, borderColor: "blue", borderStyle: "dashed" }}
      />
    </>
  );
}

export default App;
