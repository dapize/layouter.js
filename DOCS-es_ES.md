<div align="center">
    <p>
        <a href="DOCS.md"><img src="en_US.png" alt="English Language"/> English</a> — <a href="DOCS-es_ES.md"><img src="es_ES.png" alt="Idioma Español"/> Español</a>
    </p>
</div>

# 📚 Documentación

Los estilos creados por layouter se crean al vuelo **(on the fly)**, _[cuando el navegador termina de cargar la web]_. Podemos definir las columnas, los paddings, los margenes, el ancho y alto de un elemento y hasta determinar si el nodo tendrá display **'flex'** y sus derivados.

## 🔧 Instalación

Solo hay que llamar, en el HTML, al script **layouter.umd.js** que se encuentra dentro de la carpeta **'dist'** de este repositorio:

```html
<script src="layouter.umd.js"></script>
```

**también** puedes usar **uno** de estos CDNs:

```html
<script src="https://cdn.jsdelivr.net/npm/layouter.js/dist/layouter.umd.js" defer></script>
<script src="https://unpkg.com/layouter.js/dist/layouter.umd.js" defer></script>
```

o puedes instalarlo en tu proyecto con:

```properties
npm install layouter.js
// o
yarn add layouter.js
```

Si se requiere usarlo **en SSR debes pasar el objeto windows de 'jsdom'** y tu configuración, así:

```javascript
const { JSDOM } = require('jsdom');
const { window } = new JSDOM();

require('layouter.js')(window, {
    // tu configuración aquí
});
```

## ⚙️ Configuración

Para una configuración personalizada debemos **crear una variable llamada 'layouterConfig'** en el objeto global 'window', la cual contendrá un objeto con las siguientes propiedades:

| Opción          | Típo                          | Por Defecto | Descripción                                                                                                                                                                                                          |
| --------------- | ----------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **breakpoints** | object                        | `...`       | Objeto que contiene definido los breakpoints que usará el sistema.                                                                                                                                                   |
| prefix          | string                        | ''          | Define cual será el prefijo para todas las clases CSS que se agregarán a los nodos, esto con el fin de salvaguardar alguna colición con otras clases definidas.                                                      |
| debug           | boolean                       | true        | Sirve para habilitar el `console.error` para cuando ocurre alguna definición inconsistente o se presenta algun error de procesamiento.                                                                               |
| bridge          | boolean                       | true        | Permite insertar los estilos creados por el sistema a travez del método 'insert' del tag scope, sin agregarlo como nodo de texto hijo. **OJO:** _Deshabilita esta opción si el DOM es manipulado por otra librería._ |
| searchOnInit    | boolean                       | true        | Define si se buscará en el DOM todos los Nodos con cualquier directiva permitida cuando se cargue la biblioteca                                                                                                      |
| observer        | boolean                       | true        | Define si el observador verificará cuando se agregue un nuevo nodo al DOM o si algún nodo existente agregó alguna **directiva de layouter** para procesarlo                                                          |
| **ready**       | (instance: ILayouter) => void | null        | Sirve como callback para indicar que el procesamiento inicial a finalizado. Se puede usar para quitar el loading overlay de la web (si es que se tiene, claro)                                                       |

### 📐 Breakpoints

Cada breakpoint es un objeto que debe tener como nombre de propiedad un **'alias'** y dentro de ese objeto debe tener las siguientes propiedades:

| Propiedad | Type   | Description        |
| --------- | ------ | ------------------ |
| width     | number | Ancho máximo       |
| cols      | number | Número de columnas |

**Ejemplo**:

```javascript
{
    ...,
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
        },
    }
}
```

Ese alias definidos se usará para determinar el breakpoint en cada valor de las directivas.

### 💡 A tomar en cuenta:

