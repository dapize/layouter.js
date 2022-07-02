<div align="center">
    <p>
        <img src="header.png" alt="Layouter"/>
    </p>
    <p>
        <strong>⚡️ Build the entire layout of your website without CSS ⚡️</strong>
    </p>
    <p>
        <a href="DOCS.md"><img src="en_US.png" alt="English Language"/> English</a> — <a href="DOCS-es_ES.md"><img src="es_ES.png" alt="English Language"/> Spanish</a>
    </p>
</div>

# 📚 Documentación

The styles created by Layouter are **created on the flight**, _[when the browser finishes loading the website]_. We can define the columns, the paddings, the margins, the width and high of an element and even determine if the node will have Display **'flex'** and its derivatives.

## 🔧 Installation

You just have to call, in the html, the script ** layouter.umd.js ** that is inside the folder ** 'dist' ** of this repository:

```html
<script src="layouter.umd.js"></script>
```

**Also** You can use **one** of these CDNS:

```html
<script src="https://cdn.jsdelivr.net/npm/layouter.js/dist/layouter.umd.js" defer></script>
<script src="https://unpkg.com/layouter.js/dist/layouter.umd.js" defer></script>
```

Or you can install it on your project with:

```properties
npm install layouter.js
// o
yarn add layouter.js
```

If it is required to use it **in SSR you must pass the Windows object of 'JSDOM'** and your configuration, like this:

```javascript
const { JSDOM } = require('jsdom');
const { window } = new JSDOM();

require('layouter.js')(window, {
    // Your configuration here
});
```

## ⚙️ Configuration

For a personalized configuration we must **create a variable called 'layouterconfig'** in the global object 'Window', which will contain an object with the following properties:

| Option          | Type     | Default | Description                                                                                                                                                                                                                 |
| --------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **breakpoints** | object   | `...`   | Object that contains the breakpoints that the system will use.                                                                                                                                                              |
| prefix          | string   | ''      | Define what the prefix will be for all CSS classes that will be added to the nodes, this in order to safeguard some collision with other defined classes.                                                                   |
| debug           | boolean  | true    | It serves to enable the `console.eror` for when an inconsistent definition occurs or some processing error is presented.                                                                                                    |
| bridge          | boolean  | true    | It allows to insert the styles created by the system through the 'insert' method of the Tag Scope, without adding it as a child text node. **Eye:** _Shabilite this option if the dom is manipulated by another bookstore._ |
| **ready**       | function | null    | It serves as callback to indicate that the initial processing at the end. It can be used to remove the Web's Loading Overlay (if you have, of course)                                                                       |

### 📐 Breakpoints

Each Breakpoint is an object that must have as a property name a **'alias'** and within that object it must have the following properties:

| Property | Type   | Descripción       |
| -------- | ------ | ----------------- |
| width    | number | Maximum width     |
| cols     | number | Number of columns |

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

That defined alias will be used to determine the Breakpoint in each value of the directives.

### 💡 To take in mind:

