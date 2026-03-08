
import type { MpSdk } from 'embedtypes/sdk';
import { clearMesssage, connect, setMessage } from '../common';
import '../common/main.css';
import sourceDescs from './sources.json';
const main = async () => {
  const sdk: MpSdk = await connect({
    urlParams: {
      m: 'hXEV8zd9GFy',
      qs: '1',
      play: '1',
      title: '0',
    },
  });
  // 1. Buscador de coordenadas
  sdk.Pointer.intersection.subscribe((intersection) => {
    console.log("📍 COORDENADAS EXACTAS --->", intersection.position);
  });




try {
  const tags = [
    // 4. Etiqueta con Página Web (Portal Minverso)
    {
      label: "Portal Minverso",
      description: "Visita la web en: https://minverso.com/",
      anchorPosition: { x: -17.48317675608226, y: 1.5187469757876864, z: -2.091560056023497 },
      stemVector: { x: 0, y: 0, z: 0.3 }, 
      color: { r: 0.1, g: 0.5, b: 0.9 }
    },
    // 5. Etiqueta Puntero General
    {
      label: "Checklist de Procedimiento",
      description: "1. Verificar entorno\n2. Desconectar fuentes\n3. Instalar candado\n4. Confirmar energía 0",
      anchorPosition: { x: -18.84844260110858, y: 1.4173556575678552, z: -2.2862425066143888 },
      stemVector: { x: 0, y: 0, z: 0.3 }
    },
    // 6. Checklist - Paso 1: Notificación
    {
      label: "Paso 1: Notificación",
      description: "Asegurar que el área sabe que el equipo se va a detener.\n- Identificar equipo.\n- Tomar equipo de comunicación.\n- Contactar encargado.",
      anchorPosition: { x: -20.150332696302176, y: 1.3709234770882979, z: 1.9866658130739545 },
      stemVector: { x: 0.3, y: 0, z: 0 }, 
      color: { r: 1.0, g: 0.6, b: 0.0 }
    },
    // 7. Checklist - Paso 2: Identificación
    {
      label: "Paso 2: Identificación",
      description: "Encontrar el punto exacto para cortar energía.\n- Navegar a sala eléctrica.\n- Localizar tablero general.\n- Ubicar interruptor específico.",
      anchorPosition: { x: -18.529327892253587, y: 1.3973318241732346, z: -2.28414095753124 },
      stemVector: { x: 0, y: 0, z: 0.3 },
      color: { r: 0.0, g: 0.6, b: 1.0 }
    },
    // 8. Checklist - Paso 3: Aislamiento
    {
      label: "Paso 3: Aislamiento",
      description: "Cortar físicamente el flujo de energía.\n- Posicionarse frente al interruptor.\n- Bajar la palanca a OFF.\n- Confirmar corte sensorialmente.",
      anchorPosition: { x: -18.177982691555478, y: 1.436838075870597, z: -2.2840438033412074 },
      stemVector: { x: 0, y: 0, z: 0.3 }, 
      color: { r: 1.0, g: 0.2, b: 0.2 }
    },
    // 9. Checklist - Paso 4: Dispositivos LOTO
    {
      label: "Paso 4: Equipamiento LOTO",
      description: "Obtener herramientas.\n- Ir a caja de bloqueo.\n- Tomar pinza múltiple.\n- Tomar candado.\n- Tomar tarjeta de peligro.",
      anchorPosition: { x: -12.616050346465235, y: 1.071646749466924, z: -2.3779522150944175 },
      stemVector: { x: -0.3, y: 0, z: 0 }, 
      color: { r: 0.9, g: 0.8, b: 0.1 }
    },
    // 10. Checklist - Paso 5: Bloqueo y Etiquetado
    {
      label: "Paso 5: Bloqueo Físico",
      description: "Bloquear interruptor por seguridad.\n- Regresar al punto.\n- Instalar pinza.\n- Instalar candado.\n- Instalar tarjeta.",
      anchorPosition: { x: -18.35398795122292, y: 1.1958310971101018, z: -2.2819071505573754 },
      stemVector: { x: 0, y: 0, z: 0.3 }, 
      color: { r: 0.1, g: 0.8, b: 0.4 }
    },
    // 11. Video YouTube Short
    {
      label: "Ver Instrucción en Video",
      description: "Mira el video haciendo clic aquí:\nhttps://www.youtube.com/watch?v=EO4hZ4zCB2s",
      anchorPosition: { x: -20.14494392712383, y: 2.66628277778894367, z: 1.8595612150004504 },
      stemVector: { x: 0, y: 0, z: 0 }
    }
  ];

  for (const t of tags) {
    try {
      await sdk.Tag.add(t);
    } catch (e) {
      console.error("No se pudo agregar el tag:", t.label, e);
    }
  }
  console.log("¡Todas las etiquetas nativas cargadas exitosamente!");
} catch (error) {
  console.error("Error cargando etiquetas:", error);
  const errorAlert = document.createElement('div');
  errorAlert.style.position = 'absolute';
  errorAlert.style.top = '20px';
  errorAlert.style.left = '50%';
  errorAlert.style.transform = 'translateX(-50%)';
  errorAlert.style.backgroundColor = '#e74c3c';
  errorAlert.style.color = 'white';
  errorAlert.style.padding = '20px';
  errorAlert.style.borderRadius = '8px';
  errorAlert.style.zIndex = '999999';
  errorAlert.style.fontFamily = 'sans-serif';
  errorAlert.style.boxShadow = '0 4px 15px rgba(0,0,0,0.4)';
  errorAlert.style.textAlign = 'center';
  errorAlert.innerHTML = `
    <h3 style="margin-top:0">⚠️ Error con SDK</h3>
    <p style="margin-bottom:10px">No se pudieron crear las etiquetas básicas.</p>
    <p style="font-size:12px; margin-top:15px; background:rgba(0,0,0,0.2); padding:5px; border-radius:4px;">${error}</p>
  `;
  document.body.appendChild(errorAlert);
}



  const textElement = document.getElementById('text') as HTMLDivElement;
  const sensor = await sdk.Sensor.createSensor(sdk.Sensor.SensorType.CAMERA);
  sensor.showDebug(true);
  sensor.readings.subscribe({
    onCollectionUpdated: (sourceCollection) => {
      const inRange: unknown[] = [];
      for (const [source, reading] of sourceCollection) {
        if (reading.inRange) {
          const search = inRange.find((element) => {
            return element === source.userData.id;
          });
          if (!search) {
            inRange.push(source.userData.id);
          }
        }
        console.log('sensor id', source.userData.id, 'inRange', reading.inRange, 'inView', reading.inView);
      }
      if (inRange.length > 0) {
        setMessage(textElement, inRange.toString());
      } else {
        clearMesssage(textElement);
      }
    },
  });
  const sourcePromises: Promise<any>[] = [];
  for (const desc of sourceDescs) {
    switch (desc.type as MpSdk.Sensor.SourceType) {
      case sdk.Sensor.SourceType.BOX:
        sourcePromises.push(sdk.Sensor.createSource(sdk.Sensor.SourceType.BOX, desc.options));
        break;
      // Example of handling a sphere source and setting types correctly.
      case sdk.Sensor.SourceType.SPHERE:
        sourcePromises.push(sdk.Sensor.createSource(sdk.Sensor.SourceType.SPHERE, desc.options));
        break;
      // Example of handling a cylinder source and setting types correctly.
      case sdk.Sensor.SourceType.CYLINDER:
        sourcePromises.push(sdk.Sensor.createSource(sdk.Sensor.SourceType.CYLINDER, desc.options));
        break;
    }
    switch (desc.type) {
      case sdk.Sensor.SourceType.BOX:
        sourcePromises.push(sdk.Sensor.createSource(<MpSdk.Sensor.SourceType.BOX>desc.type, desc.options));
        break;
      // Example of handling a sphere source and setting types correctly.
      case sdk.Sensor.SourceType.SPHERE:
        sourcePromises.push(sdk.Sensor.createSource(<MpSdk.Sensor.SourceType.SPHERE>desc.type, desc.options));
        break;
      // Example of handling a cylinder source and setting types correctly.
      case sdk.Sensor.SourceType.CYLINDER:
        sourcePromises.push(sdk.Sensor.createSource(<MpSdk.Sensor.SourceType.CYLINDER>desc.type, desc.options));
        break;
    }
  }
  const sources = await Promise.all(sourcePromises);
  sensor.addSource(...sources);
};
main();
