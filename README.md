# Indicadores Económicos

El desarrollo del proyecto muestra inicialmente un listado de indicadores económicos de uso común en Chile, en donde se aprecia su código, nombre, unidad de medida, y cual es su valor con fecha actual.

Podrás visualizar el detalle de cualquiera de los indicadores económicos listados con solo presionarlo en cualquier sitio de la columna.

En este último, accederás a un detalle mucho mas meticuloso sobre el comportamiento del indicador seleccionado a lo largo del tiempo con respecto a su valor (dolar, pesos ó %) para ese momento, el cual varia según su tipo.

Adicionalmente, se desarrollaron dos (2) selectores con los cuales puedes detallar la siguiente información:

-. Valor del indicador en los ultimos tres (3) meses, pudiendo seleccionar ciertos días en específico.
-. Valor del indicador económico en un año en específico, pudiendo observar su comportamiento a lo largo del año seleccionado.

El proyecto fue desarrollado utilizando la librería de JavaScript [Angular](https://angular.io/) para crear la interfaz de usuario, en comunicación con la Api [mindicador.cl](https://mindicador.cl/).

Adicionalmente, se consumió la librería de [Bootstrap v5](https://getbootstrap.com/), con la que se añadieron funcionalidades y estilos a todo el proyecto. Y la librería [Angular directives for Charts.js](https://valor-software.com/ng2-charts/#/GeneralInfo) para la implementación de gráficas.

## Requisitos mínimos

- [Nodejs](https://nodejs.org) con soporte de largo plazo (LTS).
- Un navegador web

## Ambiente de pruebas

Ejecutar en la raíz del proyecto:

```
npm install

npm start
```

## Referencias

- [Angular](https://angular.io/): One framework.
- [Angular Folder Structure](https://angular-folder-structure.readthedocs.io/en/latest/): Create a skeleton structure which is flexible for projects big or small.
- [Google Font](https://fonts.google.com/): The web's most popular icon set and toolkit.
- [Bootstrap](https://getbootstrap.com/): Quickly design and customize responsive mobile-first sites with Bootstrap.
- [Angular Directives for Charts.js](https://valor-software.com/ng2-charts/#/GeneralInfo): You can use one directive, for all chart types.
- [mindicador.cl](https://mindicador.cl/): Para enterarte de las ultimas noticias sobre los indicadores económicos de todo Chile.
