# Aplicación de comunicación mediante pictogramas

Aplicación accesible desarrollada con React Native y Expo para construir y reproducir frases mediante pictogramas. La interfaz está disponible en español e inglés y mantiene los IDs como representación común entre ambos idiomas.

## Requisitos

- Node.js y npm.
- Backend de la aplicación en ejecución.
- Para iOS: Xcode y un simulador configurado.

## Configuración

Crea o actualiza el archivo `.env` sin incluirlo en Git:

```env
EXPO_PUBLIC_API_BASE_URL=http://localhost:8080
```

Si se utiliza un dispositivo físico, sustituye `localhost` por la dirección IP local del ordenador.

## Ejecución

Instala las dependencias:

```bash
npm install
```

Inicia Expo limpiando la caché cuando sea necesario:

```bash
npx expo start --clear
```

Desde el menú de Expo se puede abrir la aplicación web o pulsar `i` para ejecutarla en el simulador de iOS. También puede abrirse el proyecto nativo incluido en `ios/` desde Xcode.

## Predicción de pictogramas

La pantalla principal consulta un modelo GRU entrenado con secuencias de IDs de pictogramas. El backend valida los resultados y devuelve hasta tres sugerencias ordenadas por probabilidad.

- Con la frase vacía se muestran los accesos iniciales **Yo**, **Querer** y **Estar**, correspondientes a los IDs `84`, `43` y `650`.
- Al seleccionar una sugerencia, su ID se añade al contexto enviado al predictor.
- Los verbos abren el conjugador antes de incorporarse a la frase. El modelo utiliza el ID asociado al lema, mientras que el historial conserva la forma conjugada visible.
- Mientras se espera la primera predicción, la sección mantiene su altura y muestra un indicador de carga. Esto evita que la cuadrícula se desplace o parezca que la pantalla se recarga.
- Las respuestas posteriores sustituyen las sugerencias existentes de forma fluida.

La primera propuesta aparece identificada como la más probable. Las tres tarjetas mantienen tamaños equivalentes, desplazamiento horizontal en pantallas estrechas y etiquetas accesibles para lectores de pantalla.

## Bloque de construcción de frase

El texto de la frase utiliza márgenes exteriores e interiores amplios, una altura inicial compacta cuando está vacío y crecimiento animado al añadir contenido. Las frases de varias líneas ajustan automáticamente la altura sin recortar el texto.

## Comprobaciones

Antes de subir cambios del frontend se recomienda ejecutar:

```bash
npx tsc --noEmit
npx eslint app components hooks
```
