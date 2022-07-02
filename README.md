<div align="center">
    <p>
        <img src="header.png" alt="Layouter"/>
    </p>
    <p>
        <strong>⚡️ Build the entire layout of your website without CSS ⚡️</strong>
    </p>
    <p>
        <a href="/dapize/layouter.js/blob/master/README.md"><img src="en_US.png" alt="English Language"/> English</a> — <a href="/dapize/layouter.js/blob/master/README-es_ES.md"><img src="es_ES.png" alt="English Language"/> Spanish</a>
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

It is a library that allows us to build the entire layout **quickly and easily**, using directives on the HTML nodes. It mainly works **based on the use of a grid**, _especially for the definition of columns_.

-   🚀 **Super fast and parallel:** Automatically processes all the nodes that are found when loading the web and also any new node that is added or starts using any directive.
-   🎉 **Shared styles:** Share the already created styles of other previously processed nodes.
-   ⚗️ **Pre-rendering virtual nodes:** Pre-render virtual nodes before adding them to the DOM.

## 🔧 Installation

You just have to call, in the HTML, the script **layouter.umd.js** that is inside the **'dist'** folder of this repository:

```html
<script src="layouter.umd.js"></script>
```

you can **also use one** of these CDNs:

```html
<script src="https://cdn.jsdelivr.net/npm/layouter.js/dist/layouter.umd.js" defer></script>
<script src="https://unpkg.com/layouter.js/dist/layouter.umd.js" defer></script>
```

**And voila!** That's all we need to use the **layouter** with its base configuration.

## ✨ Example of use

Let's say we want to define the following layout:

> _taking into account that we need to define margins, height, width by columns, etc, and each one in their respective breakpoints_

<p align="center">
    <img src="layout-responsive.png" alt="Layouter Logo"/>
    <br>
    <b><a href="https://dapize.github.io/layouter.js/">⚓ LINK DEMO ⚓</a></b>
</p>

So we would make this HTML with the following directives:

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
<summary>Let's see what happened</summary>

-   For the **`<main>`** tag, the following layout was determined:

    -   A top and bottom padding of 24 pixels on your initial breakpoint (ie on mobile), also a left and right padding of 1 column, relative to the 15 columns defined for that breakpoint.
    -   Upon reaching the breakpoint of **sm** the top and bottom padding of 24 pixels will be maintained but it is determined that 1 column of 25 columns is required for that breakpoint.
    -   Then for the **md** breakpoint we change the top and bottom padding to 30 pixels and then set the left and right padding to be 1 column out of 31 columns for that breakpoint.
    -   Finally, for the **lg** breakpoint, it was determined that the upper and lower padding would be 29.26 pixels, and for the right and left padding, 1 column of 41 columns would be taken from that breakpoint.
    -   On the other hand, it was also determined that its maximum width would be 1280 pixels.
    -   As well as it will have a top and bottom margin of 0 and right and left to 'auto'.

-   For the **`<header>`** tag, the following layout was determined:

    -   Display **'flex'** with 'justify-content' in 'space-between' from the breakpoint of **md** i.e. to tablet in landscape.
    -   Bottom margin of 24 pixels at the start breakpoint and 30 pixels from the md breakpoint.
    -   For its two child **divs**, a height of 100 pixels was determined.
    -   For the first **div** 11.1 columns of 29 columns from the md breakpoint and only 24 pixels of bottom margin to the md breakpoint.
    -   For the second child **div**, 16.9 columns out of 29 columns were determined from the md breakpoint.

-   For the **`<section>`** tag, the following layout was determined:

    -   A height of 320 pixels.
    -   A bottom margin of 24 pixels for your initial breakpoint, 25 pixels for the **sm** breakpoint, and finally 30 pixels for the **md** breakpoint.

-   For the **`<footer>`** tag, the following layout was determined:

    -   A **'flex'** display with 'justify-content' of 'space-between'.
    -   For its child **divs**, a height of 200 pixels and a width of 7 columns of 23 columns were determined for the **sm** breakpoint, followed by 9 columns of 29 columns for the **md** breakpoint and finally 12.33 columns of 39 columns for the **lg** breakpoint.

</details>

> Every time a new node is added to the body or an existing node uses a layouter directive, it will automatically be processed.

## ⚙️ Configuration

By default the library will work with the following **base configuration**:

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

One can write one's own configuration by creating a variable called **'layouterConfig' in the 'window' object.** This has to be before the library call. To know more check the [configuration options table](DOCS.md)

## ⚡ Directivas

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

## 🌐 Websites that use layouter

-   Interbank - [interbank.pe](https://interbank.pe)
-   Can I Browse - [canibrowse.net](https://canibrowse.net)

## 📚 Where to get help?

There is extensive documentation in the archive [DOCS.md](DOCS.md).

## 📝 Planned work

1. ~~Add a directive for positioning.~~ ✅ ¡Ready!
2. ~~Add more semantic aliases for directives. (Example: from **'mar'** to **'margin'** or only **'m'**)~~ ✅ ¡Ready!
3. ~~Add directives for declaration of superior margins and paddings.~~ ✅ ¡Ready!
4. ~~Create [component](https://github.com/dapize/react-layouter) for [React JS](https://reactjs.org)~~ ✅ ¡Ready!
5. Create component for [Vue JS](https://vuejs.org) 🏗️ In progress...
6. Create component for [Svelte JS](https://svelte.dev)

## 🧾 License

The code and documentation are published under the [Mit License](LICENSE).
