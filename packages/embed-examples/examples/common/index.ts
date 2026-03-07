import { interfaceVersion, sdkKey } from '@mp/common';

declare global {
  interface Window {
    MP_SDK: any;
  }
}

type ConnectOptions = {
  urlParams?: { [key: string]: string };
};

export async function connect(options: ConnectOptions = {}): Promise<any> {
  const urlParams = new URLSearchParams(window.location.search);

  for (const key in options.urlParams) {
    if (!urlParams.has(key)) {
      urlParams.set(key, options.urlParams[key]);
    }
  }

  let applicationKey = sdkKey;
  if (urlParams.has('applicationKey')) {
    applicationKey = urlParams.get('applicationKey');
  }

  let apiHost = 'https://my.matterport.com';
  if (urlParams.has('apiHost')) {
    apiHost = urlParams.get('apiHost');
  }

  if (!urlParams.has('m')) {
    urlParams.set('m', 'j4RZx7ZGM6T');
  }

  const iframe = document.getElementById('sdk-frame') as HTMLIFrameElement;
  const embedUrl = `${apiHost}/show/?${urlParams.toString()}`;

  iframe.src = embedUrl;

  try {
    const sdk = await window.MP_SDK.connect(iframe, applicationKey, interfaceVersion);
    await sdk.App.state.waitUntil((state: any) => state.phase === sdk.App.Phase.PLAYING);
    return sdk;
  } catch (e) {
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
      <h3 style="margin-top:0">⚠️ Error de conexión con Matterport</h3>
      <p style="margin-bottom:10px">El programa no pudo cargar las Interacciones 3D.</p>
      <p style="font-size:14px; opacity:0.9"><b>Motivo más probable:</b> No has autorizado el dominio <br><code>${window.location.hostname}</code> <br>en tu configuración de llaves SDK en Matterport.</p>
      <p style="font-size:12px; margin-top:15px; background:rgba(0,0,0,0.2); padding:5px; border-radius:4px;">Error técnico: ${e}</p>
    `;
    document.body.appendChild(errorAlert);
    throw e;
  }
}

export function setMessage(element: HTMLDivElement, message: string) {
  element.classList.remove('hidden');
  element.classList.add('visible');
  element.innerText = message;
}

export function clearMesssage(element: HTMLDivElement) {
  element.classList.remove('visible');
  element.classList.add('hidden');
}