-   How many breakpoints can be defined, there is no limit.
-   Devido to normally model in 'Mobile First' ** The Breakpoint 'XS' does not need a 'average query' (bone: @media). **
-   If no unit of measure is defined in the value of any directive (which is not naturally percentage), it will be taken in pixels [I mean this 🔗](#defined-units-of-measure)

## Directives

| Name                               | Alias                  | Examples                                                                                  | Description                                                                                                 |
| ---------------------------------- | ---------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| [Cols](DOCS.md#cols)               | `c`                    | `cols="13/15"`, `c="5/10"`                                                                | Determines the columns, that is, the 'width' as a percentage.                                               |
| [d](DOCS.md#display)               | `display`              | `d="bl"`, `display="inline"`                                                              | Determines the **display** that the node will have.                                                         |
| [Mart](DOCS.md#mart)               | `mt`, `margin-top`     | `mart="10"`, `mt="20"`, `margin-top="12"`                                                 | Determines the **top margin** of a node.                                                                    |
| [Marr](DOCS.md#marr-marb-marl)     | `mr`, `margin-right`   | `marr="2/15"`, `mr="5/10"`, `margin-right="3/5"`                                          | Determine the **right margin** of a node.                                                                   |
| [Marb](DOCS.md#marr-marb-marl)     | `mb`, `margin-bottom`  | `marb="30"`, `mb="50"`, `margin-bottom="25"`                                              | Determine the **bottom margin** of a node.                                                                  |
| [Marl](DOCS.md#marr-marb-marl)     | `ml`, `margin-left`    | `marl="3/15"`, `ml="5/10"`, `margin-left="3/5"`                                           | Determine the **left margin** of a node.                                                                    |
| [Mar](DOCS.md#mar)                 | `m`, `margin`          | `mar="20-2/15-30-3/15"`, `m="20-2/15-30-3/15"`, `margin="20-2/15-30-3/15"`                | It is a shorthand of the directives: [mart](DOCS.md#mart), [marr, marb, y marl](DOCS.md#marr-marb-marl).    |
| [Mary](DOCS.md#mary-marx)          | `my`, `margin-y`       | `mary="10"`, `my="20"`, `margin-y="30"`                                                   | Determine the **top and bottom margin** of a node.                                                          |
| [Marx](DOCS.md#mary-marx)          | `mx`, `maring-x`       | `marx="10"`, `mx="20"`, `margin-x="30"`                                                   | Determine the **right and left margin at the same time** of a node.                                         |
| [Padt](DOCS.md#padt)               | `pt`, `padding-top`    | `padt="10"`, `pt="20"`, `padding-top="30"`                                                | Determine the **top padding** of a node.                                                                    |
| [Padr](DOCS.md#padr-padb-padl)     | `pr`, `padding-right`  | `padr="2/15"`, `pr="3/16"`, `padding-right="4/17"`                                        | Determine the **padding right** of a node.                                                                  |
| [Padb](DOCS.md#padr-padb-padl)     | `pb`, `padding-bottom` | `padb="30"`, `pb="40"`, `padding-bottom="50"`                                             | Determine the **bottom padding** of a node.                                                                 |
| [Padl](DOCS.md#padr-padb-padl)     | `pl`, `padding-left`   | `padl="3/15"`, `pl="4/16"`, `padding-left="5/17"`                                         | Determine the **left padding** of a node.                                                                   |
| [Pad](DOCS.md#pad)                 | `p`, `padding`         | `pad="20-2/15-30-3/15"`, `p="20-2/15-30-3/15"`, `padding="20-2/15-30-3/15"`               | It is a shorthand of the directives: [padt](DOCS.md#padt), [padr, padb, y padl](DOCS.md#padr-padb-padl).    |
| [Pady](DOCS.md#pady-padx)          | `py`, `padding-y`      | `pady="10"`, `py="20"`, `padding-y="30"`                                                  | Determine the **padding top and bottom than the same time** of a node.                                      |
| [Padx](DOCS.md#pady-padx)          | `px`, `padding-x`      | `padx="10"`, `px="20"`, `padding-x="30`                                                   | Determine the **right and left padding** at the same time of a node.                                        |
| [Flex](DOCS.md#flex)               | `fx`                   | `flex="jc:ce ai:fs fd:co"`, `flex="jc:fe ai:fs`, `fx="align-items:center flex-wrap:wrap"` | Determine the **display Flex** of the node and its derivatives.                                             |
| [Wdh](DOCS.md#width)               | `w`, `width`           | `wdh="100"`, `w="200"`, `width="300"`                                                     | Determine the **width** of the node in pixels or other [unit of measure](DOCS.md#unit-of-measure).          |
| [Hgt](DOCS.md#height)              | `h`, `height`          | `hgt="100"`, `h="200"`, `height="300"`                                                    | Determine the **height** of the node in pixels or other [unit of measure](DOCS.md#unit-of-measure).         |
| [Mxw](DOCS.md#maxwidth)            | `max-width`            | `mxw="200"`, `max-width="300"`                                                            | Determine the **maximum width** of the node in pixels or other [unit of measure](DOCS.md#unit-of-measure).  |
| [Mxh](DOCS.md#maxheight)           | `max-height`           | `mxh="200"`, `max-height="300"`                                                           | Determine the **maximum height** of the node in pixels or other [unit of measure](DOCS.md#unit-of-measure). |
| [Miw](DOCS.md#minwidth)            | `min-width`            | `miw="300"`, `min-width="400"`                                                            | Determine the **minimum width** of the node in pixels or other [unit of measure](DOCS.md#unit-of-measure).  |
| [Mih](DOCS.md#minheight)           | `min-height`           | `mih="300"`, `min-height="400"`                                                           | Determine the **high height** of the node in pixels or other [unit of measure](DOCS.md#unit-of-measure).    |
| [Pos](DOCS.md#position)            | `position`             | `pos="re"`, `position="relative"`                                                         | Determine the **position** of node.                                                                         |
| [T](DOCS.md#top-right-bottom-left) | `top`                  | `t="10"`, `top="20"`                                                                      | Determine the **top** of the node in pixels or other [unit of measure](DOCS.md#unit-of-measure).            |
| [R](DOCS.md#top-right-bottom-left) | `right`                | `r="10"`, `right="20"`                                                                    | Determine the **right** of the node in pixels or other [unit of measure](DOCS.md#unit-of-measure).          |
| [B](DOCS.md#top-right-bottom-left) | `bottom`               | `b="10"`, `bottom="20"`                                                                   | Determine the **bottom** of the node in pixels or other [unit of measure](DOCS.md#unit-of-measure).         |
| [L](DOCS.md#top-right-bottom-left) | `left`                 | `l="10"`, `left="20"`                                                                     | Determine the **left** of the node in pixels or other [unit of measure](DOCS.md#unit-of-measure).           |

## Methods

The following methods are internal of the system, and **It is not necessary to use them** because the system uses them automatically, but they are there for any other purpose.

These methods are exposed in the **Global Variable 'Layouter'**, which is on the object **Window**.

| Nombre                                                                                                                                                                                                                                                                                              | Argumentos                                                                         | Devuelve                                  | Descripción                                                 |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------- | ----------------------------------------------------------- |
| [**Set**](#set)                                                                                                                                                                                                                                                                                     | `Node: HTMLElement\|Element, parameters?: Partial<Record<TDirectiveName, string>>` | `Promise<void\|Error>`                    | **Shorthand** for methods of **type 'set'**.                |
| [**setCols**](#setcols)                                                                                                                                                                                                                                                                             | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Process the Directive **'cols'**                            |
| [setPadTop](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                     | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Process the Directive **'padt'**                            |
| [setPadRight](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                   | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Process the Directive **'padr'**                            |
| [setPadBottom](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                  | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Process the Directive **'padb'**                            |
| [setPadLeft](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                    | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Process the Directive **'padl'**                            |
| [**setPad**](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                    | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Process the Directive **'pad'**                             |
| [setPadX](#setpadx-setpady-setmarx-setmary)                                                                                                                                                                                                                                                         | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Process the Directive **'padx'**                            |
| [setPadY](#setpadx-setpady-setmarx-setmary)                                                                                                                                                                                                                                                         | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Process the Directive **'pady'**                            |
| [setMarTop](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                     | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Process the Directive **'mart'**                            |
| [setMarRight](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                   | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Process the Directive **'marr'**                            |
| [setMarBottom](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                  | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Process the Directive **'marb'**                            |
| [setMarLeft](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                    | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Process the Directive **'marl'**                            |
| [**setMar**](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                    | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Process the Directive **'mar'**                             |
| [setMarX](#setpadx-setpady-setmarx-setmary)                                                                                                                                                                                                                                                         | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Process the Directive **'marx'**                            |
| [setMarY](#setpadx-setpady-setmarx-setmary)                                                                                                                                                                                                                                                         | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Process the Directive **'mary'**                            |
| [setFlex](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                       | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Process the Directive **'flex'**                            |
| [setWidth](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                      | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Process the Directive **'wdh'**                             |
| [setMinWidth](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                   | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Process the Directive **'miw'**                             |
| [setMaxWidth](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                   | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Process the Directive **'mxw'**                             |
| [setHeight](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                     | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Process the Directive **'hgt'**                             |
| [setMaxHeight](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                  | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Process the Directive **'mxh'**                             |
| [setMinHeight](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                  | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Process the Directive **'mih'**                             |
| [setPosition](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                   | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Process the Directive **'pos'**                             |
| [setTop](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                        | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Process the Directive **'t'**                               |
| [setRight](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                      | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Process the Directive **'r'**                               |
| [setBottom](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                     | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Process the Directive **'b'**                               |
| [setLeft](#setpad-setpadtop-setpadright-setpadbottom-setpadleft-setmar-setmartop-setmarright-setmarbottom-setmarleft-setmaxwidth-setmaxheight-setminwidth-setminheight-setflex-setposition-settop-setright-setbottom-setleft)                                                                       | `Node: HTMLElement\|Element, values?: string`                                      | `Promise<void\|Error>`                    | Process the Directive **'l'**                               |
| [**buildCols**](#buildcols)                                                                                                                                                                                                                                                                         | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Processes directive values **'cols'**                       |
| [buildMarTop](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)    | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Processes directive values **'mart'**                       |
| [buildMarRight](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)  | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Processes directive values **'marr'**                       |
| [buildMarBottom](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft) | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Processes directive values **'marb'**                       |
| [buildMarLeft](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)   | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Processes directive values **'marl'**                       |
| [**buildMar**](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)   | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Processes directive values **'mar'**                        |
| [buildPadTop](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)    | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Processes directive values **'padt'**                       |
| [buildPadRight](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)  | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Processes directive values **'padr'**                       |
| [buildPadBottom](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft) | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Processes directive values **'padb'**                       |
| [buildPadLeft](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)   | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Processes directive values **'padl'**                       |
| [buildPadX](#buildpadx-buildpady-buildmarx-buildmary)                                                                                                                                                                                                                                               | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Processes directive values **'padx'**                       |
| [buildPadY](#buildpadx-buildpady-buildmarx-buildmary)                                                                                                                                                                                                                                               | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Processes directive values **'padx'**                       |
| [**buildPad**](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)   | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Processes directive values **'pad'**                        |
| [**buildFlex**](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)  | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Processes directive values **'flex'**                       |
| [buildWidth](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)     | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Processes directive values **'wdh'**                        |
| [buildMinWidth](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)  | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Processes directive values **'miw'**                        |
| [buildMaxWidth](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)  | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Processes directive values **'mxw'**                        |
| [buildHeight](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)    | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Processes directive values **'hgt'**                        |
| [buildMaxHeight](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft) | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Processes directive values **'mih'**                        |
| [buildHeight](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)    | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Processes directive values **'mxh'**                        |
| [buildPosition](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)  | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Processes directive values **'pos'**                        |
| [buildTop](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)       | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Processes directive values **'t'**                          |
| [buildRight](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)     | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Processes directive values **'r'**                          |
| [buildBottom](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)    | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Processes directive values **'b'**                          |
| [buildLeft](#buildmar-buildmartop-buildmarright-buildmarbottom-buildmarleft-buildpad-buildpadtop-buildpadright-buildpadbottom-buildpadleft-buildwidth-buildheight-buildmaxwidth-buildmaxheight-buildminwidth-buildminheight-buildflex-buildposition-buildtop-buildright-buildbottom-buildleft)      | `values: string, insertStyles?: boolean`                                           | `IStyles\|Error`                          | Processes directive values **'l'**                          |
| [**build**](#build)                                                                                                                                                                                                                                                                                 | `obj: Partial<Record<TDirectiveName, string>>, insertStyles?: boolean`             | `Partial<IBuildResult> \| Error`          | Shorthand for the methods **'build'**                       |
| [getParameters](#getparameters)                                                                                                                                                                                                                                                                     | `Node: HTMLElement\|Element`                                                       | `Partial<Record<TDirectiveName, string>>` | Extract the directives and values of a node                 |
| [reset](#reset)                                                                                                                                                                                                                                                                                     | `Node: HTMLElement\|Element`                                                       | `Promise<void>`                           | Eliminates from a node the classes generated by the system. |

<details>
<summary><b>Types and guide interfaces</b></summary>

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
```

</details>

## Utils

-   [Important Flag](#important-flag)
-   [Getters](#getters)

## ✨ Examples

### Cols

#### Example 1: With simple breakpoints (Min-Width)

We have a 'div' to which we want to designate 13 of 15 columns in Mobile, 10 columns of 31 on tablet and 15 columns of 27 in Desktop, so we create **the directive called 'colts'** with the following value:

```html
<div cols="13/15 10/31@sm 15/27@md">...</div>
```

> The arroba suffix means that these columns will apply from the determined breakpoint

For the div of the example above it was determined that:

-   It will have 13 columns of 15, and as the Arroba sign does not have as its suffix, it means that it will have them in the 'breakpoint with width lower the **'xs'**. If the **div** would only have that defined directive, after its self -process we would obtain this result:

```html
<div class="cols-13/15">...</div>
```

> We see that the directive 'cols' disappeared from the element, this is because it no longer needs it once processed

And as styles we would have a class called 'cols-13/15' which would give us these styles:

```css
.cols-13\/15 {
    width: 86.666%;
}
```

**Seguimos**...

-   For the breakpoint 'sm' (I mean 'Tablet') it was determined that it will have 10 columns of 31, after processing it we would get this result:

```html
<div class="cols-10/31@sm">...</div>
```

But as determined in a breakpoint, the styles would be governed by him

```css
@media screen and (min-width: 600px) {
    .cols-10\/31\@sm {
        width: 32.258%;
    }
}
```

-   For the breakpoint **'md' (I mean 'desktop')** it was determined that 15 columns of 27 will be will have, and after self -process we would get this result:

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

**Finally** If we process the full value of the parameter **'cols'** `(13/15 10/31@sm 15/27@md)` We would get this result:

```html
<div class="cols-13/15 cols-10/31@sm cols-15/27@md">...</div>
```

And then, these styles:

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

> **Eye**: These classes will be available for all the elements that need them, they are general.

#### Example 2: With Breakpoint Min-Width and Max-Width

We have a div that apart from having 13 columns of 15 in Mobile (the breakpoint larger, to continue with the 13 columns of 15 that was put in Mobile. Then...

```html
<div cols="13/15 20/27@sm-md"></div>
```

The dash (-) indicates 'from / to' where you want to determine the columns. In styles we would have this:

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

...although only the 'even' can be used, like this:

```html
<div cols="20/27@-md"></div>
```

> This will give 20 columns from 27 to 'desktop' (at the Breakpoint 'md')

And in styles we will get this:

```css
@media screen and (max-width: 899px) {
    .cols-20\/27\@sm {
        width: 74.074%;
    }
}
```

#### Example 3: Explicit columns by Breakpoint.

When we want to determine a number of columns in a specific breakpoint but without designating the number of columns where to get them (or maximum), we can do so:

```html
<div cols="13 20@sm">...</div>
```

That is the same as putting this: `<div cols="13/15 20/31@sm">...</div>`

The number of columns where the designated columns will be taken, and that the Breakpoint will take the number of columns designated for that breakpoint, will be obvious: the system will recognize that there are 13 columns of 15 xq not determined Breakpoint, and 15 are the columns Maximum that Breakpoint 'XS' (Mobile) has, and will also recognize that there are 20 columns of 31, because 20 columns were determined in the breakpoint 'SM' (tablet) and the maximum columns available on tablet are 31.

> **NOTE**: **You can not** determine explicit columns in compound breakpoints, I mean in the 'from / to', only in breakpoints 'from', I mean these '@sm', if you will not throw an error message and will not process.

```html
<!-- This is not valid-->
<div cols="20@sm-md">...</div>
```

This method of explicit columns is only to save us a little time when designating the columns we want in the 'cols' directive. However, it could be helpful to determine thus at any time the designated columns for a specific breakpoint change, let's say that in the breakpoint 'sm' (Tablet), and there are not 31 columns but 32, because with the designation of explicit column we We would save having to change in each element where we try `cols="20/31@sm"`.

[&uarr; Go back up](#directives)

### Display

It is used to determine the **display** what will the node have.

### Available values

-   **bl**: display
-   **il**: inline
-   **ib**: inline-block
-   **fx**: flex
-   **if**: inline-flex
-   **no**: none
-   **in**: in
-   **ih**: inherit

#### Example:

```html
<div d="re">...</div>
```

or in more semantic mode

```html
<div display="block inline@sm none@md">...</div>
```

There is not much to explain here, use the same rules as the other directives, only is focused on the definition of the display.

-   In the first example `display: relative` for the breakpoint **'xs'** (Mobile)
-   In the second example, a little more extensive, it was defined that in the breakpoint **'xs'** the display will be **'block'**, then for the breakpoint **'sm'** it will be **'inline'** And finally for the breakpoint **'md'** the display will be **'none'**.

[&uarr; Go back up](#directives)

### Mar

It is an abbreviation of the Shorthand 'margin' **(and in turn is a shorthand of the directives: Mart, Marr, Marb, and Marl)** and serves to determine the superior margins, rights, lower and lower of an element.

#### Example:

```html
<div mar="20-2/15 40-3/31-20@sm 60-2/31@md">...</div>
```

> Use the same combination margin syntax, I mean: margin-Top, margin-Right, margin-Bottom, margin-Left. But only for the margin Left and Right, 'auto' can be found, if it is required clear. Mini Example: `mar="20-Auto"`

**Only higher and lower margins are processed as pixels**, the rights and left are processed percentage.

**Explanation:** In the example above it is being determined that the div:

-   It will have 20 upper margin pixels (Margin-Top) and lower, also 2 columns of 15, in Mobile.
-   It will have 40 upper margin pixels, 3 columns of 31 right and left margin and 20 lower margin pixels on tablet.
-   And in Desktop, it will have 60 Pixels of upper and lower margin and 2 columns of 31 of the right and left margin.

...After self -process we would get this result:

```html
<div class="mar-20-2/15 mar-40-3/31-20@sm mar-60-2/31@md">...</div>
```

> We see that the directive **'mar'** disappeared from the element, this is because does not need it once processed.

And then, these styles:

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

> Here applies the same of 'cols', with compound breakpoints, (from / to)

[&uarr; Go back up](#directives)

> If you want to determine the margins of forming separate, that is, only the margin: upper, right, lower or left then we use mart, marb, marb, and marl respectively, let's see them below:

### Mart

Is used to determine the top margins of an element.

#### Example:

```html
<div mart="10 20.5@sm 30@md">...</div>
```

**Explanation:** In the example above it is being determined that the upper margin of the distinguish:

-   10 pixels in Mobile.
-   20.5 pixels in tablet.
-   And 30 pixels in Desktop.

...After self -process we would get this result:

```html
<div class="mart-10 mart-20_5@sm mart-30@md">...</div>
```

> We see that the directive **'mart'** disappeared from the element, this is because Yá does not need it once processed

Y luego, estos estilos:

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

[&uarr; Go back up](#directives)

### Marr, Marb, Marl

They serve to determine the rights, lower and left respectively to a node. It's the same as 'mart'

#### A simple example:

```html
<div marr="10 20.5@sm 30@md">...</div>
<div marb="20 30.5@sm 40@md">...</div>
<div marl="30 40.5@sm 50@md">...</div>
```

...after self -process we would get this result:

```html
<div class="marr-10 marr-20_5@sm marr-30@md">...</div>
<div class="marb-20 marb-30_5@sm marb-40@md">...</div>
<div class="marl-30 marl-40_5@sm marl-50@md">...</div>
```

<details>
<summary>The generated styles would be these:</summary>

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

[&uarr; Go back up](#directives)

### Defined units of measure

For the definitions of the majority of directives that are self -defined as pixels, such as the 'Mart', 'Marb', and any other, it is possible to define a unit of relative measure, which can be: **%, rem, em, ex, vw y vh**,

**For example:**

```html
<div mart="20%">...</div>
```

... After self -process we would get this result:

```html
<div class="mart-0¯20">...</div>
```

And then, these style:

```css
.mart-0¯20 {
    margin-top: 20%;
}
```

**NOTE**:This applies to any other value that is self -defined as pixels: **mih, mxw, padt, padb, etc.**

### Pad

Is used to determine the paddings that will be given. Like the directive **'mar'**, only the Padding Top and Bottom will be taken as Pixels and the Left and Right as percentage.

It has exactly the same syntax as 'mar'

#### Example:

```html
<div pad="20-1/15 40-3/31@sm 60-2/31@md">...</div>
```

...After self -process we would get this result:

```html
<div class="pad-20-1/15 pad-40-3/31@sm pad-60-2/31@md">...</div>
```

<details>
<summary>And then, these styles:</summary>
    
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

```

</details>

[&uarr; Go back up](#directives)

### Padt

It is used to determine the top paddings of an element.

#### Example:

```html
<div padt="10 20.5@sm 30@md">...</div>
````

**Explanation:** In the top example, it is being determined that the superior padding of the distinguished:

-   10 pixels in Mobile.
-   20.5 pixels in tablet.
-   And 30 pixels in Desktop.

...After self -process we would get this result:

```html
<div class="padt-10 padt-20_5@sm padt-30@md">...</div>
```

<details>
<summary>And then, these styles:</summary>

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

[&uarr; Go back up](#directives)

### Padr, Padb, Padl

It is used to determine the rights, lower and left paddings respectively in an element. It's the same as 'padt'

#### A simple example:

```html
<div padr="10 20.5@sm 30@md">...</div>
<div padb="20 30.5@sm 40@md">...</div>
<div padl="30 40.5@sm 50@md">...</div>
```

...After self -process we would get this result:

```html
<div class="padr-10 padr-20_5@sm padr-30@md">...</div>
<div class="padb-20 padb-30_5@sm padb-40@md">...</div>
<div class="padl-30 padl-40_5@sm padl-50@md">...</div>
```

<details>
<summary>And then, these styles:</summary>

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

[&uarr; Go back up](#directives)

### PadY, PadX

These directives are Plus, since they are a 2 directive shorthand, let's look at them:

-   **'pady'** or only **'py'**: Will determine the superior and lower padding as a node:

#### Example:

```html
<div pady="10 20@sm 30@md">...</div>
```

or super short way we can use `<div py="10 20@sm 30@md">...</div>`.

<details>
<summary>creates these styles:</summary>

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

-   **'padx'** or only **'px'**: Will determine the right and left padding at the same time of a node:

#### Example:

```html
<div padx="10 20@sm 30@md">...</div>
```

or super short way we can use `<div px="10 20@sm 30@md">...</div>`.

<details>
<summary>And create these styles:</summary>

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

[&uarr; Go back up](#directives)

### MarY, MarX

These directives are Plus, since they are a 2 directive shorthand, let's look at them:

-   **'mary'** or just **'my'**: Will determine the upper and lower margin of a node:

#### Example:

```html
<div mary="10 20@sm 30@md">...</div>
```

or in super short way we can use `<div my="10 20@sm 30@md">...</div>`.

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

-   **'marx'** or just **'mx'**: Will determine the right and left margin at the same time of a node:

#### Example:

```html
<div marx="10 20@sm 30@md">...</div>
```

or in super short way we can use `<div mx="10 20@sm 30@md">...</div>`.

<details>
<summary>And create these styles:</summary>

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

[&uarr; Go back up](#directives)

### Flex

This is the most interesting directive, because it is the one that determines the **'display: Flex'** to the element automatically. The value of the directive **'flex'** is separated between two points, and not conventionally with a script as is done in **'cols', 'mar' y 'pad'.**

#### Abbreviations of values:

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

#### Example:

```html
<div flex="jc:ce jc:fs@sm ai:fs@sm jc:fe@md">...</div>
```

or more semantically

```html
<div flex="justify-content:center justify-content:flex-start@sm align-items:flex-start@sm justify-content:flex-end@md">...</div>
```

> **NOTE**: It is possible to determine more than one style in the same breakpoint, in the case of the example above, the `justify-content: flex-start y align-items: flex-start` for the Breakpoint 'sm' (I mean Tablet)

...After self -process we would get this result:

```html
<div class="flex-jc:c flex-jc:fs-ai:fs@sm flex-jc:fe@md">...</div>
```

<details>
<summary>And then, these styles:</summary>

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

> Note: When we determine more than one style for the same breakpoint, the name of the classes generated are concatenated, only to save space.

[&uarr; Go back up](#directives)

### Width

It is used to determine the width of a node in pixels, as long as a unit of measure is not defined.

#### Example 1:

```html
<div wdh="100 150@sm">...</div>
```

...After self -process we would get this result:

```html
<div class="wdh-100 wdh-150@sm">...</div>
```

<details>
<summary>And then, these styles:</summary>

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

It is possible to determine the relative uniques: **%, rem, em, ex, vw y vh.**

#### Example 2:

```html
<div wdh="100% 150%@sm">...</div>
```

...After self -procesar we would get this result:

```html
<div class="wdh-0¯100 wdh-0¯150@sm">...</div>
```

<details>
<summary>And then, these styles:</summary>

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

[&uarr; Go back up](#directives)

### Height

It is the same as the 'width' but to determine the high, and also accepts to determine with [Unidades de medidas](#units-of-measure-defined) relatives.

#### Example 1:

```html
<div hgt="100 150@sm">...</div>
```

#### Example 2:

```html
<div hgt="100vh 150vh@sm">...</div>
```

[&uarr; Go back up](#directives)

### MaxWidth

It is used to determine the maximum width that a node will have in pixels, as long as it is not defined

#### Example:

```html
<div mxw="100 150@sm">...</div>
```

...After self -process we would get this result:

```html
<div class="mxw-100 mxw-150@sm">...</div>
```

<details>
<summary>And then, these styles:</summary>

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

[&uarr; Go back up](#directives)

### MaxHeight

It serves to determine the maximum high that will have a node in pixels.

#### Example:

```html
<div mxh="100 150@sm">...</div>
```

...After self -process we would get this result:

```html
<div class="mxh-100 mxh-150@sm">...</div>
```

<details>
<summary>And then, these styles:</summary>

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

[&uarr; Go back up](#directives)

### MinWidth, MinHeight

It is used to determine the minimum high and minimum high in Pixels respectively, it is the same as the Max-Width and Max-Height named above.

#### Example:

```html
<div miw="100 150@sm 200@md">...</div>
<div mih="300 350@sm 400@md">...</div>
```

...After self -process we would get this result:

```html
<div class="miw-100 miw-150@sm miw-200@md">...</div>
<div class="mih-300 mih-350@sm miw-400@md">...</div>
```

<details>
<summary>And then, these styles:</summary>

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

[&uarr; Go back up](#directives)

### Position

It is used to determine the positioning of an element.

#### Value Abbreviations

-   **st**: static
-   **ab**: absolute
-   **fi**: fixed
-   **re**: relative
-   **si**: sticky
-   **in**: initial
-   **ih**: inherit

#### Example:

```html
<div pos="re ab@sm fi@md st@lg">...</div>
```

or more semantically

```html
<div position="relative absolute@sm fixed@md static@lg">...</div>
```

...After self -process we would get this result:

```html
<div class="pos-re pos-ab@sm pos-fi@md pos-st@lg">...</div>
```

<details>
<summary>And these styles:</summary>

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

[&uarr; Go back up](#directives)

### Top, Right, Bottom, Left

It is used to determine the **top**, **right**, **bottom** and **left** of a element.

#### Example:

```html
<div t="10 20@sm 30@md">...</div>
<div r="40 50@sm 60@md">...</div>
<div b="70 80@sm 90@md">...</div>
<div l="100 200@sm 300@md">...</div>
```

or more semantically

```html
<div top="10 20@sm 30@md">...</div>
<div right="40 50@sm 60@md">...</div>
<div bottom="70 80@sm 90@md">...</div>
<div left="100 200@sm 300@md">...</div>
```

...After self -process we would get this result:

```html
<div class="t-10 t-20@sm t-30@md">...</div>
<div class="r-40 r-50@sm r-60@md">...</div>
<div class="b-70 b-80@sm b-90@md">...</div>
<div class="l-100 l-200@sm l-300@md">...</div>
```

<details>
<summary>And these styles:</summary>

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

[&uarr; Go back up](#directives)

## Method details:

### Set

It is used to process all the directives accepted by the system.

#### Example:

Imagine that we have a div where we have designated to give it columns, margins, paddings and flex all of a pull:

```html
<div
    cols="13/15 10/31@sm-md 15/27@md"
    pad="20-1/15 40-3/31@sm 60-2/31@md"
    mar="20-2/15 40-3/31@sm 60-2/31@md"
    flex="jc:c jc:fs@sm jc:fe@md ai:fs@sm"
></div>
```

It would not be advisable to apply separate methods of **'setCols', 'setPads', 'setMars' y 'setFlex'** To process the directive, in that case we process with the 'set' method, and this will process all the others mentioned:

```javascript
const myDiv = document.createElement('div');
myDiv.setAttribute('cols', '13/15 10/31@sm-md 15/27@md');
myDiv.setAttribute('pad', '20-1/15 40-3/31@sm 60-2/31@md');
myDiv.setAttribute('mar', '20-2/15 40-3/31@sm 60-2/31@md');
myDiv.setAttribute('flex', 'jc:ce jc:fs@sm jc:fe@md ai:fs@sm');
layouter.set(myDiv);
```

Which will give us a result like this:

```html
<div
    class="cols-13/15 cols-10/31@sm-md cols-15/27@md pad-20-1/15 pad-40-3/31@sm pad-60-2/31@md mar-20-2/15 mar-40-3/31@sm mar-60-2/31@md flex-jc:ce flex-jc:fs-ai:fs@sm flex-jc:fe@md"
>
    ...
</div>
```

<details>
<summary>With the following styles</summary>

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

> NOTE: The method **'set'** also processes the directives of the margins and paddings separately, I mean **'mart, marr, padb, padl, etc'**

> The styles created by the **'Set'** method are inserted into the system to be used by virtual nodes when adding to the DOM.

[&uarr; Go back up](#methods)

### SetCols

It is exactly like the 'set' method but processes only the columns, and ...

### SetPad, SetPadTop, SetPadRight, SetPadBottom, SetPadLeft, SetMar, SetMarTop, SetMarRight, SetMarBottom, SetMarLeft, SetMaxWidth, SetMaxHeight, SetMinWidth, SetMinHeight, SetFlex, SetPosition, SetTop, SetRight, SetBottom, SetLeft

They are equal to Setcols but reference to processing the paddings, the padding top, right, bottom, left, the margins, the top margin, right, bottom, left, the max/min width and height, the position, the top, right, Bottom and Left respectively, Ah! And Casí I forget the 'setflex' process what it is ... the directive 'Flex' XD.

[&uarr; Go back up](#methods)

In fact, the Builds methods are the same, but for this it is not necessary to pass the node as a parameter, but the value to process, let's see:

### Build

It is used to process all the values of all the attributes accepted by the system:

#### Sintaxis

```javascript
layouter.build(Object);

// Object Syntax
{
    nameDirective: valueDirective;
}
```

#### Example:

```javascript
layouter.build({
    flex: 'jc:ce ai:ce',
    cols: '3/13 21/21@sm 27/27@md',
    mar: '0-2/13-0-0@-sm 0-0-20-0@sm',
    pad: '20-0@sm',
});
```

And it returns an object with the names of the classes created together with the styles:

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

[&uarr; Go back up](#methods)

### SetPadX, SetPadY, SetMarX, SetMarY

They serve to process the directives **'padx' y 'pady'** respectively of a node.

> We can also use the reduced form of the directive `<div px="10">...</div>` o `<div py="20">...</div>`

#### Example 1:

```html
<div padx="10 20@sm 30@md">...</div>
```

```javascript
// Taking into account the DIV declared above ...
const myDiv = document.querySelector('div');
layouter.setPadX(myDiv);
```

...After self -procesar we would get this result:

```html
<div class="pr-10 pr-20@sm pr-30@md pl-10 pl-20@sm pl-30@md">...</div>
```

<details>
<summary>And then, these styles:</summary>

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

#### Example 2:

The same for the **'marx'** or for its reduced version **'mx'**.

```html
<div marx="10 20@sm 30@md">...</div>
```

```javascript
// Taking in mind the DIV declared above ...
const myDiv = document.querySelector('div');
layouter.setMarX(myDiv);
```

...After self -procesar we would get this result:

```html
<div class="mr-10 mr-20@sm mr-30@md ml-10 ml-20@sm ml-30@md">...</div>
```

<details>
<summary>And then, these styles:</summary>

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

[&uarr; Go back up](#methods)

### BuildCols

It is used to process only the columns

#### Syntax

```javascript
layouter.buildCols(String);
```

#### Example:

```javascript
layouter.buildCols('3/13 21/21@sm 27/27@md');
```

...And this object returns us:

```javascript
{
  "cols-21/21@sm": "@media screen and (min-width: 600px){.cols-21\\/21\\@sm{width:100%}}",
  "cols-27/27@md": "@media screen and (min-width: 900px){.cols-27\\/27\\@md{width:100%}}",
  "cols-3/13": ".cols-3\\/13{width:23.077%}"
}
```

[&uarr; Go back up](#methods)

### BuildMar, BuildMarTop, BuildMarRight, BuildMarBottom, BuildMarLeft, BuildPad, BuildPadTop, BuildPadRight, BuildPadBottom, BuildPadLeft, BuildWidth, BuildHeight, BuildMaxWidth, BuildMaxHeight, BuildMinWidth, BuildMinHeight, BuildFlex, BuildPosition, BuildTop, BuildRight, BuildBottom, BuildLeft

They are exactly the same as 'buildcols', but to process the margins (top, right, bottom, and left), Paddings, Maximum Width & High and Flex too.

### BuildPadX, BuildPadY, BuildMarX, BuildMarY

It is used to process the values of the directives **'Padx', 'Pady', 'Marx' and 'Mary'** respectively.

#### Example 1:

```javascript
layouter.buildPadX('10 20@sm 30@md');
```

...And this object returns us:

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

#### Example 2:

```javascript
layouter.buildMarY('10 20@sm 30@md');
```

...And this object returns us:

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

[&uarr; Go back up](#methods)

### GetParameters

It is also possible to obtain the parameters defined in an element, say, we have a div, and we want to know if you have cols, sea, flex or those that we have, because we pull the method, **'getparameters'**

```javascript
const myDiv = document.querySelector('div');
layouter.getParameters(myDiv);

// We will obtain such an object...

{
  cols: [ "13/15", "10/31@sm-md", "15/27@md" ],
  mar: [ "20-2/15", "40-3/31@sm", "60-2/31@md" ],
  pad: [ "20-1/15", "40-3/31@sm", "60-2/31@md" ],
  flex: [ "jc:c", "jc:fs@sm", "jc:fe@md", 'ai:fs@sm' ]
}
```

[&uarr; Go back up](#methods)

### Reset

If for any reason we need to remove all Layouter kinds on a node, we can use the 'Reset' method.

> Classes will remove from the node but will remain available for use in any other node.

```javascript
const myDiv = document.querySelector('div');
myDiv.className = 'my-div pad-10-1/15 pad-20-3/31@sm test pad-30-2/31@md mar-0-0-40'
layouter.reset(myDiv);

// The node will stay alone with two classes
myDiv.className => 'my-div test'
```

[&uarr; Go back up](#methods)

## Important Flag

It is possible, but not recommended, to add a special character in the declaration of the columns, margins, padding, and the display, which will add the `"important!"` common that is used in CSS, this character is the 'sign of exclamation' .

> It must always be added at the end of the declared sentence

**Example:**

```html
<div cols="13/15! 20/27@sm!"></div>
```

Which will give us the following CSS:

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

[&uarr; Go back up](#utils)

## Getters

We can access the following getters from the **variable 'layouter' of the object 'window'**:

| Property    | Type                          | Description                                                                                                                                                  |
| ----------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| breakpoints | string[]                      | Returns an array with the breakpoints defined in the configuration.                                                                                          |
| sizes       | { [alias: string]: number }   | Returns an object where each property is the name of the Breakpoint and as value of these properties the wide pixels designated for those breakpoints.       |
| cols        | { [ alias: string ]: number } | Returns an object where each property is the name of the Breakpoint and as value of these properties the number of columns designated for those breakpoints. |
| styles      | { [ alias: string ]: number } | This getter is interesting, because it returns an object with all the styles created in general.                                                             |
| version     | string                        | The current version of the bookstore will return us.                                                                                                         |

> Taking into account the Breakpoints Example above, the getters will return the following:

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
layouter.version = '1.7.0'
```

[&uarr; Go back up](#utils)
