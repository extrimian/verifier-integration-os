# API de Verificación

Esta API está diseñada para gestionar y ejecutar flujos de verificación de credenciales de manera eficiente y segura. Utilizando esta API, puedes generar invitaciones para verificación, aplicar lógica de negocio durante el proceso, y recuperar los resultados de las verificaciones realizadas.

## Recursos

### MongoDB
La API utiliza MongoDB como base de datos para almacenar información relacionada con las invitaciones y los resultados de las verificaciones. Asegúrate de tener acceso a una instancia de MongoDB y de configurar la URL correctamente en las variables de entorno.

### SSI-API
La SSI-API se encarga de realizar el flujo de verificación de credenciales. A través de esta API, se debe obtener el DID utilizado durante los flujos de verificación. 

## Variables de Entorno

Para configurar la API correctamente, asegúrate de definir las siguientes variables de entorno:

- **`SSI_API_URL`**: La URL de la SSI-API.
- **`MONGO_URL`**: La URL de la base de datos MongoDB.

Estas variables son esenciales para la correcta operación de la API y deben estar configuradas en el entorno donde se ejecute la aplicación.


## Endpoints

La API proporciona los siguientes endpoints:

- **GET `/`**: Realiza un healthcheck para revisar el estado del servicio.
- **POST `/getOob`**: Genera una invitación *out-of-band* (OOB) para iniciar el flujo de verificación en un frontend.
- **PUT `/buisinessLogic`**: Aplica una lógica de negocio a la verificación y guarda el resultado para su recuperación futura.
- **GET `/result/:id`**: Recupera el resultado de la verificación asociado con un ID de invitación específico.
- **PUT `/webhook/{nombre de ruta}`**: Permite agregar lógica personalizada para ser ejecutada después del flujo de verificación.

Esta API está construida utilizando [NestJS](https://nestjs.com/) con TypeScript, proporcionando una arquitectura robusta y flexible para manejar las verificaciones de credenciales.


### GET `/`

Este endpoint realiza un healthcheck para revisar el estado del servicio. Cuando se accede a esta ruta, se devuelve una respuesta que indica si el servicio está funcionando correctamente.

### POST `/getOob`

Este endpoint genera una *out-of-band* (OOB) invitation, la cual puede ser expuesta como un código QR o botón para iniciar el flujo de verificación en un frontend.

#### Request Body:
- `did`: `string` - El DID del verificador.
- `inputDescriptors`: `Array<any>` - El tipo de credencial a verificar.
- `issuer?`: `object` - Opcional, el emisor.
- `verificationParams?`: `object` - Opcional, los parámetros para la lógica de verificación.

#### Funcionamiento:
Este endpoint permite al cliente proporcionar el DID del verificador, junto con los tipos de credenciales que se desean verificar a través de `inputDescriptors`. Los parámetros opcionales como el `issuer` y `verificationParams` pueden ser incluidos para personalizar la verificación. La invitación generada se guarda en una base de datos para recuperar los parámetros e ID de invitación en flujos futuros.
### PUT `/buisinessLogic`

Este endpoint permite agregar una lógica de negocio a la verificación, que se ejecutará durante dicho proceso.

#### Request Body:

IBuisinessLogic {
    invitationId: string;
    holderDID: string;
    verifierDID: string;
    vcs: IverifiableCredential;
}

IverifiableCredential {
    verifiableCredential: { credentialSubject: { id: string } }[];
}
#### Funcionamiento:
- Este endpoint recupera la invitación correspondiente usando el `invitationId`, junto con cualquier parámetro extra que se haya guardado.
- La lógica de negocio definida se aplicará durante la verificación, utilizando los datos proporcionados, como el `holderDID`, `verifierDID`, y las credenciales verificables (`vcs`).
- El resultado de la verificación debe retornar una promesa con uno de los siguientes objetos:
  - `{ result: true }` si la verificación es exitosa.
  - `{ result: false, rejectMessage: string }` si la verificación falla.

Además, este endpoint es responsable de guardar el resultado de la verificación, que luego se puede recuperar mediante el endpoint `GET /result/:id`.

### GET `/result/:id`

Este endpoint permite recuperar el resultado de la verificación de manera externa al flujo de verificación.

#### Parámetro de ruta:
- `id`: El ID de la invitación que fue proporcionado por el endpoint `POST /getOob`.

#### Funcionamiento:
Este endpoint se utiliza para obtener el resultado de la verificación asociada con un `invitationId` específico. Al proporcionar el `id` correspondiente, se retorna el resultado previamente guardado por el endpoint `PUT /buisinessLogic`.

### PUT `/webhook/{nombre de ruta}`

Este endpoint no está provisto en el repositorio por defecto, pero se puede agregar si se desea incorporar lógica adicional después del flujo de verificación.

#### Funcionamiento:
Este endpoint permite definir una lógica personalizada que se ejecutará después de que el flujo de verificación haya finalizado. El `{nombre de ruta}` debe ser definido según la lógica específica que se quiera implementar.

## Licencia

Este proyecto está licenciado bajo la Licencia Apache 2.0 modificada con una "Commons Clause". Ver el archivo [LICENSE.md](LICENSE) para más detalles.

