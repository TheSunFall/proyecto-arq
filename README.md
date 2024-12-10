# Instrucciones de instalación

## Requisitos

* Node.js

## Instalación

* Clonar o descargar el repositorio
* Para usar la api de Google Sheets, crear un proyecto de Google y descargar el archivo de credenciales. Luego, en la raíz del proyecto crear un archivo llamado .env.local con los siguientes campos:
    *  GOOGLE_PRIVATE_KEY= Del campo "private_key" en el archivo de credenciales, todo lo que está entre `"-----BEGIN PRIVATE KEY-----"` y `"-----END PRIVATE KEY-----#`
    * GOOGLE_CLIENT_EMAIL= El valor del campo "client_email"
    * GOOGLE_CLIENT_ID= El valor del campo "client_id"
    * SPREADSHEET_ID= En la URL de la hoja de cálculo, el valor entre /d/ y /edit
* Ejecutar `npm install`
* Ejecutar `npm run dev`

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
