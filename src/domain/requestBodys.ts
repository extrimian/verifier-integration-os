export interface IoobBody{
      did: string ;
      inputDescriptors:Array<any>;
      issuer?:object;
      verificationParams?:object;
}
export interface IverificationBody{
    eventType: string,
    eventData: EventData
}
export interface IverifiableCredential{
    credentialSubject: {id:string},
}

type EventData = {
        invitationId: string,
        holderDID: string,
        verifiableCredentials: Array<IverifiableCredential>,
        verified: boolean,
        verifierDID: string,
        role: string   
}
