<div align="center">
    <img src="header.png" alt="Layouter"/>
    <p></p>
    <div align="center">
        <strong>⚡️ Arma todo el layout de tu web sin CSS ⚡️</strong>
    </div>
</div>

# Layouter

Es una librería que nos permite armar todo el layout **de forma rápida y sencilla**, usando directivas sobre los nodos HTML. Principalmente funciona **basándonos en el uso de una grilla**, _especialmente para la definición de columnas_.

-   🚀 **Procesamiento super rápido y paralelo:** Procesa de forma automática todos los nodos que se encuentran al cargar la web y tambien cualquier nuevo nodo que se agregue o empiece a usar alguna directiva.
-   🎉 **Estilos compartidos:** Comparte los estilos yá creados de otros nodos previamente procesados.
-   ⚗️ **Pre procesamiento de nodos virtuales**: Pre procesar nodos virtuales antes de agregarlos al DOM.

## 🔧 Instalación

Solo hay que llamar, en el HTML, al script **layouter.umd.js** que se encuentra dentro de la carpeta **'dist'** de este repositorio:

```html
<script src="layouter.umd.js"></script>
```

**Y listo!**, eso es todo lo que necesitamos para usar el **layouter** con su configuración base.

## ✨ Ejemplo de uso

Digamos que queremos definir el siguiente layout:

> _teniendo en cuenta que necesitamos definir margenes, altura, ancho por columnas, etc, y cada uno en sus respectivos breakpoints_

<p align="center">
  <a href="#">
    <img src="layout-responsive.png" alt="Layouter Logo"/>
    <br>
    Link de esta demo ⚓
  </a>
</p>

Entonces haríamos este HTML con las siguientes directivas:

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

<details>
<summary>Veamos que a pasado</summary>

-   para la etiqueta **`<main>`** se determinó el siguiente layout:

    -   Un padding superior e inferior de 24 pixeles en su breakpoint inicial (es decir en mobile), tambien un padding derecho e izquierdo de 1 columna, relativa a las 15 columnas definidas para ese breakpoint.
    -   Al llegar al breakpoint de **sm** se mantendrá el padding superior e inferior de 24 píxeles pero se determina que se requiere 1 columna de 25 columnas para ese breakpoint.
    -   Luego, para el breakpoint de **md** se cambia el padding superior e inferior a 30 píxeles y luego se determina que el padding derecho e izquierdo será de 1 columna de 31 columnas para ese breakpoint.
    -   Finalmente para el breakpoint de **lg** se determinó que el padding superior e inferior sería de 29.26 píxeles y para el padding derecho e izquierdo se tomará 1 columna de 41 columnas de ese breakpoint.
    -   Por otra parte tambien se determinó que su ancho máximo sería de 1280 píxeles.
    -   Así como tambien tendrá un margen superior e inferior de 0 y derecho e izquierdo en 'auto'.

-   para la etiqueta **`<header>`** se determinadó el siguiente layout:

    -   Display **'flex'** con 'justify-content' en 'space-between' a partir del breakpoint de **md** es decir a tablet en landscape.
    -   Margen inferior de 24 pixeles en el breakpoint inicial y 30 píxeles a partir del breakpoint de **md**.
    -   Para sus dos **divs** hijos se determinó una altura de 100 píxeles.
    -   Para el primero **div** 11.1 columnas de 29 columnas a partir del breakpoint **md** y solo 24 píxeles de margen inferior hasta el breakpoint de **md**.
    -   Para el segundo **div** hijo se determinó 16.9 columnas de 29 columnas a partir del breakpoint **md**.

-   para la etiqueta **`<section>`** se determinó el siguiente layout:

    -   Una altura de 320 pixeles.
    -   Un margen inferior de 24 pixeles para su breakpoint inicial, 25 pixeles para el breakpoint de **sm** y finalmente 30 pixeles para el breakpoint de **md**.

-   para la etiqueta **`<footer>`** se determinó el siguiente layout:

    -   Un display **'flex'** con 'justify-content' de 'space-between'.
    -   Para sus **divs** hijos se determinó una altura de 200 píxeles y un ancho de 7 columnas de 23 columnas para el breakpoint de **sm**, seguido de 9 columnas de 29 columnas para el breakpoint de **md** y finalmente 12.33 columnas de 39 columnas para el breakpoint de **lg**

</details>

> Cada vez que se agregue un nuevo nodo al body o alguno yá existente use una directiva de layouter, automáticamente se procesará.

## ⚙️ Configuración

Por defecto la librería funcionará con la siguiente **configuración base**:

