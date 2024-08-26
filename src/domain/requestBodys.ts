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
  verifiableCredential:{credentialSubject: {id:string}}[]
}

export interface IBuisinessLogic {
      invitationId: string,
      holderDID: string,
      verifierDID: string,
      vcs: IverifiableCredential
  }


export type EventData = {
      invitationId: string,
      holderDID: string,
      verifiableCredentials: Array<IverifiableCredential>,
      verified: boolean,
      verifierDID: string,
      role: string   
}

