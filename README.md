<h1 align="center">Layouter - Crea todo el layout sin una linea de CSS</h1>

<p align="center">
  <img src="logo.png" alt="Layouter Logo" width="100px" height="87px"/>
</p>

<p align="center">
  <a href="https://www.layouter.io"><strong>www.layouter.io</strong></a>
  <br>
</p>

## Descripción
Es una librería que nos permite armar el layout de una web de forma muy sencilla y rápida, **basándonos en el uso de grillas**, estos estilos se crean al vuelo ('on the fly'). Puedes definir las columnas, los paddings, los margenes y hasta si un elemento tendrá display 'flex' y sus derivados.

Esto se hace **a través de atributos en las etiquetas HTML**, aunque tambien se pueden procesar directamente sin depender de una etiqueta.

## Instalación
Solo hay que llamar al script 'layouter.cjs.production.min.js' que se encuentra dentro de la carpeta 'dist' de este repositorio. De preferencia agregarlo antes del cierre del `<body>`, ejemplo:

```html
<html>
    <head>
    <title>Mi Página Web</title>
    </head>
    <body>
    <span>Hola mundo XD</span>
    <script src="layouter.cjs.production.minjs"></script>
    </body>
</html>
```

**Y listo!** eso es todo empezar con el layouter con su **configuración inicial**.

## Configuración por defecto
Internamente se tiene unos **breakpoints definidos** que uno puede usar si así lo quiere y son los siguientes:

```javascript
const breakpoints = {
    xs: {
        width: 360,
        cols: 15
    },
    sm: {
        width: 600,
        cols: 25
    },
    md: {
        width: 900,
        cols: 31
    },
    lg: {
        width: 1200,
        cols: 41
    }
}

```

## Ejemplo de uso
Digamos que queremos definir el siguiente layout teniendo en cuenta que necesitamos definir margenes, altura, ancho por columnas, etc, y cada uno en sus respectivos breakpoints comunes **(xs, sm, md, lg)**

<p align="center">
  <img src="layout-responsive.png" alt="Layouter Logo"/>
</p>

Entonces haríamos este HTML con las siguientes directivas de layouter:

```html
<main pad="24-1/15 24-1/25@sm 30-1/31@md 29.26-1/41@lg" mxw="1280" mar="0-auto">

    <header flex="jc:sb@md" marb="24 30@md">
      <div hgt="100" cols="11.1/29@md" marb="24@-md"></div>
      <div hgt="100" cols="16.9/29@md"></div>
    </header>

    <section hgt="320" marb="24 25@sm 30@md"></section>

    <footer flex="jc:sb@sm">
      <div hgt="200" cols="7/23@sm 9/29@md 12.33/39@lg"></div>
      <div hgt="200" cols="7/23@sm 9/29@md 12.33/39@lg" mar="24-0@-sm"></div>
      <div hgt="200" cols="7/23@sm 9/29@md 12.33/39@lg"></div>
    </footer>

</main>
```
Veamos que a pasado luego del procesamiento:

- para la etiqueta **`<main>`** se determinó el siguiente layout:

    - Un padding superior e inferior de 24 pixeles en su breakpoint inicial, es decir en mobile, tambien un padding derecho e izquierdo de 1 columna, relativa a las 15 columnas definidas para ese breakpoint.
    - Al llegar al breakpoint de **sm** se mantendrá el padding superior e inferior de 24 píxeles pero se determina que se requiere 1 columna de 25 columnas para ese breakpoint.
    - Luego, para el breakpoint de **md** se cambia el padding superior e inferior a 30 píxeles para tambien determinar que el padding derecho e izquierdo será de 1 columna de 31 para ese breakpoint.
    - Finalmente para el breakpoint de **lg** se determinó que el padding superior e inferior sería de 29.26 píxeles y para el padding derecho e izquierdo se tomará 1 columna de 41 columnas de ese breakpoint.

- para la etiqueta **`<header>`** sedeterminadó el siguiente layout:

    - Display **'flex'** con 'justify-content' en 'space-between' para cuando se llegue al breakpoint de **md** es decir a tablet en landscape.
    - Margenn inferior de 24 pixeles en el breakpoint inicial y 30 píxeles al llegar al breakpoint de **md**.

- para la etiqueta **`<section>`** se determinó el siguiente layout

    - Una altura de 320 pixeles.
    - Un margen inferior de 24 pixeles para su breakpoint inicial, 25 pixeles para el breakpoint de **sm** y finalmente 30 pixeles para el breakpoint de **md**.

- para la etiqueta **`<footer>`** se determinó el siguiente layout:

    - Un display **'flex'** con 'justify-content' de 'space-between'
    - Para sus **divs** hijos se determinó una altura de 200 píxeles y un ancho de 7 columnas de 23 columnas para el breakpoint de **sm**, seguido de 9 columnas de 29 columnas para el breakpoint de **md** y finalmente 12.33 columnas de 39 columnas para el breakpoint de **lg**

> Las demás directivas de layouter definidas que no se an descrito arriba se verán más adelante.
