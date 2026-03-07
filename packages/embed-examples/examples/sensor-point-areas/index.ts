
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
// 4. Etiqueta con Página Web (Portal Minverso)
const [minversoSandboxId] = await sdk.Tag.registerSandbox(
  `<iframe src="https://minverso.com/" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"></iframe>`,
  { 
    // Proporciones ajustadas según tu recuadro rojo (más ancho, manteniendo el formato vertical)
    size: { w: 600, h: 850 } 
  }
);
sdk.Tag.add({
  label: "Portal Web Minverso",
  // Eliminé la 'description' para que la página web ocupe todo el espacio sin el recuadro negro abajo
  anchorPosition: { 
    x: -17.48317675608226, 
    y: 1.5187469757876864, 
    z: -2.091560056023497 
  },
  stemVector: { x: 0, y: 0, z: 0.3 }, 
  attachments: [minversoSandboxId]
});
// 5. Etiqueta con Checklist Interactivo (HTML Personalizado)
const htmlChecklist = `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: white; height: 100%; box-sizing: border-box;">
    <h2 style="margin-top: 0; border-bottom: 2px solid #00aaff; padding-bottom: 10px;">Checklist de Bloqueo</h2>
    <form style="font-size: 16px; line-height: 2;">
      <label style="display: block; margin-bottom: 12px; cursor: pointer;">
        <input type="checkbox" style="transform: scale(1.4); margin-right: 12px;"> 
        Paso 1: Verificar entorno y delimitar el área.
      </label>
      <label style="display: block; margin-bottom: 12px; cursor: pointer;">
        <input type="checkbox" style="transform: scale(1.4); margin-right: 12px;"> 
        Paso 2: Desconectar las fuentes de energía.
      </label>
      <label style="display: block; margin-bottom: 12px; cursor: pointer;">
        <input type="checkbox" style="transform: scale(1.4); margin-right: 12px;"> 
        Paso 3: Instalar candado y tarjeta (LOTO).
      </label>
      <label style="display: block; margin-bottom: 12px; cursor: pointer;">
        <input type="checkbox" style="transform: scale(1.4); margin-right: 12px;"> 
        Paso 4: Confirmar energía cero (prueba de arranque).
      </label>
    </form>
  </div>
`;
// Registramos el HTML como un Sandbox con tamaño de ventana pequeña
const [checklistSandboxId] = await sdk.Tag.registerSandbox(
  htmlChecklist,
  { size: { w: 400, h: 350 } } 
);
// Posicionamos la etiqueta en las coordenadas que capturaste
sdk.Tag.add({
  label: "Checklist de Procedimiento",
  anchorPosition: { 
    x: -18.84844260110858, 
    y: 1.4173556575678552, 
    z: -2.2862425066143888 
  },
  stemVector: { x: 0, y: 0, z: 0.3 }, 
  attachments: [checklistSandboxId]
});

