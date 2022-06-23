# Documentación

Los estilos creados por el layouter se crean al vuelo **(on the fly)**, *[cuando el navegador termina de cargar la web]*. Podemos definir las columnas, los paddings, los margenes, el ancho y alto de un elemento y hasta si tendrá display 'flex'.

## Configuración

Opción | Típo | Por Defecto | Descripción
------ | ---- | ------- | -----------
[**breakpoints**](#breakpoints) | object | [`...`](#breakpoints) | Objeto que contiene definido [los breakpoints](#breakpoints) que usará el sistema.
prefix | string | '' | Define cual será el prefijo para todas las clases CSS que se agregarán a los nodos, esto con el fin de salvaguardar alguna colición con otras clases definidas.
debug | boolean | true | Sirve para habilitar el `console.error` para cuando ocurre alguna configuración inconsistente o se presenta un error.
bridge | boolean | true | Permite insertar los estilos creados por el sistema a travez del método 'insert' del tag scope, sin agregarlo como nodo de texto hijo. **OJO:** *Deshabilita esta opción si el DOM es manipulado por otra librería.*
**ready** | function | null | Sirve como callback para indicar que el procesamiento inicial a finalizado. Se puede usar para quitar el loading overlay de la web (si es que se tiene, claro)


## Breakpoints

Cada breakpoint es un objeto que deve tener como nombre de propiedad un **'alias'** y dentro de ese objeto debe tener las siguientes propiedades:

Propiedad | Type | Description
------ | ---- | ------- 
width | number | Ancho máximo
cols | number | Número de columnas

**Ejemplo**:

```javascript
{
    ...,
    breakpoints: {
        xs: {
            width: 320,
            cols: 15
        },
        sm: {
            width: 768,
            cols: 21
        },
        md: {
            width: 1024,
            cols: 31
        },
        xlg: {
            width: 1536,
            cols: 51
        }
    }
}
```

Ese alias definidos se usará para determinar el breakpoint en cada valor.

### A tomar en cuenta:
- Se pueden definir cuantos breakpoints se requiera, no hay límite.
- Devido a que normalmente se maqueta en 'mobile first' **el breakpoint 'xs' no necesita un 'media query' (osea: @media).**
- Si no se define ninguna unidad de medida en el valor de cualquier directiva (que no sea naturalmente porcentual), se tomará en pixeles [me refiero a esto 📌](#unidades-de-medida-definidas)

## Directivas

Nombre | Ejemplo | Descripción
------ | ------- | -------
[Cols](#cols) | `cols="13/15"` | Determinará las columnas, osea el 'width' de manera porcentual.
[Mart](#mart) | `mart="10"` | Determina el **margen** superior de un nodo.
[Marr](#marr-marb-marl) | `marr="2/15"` | Determinar el **margen** derecho de un nodo.
[Marb](#marr-marb-marl) | `marb="30"` | Determinar el **margen** inferior de un nodo.
[Marl](#marr-marb-marl) | `marl="3/15"` | Determinar el **margen** izquierdo de un nodo.
[Mar](#mar) | `mar="20-2/15-30-3/15"` | Es un shorthand de las directivas: [mart, marr, marb, y marl](#mart-marr-marb-marl).
[Padt](#padt) | `padt="10"` | Determina el **padding** superior de un nodo.
[Padr](#padr-padb-padl) | `padr="2/15"` | Determinar el **padding** derecho de un nodo.
[Padb](#padr-padb-padl) | `padb="30"` | Determinar el **padding** inferior de un nodo.
[Padl](#padr-padb-padl) | `padl="3/15"` | Determinar el **padding** izquierdo de un nodo.
[Pad](#pad) | `pad="20-2/15-30-3/15"` | Es un shorthand de las directivas: [padt, padr, padb, y padl](#mart,-marr,-marb,-marl).
[Flex](#flex) | `flex="jc:ce ai:fs fd:co"` | Determina el **display flex** del nodo, y sus derivados.
[Wdh](#width) | `wdh="100"` | Determina el **ancho** del nodo en pixeles u otra [unidad de medida](#unidades-de-medida-definidas).
[Hgt](#height) | `hgt="100"` | Determina el **alto** del nodo en pixeles u otra [unidad de medida](#unidades-de-medida-definidas).
[Mxw](#maxwidth) | `mxw="200"` | Determina el **máximo ancho** del nodo en píxeles u otra [unidad de medida](#unidades-de-medida-definidas).
[Mxh](#maxheight) | `mxh="100 150@sm"` |  Determina el **máximo alto** del nodo en píxeles u otra [unidad de medida](#unidades-de-medida-definidas).
[Miw](#minwidth) | `miw="200"` | Determina el **mínimo ancho** del nodo en píxeles u otra [unidad de medida](#unidades-de-medida-definidas).
[Mih](#minheight) | `mih="100 150@sm"` |  Determina el **mínimo alto** del nodo en píxeles u otra [unidad de medida](#unidades-de-medida-definidas).

## Métodos

Nombre | Argumentos | Devuelve | Descripción
------ | ------- | ------- | -------
[setCols](#SetCols) | `Node: HTMLElement \| Element, parameters?: IParams` | `Promise<void>` | Procesa la directiva **'cols'**
[set](#Set) | `Promise<void>` | Procesa un nodo con cualquier directiva.

- [set](#Set)
  - [setCols](#SetCols)
  - [setPads](#SetPads)
    - [setPadTop](#SetPadTop)
    - [setPadRight](#SetPadRight)
    - [setPadBottom](#SetPadBottom)
    - [setPadLeft](#SetPadLeft)
  - [setMars](#SetMars)
    - [setMarTop](#SetMarTop)
    - [setMarRight](#SetMarRight)
    - [setMarBottom](#SetMarBottom)
    - [setMarLeft](#SetMarLeft)
  - [setFlex](#setFlex)
  - [setWidth](#setWidth)
  - [setHeight](#setHeight)
  - [setMaxWidth](#setMaxWidth)
  - [setMaxHeight](#setMaxHeight)
  - [setMinWidth](#setMinWidth)
  - [setMinHeight](#setMinHeight)

- [build](#Build)
  - [buildCols](#BuildCols)

  - [buildMars](#BuildMars)
    - [buildMarTop](#BuildMarTop)
    - [buildMarRight](#BuildMarRight)
    - [buildMarBottom](#BuildMarBottom)
    - [buildMarLeft](#BuildMarLeft)
    
  - [buildPads](#BuildPads)
    - [buildPadTop](#BuildPadTop)
    - [buildPadRight](#BuildPadRight)
    - [buildPadBottom](#BuildPadBottom)
    - [buildPadLeft](#BuildPadLeft)

  - [buildFlex](#BuildFlex)

  - [buildWidth](#BuildWidth)
  - [buildHeight](#BuildHeight)

  - [buildMaxWidth](#BuildMaxWidth)
  - [buildMaxHeight](#BuildMaxHeight)
  - [buildMinWidth](#BuildMinWidth)
  - [buildMinHeight](#BuildMinHeight)
  
- [getParameters](#getParameters)
- [reset](#reset)

## Ejemplos

### Cols

#### Ejemplo 1: Con breakpoints simples (min-width)
Tenemos un 'DIV' al cual queremos designarle 13 de 15 columnas en mobile, 10 columnas de 31 en tablet y 15 columnas de 27 en desktop, así que creamos **la directiva llamada 'cols'** con el siguiente valor:
```html
<div cols="13/15 10/31@sm 15/27@md">...</div>
```
> El sufijo arroba significa que esas columnas aplicarán a partir del breakpoint determinado

**Explicación:**

Para el DIV del ejemplo de arriba se determinó que:

- Tendrá 13 columnas de 15, y como no tiene como sufijo el signo arroba, significa que las tendrá en el 'breakpoint con width más bajo osea el **'xs'**. Si el **DIV** solo tendría esa directiva definida, luego de su auto procesamiento obtendríamos este resultado:
```html
<div class="cols-13/15">...</div>
```
> Vemos que la directiva 'cols' desapareció del elemento, esto es porque ya no lo necesita una vez procesado

Y como estilos tendríamos disponible una clase llamada 'cols-13/15' la cual nos daría estos estilos:
```css
.cols-13\/15 {
  width: 86.666%
}
```
**Seguimos**...
- Para el breakpoint 'sm' (osea 'tablet') se determinó que se tendrá 10 columnas de 31, luego de procesarlo obtendríamos este resultado:
```html
<div class="cols-10/31@sm">...</div>
```
Pero como se determinó en un breakpoint, los estilos estarían regidos por él
```css
@media screen and (min-width: 768px) {
  .cols-10\/31\@sm {
    width: 32.2580%
  }
}
```
- Para el breakpoint 'md' (osea 'desktop') se determinó que se tendrá 15 columnas de 27, y luego de auto procesarce obtendríamos este resultado:
```html
<div class="cols-15/27@md">...</div>
```
```css
@media screen and (min-width: 1024px) {
  .cols-15\/27\@sm {
    width: 55.5556%
  }
}
```
**Finalmente** si procesamos el valor completo del parametro 'cols' (13/15 10/31@sm 15/27@md) obtendríamos este resultado:
```html
<div class="cols-13/15 cols-10/31@sm cols-15/27@md">...</div>
```
y pues, estos estilos:
```css
.cols-13\/15 {
  width: 86.666%
}

@media screen and (min-width: 768px) {
  .cols-10\/31\@sm {
    width: 32.2580%
  }
}

@media screen and (min-width: 1024px) {
  .cols-15\/27\@sm {
    width: 55.5556%
  }
}
```
> **OJO**: Estas clases estarán disponibles para todos los elementos que necesiten de ellas, son generales.

#### Ejemplo 2: Con breakpoint min-width y max-width
Tenemos un DIV que a parte de tener 13 columnas de 15 en mobile (el breakpoint 'xs') queremos designarle 20 columnas de 27 desde tablet hasta desktop (desde 'sm' hasta 'md') y a partir de 'lg', osea monitores más grandes, que continue con las 13 columnas de 15 que se le puso en mobile. Entonces...

```html
<div cols="13/15 20/27@sm-md">
```
El guión (-) indica 'desde / hasta' donde se quiere determinar las columnas. En estilos tendríamos esto:
```css
.cols-13\/15 {
  width: 86.666%
}

@media screen and (min-width: 768px) and (max-width: 1023px) {
  .cols-20\/27\@sm {
    width: 74.0740%
  }
}
```
...aunque tambien se puede usar solo el 'hasta', así:
```html
<div cols="20/27@-md">
```
> Esto le dará 20 columnas de 27 hasta 'desktop' (en el breakpoint 'md')

y en estilos obtendremos esto:
```css
@media screen and (max-width: 1023px) {
  .cols-20\/27\@sm {
    width: 74.0740%
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

Este método de columnas explicitas solo es para ahorrarnos un poco de tiempo al designar las columnas que queremos en la directiva 'cols'. Sin embargo podría ser provechoso determinar así por si en algún momento las columnas designadas para un breakpoint en específico cambian, digamos que en el breakpoint 'sm' (tablet), yá no son 31 columnas sino 32, pues con la designación de columna explicitas nos ahorraríamos tener que cambiar en cada elemento donde determinamos `cols="20/31@sm"`

[&uarr; Volver Arriba](#directivas)

### Mar
Es una abreviación del shorthand 'margin' **(y a su vez es un shorthand de las directivas: mart, marr, marb, y marl)** y sirve para determinar los margenes superiores, derechos, inferiores e izquierdos de un elemento.
#### Ejemplo:

```html
<div mar="20-2/15 40-3/31-20@sm 60-2/31@md">...</div>
```
> Usa la misma sintaxis del margin combencional, osea: margin-top, margin-right, margin-bottom, margin-left. Pero solo para el margin left y right se puede declarar 'auto', si es que se requiere claro. Mini Ejemplo: mar="20-auto"

**Solo los margenes superiores e inferiores son procesados como pixeles**, los derechos e izquierdos son procesados porcentualmente.

**Explicación:** En el ejemplo de arriba se está determinando que el DIV :
- Tendrá 20 pixeles de margen superior (margin-top) e inferior, tambien 2 columnas de 15, en mobile.
- Tendrá 40 pixeles de margen superior, 3 columnas de 31 de margin derecho e izquierdo y 20 pixeles de margen inferior en tablet.
- y en desktop, tendrá 60 pixeles de margin superior e inferior y 2 columnas de 31 de margin derecho e izquierdo.

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

@media screen and (min-width: 768px) {
  .mar-40-3\/31-20\@sm {
    margin: 40px 9.67742% 20px;
  }
}

@media screen and (min-width: 1024px) {
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
- 10 pixeles en mobile.
- 20.5 pixeles en tablet.
- y 30 pixeles en desktop.

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

@media screen and (min-width: 768px) {
  .mart-20_5\@sm {
    margin-top: 20.5px;
  }
}

@media screen and (min-width: 1024px) {
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

y pues, estos estilos:

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

@media screen and (min-width: 768px) {
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

@media screen and (min-width: 1024px) {
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

y pues, estos estilos:

```css
.pad-20-1\/15 {
  padding: 20px 6.66667%;
}

@media screen and (min-width: 768px) {
  .pad-40-3\/31\@sm {
    padding: 40px 9.67742%;
  }
}

@media screen and (min-width: 1024px) {
  .pad-60-2\/31\@md {
    padding: 60px 6.45161%;
  }
}
```
[&uarr; Volver Arriba](#directivas)

### Padt
Sirve para determinar los paddings superiores de un elemento.

#### Ejemplo:

```html
<div padt="10 20.5@sm 30@md">...</div>
```

**Explicación:** En el ejemplo de arriba se está determinando que el padding superior del DIV sea:
- 10 pixeles en mobile.
- 20.5 pixeles en tablet.
- y 30 pixeles en desktop.

...luego de auto procesarce obtendríamos este resultado:

```html
<div class="padt-10 padt-20_5@sm padt-30@md">...</div>
```

y pues, estos estilos:

```css
.padt-10 {
  padding-top: 10px;
}

@media screen and (min-width: 768px) {
  .padt-20_5\@sm {
    padding-top: 20.5px;
  }
}

@media screen and (min-width: 1024px) {
  .padt-30\@md {
    padding-top: 30px;
  }
}
```

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

y pues, estos estilos:

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

@media screen and (min-width: 768px) {
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

@media screen and (min-width: 1024px) {
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

[&uarr; Volver Arriba](#directivas)

### Flex
Esta es la directiva más interesante, porque es el que determina el **'display'** del elemento. El valor de la directiva **'flex'** se separa entre dos puntos, y no convencionalmente con guión como se hace en **'cols', 'mar' y 'pad'.**

#### Equivalencias de abreviaciones:
- **jc:** justify-content
- **ai:** align-items
- **ce:** center
- **fs:** flex-start
- **fe:** flex-end
- **sb:** space-between
- **sa:** space-around
- **fw:** flex-wrap
- **nw:** nowrap
- **w:** wrap
- **wr:** wrap-reverse
- **fd:** flex-direction
- **r:** row
- **rr:** row-reverse
- **co:** column
- **cor:** column-reverse
- **fg:** flex-grow
- **fh:** flex-shrink
- **as:** align-self
- **or:** order
- **au:** auto
- **st:** stretch
- **bl:** baseline
- **in:** initial
- **ih:** inheri

#### Ejemplo:
```html
<div flex="jc:ce jc:fs@sm ai:fs@sm jc:fe@md">...</div>
```
> **OJO**: Es posible determinar más de un estilo en el mismo breakpoint, en el caso del ejemplo de arriba, se determinó el `justify-content: flex-start y align-items: flex-start` para el breakpoint 'sm' osea (tablet)

...luego de auto procesarce obtendríamos este resultado:

```html
<div class="flex-jc:c flex-jc:fs-ai:fs@sm flex-jc:fe@md">...</div>
```

y pues, estos estilos:

```css
.flex-jc\\:c {
  justify-content: center;
}

@media screen and (min-width: 768px) {
  .flex-jc\\:fs-ai\\:fs\@sm {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
}

@media screen and (min-width: 1024px) {
  .flex-jc\\:fe\@md {
    display: flex;
    justify-content: flex-end;
  }
}
```

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
y pues, estos estilos:
```css
.wdh-100{
  width:100px
}

@media screen and (min-width: 768px){
  .wdh-150\@sm{
    width:150px
  }
}

```

Es posible determinar las únidades relativas: **%, rem, em, ex, vw y vh.**

#### Ejemplo 2:
```html
<div wdh="100% 150%@sm">...</div>
```

...luego de de autoprocesarce obtendríamos este resultado:

```html
<div class="wdh-0¯100 wdh-0¯150@sm">...</div>
```
y pues, estos estilos:
```css
.wdh-0¯100{
  width:100%
}

@media screen and (min-width: 768px){
  .wdh-0¯150\@sm{
    width:150%
  }
}

```

[&uarr; Volver Arriba](#directivas)


### Height
Es lo mismo que el 'Width' pero para determinar el alto, y tambien acepta determinar con unidades de medidas relativas.

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
y pues, estos estilos:
```css
.mxw-100{
  max-width:100px
}

@media screen and (min-width: 768px){
  .mxw-150\@sm{
    max-width:150px
  }
}

```

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
y pues, estos estilos:
```css
.mxh-100{
  max-height:100px
}

@media screen and (min-width: 768px){
  .mxh-150\@sm{
    max-height:150px
  }
}

```

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
y pues, estos estilos:
```css
.miw-100{
  min-width:100px
}

@media screen and (min-width: 768px){
  .miw-150\@sm{
    min-width:150px
  }
}

@media screen and (min-width: 1024px){
  .miw-200\@sm{
    min-width:200px
  }
}

.mih-300{
  min-height:300px
}

@media screen and (min-width: 768px){
  .mih-350\@sm{
    min-height:350px
  }
}

@media screen and (min-width: 1024px){
  .mih-400\@sm{
    min-height:400px
  }
}

```

[&uarr; Volver Arriba](#directivas)

## Métodos:

### Set
Sirve para procesar todas las directivas aceptados por el sistema, normalmente no se necesitaría usar este método ni los demás métodos de tipo 'set', pero se pueden usar **para procesar nodos virtuales [aquellos que no esstán en el DOM todabía]**

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
myDiv.setAttribute('cols', '13/15 10/31@sm-md 15/27@md')
myDiv.setAttribute('pad', '20-1/15 40-3/31@sm 60-2/31@md')
myDiv.setAttribute('mar', '20-2/15 40-3/31@sm 60-2/31@md')
myDiv.setAttribute('flex', 'jc:c jc:fs@sm jc:fe@md ai:fs@sm')
layouter.set(myDiv);
```
Lo cual nos dará un resultado así:

```html
<div class="cols-13/15 cols-10/31@sm-md cols-15/27@md pad-20-1/15 pad-40-3/31@sm pad-60-2/31@md mar-20-2/15 mar-40-3/31@sm mar-60-2/31@md flex-flex flex-jc:c flex-jc:fs-ai:fs@sm flex-jc:fe@md"></div>
```

Con los siguientes estilos

```css
.flex-jc\:c {
  display: flex;
  justify-content: center;
}

.cols-13\/15 {
  width: 86.6667%;
}

.pad-20-1\/15 {
  padding: 20px 6.66667%;
}

.mar-20-2\/15 {
  margin: 20px 13.3333%;
}

@media screen and (min-width: 768px) {
  .cols-10\/31\@sm-md {
    width: 32.2581%;
  }

  .pad-40-3\/31\@sm {
    padding: 40px 9.67742%;
  }

  .mar-40-3\/31\@sm {
    margin: 40px 9.67742%;
  }

  .flex-jc\:fs-ai\:fs\@sm {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  } 
}

@media screen and (min-width: 1024px) {
  .cols-15\/27\@md {
    width: 55.5556%;
  }

  .pad-60-2\/31\@md {
    padding: 60px 6.45161%;
  }

  .mar-60-2\/31\@md {
    margin: 60px 6.45161%;
  }

  .flex-jc\:fe\@md {
    display: flex;
    justify-content: flex-end;
  }
}
```

> OJO: El método **'set'** también procesa las directivas de los margenes y paddings por separado, osea **'mart, marr, padb, padl, etc'**

> Los estilos creados por el método **'set'** se auto insertan en el sistema para poder ser usado por los nodos virtuales cuando se agreguen al DOM.

[&uarr; Volver Arriba](#directivas)

### SetCols
Es exactamente igual que el método 'set' pero procesa solamente las columnas, de echo...

### SetPads, SetPadTop, SetPadRight, SetPadBottom, SetPadLeft, SetMars, SetMarTop, SetMarRight, SetMarBottom, SetMarLeft, setMaxWidth, setMaxHeight, setMinWidth, setMinHeight, setFlex

Son iguales a SetCols pero referencian a procesar los paddings, el padding Top, right, bottom left, los margenes, el margen Top, right, bottom, left, el max/min width y height respectivamente, ah! y casí me olvido el 'setFlex' procesa lo que es pues... la directiva 'flex' XD.

[&uarr; Volver Arriba](#directivas)

## Important Flag

Es posible, pero no recomendable, adicionar un caracter especial en la declaración de las columnas, margenes, padding, y el display, el cual agregará el "!important" comun que se usa en CSS, este caracter es el 'signo de exclamación'.
> Siempre se debe agregar al final de la sentencia declarada

**Ejemplo:**

```html
<div cols="13/15! 20/27@sm!">
```

El cual nos dará el siguiente CSS:

```css
.cols-13\/15\! {
  width:86.667% !important
}

@media screen and (min-width: 768px) {
  .cols-20\/27\@sm-md {
    width:74.074% !important
  }
}
```

## Getters
Podemos acceder a los siguientes getters desde la **variable 'layouter' del objeto 'window'**:

Propiedad | Type | Description
------ | ------- | ------- 
breakpoints | string[] | Devuelve un array con los breakpoints definidos en la configuración.
sizes | { [alias: string]: number } | Devuelve un objeto en donde cada propiedad es el nombre del breakpoint y como valor de esas propiedades los pixeles de ancho designados para esos breakpoints. 
cols | { [ alias: string ]: number } | Devuelve un objeto en donde cada propiedad es el nombre del breakpoint y como valor de esas propiedades el número de columnas designadas para esos breakpoints.
styles | { [ alias: string ]: number } | Este getter es interesante, porque devuelve un objeto con todos los estilos creados de forma general.
version | string | Nos devolverá la versión actual de la librería.

> Tomando en cuenta el ejemplo de breakpoints de más arriba, los getters nos devolverán lo siguiente:

```javascript
layouter.breakpoints = [ "xs", "sm", "md" ]
layouter.sizes = { xs: 0, sm: 768, md: 1024, }
layouter.cols = { xs: 15, sm: 11, md: 31 }
layouter.styles = {
  "cols-10\\/31@sm-md": "@media screen and (min-width: 768px) and (max-width: 1023px){.cols-10\\/31\\@sm-md{width:32.258%}}"
  "cols-13\\/15": ".cols-13\\/15{width:86.667%}"
  "cols-15\\/27@md": "@media screen and (min-width: 1024px){.cols-15\\/27\\@md{width:55.556%}}"
  "flex-jc\\:c": ".flex-jc\\:c{justify-content:center;display: flex}",
}
layouter.version = '1.2'
```
[&uarr; Volver Arriba](#documentación)
