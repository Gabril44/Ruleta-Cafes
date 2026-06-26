# Ruleta de cafes

Sitio estatico listo para GitHub Pages.

## Cambiar opciones

Edita el array `coffeePlaces` en `script.js`.

```js
{
  name: "Nombre del cafe",
  note: "Comentario corto para el resultado.",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Nombre%20del%20cafe"
}
```

La ruleta se genera automaticamente desde ese array.

## Agregar fotos de fondo

Pon tus fotos en:

```txt
assets/photos/
```

Por defecto la pagina busca:

```txt
nosotros-1.jpg
nosotros-2.jpg
nosotros-3.jpg
```

Si quieres cambiar nombres o sumar mas espacios, edita el array `backgroundPhotos` en `script.js`.