// 6. Checklist - Paso 1: Notificación y Autorización (CON INTELIGENCIA SECUENCIAL)
const htmlChecklistPaso1 = `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: white; height: 100%; box-sizing: border-box;">
    <h2 style="margin-top: 0; border-bottom: 2px solid #ffaa00; padding-bottom: 10px; font-size: 22px;">
      📋 Paso 1: Notificación
    </h2>
    <p style="font-size: 14px; color: #cccccc; margin-bottom: 20px;">
      <strong>Objetivo:</strong> Asegurar que el área sabe que el equipo se va a detener.
    </p>
    <form style="font-size: 15px; line-height: 1.6;">
      <label style="display: block; margin-bottom: 15px; cursor: pointer;">
        <input type="checkbox" class="check-paso1" style="transform: scale(1.4); margin-right: 12px; vertical-align: middle;"> 
        Identificar equipo.
      </label>
      <label style="display: block; margin-bottom: 15px; cursor: pointer;">
        <input type="checkbox" class="check-paso1" style="transform: scale(1.4); margin-right: 12px; vertical-align: middle;"> 
        Tomar equipo de comunicación.
      </label>
      <label style="display: block; margin-bottom: 15px; cursor: pointer;">
        <input type="checkbox" class="check-paso1" style="transform: scale(1.4); margin-right: 12px; vertical-align: middle;"> 
        Contactar al encargado.
      </label>
      <label style="display: block; margin-bottom: 15px; cursor: pointer;">
        <input type="checkbox" class="check-paso1" style="transform: scale(1.4); margin-right: 12px; vertical-align: middle;"> 
        Recibir autorización.
      </label>
    </form>
    <div id="mensaje-exito" style="display: none; color: #2ecc71; font-weight: bold; margin-top: 15px;">
      ¡Paso 1 completado! Busca el siguiente punto.
    </div>
  </div>
  <script>
    // Este código revisa si todos los checkbox están marcados
    const checkboxes = document.querySelectorAll('.check-paso1');
    const mensajeExito = document.getElementById('mensaje-exito');
    checkboxes.forEach(chk => {
      chk.addEventListener('change', () => {
        const todosMarcados = Array.from(checkboxes).every(c => c.checked);
        if (todosMarcados) {
          mensajeExito.style.display = 'block'; // Muestra mensaje de éxito
          // ¡Aquí está la magia! Le avisa a tu archivo index.ts que terminó el Paso 1
          window.parent.postMessage('PASO_1_COMPLETADO', '*');
        } else {
          mensajeExito.style.display = 'none';
        }
      });
    });
  </script>
`;
const [checklistPaso1SandboxId] = await sdk.Tag.registerSandbox(htmlChecklistPaso1, { size: { w: 480, h: 420 } });
// Este es el ÚNICO punto que aparecerá al cargar la página
sdk.Tag.add({
  label: "Paso 1: Notificación",
  anchorPosition: { x: -20.150332696302176, y: 1.3709234770882979, z: 1.9866658130739545 },
  stemVector: { x: 0.3, y: 0, z: 0 }, 
  attachments: [checklistPaso1SandboxId]
});
// 7. Lógica Secuencial: Esperar a que el Paso 1 termine para mostrar el Paso 2
window.addEventListener('message', async (event) => {
  // Verificamos si el mensaje que llegó es el de éxito del Paso 1
  if (event.data === 'PASO_1_COMPLETADO') {
    console.log("¡El usuario completó el Paso 1! Generando el Paso 2...");
    // Recién aquí creamos el HTML y el Sandbox del Paso 2
    const htmlChecklistPaso2 = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: white; height: 100%; box-sizing: border-box;">
        <h2 style="margin-top: 0; border-bottom: 2px solid #00aaff; padding-bottom: 10px; font-size: 22px;">
          📋 Paso 2: Identificación
        </h2>
        <p style="font-size: 14px; color: #cccccc; margin-bottom: 20px;">
          <strong>Objetivo:</strong> Encontrar el punto exacto para cortar energía.
        </p>
        <form style="font-size: 15px; line-height: 1.6;">
          <label style="display: block; margin-bottom: 15px; cursor: pointer;">
            <input type="checkbox" style="transform: scale(1.4); margin-right: 12px; vertical-align: middle;"> Navegar a la sala eléctrica.
          </label>
          <label style="display: block; margin-bottom: 15px; cursor: pointer;">
            <input type="checkbox" style="transform: scale(1.4); margin-right: 12px; vertical-align: middle;"> Localizar tablero general.
          </label>
          <label style="display: block; margin-bottom: 15px; cursor: pointer;">
            <input type="checkbox" style="transform: scale(1.4); margin-right: 12px; vertical-align: middle;"> Ubicar el interruptor específico.
          </label>
        </form>
      </div>
    `;
    const [checklistPaso2SandboxId] = await sdk.Tag.registerSandbox(htmlChecklistPaso2, { size: { w: 480, h: 400 } });
    // Hacemos aparecer el punto interactivo del Paso 2 en el modelo 3D
    sdk.Tag.add({
      label: "Paso 2: Identificación",
      anchorPosition: { x: -18.529327892253587, y: 1.3973318241732346, z: -2.28414095753124 },
      stemVector: { x: 0, y: 0, z: 0.3 }, 
      attachments: [checklistPaso2SandboxId]
    });
  }
});








// 8. Checklist - Paso 3: Aislamiento
const htmlChecklistPaso3 = `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: white; height: 100%; box-sizing: border-box;">
    <h2 style="margin-top: 0; border-bottom: 2px solid #ff4444; padding-bottom: 10px; font-size: 22px;">
      📋 Paso 3: Aislamiento
    </h2>
    <p style="font-size: 14px; color: #cccccc; font-style: italic; margin-bottom: 20px;">
      <strong>Objetivo:</strong> Cortar físicamente el flujo de energía.
    </p>
    <form style="font-size: 15px; line-height: 1.6;">
      <label style="display: block; margin-bottom: 15px; cursor: pointer;">
        <input type="checkbox" style="transform: scale(1.4); margin-right: 12px; vertical-align: middle;"> 
        <strong>Posicionamiento:</strong> Situarse frente al interruptor identificado en el paso anterior.
      </label>
      <label style="display: block; margin-bottom: 15px; cursor: pointer;">
        <input type="checkbox" style="transform: scale(1.4); margin-right: 12px; vertical-align: middle;"> 
        <strong>Accionar mecanismo:</strong> Bajar la palanca o girar el interruptor a la posición de apagado ("OFF").
      </label>
      <label style="display: block; margin-bottom: 15px; cursor: pointer;">
        <input type="checkbox" style="transform: scale(1.4); margin-right: 12px; vertical-align: middle;"> 
        <strong>Confirmación sensorial:</strong> Validar el corte mediante el feedback visual (luces apagadas) y auditivo (sonido del corte).
      </label>
    </form>
  </div>
`;
// Registramos el Sandbox manteniendo las proporciones (w: 480, h: 400)
const [checklistPaso3SandboxId] = await sdk.Tag.registerSandbox(
  htmlChecklistPaso3,
  { size: { w: 480, h: 400 } } 
);
// Posicionamos la etiqueta en las nuevas coordenadas del Paso 3
sdk.Tag.add({
  label: "Paso 3: Aislamiento",
  anchorPosition: { 
    x: -18.177982691555478, 
    y: 1.436838075870597, 
    z: -2.2840438033412074 
  },
  // Como estamos en la misma línea de tableros, mantenemos el eje Z para que apunte hacia el frente
  stemVector: { x: 0, y: 0, z: 0.3 }, 
  attachments: [checklistPaso3SandboxId]
});

// 9. Checklist - Paso 4: Recolección de Etiquetas y Dispositivos de Bloqueo
const htmlChecklistPaso4 = `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: white; height: 100%; box-sizing: border-box;">
    <h2 style="margin-top: 0; border-bottom: 2px solid #f1c40f; padding-bottom: 10px; font-size: 22px;">
      📋 Paso 4: Dispositivos LOTO
    </h2>
    <p style="font-size: 14px; color: #cccccc; font-style: italic; margin-bottom: 20px;">
      <strong>Objetivo:</strong> Obtener las herramientas personales de seguridad.
    </p>
    <form style="font-size: 15px; line-height: 1.6;">
      <label style="display: block; margin-bottom: 15px; cursor: pointer;">
        <input type="checkbox" style="transform: scale(1.4); margin-right: 12px; vertical-align: middle;"> 
        <strong>Ir a la estación de bloqueo:</strong> Desplazarse hacia la caja de seguridad amarilla (SafeLockout).
      </label>
      <label style="display: block; margin-bottom: 15px; cursor: pointer;">
        <input type="checkbox" style="transform: scale(1.4); margin-right: 12px; vertical-align: middle;"> 
        <strong>Tomar pinza múltiple (hasp):</strong> Retirar la pinza de la caja.
      </label>
      <label style="display: block; margin-bottom: 15px; cursor: pointer;">
        <input type="checkbox" style="transform: scale(1.4); margin-right: 12px; vertical-align: middle;"> 
        <strong>Tomar candado personal:</strong> Retirar el candado asignado al trabajador.
      </label>
      <label style="display: block; margin-bottom: 15px; cursor: pointer;">
        <input type="checkbox" style="transform: scale(1.4); margin-right: 12px; vertical-align: middle;"> 
        <strong>Tomar tarjeta de peligro:</strong> Retirar la etiqueta y confirmar que los datos (nombre, fecha, motivo) estén visibles.
      </label>
    </form>
  </div>
`;
// Registramos el Sandbox. Aumenté un poco el alto (h: 460) porque son 4 tareas largas.
const [checklistPaso4SandboxId] = await sdk.Tag.registerSandbox(
  htmlChecklistPaso4,
  { size: { w: 480, h: 460 } } 
);
// Posicionamos la etiqueta en la estación de bloqueo
sdk.Tag.add({
  label: "Paso 4: Equipamiento",
  anchorPosition: { 
    x: -12.616050346465235, 
    y: 1.071646749466924, 
    z: -2.3779522150944175 
  },
  // Si esta pared mira hacia el mismo lado que los tableros anteriores, mantenemos Z. 
  // Si está en una pared lateral, recuerda cambiarlo a { x: 0.3, y: 0, z: 0 }
  stemVector: { x: -0.3, y: 0, z: 0 }, 
  attachments: [checklistPaso4SandboxId]
});
// 10. Checklist - Paso 5: Bloqueo y Etiquetado
const htmlChecklistPaso5 = `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: white; height: 100%; box-sizing: border-box;">
    <h2 style="margin-top: 0; border-bottom: 2px solid #2ecc71; padding-bottom: 10px; font-size: 22px;">
      📋 Paso 5: Bloqueo y Etiquetado
    </h2>
    <p style="font-size: 14px; color: #cccccc; font-style: italic; margin-bottom: 20px;">
      <strong>Objetivo:</strong> Bloquear físicamente el interruptor para que nadie pueda encenderlo por error.
    </p>
    <form style="font-size: 15px; line-height: 1.6;">
      <label style="display: block; margin-bottom: 15px; cursor: pointer;">
        <input type="checkbox" style="transform: scale(1.4); margin-right: 12px; vertical-align: middle;"> 
        <strong>Regresar al punto de corte:</strong> Volver al tablero aislado en el Paso 3.
      </label>
      <label style="display: block; margin-bottom: 15px; cursor: pointer;">
        <input type="checkbox" style="transform: scale(1.4); margin-right: 12px; vertical-align: middle;"> 
        <strong>Instalar pinza:</strong> Colocar la pinza en los orificios de bloqueo de la palanca.
      </label>
      <label style="display: block; margin-bottom: 15px; cursor: pointer;">
        <input type="checkbox" style="transform: scale(1.4); margin-right: 12px; vertical-align: middle;"> 
        <strong>Instalar candado:</strong> Insertar el candado cerrando la pinza.
      </label>
      <label style="display: block; margin-bottom: 15px; cursor: pointer;">
        <input type="checkbox" style="transform: scale(1.4); margin-right: 12px; vertical-align: middle;"> 
        <strong>Instalar tarjeta:</strong> Enganchar la tarjeta de advertencia de "PELIGRO" junto al candado.
      </label>
    </form>
  </div>
`;
// Registramos el Sandbox. Mantenemos la altura en 460 para acomodar los 4 puntos.
const [checklistPaso5SandboxId] = await sdk.Tag.registerSandbox(
  htmlChecklistPaso5,
  { size: { w: 480, h: 460 } } 
);
// Posicionamos la etiqueta en el tablero (Paso 5)
sdk.Tag.add({
  label: "Paso 5: Bloqueo Físico",
  anchorPosition: { 
    x: -18.35398795122292, 
    y: 1.1958310971101018, 
    z: -2.2819071505573754 
  },
  stemVector: { x: 0, y: 0, z: 0.3 }, 
  attachments: [checklistPaso5SandboxId]
});
// 11. Video YouTube Short incrustado en la pared
const [shortSandboxId] = await sdk.Tag.registerSandbox(
  // Usamos el formato /embed/ para que YouTube permita la reproducción
  `<iframe src="https://www.youtube.com/embed/EO4hZ4zCB2s" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
  { 
    // Dimensiones verticales (formato celular / YouTube Shorts)
    size: { w: 340, h: 600 } 
  }
);
sdk.Tag.add({
  label: "Instrucción Rápida",
  // Eliminamos la descripción para que solo se vea el video
  anchorPosition: { 
    x: -20.14494392712383, 
    y: 2.66628277778894367, 
    z: 1.8595612150004504 
  },
  // TRUCO: Al poner todos los valores en 0, quitamos el "tallo". 
  // El punto interactivo quedará pegado directamente sobre la superficie de la pared.
  stemVector: { x: 0, y: 0, z: 0 }, 
  attachments: [shortSandboxId]
});
} catch (error) {
  console.error(error);
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
    <h3 style="margin-top:0">⚠️ Acceso Limitado a "Sandboxes"</h3>
    <p style="margin-bottom:10px">La conexión con Matterport fue exitosa, pero <b>no cargaron las etiquetas interactivas</b> (Checklists, minverso, video).</p>
    <p style="font-size:14px; opacity:0.9"><b>Motivo más probable:</b> Tu Llave SDK es gratuita/estándar. El uso de HTML avanzado dentro de etiquetas requiere habilitar la funcionalidad "Sandbox" para tu licencia.</p>
    <p style="font-size:12px; margin-top:15px; background:rgba(0,0,0,0.2); padding:5px; border-radius:4px;">Error técnico: ${error}</p>
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