-   Se pueden definir cuantos breakpoints se requiera, no hay límite.
-   Devido a que normalmente se maqueta en 'mobile first' **el breakpoint 'xs' no necesita un 'media query' (osea: @media).**
-   Si no se define ninguna unidad de medida en el valor de cualquier directiva (que no sea naturalmente porcentual), se tomará en pixeles [me refiero a esto 🔗](#unidades-de-medida-definidas)

## Directivas

| Nombre                      | Alias                  | Ejemplos                                                                                  | Descripción                                                                                                 |
| --------------------------- | ---------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| [Cols](#cols)               | `c`                    | `cols="13/15"`, `c="5/10"`                                                                | Determina las columnas, osea el 'width' de manera porcentual.                                               |
| [d](#display)               | `display`              | `d="bl"`, `display="inline"`                                                              | Determina el **display** que tendrá el nodo.                                                                |
| [Mart](#mart)               | `mt`, `margin-top`     | `mart="10"`, `mt="20"`, `margin-top="12"`                                                 | Determina el **margen superior** de un nodo.                                                                |
| [Marr](#marr-marb-marl)     | `mr`, `margin-right`   | `marr="2/15"`, `mr="5/10"`, `margin-right="3/5"`                                          | Determinar el **margen derecho** de un nodo.                                                                |
| [Marb](#marr-marb-marl)     | `mb`, `margin-bottom`  | `marb="30"`, `mb="50"`, `margin-bottom="25"`                                              | Determinar el **margen inferior** de un nodo.                                                               |
| [Marl](#marr-marb-marl)     | `ml`, `margin-left`    | `marl="3/15"`, `ml="5/10"`, `margin-left="3/5"`                                           | Determinar el **margen izquierdo** de un nodo.                                                              |
| [Mar](#mar)                 | `m`, `margin`          | `mar="20-2/15-30-3/15"`, `m="20-2/15-30-3/15"`, `margin="20-2/15-30-3/15"`                | Es un shorthand de las directivas: [mart](#mart), [marr, marb, y marl](#marr-marb-marl).                    |
| [Mary](#mary-marx)          | `my`, `margin-y`       | `mary="10"`, `my="20"`, `margin-y="30"`                                                   | Determina el **margen superior e inferior al mismo tiempo** de un nodo.                                     |
| [Marx](#mary-marx)          | `mx`, `maring-x`       | `marx="10"`, `mx="20"`, `margin-x="30"`                                                   | Determina el **margen derecho e izquierdo al mismo tiempo** de un nodo.                                     |
| [Padt](#padt)               | `pt`, `padding-top`    | `padt="10"`, `pt="20"`, `padding-top="30"`                                                | Determina el **padding superior** de un nodo.                                                               |
| [Padr](#padr-padb-padl)     | `pr`, `padding-right`  | `padr="2/15"`, `pr="3/16"`, `padding-right="4/17"`                                        | Determina el **padding derecho** de un nodo.                                                                |
| [Padb](#padr-padb-padl)     | `pb`, `padding-bottom` | `padb="30"`, `pb="40"`, `padding-bottom="50"`                                             | Determina el **padding inferior** de un nodo.                                                               |
| [Padl](#padr-padb-padl)     | `pl`, `padding-left`   | `padl="3/15"`, `pl="4/16"`, `padding-left="5/17"`                                         | Determina el **padding izquierdo** de un nodo.                                                              |
| [Pad](#pad)                 | `p`, `padding`         | `pad="20-2/15-30-3/15"`, `p="20-2/15-30-3/15"`, `padding="20-2/15-30-3/15"`               | Es un shorthand de las directivas: [padt](#padt), [padr, padb, y padl](#padr-padb-padl).                    |
| [Pady](#pady-padx)          | `py`, `padding-y`      | `pady="10"`, `py="20"`, `padding-y="30"`                                                  | Determina el **padding superior e inferior al mismo tiempo** de un nodo.                                    |
| [Padx](#pady-padx)          | `px`, `padding-x`      | `padx="10"`, `px="20"`, `padding-x="30`                                                   | Determina el **padding derecho e izquierdo al mismo tiempo** de un nodo.                                    |
| [Flex](#flex)               | `fx`                   | `flex="jc:ce ai:fs fd:co"`, `flex="jc:fe ai:fs`, `fx="align-items:center flex-wrap:wrap"` | Determina el **display flex** del nodo y sus derivados.                                                     |
| [Wdh](#width)               | `w`, `width`           | `wdh="100"`, `w="200"`, `width="300"`                                                     | Determina el **ancho** del nodo en píxeles u otra [unidad de medida](#unidades-de-medida-definidas).        |
| [Hgt](#height)              | `h`, `height`          | `hgt="100"`, `h="200"`, `height="300"`                                                    | Determina el **alto** del nodo en píxeles u otra [unidad de medida](#unidades-de-medida-definidas).         |
| [Mxw](#maxwidth)            | `max-width`            | `mxw="200"`, `max-width="300"`                                                            | Determina el **máximo ancho** del nodo en píxeles u otra [unidad de medida](#unidades-de-medida-definidas). |
| [Mxh](#maxheight)           | `max-height`           | `mxh="200"`, `max-height="300"`                                                           | Determina el **máximo alto** del nodo en píxeles u otra [unidad de medida](#unidades-de-medida-definidas).  |
| [Miw](#minwidth)            | `min-width`            | `miw="300"`, `min-width="400"`                                                            | Determina el **mínimo ancho** del nodo en píxeles u otra [unidad de medida](#unidades-de-medida-definidas). |
| [Mih](#minheight)           | `min-height`           | `mih="300"`, `min-height="400"`                                                           | Determina el **mínimo alto** del nodo en píxeles u otra [unidad de medida](#unidades-de-medida-definidas).  |
| [Pos](#position)            | `position`             | `pos="re"`, `position="relative"`                                                         | Determina la **posición** del nodo.                                                                         |
| [T](#top-right-bottom-left) | `top`                  | `t="10"`, `top="20"`                                                                      | Determina el **top** del nodo en píxeles u otra [unidad de medida](#unidades-de-medida-definidas).          |
| [R](#top-right-bottom-left) | `right`                | `r="10"`, `right="20"`                                                                    | Determina el **right** del nodo en píxeles u otra [unidad de medida](#unidades-de-medida-definidas).        |
| [B](#top-right-bottom-left) | `bottom`               | `b="10"`, `bottom="20"`                                                                   | Determina el **bottom** del nodo en píxeles u otra [unidad de medida](#unidades-de-medida-definidas).       |
| [L](#top-right-bottom-left) | `left`                 | `l="10"`, `left="20"`                                                                     | Determina el **left** del nodo en píxeles u otra [unidad de medida](DOCS.md#unidades-de-medida-definidas).  |

## Métodos

Los siguientes métodos son internos del sistema, y **no es necesario utilizarlos** porque el sistema los usa de forma automática, pero están ahí para cualquier otro fin.

Estos métodos están expuesto en la **variable global 'layouter'**, la cual está en el objeto **window**.

| Nombre                                                                                                                                                                                                                                                                                              | Argumentos                                                                         | Devuelve                                  | Descripción                                             |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------- |
| [**Set**](#set)                                                                                                                                                                                                                                                                                     | `Node: HTMLElement\|Element, parameters?: Partial<Record<TDirectiveName, string>>` | `Promise<void\|Error>`                    | **Shorthand** para los métodos de **tipo 'set'**.       |
| [**setCols**](#setcols)                                                                                                                                                                                                                                                                             | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Procesa la directiva **'cols'**                         |
| [setPadTop](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                     | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Procesa la directiva **'padt'**                         |
| [setPadRight](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                   | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Procesa la directiva **'padr'**                         |
| [setPadBottom](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                  | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Procesa la directiva **'padb'**                         |
| [setPadLeft](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                    | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Procesa la directiva **'padl'**                         |
| [**setPad**](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                    | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Procesa la directiva **'pad'**                          |
| [setPadX](#setpadx-setpady-setmarx-setmary)                                                                                                                                                                                                                                                         | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Procesa la directiva **'padx'**                         |
| [setPadY](#setpadx-setpady-setmarx-setmary)                                                                                                                                                                                                                                                         | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Procesa la directiva **'pady'**                         |
| [setMarTop](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                     | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Procesa la directiva **'mart'**                         |
| [setMarRight](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                   | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Procesa la directiva **'marr'**                         |
| [setMarBottom](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                  | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Procesa la directiva **'marb'**                         |
| [setMarLeft](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                    | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Procesa la directiva **'marl'**                         |
| [**setMar**](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                    | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Procesa la directiva **'mar'**                          |
| [setMarX](#setpadx-setpady-setmarx-setmary)                                                                                                                                                                                                                                                         | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Procesa la directiva **'marx'**                         |
| [setMarY](#setpadx-setpady-setmarx-setmary)                                                                                                                                                                                                                                                         | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Procesa la directiva **'mary'**                         |
| [setFlex](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                       | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Procesa la directiva **'flex'**                         |
| [setWidth](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                      | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Procesa la directiva **'wdh'**                          |
| [setMinWidth](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                   | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Procesa la directiva **'miw'**                          |
| [setMaxWidth](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                   | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Procesa la directiva **'mxw'**                          |
| [setHeight](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                     | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Procesa la directiva **'hgt'**                          |
| [setMaxHeight](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                  | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Procesa la directiva **'mxh'**                          |
| [setMinHeight](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                  | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Procesa la directiva **'mih'**                          |
| [setPosition](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                   | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Procesa la directiva **'pos'**                          |
| [setTop](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                        | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Procesa la directiva **'t'**                            |
| [setRight](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                      | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Procesa la directiva **'r'**                            |
| [setBottom](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                     | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Procesa la directiva **'b'**                            |
| [setLeft](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                       | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Procesa la directiva **'l'**                            |
| [**buildCols**](#buildcols)                                                                                                                                                                                                                                                                         | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Procesa valores de la directiva **'cols'**              |
| [buildMarTop](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)    | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Procesa valores de la directiva **'mart'**              |
| [buildMarRight](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)  | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Procesa valores de la directiva **'marr'**              |
| [buildMarBottom](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft) | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Procesa valores de la directiva **'marb'**              |
| [buildMarLeft](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)   | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Procesa valores de la directiva **'marl'**              |
| [**buildMar**](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)   | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Procesa valores de la directiva **'mar'**               |
| [buildPadTop](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)    | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Procesa valores de la directiva **'padt'**              |
| [buildPadRight](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)  | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Procesa valores de la directiva **'padr'**              |
| [buildPadBottom](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft) | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Procesa valores de la directiva **'padb'**              |
| [buildPadLeft](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)   | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Procesa valores de la directiva **'padl'**              |
| [buildPadX](#buildpadx-buildpady-buildmarx-buildmary)                                                                                                                                                                                                                                               | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Procesa valores de la directiva **'padx'**              |
| [buildPadY](#buildpadx-buildpady-buildmarx-buildmary)                                                                                                                                                                                                                                               | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Procesa valores de la directiva **'padx'**              |
| [**buildPad**](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)   | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Procesa valores de la directiva **'pad'**               |
| [**buildFlex**](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)  | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Procesa valores de la directiva **'flex'**              |
| [buildWidth](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)     | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Procesa valores de la directiva **'wdh'**               |
| [buildMinWidth](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)  | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Procesa valores de la directiva **'miw'**               |
| [buildMaxWidth](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)  | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Procesa valores de la directiva **'mxw'**               |
| [buildHeight](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)    | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Procesa valores de la directiva **'hgt'**               |
| [buildMaxHeight](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft) | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Procesa valores de la directiva **'mih'**               |
| [buildHeight](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)    | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Procesa valores de la directiva **'mxh'**               |
| [buildPosition](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)  | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Procesa valores de la directiva **'pos'**               |
| [buildTop](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)       | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Procesa valores de la directiva **'t'**                 |
| [buildRight](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)     | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Procesa valores de la directiva **'r'**                 |
| [buildBottom](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)    | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Procesa valores de la directiva **'b'**                 |
| [buildLeft](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)      | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Procesa valores de la directiva **'l'**                 |
| [**build**](#build)                                                                                                                                                                                                                                                                                 | `obj: Partial<Record<TDirectiveName, string>>, insertStyles?: boolean`             | `Partial<IBuildResult> \| Error`          | Shorthand para métodos **'build'**                      |
| [getParameters](#getparameters)                                                                                                                                                                                                                                                                     | `Node: HTMLElement\|Element`                                                       | `Partial<Record<TDirectiveName, string>>` | Extrae las directivas y valores de un Nodo              |
| [reset](#reset)                                                                                                                                                                                                                                                                                     | `Node: HTMLElement\|Element`                                                       | `Promise<void>`                           | Elimina de un Nodo las clases generadas por el sistema. |

<details>
<summary><b>Tipos e Interfaces de guía</b></summary>

```typescript
interface IStyles {
    [name: string]: string;
}

type TDirectiveName =
    | 'cols'
    | 'pad'
    | 'padt'
    | 'padr'
    | 'padb'
    | 'padl'
    | 'mar'
    | 'mart'
    | 'marr'
    | 'marb'
    | 'marl'
    | 'flex'
    | 'mxw'
    | 'mxh'
    | 'miw'
    | 'mih'
    | 'wdh'
    | 'hgt';

interface IConfigUser {
    prefix: string;
    breakpoints: IBreakpoints;
    bridge: boolean;
    debug?: boolean;
    ready?: (instance: ILayouter) => void;
    searchOnInit: boolean;
    observer: boolean;
}

interface IConfig extends Omit<IConfigUser, 'breakpoints'>, IConfigNumsOut {
    context: Window & typeof globalThis;
    styles: {
        [className: string]: string;
    };
    version: string;
}

interface ILayouter extends IConfig {
    getParameters: (
        Node: HTMLElement | Element
    ) => Partial<Record<TDirectiveName, string>>;
    updateConfig: (userConfig: Partial<Omit<IConfigUser, 'bridge'>>) => IConfig;
    build: (
        obj: Partial<Record<TDirectiveName, string>>,
        insertStyles?: boolean
    ) => Partial<IBuildResult> | Error;
    buildCols: (valCols: string, insertStyles?: boolean) => IStyles | Error;
    buildFlex: (valFlex: string, insertStyles?: boolean) => IStyles | Error;
    buildPad: (valPads: string, insertStyles?: boolean) => IStyles;
    buildPadTop: (valPadTop: string, insertStyles?: boolean) => IStyles;
    buildPadRight: (valPadRight: string, insertStyles?: boolean) => IStyles;
    buildPadBottom: (valPadBottom: string, insertStyles?: boolean) => IStyles;
    buildPadLeft: (valPadLeft: string, insertStyles?: boolean) => IStyles;
    buildPadX: (valPadX: string, insertStyles?: boolean) => IStyles;
    buildPadY: (valPadX: string, insertStyles?: boolean) => IStyles;
    buildMar: (valMars: string, insertStyles?: boolean) => IStyles;
    buildMarTop: (valMarTop: string, insertStyles?: boolean) => IStyles;
    buildMarRight: (valMarRight: string, insertStyles?: boolean) => IStyles;
    buildMarBottom: (valMarBottom: string, insertStyles?: boolean) => IStyles;
    buildMarLeft: (valMarLeft: string, insertStyles?: boolean) => IStyles;
    buildMarX: (valPadX: string, insertStyles?: boolean) => IStyles;
    buildMarY: (valPadX: string, insertStyles?: boolean) => IStyles;
    buildMaxWidth: (valMaxWidth: string, insertStyles?: boolean) => IStyles;
    buildMaxHeight: (valMaxHeight: string, insertStyles?: boolean) => IStyles;
    buildMinWidth: (valMinWidth: string, insertStyles?: boolean) => IStyles;
    buildMinHeight: (valMinHeight: string, insertStyles?: boolean) => IStyles;
    buildHeight: (valHeight: string, insertStyles?: boolean) => IStyles;
    buildWidth: (valWidth: string, insertStyles?: boolean) => IStyles;
    buildPosition: (
        valPosition: string,
        insertStyles?: boolean
    ) => IStyles | Error;
    buildTop: (valTop: string, insertStyles?: boolean) => IStyles | Error;
    buildRight: (valRight: string, insertStyles?: boolean) => IStyles | Error;
    buildBottom: (valBottom: string, insertStyles?: boolean) => IStyles | Error;
    buildLeft: (valLeft: string, insertStyles?: boolean) => IStyles | Error;

    set: (
        Node: HTMLElement | Element,
        parameters?: Partial<Record<TDirectiveName, string>>
    ) => Promise<void | Error>;
    setCols: (
        Node: HTMLElement | Element,
        values?: string
    ) => Promise<void | Error>;
    setFlex: (
        Node: HTMLElement | Element,
        values?: string
    ) => Promise<void | Error>;
    setMar: (
        Node: HTMLElement | Element,
        values?: string
    ) => Promise<void | Error>;
    setMarTop: (
        Node: HTMLElement | Element,
        values?: string
    ) => Promise<void | Error>;
    setMarRight: (
        Node: HTMLElement | Element,
        values?: string
    ) => Promise<void | Error>;
    setMarBottom: (
        Node: HTMLElement | Element,
        values?: string
    ) => Promise<void | Error>;
    setMarLeft: (
        Node: HTMLElement | Element,
        values?: string
    ) => Promise<void | Error>;
    setMarX: (
        Node: HTMLElement | Element,
        values?: string
    ) => Promise<void | Error>;
    setMarY: (
        Node: HTMLElement | Element,
        values?: string
    ) => Promise<void | Error>;
    setPad: (
        Node: HTMLElement | Element,
        values?: string
    ) => Promise<void | Error>;
    setPadTop: (
        Node: HTMLElement | Element,
        values?: string
    ) => Promise<void | Error>;
    setPadRight: (
        Node: HTMLElement | Element,
        values?: string
    ) => Promise<void | Error>;
    setPadBottom: (
        Node: HTMLElement | Element,
        values?: string
    ) => Promise<void | Error>;
    setPadLeft: (
        Node: HTMLElement | Element,
        values?: string
    ) => Promise<void | Error>;
    setPadX: (
        Node: HTMLElement | Element,
        values?: string
    ) => Promise<void | Error>;
    setPadY: (
        Node: HTMLElement | Element,
        values?: string
    ) => Promise<void | Error>;

    setWidth: (
        Node: HTMLElement | Element,
        values?: string
    ) => Promise<void | Error>;
    setMinWidth: (
        Node: HTMLElement | Element,
        values?: string
    ) => Promise<void | Error>;
    setMaxWidth: (
        Node: HTMLElement | Element,
        values?: string
    ) => Promise<void | Error>;
    setHeight: (
        Node: HTMLElement | Element,
        values?: string
    ) => Promise<void | Error>;
    setMinHeight: (
        Node: HTMLElement | Element,
        values?: string
    ) => Promise<void | Error>;
    setMaxHeight: (
        Node: HTMLElement | Element,
        values?: string
    ) => Promise<void | Error>;
    setPosition: (
        Node: HTMLElement | Element,
        values?: string
    ) => Promise<void | Error>;

    setTop: (
        Node: HTMLElement | Element,
        values?: string
    ) => Promise<void | Error>;
    setRight: (
        Node: HTMLElement | Element,
        values?: string
    ) => Promise<void | Error>;
    setBottom: (
        Node: HTMLElement | Element,
        values?: string
    ) => Promise<void | Error>;
    setLeft: (
        Node: HTMLElement | Element,
        values?: string
    ) => Promise<void | Error>;

    processors: Record<TDirectiveName, IProcessor>;

    insertRules: (objStyles: IStyles) => void;
    reset: (Node: HTMLElement | Element) => Promise<void>;
    version: string;
}

interface IProcessor {
  build: (values: string, insertStyles: boolean) => IStyles | Error;
  ruleCss: string | string[];
  classPrefix: string;
}

```

</details>

## Utils

-   [Important Flag](#important-flag)
-   [Getters](#getters)

## ✨ Ejemplos

### Cols

#### Ejemplo 1: Con breakpoints simples (min-width)

Tenemos un 'DIV' al cual queremos designarle 13 de 15 columnas en mobile, 10 columnas de 31 en tablet y 15 columnas de 27 en desktop, así que creamos **la directiva llamada 'cols'** con el siguiente valor:

```html
<div cols="13/15 10/31@sm 15/27@md">...</div>
```

> El sufijo arroba significa que esas columnas aplicarán a partir del breakpoint determinado

Para el DIV del ejemplo de arriba se determinó que:

-   Tendrá 13 columnas de 15, y como no tiene como sufijo el signo arroba, significa que las tendrá en el 'breakpoint con width más bajo osea el **'xs'**. Si el **DIV** solo tendría esa directiva definida, luego de su auto procesamiento obtendríamos este resultado:

```html
<div class="cols-13/15">...</div>
```

> Vemos que la directiva 'cols' desapareció del elemento, esto es porque ya no lo necesita una vez procesado

Y como estilos tendríamos disponible una clase llamada 'cols-13/15' la cual nos daría estos estilos:

```css
.cols-13\/15 {
    width: 86.666%;
}
```

**Seguimos**...

-   Para el breakpoint 'sm' (osea 'tablet') se determinó que se tendrá 10 columnas de 31, luego de procesarlo obtendríamos este resultado:

```html
<div class="cols-10/31@sm">...</div>
```

Pero como se determinó en un breakpoint, los estilos estarían regidos por él

```css
@media screen and (min-width: 600px) {
    .cols-10\/31\@sm {
        width: 32.258%;
    }
}
```

-   Para el breakpoint **'md' (osea 'desktop')** se determinó que se tendrá 15 columnas de 27, y luego de auto procesarce obtendríamos este resultado:

```html
<div class="cols-15/27@md">...</div>
```

```css
@media screen and (min-width: 900px) {
    .cols-15\/27\@md {
        width: 55.5556%;
    }
}
```

**Finalmente** si procesamos el valor completo del parametro **'cols'** `(13/15 10/31@sm 15/27@md)` obtendríamos este resultado:

```html
<div class="cols-13/15 cols-10/31@sm cols-15/27@md">...</div>
```

y pues, estos estilos:

```css
.cols-13\/15 {
    width: 86.666%;
}

@media screen and (min-width: 600px) {
    .cols-10\/31\@sm {
        width: 32.258%;
    }
}

@media screen and (min-width: 900px) {
    .cols-15\/27\@md {
        width: 55.5556%;
    }
}
```

> **OJO**: Estas clases estarán disponibles para todos los elementos que necesiten de ellas, son generales.

#### Ejemplo 2: Con breakpoint min-width y max-width

Tenemos un DIV que a parte de tener 13 columnas de 15 en mobile (el breakpoint 'xs') queremos designarle 20 columnas de 27 desde tablet hasta desktop (desde 'sm' hasta 'md') y a partir de 'lg', osea monitores más grandes, que continue con las 13 columnas de 15 que se le puso en mobile. Entonces...

```html
<div cols="13/15 20/27@sm-md"></div>
```

El guión (-) indica 'desde / hasta' donde se quiere determinar las columnas. En estilos tendríamos esto:

```css
.cols-13\/15 {
    width: 86.667%;
}

@media screen and (min-width: 600px) and (max-width: 899px) {
    .cols-20\/27\@sm-md {
        width: 74.074%;
    }
}
```

...aunque tambien se puede usar solo el 'hasta', así:

```html
<div cols="20/27@-md"></div>
```

> Esto le dará 20 columnas de 27 hasta 'desktop' (en el breakpoint 'md')

y en estilos obtendremos esto:

```css
@media screen and (max-width: 899px) {
    .cols-20\/27\@sm {
        width: 74.074%;
    }
}
```

#### Ejemplo 3: Columnas explicitas por breakpoint.

Cuando queremos determinar un número de columnas en un breakpoint específico pero sin designarle el número de columnas de donde sacarlas (o máximas), podemos hacerlo así:

```html
<div cols="13 20@sm">...</div>
```

Eso es lo mismo que poner esto: `<div cols="13/15 20/31@sm">...</div>`

Se obvia el número de columnas de donde se sacarán las columnas designadas, yá que el breakpoint tomará el número de columnas designadas para ese breakpoint, osea: el sistema reconocerá que son 13 columnas de 15 xq no se determinó breakpoint, y 15 son las columnas máximas que tiene el breakpoint 'xs' (mobile), y tambien reconocerá que son 20 columnas de 31, xq se determinó 20 columnas en el breakpoint 'sm' (tablet) y las columnas máximas disponibles en tablet son 31.

> **OJO**: **NO se puede** determinar columnas explicitas en breakpoints compuestos, osea en el 'desde / hasta', solo en breakpoints 'desde', osea estos '@sm', si no tirará un mensaje de error y no procesará.

```html
<!-- ESTO NO ES VÁLIDO-->
<div cols="20@sm-md">...</div>
```

Este método de columnas explicitas solo es para ahorrarnos un poco de tiempo al designar las columnas que queremos en la directiva 'cols'. Sin embargo podría ser provechoso determinar así por si en algún momento las columnas designadas para un breakpoint en específico cambian, digamos que en el breakpoint 'sm' (tablet), yá no son 31 columnas sino 32, pues con la designación de columna explicitas nos ahorraríamos tener que cambiar en cada elemento dondeterminamos `cols="20/31@sm"`

[&uarr; Volver Arriba](#directivas)

### Display

Sirve para determinar el **display** que tendrá el nodo.

### Valores disponibles

-   **bl**: display
-   **il**: inline
-   **ib**: inline-block
-   **fx**: flex
-   **if**: inline-flex
-   **no**: none
-   **in**: in
-   **ih**: inherit

#### Ejemplo:

```html
<div d="re">...</div>
```

o en modo más semántico

```html
<div display="block inline@sm none@md">...</div>
```

No hay mucho que explicar acá, utiliza las mismas reglas que las demás directivas, solo que está enfocado a la definición del display.

-   En el primer ejemplo se define `display: relative` para el breakpoint **'xs'** (mobile)
-   En el segundo ejemplo, un poco más extenso, se definió que en el breakpoint **'xs'** el display será **'block'**, luego para el breakpoint **'sm'** será **'inline'** y finalmente para el breakpoint **'md'** el display será **'none'**

[&uarr; Volver Arriba](#directivas)

### Mar

Es una abreviación del shorthand 'margin' **(y a su vez es un shorthand de las directivas: mart, marr, marb, y marl)** y sirve para determinar los margenes superiores, derechos, inferiores e izquierdos de un elemento.

#### Ejemplo:

```html
<div mar="20-2/15 40-3/31-20@sm 60-2/31@md">...</div>
```

> Usa la misma sintaxis del margin combencional, osea: margin-top, margin-right, margin-bottom, margin-left. Pero solo para el margin left y right se puedeclarar 'auto', si es que se requiere claro. Mini Ejemplo: mar="20-auto"

**Solo los margenes superiores e inferiores son procesados como pixeles**, los derechos e izquierdos son procesados porcentualmente.

**Explicación:** En el ejemplo de arriba se está determinando que el DIV :

-   Tendrá 20 pixeles de margen superior (margin-top) e inferior, tambien 2 columnas de 15, en mobile.
-   Tendrá 40 pixeles de margen superior, 3 columnas de 31 de margin derecho e izquierdo y 20 pixeles de margen inferior en tablet.
-   y en desktop, tendrá 60 pixeles de margin superior e inferior y 2 columnas de 31 de margin derecho e izquierdo.

...luego de auto procesarce obtendríamos este resultado:

```html
<div class="mar-20-2/15 mar-40-3/31-20@sm mar-60-2/31@md">...</div>
```

> Vemos que la directiva **'mar'** desapareció del elemento, esto es porque yá no lo necesita una vez procesado.

y pues, estos estilos:

```css
.mar-20-2\/15 {
    margin: 20px 13.3333%;
}

@media screen and (min-width: 600px) {
    .mar-40-3\/31-20\@sm {
        margin: 40px 9.67742% 20px;
    }
}

@media screen and (min-width: 900px) {
    .mar-60-2\/31\@md {
        margin: 60px 6.45161%;
    }
}
```

> Aquí aplica lo mismo de 'cols', con los breakpoints compuestos, (desde / hasta)

[&uarr; Volver Arriba](#directivas)

> Si se desea determinar los margenes de formar separada es decir solo el margen: superior, derecho, inferior o izquierdo entonces usamos mart, marr, marb, y marl respectivamente, veamoslos a continuación:

### Mart

Sirve para determinar los margenes superiores de un elemento.

#### Ejemplo:

```html
<div mart="10 20.5@sm 30@md">...</div>
```

**Explicación:** En el ejemplo de arriba se está determinando que el margen superior del DIV sea:

-   10 pixeles en mobile.
-   20.5 pixeles en tablet.
-   y 30 pixeles en desktop.

...luego de auto procesarce obtendríamos este resultado:

```html
<div class="mart-10 mart-20_5@sm mart-30@md">...</div>
```

> Vemos que la directiva **'mart'** desapareció del elemento, esto es porque yá no lo necesita una vez procesado

y pues, estos estilos:

```css
.mart-10 {
    margin-top: 10px;
}

@media screen and (min-width: 600px) {
    .mart-20_5\@sm {
        margin-top: 20.5px;
    }
}

@media screen and (min-width: 900px) {
    .mart-30\@md {
        margin-top: 30px;
    }
}
```

[&uarr; Volver Arriba](#directivas)

### Marr, Marb, Marl

Sirven para determinar los margenes derechos, inferiores e izquierdos respectivamente a un nodo. Es lo mismo que 'mart'

#### Un simple ejemplo:

```html
<div marr="10 20.5@sm 30@md">...</div>
<div marb="20 30.5@sm 40@md">...</div>
<div marl="30 40.5@sm 50@md">...</div>
```

...luego de auto procesarce obtendríamos este resultado:

```html
<div class="marr-10 marr-20_5@sm marr-30@md">...</div>
<div class="marb-20 marb-30_5@sm marb-40@md">...</div>
<div class="marl-30 marl-40_5@sm marl-50@md">...</div>
```

<details>
<summary>los estilos generados sería estos:</summary>

```css
.marr-10 {
    margin-right: 10px;
}

.marb-20 {
    margin-bottom: 20px;
}

.marl-30 {
    margin-left: 30px;
}

@media screen and (min-width: 600px) {
    .marr-20_5\@sm {
        margin-right: 20.5px;
    }
    .marr-30_5\@sm {
        margin-bottom: 30.5px;
    }
    .marr-40_5\@sm {
        margin-left: 40.5px;
    }
}

@media screen and (min-width: 900px) {
    .marr-30\@md {
        margin-right: 30px;
    }
    .marr-40\@md {
        margin-bottom: 40px;
    }
    .marr-50\@md {
        margin-left: 50px;
    }
}
```

</details>

[&uarr; Volver Arriba](#directivas)

### Unidades de medida definidas

Para las definiciones de la mayoría de directivas que se auto definen como pixeles, como el 'mart', 'marb', y cualquier otra más, es posible definirle una unidad de medida relativa, las cuales pueden ser: **%, rem, em, ex, vw y vh**,

**Por ejemplo:**

```html
<div mart="20%">...</div>
```

... luego de auto procesarce obtendríamos este resultado:

```html
<div class="mart-0¯20">...</div>
```

y pues, estos estilo:

```css
.mart-0¯20 {
    margin-top: 20%;
}
```

**OJO**: Esto aplica para cualquier otro valor que se auto define como pixeles: **mih, mxw, padt, padb, etc.**

### Pad

Sirve para determinar los paddings que se le dará. Al igual que la directiva **'mar'**, solo el padding top y bottom se tomarán como pixeles y el left y right como porcentual.

Tiene exactamente la misma sintaxis que 'mar'

#### Ejemplo:

```html
<div pad="20-1/15 40-3/31@sm 60-2/31@md">...</div>
```

...luego de auto procesarce obtendríamos este resultado:

```html
<div class="pad-20-1/15 pad-40-3/31@sm pad-60-2/31@md">...</div>
```

<details>
<summary>y pues, estos estilos:</summary>
    
```css
.pad-20-1\/15 {
    padding: 20px 6.66667%;
}

@media screen and (min-width: 600px) {
.pad-40-3\/31\@sm {
padding: 40px 9.67742%;
}
}

@media screen and (min-width: 900px) {
.pad-60-2\/31\@md {
padding: 60px 6.45161%;
}
}

````
</details>

[&uarr; Volver Arriba](#directivas)

### Padt

Sirve para determinar los paddings superiores de un elemento.

#### Ejemplo:

```html
<div padt="10 20.5@sm 30@md">...</div>
````

**Explicación:** En el ejemplo de arriba se está determinando que el padding superior del DIV sea:

-   10 pixeles en mobile.
-   20.5 pixeles en tablet.
-   y 30 pixeles en desktop.

...luego de auto procesarce obtendríamos este resultado:

```html
<div class="padt-10 padt-20_5@sm padt-30@md">...</div>
```

<details>
<summary>y pues, estos estilos:</summary>

```css
.padt-10 {
    padding-top: 10px;
}

@media screen and (min-width: 600px) {
    .padt-20_5\@sm {
        padding-top: 20.5px;
    }
}

@media screen and (min-width: 900px) {
    .padt-30\@md {
        padding-top: 30px;
    }
}
```

</details>

[&uarr; Volver Arriba](#directivas)

### Padr, Padb, Padl

Sirven para determinar los paddings derechos, inferiores e izquierdos respectivamente en un elemento. Es lo mismo que 'padt'

#### Un simple ejemplo:

```html
<div padr="10 20.5@sm 30@md">...</div>
<div padb="20 30.5@sm 40@md">...</div>
<div padl="30 40.5@sm 50@md">...</div>
```

...luego de auto procesarce obtendríamos este resultado:

```html
<div class="padr-10 padr-20_5@sm padr-30@md">...</div>
<div class="padb-20 padb-30_5@sm padb-40@md">...</div>
<div class="padl-30 padl-40_5@sm padl-50@md">...</div>
```

<details>
<summary>y pues, estos estilos:</summary>

```css
.padr-10 {
    padding-right: 10px;
}

.padb-20 {
    padding-bottom: 20px;
}

.padl-30 {
    padding-left: 30px;
}

@media screen and (min-width: 600px) {
    .padr-20_5\@sm {
        padding-right: 20.5px;
    }
    .padb-30_5\@sm {
        padding-bottom: 30.5px;
    }
    .padl-40_5\@sm {
        padding-left: 40.5px;
    }
}

@media screen and (min-width: 900px) {
    .padr-30\@md {
        padding-right: 30px;
    }
    .padb-40\@md {
        padding-bottom: 40px;
    }
    .padl-50\@md {
        padding-left: 50px;
    }
}
```

</details>

[&uarr; Volver Arriba](#directivas)

### PadY, PadX

Estas directivas son plus, ya que son un shorthand de 2 directivas, veamoslas:

-   **'pady'** o solamente **'py'**: Determinará el padding superior e inferior al mismo tiempo de un nodo:

#### Ejemplo:

```html
<div pady="10 20@sm 30@md">...</div>
```

o de forma super abreviada podemos usar solo `<div py="10 20@sm 30@md">...</div>`.

<details>
<summary>nos crea estos estilos:</summary>

```css
.pb-10 {
    padding-bottom: 10px;
}
.pt-10 {
    padding-top: 10px;
}

@media screen and (min-width: 600px) {
    .pb-20\@sm {
        padding-bottom: 20px;
    }
    .pt-20\@sm {
        padding-top: 20px;
    }
}

@media screen and (min-width: 900px) {
    .pb-30\@md {
        padding-bottom: 30px;
    }
    .pt-30\@md {
        padding-top: 30px;
    }
}
```

</details>

-   **'padx'** o solamente **'px'**: Determinará el padding derecho e izquierdo al mismo tiempo de un nodo:

#### Ejemplo:

```html
<div padx="10 20@sm 30@md">...</div>
```

o de forma super abreviada podemos usar solo `<div px="10 20@sm 30@md">...</div>`.

<details>
<summary>y nos crea estos estilos:</summary>

```css
.pl-10 {
    padding-left: 10px;
}
.pr-10 {
    padding-right: 10px;
}

@media screen and (min-width: 600px) {
    .pl-20\@sm {
        padding-left: 20px;
    }
    .pr-20\@sm {
        padding-right: 20px;
    }
}

@media screen and (min-width: 900px) {
    .pl-30\@md {
        padding-left: 30px;
    }
    .pr-30\@md {
        padding-right: 30px;
    }
}
```

</details>

[&uarr; Volver Arriba](#directivas)

### MarY, MarX

Estas directivas son plus, ya que son un shorthand de 2 directivas, veamoslas:

-   **'mary'** o solamente **'my'**: Determinará el margen superior e inferior al mismo tiempo de un nodo:

#### Ejemplo:

```html
<div mary="10 20@sm 30@md">...</div>
```

o de forma super abreviada podemos usar solo `<div my="10 20@sm 30@md">...</div>`.

<details>
<summary>nos crea estos estilos:</summary>

```css
.mb-10 {
    margin-bottom: 10px;
}
.mt-10 {
    margin-top: 10px;
}

@media screen and (min-width: 600px) {
    .mb-20\@sm {
        margin-bottom: 20px;
    }
    .mt-20\@sm {
        margin-top: 20px;
    }
}

@media screen and (min-width: 900px) {
    .mb-30\@md {
        margin-bottom: 30px;
    }
    .mt-30\@md {
        margin-top: 30px;
    }
}
```

</details>

-   **'marx'** o solamente **'mx'**: Determinará el margen derecho e izquierdo al mismo tiempo de un nodo:

#### Ejemplo:

```html
<div marx="10 20@sm 30@md">...</div>
```

o de forma super abreviada podemos usar solo `<div mx="10 20@sm 30@md">...</div>`.

<details>
<summary>y nos crea estos estilos:</summary>

```css
.ml-10 {
    margin-left: 10px;
}
.mr-10 {
    margin-right: 10px;
}

@media screen and (min-width: 600px) {
    .ml-20\@sm {
        margin-left: 20px;
    }
    .mr-20\@sm {
        margin-right: 20px;
    }
}

@media screen and (min-width: 900px) {
    .ml-30\@md {
        margin-left: 30px;
    }
    .mr-30\@md {
        margin-right: 30px;
    }
}
```

</details>

[&uarr; Volver Arriba](#directivas)

### Flex

Esta es la directiva más interesante, porque es el que determina el **'display:flex'** al elemento de forma automática. El valor de la directiva **'flex'** se separa entre dos puntos, y no convencionalmente con guión como se hace en **'cols', 'mar' y 'pad'.**

#### Abreviaciones de valores:

-   **jc:** justify-content
-   **ai:** align-items
-   **ce:** center
-   **fs:** flex-start
-   **fe:** flex-end
-   **sb:** space-between
-   **sa:** space-around
-   **fw:** flex-wrap
-   **nw:** nowrap
-   **w:** wrap
-   **wr:** wrap-reverse
-   **fd:** flex-direction
-   **r:** row
-   **rr:** row-reverse
-   **co:** column
-   **cor:** column-reverse
-   **fg:** flex-grow
-   **fh:** flex-shrink
-   **as:** align-self
-   **or:** order
-   **au:** auto
-   **st:** stretch
-   **bl:** baseline
-   **in:** initial
-   **ih:** inheri

#### Ejemplo:

```html
<div flex="jc:ce jc:fs@sm ai:fs@sm jc:fe@md">...</div>
```

o de forma más semántica

```html
<div
    flex="justify-content:center justify-content:flex-start@sm align-items:flex-start@sm justify-content:flex-end@md"
>
    ...
</div>
```

> **OJO**: Es posible determinar más de un estilo en el mismo breakpoint, en el caso del ejemplo de arriba, se determinó el `justify-content: flex-start y align-items: flex-start` para el breakpoint 'sm' osea (tablet)

...luego de auto procesarce obtendríamos este resultado:

```html
<div class="flex-jc:c flex-jc:fs-ai:fs@sm flex-jc:fe@md">...</div>
```

<details>
<summary>y pues, estos estilos:</summary>

```css
.flex-jc\\:c {
    justify-content: center;
}

@media screen and (min-width: 600px) {
    .flex-jc\\:fs-ai\\:fs\@sm {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
    }
}

@media screen and (min-width: 900px) {
    .flex-jc\\:fe\@md {
        display: flex;
        justify-content: flex-end;
    }
}
```

</details>

> Nota: cuando determinamos más de un estilo para un mismo breakpoint, el nombre de las clases generadas son concatenadas, solo para ahorrar espacio.

[&uarr; Volver Arriba](#directivas)

### Width

Sirve para determinar el ancho de un nodo en pixeles, siempre y cuando no se defina una unidad de medida.

#### Ejemplo 1:

```html
<div wdh="100 150@sm">...</div>
```

...luego de auto procesarce .obtendríamos este resultado:

```html
<div class="wdh-100 wdh-150@sm">...</div>
```

<details>
<summary>y pues, estos estilos:</summary>

```css
.wdh-100 {
    width: 100px;
}

@media screen and (min-width: 600px) {
    .wdh-150\@sm {
        width: 150px;
    }
}
```

</details>

Es posible determinar las únidades relativas: **%, rem, em, ex, vw y vh.**

#### Ejemplo 2:

```html
<div wdh="100% 150%@sm">...</div>
```

...luego de autoprocesarce obtendríamos este resultado:

```html
<div class="wdh-0¯100 wdh-0¯150@sm">...</div>
```

<details>
<summary>y pues, estos estilos:</summary>

```css
.wdh-0¯100 {
    width: 100%;
}

@media screen and (min-width: 600px) {
    .wdh-0¯150\@sm {
        width: 150%;
    }
}
```

</details>

[&uarr; Volver Arriba](#directivas)

### Height

Es lo mismo que el 'Width' pero para determinar el alto, y tambien acepta determinar con [unidades de medidas](#unidades-de-medida-definidas) relativas.

#### Ejemplo 1:

```html
<div hgt="100 150@sm">...</div>
```

#### Ejemplo 2:

```html
<div hgt="100vh 150vh@sm">...</div>
```

[&uarr; Volver Arriba](#directivas)

### MaxWidth

Sirve para determinar el máximo ancho que tendrá un nodo en pixeles, siempre y cuando no se defina

#### Ejemplo:

```html
<div mxw="100 150@sm">...</div>
```

...luego de auto procesarce obtendríamos este resultado:

```html
<div class="mxw-100 mxw-150@sm">...</div>
```

<details>
<summary>y pues, estos estilos:</summary>

```css
.mxw-100 {
    max-width: 100px;
}

@media screen and (min-width: 600px) {
    .mxw-150\@sm {
        max-width: 150px;
    }
}
```

</details>

[&uarr; Volver Arriba](#directivas)

### MaxHeight

Sirve para determinar el máximo alto que tendrá un nodo en pixeles.

#### Ejemplo:

```html
<div mxh="100 150@sm">...</div>
```

...luego de auto procesarce obtendríamos este resultado:

```html
<div class="mxh-100 mxh-150@sm">...</div>
```

<details>
<summary>y pues, estos estilos:</summary>

```css
.mxh-100 {
    max-height: 100px;
}

@media screen and (min-width: 600px) {
    .mxh-150\@sm {
        max-height: 150px;
    }
}
```

</details>

[&uarr; Volver Arriba](#directivas)

### MinWidth, MinHeight

Sirven para determinar el mínimo ancho y mínimo alto en pixeles respectivamente, es lo mismo que el max-width y max-height nombrados más arriba.

#### Ejemplo:

```html
<div miw="100 150@sm 200@md">...</div>
<div mih="300 350@sm 400@md">...</div>
```

...luego de auto procesarce obtendríamos este resultado:

```html
<div class="miw-100 miw-150@sm miw-200@md">...</div>
<div class="mih-300 mih-350@sm miw-400@md">...</div>
```

<details>
<summary>y pues, estos estilos:</summary>

```css
.miw-100 {
    min-width: 100px;
}

@media screen and (min-width: 600px) {
    .miw-150\@sm {
        min-width: 150px;
    }
}

@media screen and (min-width: 900px) {
    .miw-200\@md {
        min-width: 200px;
    }
}

.mih-300 {
    min-height: 300px;
}

@media screen and (min-width: 600px) {
    .mih-350\@sm {
        min-height: 350px;
    }
}

@media screen and (min-width: 900px) {
    .mih-400\@md {
        min-height: 400px;
    }
}
```

</details>

[&uarr; Volver Arriba](#directivas)

### Position

Sirve para determinar el posicionamiento de un elemento.

#### Abreviaciones de valores

-   **st**: static
-   **ab**: absolute
-   **fi**: fixed
-   **re**: relative
-   **si**: sticky
-   **in**: initial
-   **ih**: inherit

#### Ejemplo:

```html
<div pos="re ab@sm fi@md st@lg">...</div>
```

o de forma más semántica

```html
<div position="relative absolute@sm fixed@md static@lg">...</div>
```

...luego de auto procesarce obtendríamos este resultado:

```html
<div class="pos-re pos-ab@sm pos-fi@md pos-st@lg">...</div>
```

<details>
<summary>y estos estilos:</summary>

```css
.pos-re {
    position: relative;
}

@media screen and (min-width: 600px) {
    .pos-ab\@sm {
        position: absolute;
    }
}

@media screen and (min-width: 900px) {
    .pos-fi\@md {
        position: fixed;
    }
}

@media screen and (min-width: 1200px) {
    .pos-st\@lg {
        position: static;
    }
}
```

</details>

[&uarr; Volver Arriba](#directivas)

### Top, Right, Bottom, Left

Sirven para determinar el **top**, **right**, **bottom** y **left** de un elemento

#### Ejemplo:

```html
<div t="10 20@sm 30@md">...</div>
<div r="40 50@sm 60@md">...</div>
<div b="70 80@sm 90@md">...</div>
<div l="100 200@sm 300@md">...</div>
```

o de forma más semántica

```html
<div top="10 20@sm 30@md">...</div>
<div right="40 50@sm 60@md">...</div>
<div bottom="70 80@sm 90@md">...</div>
<div left="100 200@sm 300@md">...</div>
```

...luego de auto procesarce obtendríamos este resultado:

```html
<div class="t-10 t-20@sm t-30@md">...</div>
<div class="r-40 r-50@sm r-60@md">...</div>
<div class="b-70 b-80@sm b-90@md">...</div>
<div class="l-100 l-200@sm l-300@md">...</div>
```

<details>
<summary>y estos estilos:</summary>

```css
.t-10 {
    top: 10px;
}
.r-40 {
    right: 40px;
}
.b-70 {
    bottom: 70px;
}
.l-100 {
    left: 100px;
}

@media screen and (min-width: 600px) {
    .t-20\@sm {
        top: 20px;
    }
    .r-50\@sm {
        right: 50px;
    }
    .r-50\@sm {
        right: 50px;
    }
    .b-80\@sm {
        bottom: 80px;
    }
    .l-200\@sm {
        left: 200px;
    }
}
@media screen and (min-width: 900px) {
    .t-30\@md {
        top: 30px;
    }
    .r-60\@md {
        right: 60px;
    }
    .b-90\@md {
        bottom: 90px;
    }
    .l-300\@md {
        left: 300px;
    }
}
```

</details>

[&uarr; Volver Arriba](#directivas)

## Detalles de Métodos:

### Set

Sirve para procesar todas las directivas aceptadas por el sistema.

#### Ejemplo:

Imaginemos que tenemos un DIV en donde hemos designado darle columnas, margenes, paddings y flex todo de un tiron:

```html
<div
    cols="13/15 10/31@sm-md 15/27@md"
    pad="20-1/15 40-3/31@sm 60-2/31@md"
    mar="20-2/15 40-3/31@sm 60-2/31@md"
    flex="jc:c jc:fs@sm jc:fe@md ai:fs@sm"
></div>
```

No sería recomendable aplicar los métodos separados de **'setCols', 'setPads', 'setMars' y 'setFlex'** para procesar la directiva, en ese caso procesamos con el método 'set', y éste procesará todos los demás mencionados:

```javascript
const myDiv = document.createElement('div');
myDiv.setAttribute('cols', '13/15 10/31@sm-md 15/27@md');
myDiv.setAttribute('pad', '20-1/15 40-3/31@sm 60-2/31@md');
myDiv.setAttribute('mar', '20-2/15 40-3/31@sm 60-2/31@md');
myDiv.setAttribute('flex', 'jc:ce jc:fs@sm jc:fe@md ai:fs@sm');
layouter.set(myDiv);
```

Lo cual nos dará un resultado así:

```html
<div
    class="cols-13/15 cols-10/31@sm-md cols-15/27@md pad-20-1/15 pad-40-3/31@sm pad-60-2/31@md mar-20-2/15 mar-40-3/31@sm mar-60-2/31@md flex-jc:ce flex-jc:fs-ai:fs@sm flex-jc:fe@md"
>
    ...
</div>
```

<details>
<summary>Con los siguientes estilos</summary>

```css
.cols-13\/15 {
    width: 86.667%;
}

.pad-20-1\/15 {
    padding: 20px 6.667%;
}

.mar-20-2\/15 {
    margin: 20px 13.333%;
}

.flex-jc\:ce {
    justify-content: center;
    display: flex;
}

@media screen and (min-width: 600px) {
    .pad-40-3\/31\@sm {
        padding: 40px 9.677%;
    }
    .mar-40-3\/31\@sm {
        margin: 40px 9.677%;
    }
    .flex-jc\:fs-ai\:fs\@sm {
        justify-content: flex-start;
        align-items: flex-start;
        display: flex;
    }
}

@media screen and (min-width: 600px) and (max-width: 899px) {
    .cols-10\/31\@sm-md {
        width: 32.258%;
    }
}

@media screen and (min-width: 900px) {
    .flex-jc\:fe\@md {
        justify-content: flex-end;
        display: flex;
    }
    .cols-15\/27\@md {
        width: 55.556%;
    }
    .pad-60-2\/31\@md {
        padding: 60px 6.452%;
    }
    .mar-60-2\/31\@md {
        margin: 60px 6.452%;
    }
}
```

</details>

> OJO: El método **'set'** también procesa las directivas de los margenes y paddings por separado, osea **'mart, marr, padb, padl, etc'**

> Los estilos creados por el método **'set'** se auto insertan en el sistema para poder ser usado por los nodos virtuales cuando se agreguen al DOM.

[&uarr; Volver Arriba](#métodos)

### SetCols

Es exactamente igual que el método 'set' pero procesa solamente las columnas, de echo...

### SetPad, SetPadTop, SetPadRight, SetPadBottom, SetPadLeft, SetMar, SetMarTop, SetMarRight, SetMarBottom, SetMarLeft, SetMaxWidth, SetMaxHeight, SetMinWidth, SetMinHeight, SetFlex, SetPosition, SetTop, SetRight, SetBottom, SetLeft

Son iguales a SetCols pero referencian a procesar los paddings, el padding Top, right, bottom, left, los margenes, el margen Top, right, bottom, left, el max/min width y height, el Position, el Top, Right, Bottom y Left respectivamente, ah! y casí me olvido el 'setFlex' procesa lo que es pues... la directiva 'flex' XD.

[&uarr; Volver Arriba](#métodos)

De echo, los métodos builds son lo mismo, pero para esto no es necesario pasarle como parametro el Nodo, sino el valor a procesar, veamos:

### Build

Sirve para procesar todos los valores de todos los atributos aceptados por el sistema:

#### Sintaxis

```javascript
layouter.build(Object);

// Object Syntax
{
    nameDirective: valueDirective;
}
```

#### Ejemplo:

```javascript
layouter.build({
    flex: 'jc:ce ai:ce',
    cols: '3/13 21/21@sm 27/27@md',
    mar: '0-2/13-0-0@-sm 0-0-20-0@sm',
    pad: '20-0@sm',
});
```

Y nos devuelve un objeto con los nombres de las clases creadas junto con los estilos:

```javascript
{
  flex: {
    "flex-jc:ce-ai:ce@xs": ".flex-jc\\:ce-ai\\:ce\\@xs{justify-content:center;align-items:center;display: flex;}"
  },
  cols: {
    "cols-21/21@sm": "@media screen and (min-width: 600px){.cols-21\\/21\\@sm{width:100%}}",
    "cols-27/27@md": "@media screen and (min-width: 900px){.cols-27\\/27\\@md{width:100%}}",
    "cols-3/13": ".cols-3\\/13{width:23.077%}"
  },
  mar: {
    "mar-0-0-20-0@sm": "@media screen and (min-width: 600px){.mar-0-0-20-0\\@sm{margin:0 0 20px 0}}",
    "mar-0-2/13-0-0@-sm": "@media screen and (max-width: 767px){.mar-0-2\\/13-0-0\\@-sm{margin:0 15.385% 0 0}}"
  },
  pad: {
    "pad-20-0@sm": "@media screen and (min-width: 600px){.pad-20-0\\@sm{padding:20px 0}}"
  }
}
```

[&uarr; Volver Arriba](#métodos)

### SetPadX, SetPadY, SetMarX, SetMarY

Sirven para procesar las directivas **'padx' y 'pady'** respectivamente de un nodo.

> Tambien podemos usar la forma reducida de la directiva `<div px="10">...</div>` o `<div py="20">...</div>`

#### Ejemplo 1:

```html
<div padx="10 20@sm 30@md">...</div>
```

```javascript
// teniendo en cuenta el Div declarado arriba ...
const myDiv = document.querySelector('div');
layouter.setPadX(myDiv);
```

...luego de autoprocesarce obtendríamos este resultado:

```html
<div class="pr-10 pr-20@sm pr-30@md pl-10 pl-20@sm pl-30@md">...</div>
```

<details>
<summary>y pues, estos estilos:</summary>

```css
.pl-10 {
    padding-left: 10px;
}
.pr-10 {
    padding-right: 10px;
}

@media screen and (min-width: 600px) {
    .pl-20\@sm {
        padding-left: 20px;
    }
    .pr-20\@sm {
        padding-right: 20px;
    }
}

@media screen and (min-width: 900px) {
    .pl-30\@md {
        padding-left: 30px;
    }
    .pr-30\@md {
        padding-right: 30px;
    }
}
```

</details>

#### Ejemplo 2:

Lo mismo para el **'marx'** o para su versión reducida **'mx'**.

```html
<div marx="10 20@sm 30@md">...</div>
```

```javascript
// teniendo en cuenta el Div declarado arriba ...
const myDiv = document.querySelector('div');
layouter.setMarX(myDiv);
```

...luego de autoprocesarce obtendríamos este resultado:

```html
<div class="mr-10 mr-20@sm mr-30@md ml-10 ml-20@sm ml-30@md">...</div>
```

<details>
<summary>y pues, estos estilos:</summary>

```css
.ml-10 {
    margin-left: 10px;
}
.mr-10 {
    margin-right: 10px;
}

@media screen and (min-width: 600px) {
    .ml-20\@sm {
        margin-left: 20px;
    }
    .mr-20\@sm {
        margin-right: 20px;
    }
}

@media screen and (min-width: 900px) {
    .ml-30\@md {
        margin-left: 30px;
    }
    .mr-30\@md {
        margin-right: 30px;
    }
}
```

</details>

[&uarr; Volver Arriba](#métodos)

### BuildCols

Sirve para procesar solamente las columnas:

#### Sintaxis

```javascript
layouter.buildCols(String);
```

#### Ejemplo:

```javascript
layouter.buildCols('3/13 21/21@sm 27/27@md');
```

...y nos devuelve este objeto:

```javascript
{
  "cols-21/21@sm": "@media screen and (min-width: 600px){.cols-21\\/21\\@sm{width:100%}}",
  "cols-27/27@md": "@media screen and (min-width: 900px){.cols-27\\/27\\@md{width:100%}}",
  "cols-3/13": ".cols-3\\/13{width:23.077%}"
}
```

[&uarr; Volver Arriba](#métodos)

### BuildMar, BuildMarTop, BuildMarRight, BuildMarBottom, BuildMarLeft, BuildPad, BuildPadTop, BuildPadRight, BuildPadBottom, BuildPadLeft, BuildWidth, BuildHeight, BuildMaxWidth, BuildMaxHeight, BuildMinWidth, BuildMinHeight, BuildFlex, BuildPosition, BuildTop, BuildRight, BuildBottom, BuildLeft

Son exactamente lo mismo de 'buildCols', pero para procesar los margenes (top, right, bottom, y left), paddings, máximo ancho & alto y flex tmb.

### BuildPadX, BuildPadY, BuildMarX, BuildMarY

Sirve para procesar los valores de las directivas **'padx', 'pady', 'marx' y 'mary'** respectivamente.

#### Ejemplo 1:

```javascript
layouter.buildPadX('10 20@sm 30@md');
```

...y nos devuelve este objeto:

```javascript
{
    "pl-10": ".pl-10{padding-left:10px}",
    "pl-20@sm": "@media screen and (min-width: 600px){.pl-20\\@sm{padding-left:20px}}",
    "pl-30@md": "@media screen and (min-width: 900px){.pl-30\\@md{padding-left:30px}}",
    "pr-10": ".pr-10{padding-right:10px}",
    "pr-20@sm": "@media screen and (min-width: 600px){.pr-20\\@sm{padding-right:20px}}",
    "pr-30@md": "@media screen and (min-width: 900px){.pr-30\\@md{padding-right:30px}}"
}
```

#### Ejemplo 2:

```javascript
layouter.buildMarY('10 20@sm 30@md');
```

...y nos devuelve este objeto:

```javascript
{
    "mb-10": ".mb-10{margin-bottom:10px}",
    "mb-20@sm": "@media screen and (min-width: 600px){.mb-20\\@sm{margin-bottom:20px}}",
    "mb-30@md": "@media screen and (min-width: 900px){.mb-30\\@md{margin-bottom:30px}}",
    "mt-10": ".mt-10{margin-top:10px}",
    "mt-20@sm": "@media screen and (min-width: 600px){.mt-20\\@sm{margin-top:20px}}",
    "mt-30@md": "@media screen and (min-width: 900px){.mt-30\\@md{margin-top:30px}}"
}
```

[&uarr; Volver Arriba](#métodos)

### GetParameters

Tambien es posible obtener los parametros definidos en un elemento, digamos, tenemos un DIV, y queremos saber si tiene cols, mar, flex o los que tengan, pues tiramos del método, 'getParameters'

```javascript
const myDiv = document.querySelector('div');
layouter.getParameters(myDiv);

// Obtendremos un objeto así...

{
  cols: [ "13/15", "10/31@sm-md", "15/27@md" ],
  mar: [ "20-2/15", "40-3/31@sm", "60-2/31@md" ],
  pad: [ "20-1/15", "40-3/31@sm", "60-2/31@md" ],
  flex: [ "jc:c", "jc:fs@sm", "jc:fe@md", 'ai:fs@sm' ]
}
```

[&uarr; Volver Arriba](#métodos)

### Reset

Si por algún motivo necesitamos remover todas las clases tipo layouter sobre un nodo, podemos usar el método 'reset'.

> Las clases se removerán del nodo pero seguirán disponibles para el uso en cualquier otro nodo.

```javascript
const myDiv = document.querySelector('div');
myDiv.className = 'my-div pad-10-1/15 pad-20-3/31@sm test pad-30-2/31@md mar-0-0-40'
layouter.reset(myDiv);

// el nodo se quedará solo con dos clases
myDiv.className => 'my-div test'
```

[&uarr; Volver Arriba](#métodos)

## Important Flag

Es posible, pero no recomendable, adicionar un caracter especial en la declaración de las columnas, margenes, padding, y el display, el cual agregará el "!important" comun que se usa en CSS, este caracter es el 'signo de exclamación'.

> Siempre se debe agregar al final de la sentencia declarada

**Ejemplo:**

```html
<div cols="13/15! 20/27@sm!"></div>
```

El cual nos dará el siguiente CSS:

```css
.cols-13\/15\! {
    width: 86.667% !important;
}

@media screen and (min-width: 600px) {
    .cols-20\/27\@sm {
        width: 74.074% !important;
    }
}
```

[&uarr; Volver Arriba](#utils)

## Getters

Podemos acceder a los siguientes getters desde la **variable 'layouter' del objeto 'window'**:

| Propiedad   | Type                               | Description                                                                                                                                                     |
| ----------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| breakpoints | string[]                           | Devuelve un array con los breakpoints definidos en la configuración.                                                                                            |
| sizes       | { [alias: string]: number }        | Devuelve un objeto en donde cada propiedad es el nombre del breakpoint y como valor de esas propiedades los pixeles de ancho designados para esos breakpoints.  |
| cols        | { [ alias: string ]: number }      | Devuelve un objeto en donde cada propiedad es el nombre del breakpoint y como valor de esas propiedades el número de columnas designadas para esos breakpoints. |
| styles      | { [ alias: string ]: number }      | Este getter es interesante, porque devuelve un objeto con todos los estilos creados de forma general.                                                           |
| version     | string                             | Nos devolverá la versión actual de la librería.                                                                                                                 |
| processors  | Record<TDirectiveName, IProcessor> | Un objecto con todos los procesadores disponibles.                                                                                                              |

> Tomando en cuenta el ejemplo de breakpoints de más arriba, los getters nos devolverán lo siguiente:

```javascript
layouter.breakpoints = [ "xs", "sm", "md", "lg", "xlg" ]
layouter.sizes = { xs: 0, sm: 600, md: 900, lg: 1200, xlg: 1536 }
layouter.cols = { xs: 15, sm: 25, md: 31, lg: 41, xlg: s51 }
layouter.styles = {
  "cols-10\\/31@sm-md": "@media screen and (min-width: 600px) and (max-width: 899px){.cols-10\\/31\\@sm-md{width:32.258%}}"
  "cols-13\\/15": ".cols-13\\/15{width:86.667%}"
  "cols-15\\/27@md": "@media screen and (min-width: 900px){.cols-15\\/27\\@md{width:55.556%}}"
  "flex-jc\\:c": ".flex-jc\\:c{justify-content:center;display: flex}",
  ...
}
layouter.version = '1.8.0'
```

[&uarr; Volver Arriba](#utils)
