# Actualización a Expo SDK 57

Versiones instaladas: Expo 57.0.22, React Native 0.86.3, React 19.2.3, Reanimated 4.5.1 y Worklets 0.10.1. El archivo package-lock.json fija las versiones instaladas. Jest y sus tipos se alinearon con las versiones que recomienda Expo (29.7 y 29.5.14).

Se migraron los imports de navegación a expo-router/react-navigation, el acceso al sistema de archivos a expo-file-system/legacy para conservar la exportación CSV, los tipos de colores y el nombre del icono de contraseña. Se eliminaron las dependencias directas de React Navigation y dos paquetes nativos antiguos sin uso (masked-view y react-native-vector-icons). Se actualizaron los mocks de tests para TypeScript 6. El comportamiento de comunicación y los datos del backend no se modificaron.

Los archivos nativos de iOS se regeneraron con la plantilla oficial de SDK 57. La configuración anterior no contenía código nativo personalizado ni un equipo de firma configurado. Se conserva el identificador com.trabajofinal.mitfgapp. No se instalaron Pods ni se compiló un binario nativo: el Mac tiene Xcode 16.2 y SDK 57 requiere Xcode 26.4 y un destino mínimo iOS 16.4. La carpeta nativa previa y sus Pods están en la copia de seguridad.

## Abrir en Expo Go

Cierra el servidor anterior con Ctrl+C. Desde la carpeta del frontend:

```sh
cd /Users/angelafernandez/Desktop/TFG/mi-tfg-app
npx expo start --go --clear
```

Escanea el QR nuevo con el iPhone. Mac e iPhone deben poder conectarse entre sí; normalmente deben estar en la misma red Wi-Fi. La URL del backend en .env debe apuntar al Mac o a un servidor accesible, no a localhost del iPhone. El archivo .env se ha conservado.

## Compilación nativa futura

Actualiza Xcode a 26.4 o posterior antes de ejecutar `npx expo run:ios --device`. Ese paso instala las dependencias nativas y genera el workspace actualizado. No reutilices el workspace/Pods del SDK 53.

Expo Doctor pasa 20/21 comprobaciones; todas las versiones de paquetes son correctas. Su único aviso indica que, al conservar ios/ junto con app.json, EAS no sincroniza automáticamente la configuración nativa. Si cambias configuración nativa, ejecuta prebuild y revisa sus cambios antes de compilar. En SDK 57 prebuild regenera ios/ por defecto: conserva cualquier cambio nativo manual antes de usarlo.

## Validación

- TypeScript: correcto.
- Tests del teclado: 12/12 correctos.
- Exportación de iOS (Hermes), Android y web: correcta.
- ESLint en los archivos de aplicación modificados: sin errores, dos avisos de variables no usadas preexistentes.
- No se ha probado físicamente en el iPhone ni se ha compilado un binario con Xcode.

Fuentes: https://expo.dev/changelog/sdk-57, https://expo.dev/changelog/sdk-56, https://docs.expo.dev/router/migrate/sdk-55-to-56/.
