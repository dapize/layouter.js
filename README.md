# Layouter JS
Es una librería que nos permite **armar el layout de una web de forma muy sencilla y rápida, bazandoce en el uso de grillas**, estos estilos se crean al vuelo ('on the fly'). Se pueden definir las columnas, los paddings, los margenes y hasta si un elemento tendrá display 'flex'.

Esto se hace a travez de atributos en las etiquetas html, aunque tambien se pueden procesar directamente sin depender de una etiqueta.

- **Demo on line:** [https://dapize.github.io/layouter/](https://dapize.github.io/layouter/)

- **Documentación Técnica:** [https://dapize.github.io/layouter/docs](https://dapize.github.io/layouter/docs)

## Instalación
Solo debes agregar, a tu página web, la llamada al script 'layouter.min.js' que se encuentra dentro de la carpeta 'dist' de este repositorio. De preferencia agregarlo antes del cierre del `<body>` y como último archivo JS a cargar. Así:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi Página Web</title>
</head>
<body>
  <span>Hola mundo XD</span>
  <script src="un-script-cualquier.js"></script>
  <script src="otro-script-cualquiera.js"></script>
  <script src="layouter.min.js"></script>
</body>
</html>
```

## Inicialización

> Esto lo puedes hacer en un archivo 'main.js' que tienes que llamarlo luego del layouter.min.js o en el mismo HTML

Empezamos creando una instancia del constructor 'Layouter' pasandole un objeto de configuración, ahi agregamos los breakpoints que necesitemos, en este caso necesitaré 4 breakpoints.

```javascript
// main.js
const myConfig = {
  prefix: 'lh',
  breakPoints: {
    xs: {
      width: 320,
      cols: 15,
      direct: true
    },
    sm: {
      width: 768,
      cols: 31
    },
    md: {
      width: 1024,
      cols: 31
    },
    lg: {
      width: 1280,
      cols: 42
    }
  },
  debug: true,
  bridge: false
};

const layout = new Layouter(myConfig);
```
### Propiedades del objeto de configuración:
- **prefix**: Sirve para determinar el prefijo que tendrán el nombre de las clases que se crearán. Esta propiedad es opcional.
- **breakPoints**: Es un objeto contenedor de objetos, cada objeto hijo designa un breakpoint a definir, el nombre de la propiedad de cada objeto será el alias para el breakpoint.
  - **width**: Determina el ancho el pixeles del breakpoint.
  - **cols**: Definen las columnas máximas que tendrá el breakpoint.
  - **direct**: esta propiedad es opciona, y se usa para indicar que dicho breakpoint no necesita de un @media query para poder definir sus reglas CSS.
- **debug**: Sirve para activar el modo 'debugeo', éste imprimirá en consola cada parte en el procesamiento de un nodo.
- **bridge**: Si se pone en 'false', el puente que automáticamente se crea para la definiciones de las reglas CSS yá no existirá, y éstas se insertarán directamente en el nodo con id 'layouter', más abajo detallamos esto.

> La instancia creada más arriba muestra la designación de un 'prefijo' llamado 'lh', pero no lo usaré a lo largo de esta documentación, por motivos de ahorro visual XD.

> - Convencionalmente 'xs' es para la versión 'mobile' (celular) osea apartir de 320 / 360 pixeles de ancho.
> - 'sm' Es para tablet, osea a partir de 768px de ancho.
> - 'md' Es para desktop, osea apartir de 1024px de ancho.
> - 'lg' es para desktop con monitores más grandes, apartir de 1280

***Se pueden crear breakpoints a voluntad, el sistema admite cuantos breakpoints se necesite.***

Devido a que normalmente se maqueta en 'mobile first' el breakpoint 'xs' no necesita un 'media query' (osea: @media), es por eso que se pone 'direct' en **true**, así los estilos pasarán directos.

## Atributos

- [Cols](#cols)
- [Pad](#pad)
  - [Padt](#padt)
  - [Padr](#padr)
  - [Padb](#padb)
  - [Padl](#padl)
- [Mar](#mar)
  - [Mart](#mart)
  - [Marr](#marr)
  - [Marb](#marb)
  - [Marl](#marl)
- [Flex](#flex)

## Métodos
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

- [build](#Build)
  - [buildCols](#BuildCols)

  - [buildMars](#BuildMars)
    - [buildMarTop](#BuildMarTop)
    - [buildMarRight](#BuildMarRight)
    - [buildMarBottom](#buildMarBottom)
    - [buildMarLeft](#BuildMarLeft)
    
  - [buildPads](#BuildPads)
    - [buildPadTop](#BuildPadTop)
    - [buildPadRight](#BuildPadRight)
    - [buildPadBottom](#BuildPadBottom)
    - [buildPadLeft](#BuildPadLeft)

  - [buildFlex](#BuildFlex)
- [getParameters](#getParameters)




## Bridge
De forma automática el script crea un nodo tipo 'style' con el id 'layouter' y lo agrega al final del body. Este nodo sirve como puente para insertar las reglas CSS que se definan, por lo tanto este nodo estará vacío, a no ser que en el objeto de configuración se determine la propiedad 'bridge' en 'false', en ese caso el nodo será rellenado con cada nueva regla CSS que se determine para los nodos a procesar con el sistema.
> En algunas ocaciones se necesitará poner la propiedad 'bridge' en 'false' para cuando se trabaje con webs que manipulan mucho el DOM con JS.

## Atributos (Definición):
### Cols
Determinará las columnas que se necesitan asignar, osea el 'width' de manera porcentual.
#### Ejemplos:
##### Ejemplo 1: Con breakpoints simples (min-width)
Tenemos un 'DIV' al cual queremos designarle 13 de 15 columnas en mobile, 10 columnas de 31 en tablet y 15 columnas de 27 en desktop, así que creamos el atributo llamado 'cols' con el siguiente valor:
```html
<div cols="13/15 10/31@sm 15/27@md">...</div>
```
> El sufijo arroba significa que esas columnas solo aplicarán desde un breakpoint determinado

**Explicación:**

Para el DIV del ejemplo de arriba se determinó que:

- Tendrá 13 columnas de 15, y como no tiene como sufijo el signo arroba, significa que las tendrá en el 'breakpoint directo' osea el 'xs'. Si el DIV solo tendría esa designación, luego de procesarlo...
 
```javascript
const myDiv = document.querySelector('div');
layouter.setCols(myDiv);
```
...obtendríamos este resultado:
```html
<div class="cols-13-15">...</div>
<!-- Vemos que el atributo 'cols' desapareció del elemento, esto es porque yá no lo necesita una vez procesado. -->
```
Y como estilos tendríamos disponible una clase llamada 'cols-13-15' la cual nos daría estos estilos:
```css
.cols-13\/15 {
  width: 86.666%
}
```
**Seguimos**...
- Para el breakpoint 'sm' (osea 'tablet') se determinó que se tendrá 10 columnas de 31, luego de procesarlo obtendríamos este resultado:
```html
<div class="cols-10-31@sm">...</div>
```
Pero como se determinó en un breakpoint, los estilos estarían regidos por él
```css
@media screen and (min-width: 768px) {
  .cols-10\/31\@sm {
    width: 32.2580%
  }
}
```
- Para el breakpoint 'md' (osea 'desktop') se determinó que se tendrá 15 columnas de 27, y luego de procesarlo obtendríamos este resultado:
```html
<div class="cols-15-27@md">...</div>
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
<div class="cols-13-15 cols-10-31@sm cols-15-27@md">...</div>
```
y pues, estos estilos:
```css
.cols-13-15 {
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

##### Ejemplo 2: Con breakpoint min-width y max-width
Tenemos un DIV que aparte de tener 13 columnas de 15 en mobile (el breakpoint 'xs') queremos designarle 20 columnas de 27 desde tablet hasta desktop (desde 'sm' hasta 'md') y apartir de 'lg', osea monitores más grandes, que continue con las 13 columnas de 15 que se le puso en mobile. Entonces...

```html
<div cols="13/15 20/27@sm-md">
```
El guión (-) indica 'desde / hasta' donde se quiere determinar las columnas. En estilos tendríamos esto:
```css
.cols-13-15 {
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
<!-- Esto le dará 20 columnas de 27 hasta 'desktop' (en el breakpoint 'md') -->
```
y en estilos obtendremos esto:
```css
@media screen and (max-width: 1023px) {
  .cols-20\/27\@sm {
    width: 74.0740%
  }
}
```
##### Ejemplo 3: Columnas explicitas por breakpoint.
Cuando queremos determinar un número de columnas en un breakpoint específico pero sin designarle el número de columnas de donde sacarlas (o máximas), podemos hacerlo así:
```html
<div cols="13 20@sm">...</div>
```
Eso es lo mismo que poner esto:
```html
<div cols="13/15 20/31@sm">...</div>
```
Pero se obvia el número de columnas de donde se sacarán las columnas designadas, yá que el breakpoint tomará el número de columnas designadas para ese breakpoint, osea: el sistema reconocerá que son 13 columnas de 15 xq no se determinó breakpoint, y 15 son las columnas máximas que tiene el breakpoint 'xs' (mobile), y tambien reconocerá que son 20 columnas de 31, xq se determinó 20 columnas en el breakpoint 'sm' (tablet) y las columnas máximas disponibles en tablet son 31.
> **OJO**: **NO se puede** determinar columnas explicitas en breakpoints compuestos, osea en el 'desde / hasta', solo en breakpoints 'desde', osea estos '@sm', si no tirará un mensaje de error y no procesará.

```html
<!-- ESTO NO ES VÁLIDO-->
<div cols="20@sm-md">...</div>
```

Este método de columnas explicitas solo es para ahorrarnos un poco de tiempo al designar las columnas que queremos en el atributo 'cols'. Sin embargo podría ser provechoso determinar así por si en algún momento las columnas designadas para un breakpoint en específico cambian, digamos que en el breakpoint 'sm' (tablet), yá no son 31 columnas sino 32, pues con la designación de columna explicitas nos ahorraríamos tener que cambiar en cada elemento donde determinamos cols="20/31@sm"

[&uarr; Volver Arriba](#layouter-js)

### Mar
Es una abreviación del shorthand 'margin' (y a su vez es un shorthand de los atributos: mart, marr, marb, y marl) y sirve para determinar los margenes superiores, derechos, inferiores e izquierdos de un elemento.
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

...luego de procesarlo:
```javascript
const myDiv = document.querySelector('div');
layouter.setMars(myDiv);
```
...obtendríamos este resultado:
```html
<div class="mar-20-2/15 mar-40-3/31-20@sm mar-60-2/31@md">...</div>
<!-- Vemos que el atributo 'mar' desapareció del elemento, esto es porque yá no lo necesita una vez procesado. -->
```
Y pues, estos estilos:
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

...luego de procesarlo:
```javascript
const myDiv = document.querySelector('div');
layouter.setMarTop(myDiv);
```
...obtendríamos este resultado:
```html
<div class="mart-10 mart-20_5@sm mart-30@md">...</div>
<!-- Vemos que el atributo 'mart' desapareció del elemento, esto es porque yá no lo necesita una vez procesado. -->
```
Y pues, estos estilos:
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

[&uarr; Volver Arriba](#layouter-js)

### Marr
### Marb
### Marl
Sirven para determinar los margenes derechos, inferiores e izquierdos respectivamente en un elemento. Es lo mismo que 'mart'

#### Un simple ejemplo:

```html
<div marr="10 20.5@sm 30@md">...</div>
<div marb="20 30.5@sm 40@md">...</div>
<div marl="30 40.5@sm 50@md">...</div>
```
...luego de procesarlo:
```javascript
const myDiv = document.querySelector('div');

layouter.setMarRight(myDiv);
layouter.setMarBottom(myDiv);
layouter.setMarLeft(myDiv);
```
...obtendríamos este resultado:
```html
<div class="marr-10 marr-20_5@sm marr-30@md">...</div>
<div class="marb-20 marb-30_5@sm marb-40@md">...</div>
<div class="marl-30 marl-40_5@sm marl-50@md">...</div>
```
Y pues, estos estilos:
```css
.marr-10 {
  margin-right: 10px;
}

.marb-10 {
  margin-bottom: 20px;
}

.marl-10 {
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

[&uarr; Volver Arriba](#layouter-js)

### Pad
Sirve para determinar los paddings que se le dará. Al igual que al atributo 'mar', solo el padding top y bottom se tomarán como pixeles y el left y right como porcentual.

Tiene exactamente la misma sintaxis que 'mar'

#### Ejemplo:
```html
<div pad="20-1/15 40-3/31@sm 60-2/31@md">...</div>
```
...luego de procesarlo:
```javascript
const myDiv = document.querySelector('div');
layouter.setPads(myDiv);
```
...obtendríamos este resultado:
```html
<div class="pad-20-1/15 pad-40-3/31@sm pad-60-2/31@md">...</div>
```
Y pues, estos estilos:
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
[&uarr; Volver Arriba](#layouter-js)

### Padt
Sirve para determinar los paddings superiores de un elemento.

#### Ejemplo:

```html
<div papt="10 20.5@sm 30@md">...</div>
```

**Explicación:** En el ejemplo de arriba se está determinando que el padding superior del DIV sea:
- 10 pixeles en mobile.
- 20.5 pixeles en tablet.
- y 30 pixeles en desktop.

...luego de procesarlo:
```javascript
const myDiv = document.querySelector('div');
layouter.setPadTop(myDiv);
```
...obtendríamos este resultado:
```html
<div class="padt-10 padt-20_5@sm padt-30@md">...</div>
```
Y pues, estos estilos:
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

[&uarr; Volver Arriba](#layouter-js)

### Padr
### Padb
### Padl
Sirven para determinar los paddings derechos, inferiores e izquierdos respectivamente en un elemento. Es lo mismo que 'padt'

#### Un simple ejemplo:

```html
<div padr="10 20.5@sm 30@md">...</div>
<div padb="20 30.5@sm 40@md">...</div>
<div padl="30 40.5@sm 50@md">...</div>
```
...luego de procesarlo:
```javascript
const myDiv = document.querySelector('div');

layouter.setPadRight(myDiv);
layouter.setPadBottom(myDiv);
layouter.setPadLeft(myDiv);
```
...obtendríamos este resultado:
```html
<div class="padr-10 padr-20_5@sm padr-30@md">...</div>
<div class="padb-20 padb-30_5@sm padb-40@md">...</div>
<div class="padl-30 padl-40_5@sm padl-50@md">...</div>
```
Y pues, estos estilos:
```css
.padr-10 {
  padding-right: 10px;
}

.padb-10 {
  padding-bottom: 20px;
}

.padl-10 {
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

[&uarr; Volver Arriba](#layouter-js)

### Flex
Este es el parametro más interesante, porque es el que determina el 'display' del elemento. El valor del atributo 'flex' se separa entre dos puntos, y no convencionalmente con guión como se hace en 'cols', 'mar' y 'pad'.

#### Equivalencias de abreviaciones:
- jc: justify-content
- ai: align-items
- ce: center
- fs: flex-start
- fe: flex-end
- sb: space-between
- sa: space-around
- fw: flex-wrap
- nw: nowrap
- w: wrap
- wr: wrap-reverse
- fd: flex-direction
- r: row
- rr: row-reverse
- co: column
- cor: column-reverse

#### Ejemplo:
```html
<div flex="jc:ce jc:fs@sm ai:fs@sm jc:fe@md">...</div>
```
> **OJO**: Es posible determinar más de un estilo en el mismo breakpoint, en el caso del ejemplo de arriba, se determinó el justify-content: flex-start y align-items: flex-start para el breakpoint 'sm' osea (tablet)

...luego de procesarlo:
```javascript
const myDiv = document.querySelector('div');
layouter.setFlex(myDiv);
```
...obtendríamos este resultado:
```html
<div class="flex-jc:c flex-jc:fs-ai:fs@sm flex-jc:fe@md">...</div>
```
Y pues, estos estilos:
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

> Nota: cuando determinamos más de un estilo para 1 mismo breakpoint, el nombre de las clases generadas son concatenadas, solo para ahorrar espacio.

[&uarr; Volver Arriba](#layouter-js)

## Métodos:

### GetParameters:
Es posible adicionar un segundo argumento a los métodos: setCols, setPads, setMars y setFlex, el cual es un objeto con los parametros obtenidos, aunque este uso no es comun, y se realiza de forma automática cuando se usa el método 'build', veamos un ejemplo:

Si por alguna razón hemos obtenido previamente los parametros de un DIV y luego queremos determinarle las columnas, hacemos esto:
```javascript
const myDiv = document.querySelector('div');
const myParameters = layout.getParameters(myDiv);
layouter.setCols(myDiv, myParameters);
```
Se obtendrá el mismo resultado que si no le pases los parametros, pero puedes ahorrar un proceso más al sistema.

### Set
Sirve para procesar todos los atributos aceptados por el sistema.

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

No sería recomendable aplicar los métodos separados de 'setCols', 'setPads', 'setMars' y 'setFlex' para procesar cada atributo, en ese caso procesamos con el método 'set', y éste procesará todos los demás mencionados:
```javascript
const myDiv = document.querySelector('div');
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

> OJO: El método build también procesa los atributos de los margenes y paddings por separado, osea 'mart, marr, padb, padl, etc"

[&uarr; Volver Arriba](#layouter-js)

## Getters
Para fines varios, se tiene acceso a los siguientes getters de la instancia:
- breakPoints: Devuelve un array con los breakpoints definidos en la configuración.
- sizes: Devuelve un objeto en donde cada propiedad es el nombre del breakpoint y como valor de esas propiedades los pixeles de ancho designados para esos breakpoints.
- cols: Devuelve un objeto en donde cada propiedad es el nombre del breakpoint y como valor de esas propiedades el número de columnas designadas para esos breakpoints.
- styles: Este getter es interesante, porque devuelve un objeto con todos los estilos creados de forma general.

> Tomando en cuenta el último ejemplo dado, los getters nos devolverán lo siguiente:

```javascript
layout.breakPoints:  [ "xs", "sm", "md", "lg" ]
layout.sizes: { xs: 0, sm: 768, md: 1024, lg: 1280 }
layout.cols:  { xs: 15, sm: 31, md: 31, lg: 31 }
layout.styles: {
  "cols-10\\/31@sm-md": "@media screen and (min-width: 768px) and (max-width: 1023px){.cols-10\\/31\\@sm-md{width:32.25806451612903%}}"
  "cols-13\\/15": ".cols-13\\/15{width:86.66666666666667%}"
  "cols-15\\/27@md": "@media screen and (min-width: 1024px){.cols-15\\/27\\@md{width:55.55555555555556%}}"
  "flex-jc\\:c": ".flex-jc\\:c{justify-content:center;display: flex}"
  "flex-jc\\:fe@md": "@media screen and (min-width: 1024px){.flex-jc\\:fe\\@md{justify-content:flex-end;display: flex}}"
  "flex-jc\\:fs-ai\\:fs@sm": "@media screen and (min-width: 768px){.flex-jc\\:fs-ai\\:fs\\@sm{justify-content:flex-start;align-items:flex-start;display: flex}}"
  "mar-20-2\\/15": ".mar-20-2\\/15{margin:20px 13.333333333333334%}"
  "mar-40-3\\/31@sm": "@media screen and (min-width: 768px){.mar-40-3\\/31\\@sm{margin:40px 9.67741935483871%}}"
  "mar-60-2\\/31@md": "@media screen and (min-width: 1024px){.mar-60-2\\/31\\@md{margin:60px 6.451612903225806%}}"
  "pad-20-1\\/15": ".pad-20-1\\/15{padding:20px 6.666666666666667%}"
  "pad-40-3\\/31@sm": "@media screen and (min-width: 768px){.pad-40-3\\/31\\@sm{padding:40px 9.67741935483871%}}"
  "pad-60-2\\/31@md": "@media screen and (min-width: 1024px){.pad-60-2\\/31\\@md{padding:60px 6.451612903225806%}}"
}
```

Tambien tenemos este único getter general que nos dará la versión de la librería:

- version: Devuelve la versión actual de la librería, este es un getter estático, así que no necesita una instancia para funcionar.

```javascript
Layouter.version: "1.3.2Beta"
/* Se tiene acceso a la variable 'Layouter' de forma global a penas se carga la librería */
```

[&uarr; Volver Arriba](#layouter-js)

## Método extra
- ### getParameters
Tambien es posible obtener los parametros definidos en un elemento, digamos, tenemos un DIV, y queremos saber si tiene cols, mar, flex o los que tengan, pues tiramos del método, 'getParameters'

```javascript
const myDiv = document.querySelector('div');
layout.getParameters(myDiv);

// Obtendremos un objeto así...

{
  cols: [ "13/15", "10/31@sm-md", "15/27@md" ],
  mar: [ "20-2/15", "40-3/31@sm", "60-2/31@md" ],
  pad: [ "20-1/15", "40-3/31@sm", "60-2/31@md" ],
  flex: [ "jc:c", "jc:fs@sm", "jc:fe@md", 'ai:fs@sm' ]
}
```

## Cosas que agregaré más adelante
- ~~Sistema de Log~~ - Listo!
- Adicionar la posibilidad de determinar un estilo con !important.
- Guardado en localStorage de configuraciones parametrales y clases creadas.

Por el momento eso es todo lo que trae, más adelante le agregaré más cosas que se me ocurran o que me sugieran.

> Nota: Disculpen si hay alguna falta ortográfica en este documento, no soy muy bueno con las palabras :V