```javascript
{
    breakpoints: {
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
        },
        xlg: {
            width: 1536,
            cols: 51
        }
    },
    debug: true,
    bridge: false,
    prefix: '',
    ready: () => {
        // initial process completed!
    }
}
```

Uno puede escribir su propia configuración creando una variable llamada **'layouterConfig' en el objeto 'window'.** Ésta tiene que estar antes de la llamada a la librería. Para saber más revisa la [tabla de opciones de configuración](DOCS.md)

## ⚡ Directivas

| Nombre                         | Ejemplo                    | Descripción                                                                                                        |
| ------------------------------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| [Cols](DOCS.md#cols)           | `cols="13/15"`             | Determinará las columnas, osea el 'width' de manera porcentual.                                                    |
| [Mart](DOCS.md#mart)           | `mart="10"`                | Determina el **margen** superior de un nodo.                                                                       |
| [Marr](DOCS.md#marr-marb-marl) | `marr="2/15"`              | Determinar el **margen** derecho de un nodo.                                                                       |
| [Marb](DOCS.md#marr-marb-marl) | `marb="30"`                | Determinar el **margen** inferior de un nodo.                                                                      |
| [Marl](DOCS.md#marr-marb-marl) | `marl="3/15"`              | Determinar el **margen** izquierdo de un nodo.                                                                     |
| [Mar](DOCS.md#mar)             | `mar="20-2/15-30-3/15"`    | Es un shorthand de las directivas: [mart, marr, marb, y marl](DOCS.md#mart-marr-marb-marl).                        |
| [Padt](DOCS.md#padt)           | `padt="10"`                | Determina el **padding** superior de un nodo.                                                                      |
| [Padr](DOCS.md#padr-padb-padl) | `padr="2/15"`              | Determinar el **padding** derecho de un nodo.                                                                      |
| [Padb](DOCS.md#padr-padb-padl) | `padb="30"`                | Determinar el **padding** inferior de un nodo.                                                                     |
| [Padl](DOCS.md#padr-padb-padl) | `padl="3/15"`              | Determinar el **padding** izquierdo de un nodo.                                                                    |
| [Pad](DOCS.md#pad)             | `pad="20-2/15-30-3/15"`    | Es un shorthand de las directivas: [padt, padr, padb, y padl](DOCS.md#mart,-marr,-marb,-marl).                     |
| [Flex](DOCS.md#flex)           | `flex="jc:ce ai:fs fd:co"` | Determina el **display flex** del nodo y sus derivados.                                                            |
| [Wdh](DOCS.md#width)           | `wdh="100"`                | Determina el **ancho** del nodo en pixeles u otra [unidad de medida](DOCS.md#unidades-de-medida-definidas).        |
| [Hgt](DOCS.md#height)          | `hgt="100"`                | Determina el **alto** del nodo en pixeles u otra [unidad de medida](DOCS.md#unidades-de-medida-definidas).         |
| [Mxw](DOCS.md#maxwidth)        | `mxw="200"`                | Determina el **máximo ancho** del nodo en píxeles u otra [unidad de medida](DOCS.md#unidades-de-medida-definidas). |
| [Mxh](DOCS.md#maxheight)       | `mxh="200"`                | Determina el **máximo alto** del nodo en píxeles u otra [unidad de medida](DOCS.md#unidades-de-medida-definidas).  |
| [Miw](DOCS.md#minwidth)        | `miw="300"`                | Determina el **mínimo ancho** del nodo en píxeles u otra [unidad de medida](DOCS.md#unidades-de-medida-definidas). |
| [Mih](DOCS.md#minheight)       | `mih="300"`                | Determina el **mínimo alto** del nodo en píxeles u otra [unidad de medida](DOCS.md#unidades-de-medida-definidas).  |

## 🌐 Websites que usan layouter

-   Interbank - [interbank.pe](https://interbank.pe)
-   Can I Browse - [canibrowse.net](https://canibrowse.net)

## 📚 ¿Dónde obtener ayuda?

Hay una extensa documentación en el archivo [DOCS.md](DOCS.md).

## 📝 Trabajo planeado

1. Adicionar una directiva para el posicionamiento. **En progreso...** 🏗️
2. Adicionar alias más semánticos para las directivas. (Ejm: de **'mar'** a **'margin'** o solo **'m'**)
3. Crear componente para [React JS](https://reactjs.org)
4. Crear componente para [Vue JS](https://vuejs.org)
5. Crear componente para [Svelte JS](https://svelte.dev)

## 🧾 Licencia

El código y la documentación se publican bajo la [Licencia MIT](LICENSE).
