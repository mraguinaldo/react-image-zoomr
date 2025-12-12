# @mraguinaldo/react-image-zoomr

Uma biblioteca React (TypeScript + CSS puro) focada em duas necessidades principais:

1. **Evitar que o texto do atributo `alt` apareça na tela quando a imagem falha ao carregar**, exibindo em vez disso um _skeleton loader_.
2. **Fornecer um zoom avançado e suave**, permitindo examinar detalhes da imagem.

## O que este componente oferece

- Skeleton automático enquanto a imagem carrega
- Oculta o `alt` visual quando ocorre erro
- Zoom inteligente ao passar o mouse (opcional)
- Controle total sobre níveis de zoom, posição, tamanho e comportamento
- Aceita **todas as propriedades padrão de `<img />`**
- Aceita **propriedades extras**, como:
  - `width`, `height`, `borderRadius`
  - `objectFit`, `objectPosition`
  - controle de zoom (`initialZoom`, `zoomStep`, etc.)
- 100% escrito em TypeScript
- CSS puro (leve, sem dependências externas)

## Instalação

```
npm i @mraguinaldo/react-image-zoomr
```

## Uso

```
import "@mraguinaldo/react-image-zoomr/dist/index.css";
import { ImageZoomr } from "@mraguinaldo/react-image-zoomr";

function App() {
  return (
  <>
    <ImageZoomr
      src="/example.jpg"
      alt="Exemplo"
      width={500}
      height={500}
      borderRadius={16}
      objectFit="cover"
      objectPosition="center"
      initialZoom={150}
      zoomStep={25}
      minZoom={100}
      maxZoom={500}
      zoomSize={300}
    />
  </>
  );
}

export default App;
```

## Personalização

- Você pode passar todas as props padrão de <img /> e props extras para controle avançado do zoom:

```
<ImageZoomr
  src="/example.jpg"
  alt="Exemplo"
  width={400}
  height={600}
  borderRadius={12}
  objectFit="contain"
  objectPosition="top"
  initialZoom={200}
  zoomStep={25}
  minZoom={150}
  maxZoom={600}
  zoomSize={400}
/>

```
