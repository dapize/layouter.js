<div align="center">
    <p>
        <img src="header.png" alt="Layouter"/>
    </p>
    <p>
        <strong>⚡️ Arma todo el layout de tu web sin CSS ⚡️</strong>
    </p>
     <p>
        <a href="README.md"><img src="en_US.png" alt="English Language"/> English</a> — <a href="README-es_ES.md"><img src="es_ES.png" alt="English Language"/> Spanish</a>
    </p>
</div>

# Layouter

[![CI](https://github.com/dapize/layouter.js/workflows/CI/badge.svg)](https://github.com/dapize/layouter.js/actions?query=workflow:"CI")
[![npm version](https://img.shields.io/npm/v/layouter.js.svg)](https://www.npmjs.org/package/layouter.js)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Coverage Status](https://coveralls.io/repos/github/dapize/layouter.js/badge.svg?branch=master)](https://coveralls.io/github/dapize/layouter.js?branch=master)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/layouter.js)
![types included](https://badgen.net/npm/types/layouter.js)
[![Known Vulnerabilities](https://snyk.io/test/npm/layouter.js/badge.svg)](https://snyk.io/test/npm/layouter.js)

Es una librería que nos permite armar todo el layout **de forma rápida y sencilla**, usando directivas sobre los nodos HTML. Principalmente funciona **basándonos en el uso de una grilla**, _especialmente para la definición de columnas_.

- 🚀 **Super rápido y paralelo:** Procesa de forma automática todos los nodos que se encuentran al cargar la web y también cualquier nuevo nodo que se agregue o empiece a usar alguna directiva.
- 🎉 **Estilos compartidos:** Comparte los estilos yá creados de otros nodos previamente procesados.
- ⚗️ **Pre procesamiento de nodos virtuales**: Pre procesa nodos virtuales antes de agregarlos al DOM.

## 🔧 Instalación

Solo hay que llamar, en el HTML, al script **layouter.umd.js** que se encuentra dentro de la carpeta **'dist'** de este repositorio:

```html
<script src="layouter.umd.js"></script>
```

**también** puedes usar **uno** de estos CDNs:

```html
<script
    src="https://cdn.jsdelivr.net/npm/layouter.js/dist/layouter.umd.js"
    defer
></script>
<script src="https://unpkg.com/layouter.js/dist/layouter.umd.js" defer></script>
```

**Y listo!**, eso es todo lo que necesitamos para usar el **layouter** con su configuración base.

## ✨ Ejemplo de uso

Digamos que queremos definir el siguiente layout:

> _teniendo en cuenta que necesitamos definir márgenes, altura, ancho por columnas, etc, y cada uno en sus respectivos breakpoints_

<p align="center">
    <img src="layout-responsive.png" alt="Layouter Logo"/>
    <br>
    <b><a href="https://dapize.github.io/layouter.js/">⚓ LINK DEMO ⚓</a></b>
</p>

Entonces haríamos este HTML con las siguientes directivas:

```html
<main p="24-1/15 24-1/25@sm 30-1/31@md 29.26-1/41@lg" mxw="1280" mx="auto">
    <header fx="jc:sb@md" mb="24 30@md">
        <div h="100" c="11.1/29@md" mb="24@-md"></div>
        <div h="100" c="16.9/29@md"></div>
    </header>

    <section h="320" mb="24 25@sm 30@md"></section>

    <footer fx="jc:sb@sm">
        <div h="200" c="7/23@sm 9/29@md 12.33/39@lg"></div>
        <div h="200" c="7/23@sm 9/29@md 12.33/39@lg" my="24@-sm"></div>
        <div h="200" c="7/23@sm 9/29@md 12.33/39@lg"></div>
    </footer>
</main>
```

<details>
<summary>Veamos que a pasado</summary>

- para la etiqueta **`<main>`** se determinó el siguiente layout:
    - Un padding superior e inferior de 24 píxeles en su breakpoint inicial (es decir en mobile), también un padding derecho e izquierdo de 1 columna, relativa a las 15 columnas definidas para ese breakpoint.
    - Al llegar al breakpoint de **sm** se mantendrá el padding superior e inferior de 24 píxeles pero se determina que se requiere 1 columna de 25 columnas para ese breakpoint.
    - Luego, para el breakpoint de **md** se cambia el padding superior e inferior a 30 píxeles y luego se determina que el padding derecho e izquierdo será de 1 columna de 31 columnas para ese breakpoint.
    - Finalmente para el breakpoint de **lg** se determinó que el padding superior e inferior sería de 29.26 píxeles y para el padding derecho e izquierdo se tomará 1 columna de 41 columnas de ese breakpoint.
    - Por otra parte también se determinó que su ancho máximo sería de 1280 píxeles.
    - Así como también tendrá un margen superior e inferior de 0 y derecho e izquierdo en 'auto'.

- para la etiqueta **`<header>`** se determinadó el siguiente layout:
    - Display **'flex'** con 'justify-content' en 'space-between' a partir del breakpoint de **md** es decir a tablet en landscape.
    - Margen inferior de 24 píxeles en el breakpoint inicial y 30 píxeles a partir del breakpoint de **md**.
    - Para sus dos **divs** hijos se determinó una altura de 100 píxeles.
    - Para el primero **div** 11.1 columnas de 29 columnas a partir del breakpoint **md** y solo 24 píxeles de margen inferior hasta el breakpoint de **md**.
    - Para el segundo **div** hijo se determinó 16.9 columnas de 29 columnas a partir del breakpoint **md**.

- para la etiqueta **`<section>`** se determinó el siguiente layout:
    - Una altura de 320 píxeles.
    - Un margen inferior de 24 píxeles para su breakpoint inicial, 25 píxeles para el breakpoint de **sm** y finalmente 30 píxeles para el breakpoint de **md**.

- para la etiqueta **`<footer>`** se determinó el siguiente layout:
    - Un display **'flex'** con 'justify-content' de 'space-between'.
    - Para sus **divs** hijos se determinó una altura de 200 píxeles y un ancho de 7 columnas de 23 columnas para el breakpoint de **sm**, seguido de 9 columnas de 29 columnas para el breakpoint de **md** y finalmente 12.33 columnas de 39 columnas para el breakpoint de **lg**

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

Uno puede escribir su propia configuración creando una variable llamada **'layouterConfig' en el objeto 'window'.** Ésta tiene que estar antes de la llamada a la librería. Para saber más revisa la [tabla de opciones de configuración](DOCS-es_ES.md)

## ⚡ Directivas

| Nombre                             | Alias                  | Ejemplos                                                                                  | Descripción                                                                                                        |
| ---------------------------------- | ---------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| [Cols](DOCS.md#cols)               | `c`                    | `cols="13/15"`, `c="5/10"`                                                                | Determina las columnas, osea el 'width' de manera porcentual.                                                      |
| [d](DOCS.md#display)               | `display`              | `d="bl"`, `display="inline"`                                                              | Determina el **display** que tendrá el nodo.                                                                       |
| [Mart](DOCS.md#mart)               | `mt`, `margin-top`     | `mart="10"`, `mt="20"`, `margin-top="12"`                                                 | Determina el **margen superior** de un nodo.                                                                       |
| [Marr](DOCS.md#marr-marb-marl)     | `mr`, `margin-right`   | `marr="2/15"`, `mr="5/10"`, `margin-right="3/5"`                                          | Determinar el **margen derecho** de un nodo.                                                                       |
| [Marb](DOCS.md#marr-marb-marl)     | `mb`, `margin-bottom`  | `marb="30"`, `mb="50"`, `margin-bottom="25"`                                              | Determinar el **margen inferior** de un nodo.                                                                      |
| [Marl](DOCS.md#marr-marb-marl)     | `ml`, `margin-left`    | `marl="3/15"`, `ml="5/10"`, `margin-left="3/5"`                                           | Determinar el **margen izquierdo** de un nodo.                                                                     |
| [Mar](DOCS.md#mar)                 | `m`, `margin`          | `mar="20-2/15-30-3/15"`, `m="20-2/15-30-3/15"`, `margin="20-2/15-30-3/15"`                | Es un shorthand de las directivas: [mart](DOCS.md#mart), [marr, marb, y marl](DOCS.md#marr-marb-marl).             |
| [Mary](DOCS.md#mary-marx)          | `my`, `margin-y`       | `mary="10"`, `my="20"`, `margin-y="30"`                                                   | Determina el **margen superior e inferior al mismo tiempo** de un nodo.                                            |
| [Marx](DOCS.md#mary-marx)          | `mx`, `maring-x`       | `marx="10"`, `mx="20"`, `margin-x="30"`                                                   | Determina el **margen derecho e izquierdo al mismo tiempo** de un nodo.                                            |
| [Padt](DOCS.md#padt)               | `pt`, `padding-top`    | `padt="10"`, `pt="20"`, `padding-top="30"`                                                | Determina el **padding superior** de un nodo.                                                                      |
| [Padr](DOCS.md#padr-padb-padl)     | `pr`, `padding-right`  | `padr="2/15"`, `pr="3/16"`, `padding-right="4/17"`                                        | Determina el **padding derecho** de un nodo.                                                                       |
| [Padb](DOCS.md#padr-padb-padl)     | `pb`, `padding-bottom` | `padb="30"`, `pb="40"`, `padding-bottom="50"`                                             | Determina el **padding inferior** de un nodo.                                                                      |
| [Padl](DOCS.md#padr-padb-padl)     | `pl`, `padding-left`   | `padl="3/15"`, `pl="4/16"`, `padding-left="5/17"`                                         | Determina el **padding izquierdo** de un nodo.                                                                     |
| [Pad](DOCS.md#pad)                 | `p`, `padding`         | `pad="20-2/15-30-3/15"`, `p="20-2/15-30-3/15"`, `padding="20-2/15-30-3/15"`               | Es un shorthand de las directivas: [padt](DOCS.md#padt), [padr, padb, y padl](DOCS.md#padr-padb-padl).             |
| [Pady](DOCS.md#pady-padx)          | `py`, `padding-y`      | `pady="10"`, `py="20"`, `padding-y="30"`                                                  | Determina el **padding superior e inferior al mismo tiempo** de un nodo.                                           |
| [Padx](DOCS.md#pady-padx)          | `px`, `padding-x`      | `padx="10"`, `px="20"`, `padding-x="30`                                                   | Determina el **padding derecho e izquierdo al mismo tiempo** de un nodo.                                           |
| [Flex](DOCS.md#flex)               | `fx`                   | `flex="jc:ce ai:fs fd:co"`, `flex="jc:fe ai:fs`, `fx="align-items:center flex-wrap:wrap"` | Determina el **display flex** del nodo y sus derivados.                                                            |
| [Wdh](DOCS.md#width)               | `w`, `width`           | `wdh="100"`, `w="200"`, `width="300"`                                                     | Determina el **ancho** del nodo en píxeles u otra [unidad de medida](DOCS.md#unidades-de-medida-definidas).        |
| [Hgt](DOCS.md#height)              | `h`, `height`          | `hgt="100"`, `h="200"`, `height="300"`                                                    | Determina el **alto** del nodo en píxeles u otra [unidad de medida](DOCS.md#unidades-de-medida-definidas).         |
| [Mxw](DOCS.md#maxwidth)            | `max-width`            | `mxw="200"`, `max-width="300"`                                                            | Determina el **máximo ancho** del nodo en píxeles u otra [unidad de medida](DOCS.md#unidades-de-medida-definidas). |
| [Mxh](DOCS.md#maxheight)           | `max-height`           | `mxh="200"`, `max-height="300"`                                                           | Determina el **máximo alto** del nodo en píxeles u otra [unidad de medida](DOCS.md#unidades-de-medida-definidas).  |
| [Miw](DOCS.md#minwidth)            | `min-width`            | `miw="300"`, `min-width="400"`                                                            | Determina el **mínimo ancho** del nodo en píxeles u otra [unidad de medida](DOCS.md#unidades-de-medida-definidas). |
| [Mih](DOCS.md#minheight)           | `min-height`           | `mih="300"`, `min-height="400"`                                                           | Determina el **mínimo alto** del nodo en píxeles u otra [unidad de medida](DOCS.md#unidades-de-medida-definidas).  |
| [Pos](DOCS.md#position)            | `position`             | `pos="re"`, `position="relative"`                                                         | Determina la **posición** del nodo.                                                                                |
| [T](DOCS.md#top-right-bottom-left) | `top`                  | `t="10"`, `top="20"`                                                                      | Determina el **top** del nodo en píxeles u otra [unidad de medida](DOCS.md#unidades-de-medida-definidas).          |
| [R](DOCS.md#top-right-bottom-left) | `right`                | `r="10"`, `right="20"`                                                                    | Determina el **right** del nodo en píxeles u otra [unidad de medida](DOCS.md#unidades-de-medida-definidas).        |
| [B](DOCS.md#top-right-bottom-left) | `bottom`               | `b="10"`, `bottom="20"`                                                                   | Determina el **bottom** del nodo en píxeles u otra [unidad de medida](DOCS.md#unidades-de-medida-definidas).       |
| [L](DOCS.md#top-right-bottom-left) | `left`                 | `l="10"`, `left="20"`                                                                     | Determina el **left** del nodo en píxeles u otra [unidad de medida](DOCS.md#unidades-de-medida-definidas).         |

## 🌐 Websites que usan layouter

- Interbank - [interbank.pe](https://interbank.pe)

## 📚 ¿Dónde obtener ayuda?

Hay una extensa documentación en el archivo [DOCS-es_ES.md](DOCS-es_ES.md).

## 🧾 Licencia

El código y la documentación se publican bajo la [Licencia MIT](LICENSE).
