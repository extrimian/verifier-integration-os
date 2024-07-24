import { IVerification } from "src/domain/db/schemas/invitation.schema"
interface CheckClass{
    available:String[]
}
interface CheckResponse{
  result:boolean,
  message:string
}
function convertToTimestamp(dateString:string) {
  const [year, month, day] = dateString.split('/').map(Number);
  console.log('----date33----',year , month , day)
  const date = new Date(year, month - 1, day);
  const timestamp = date.getTime();

  return date;
}

export const checkClass = (invitation : IVerification, data:any , checkDate:boolean):CheckResponse => {
  const list = invitation.verificationParams as CheckClass
  const type = data?.credentialSubject?.category
  const isAvailable = list.available.includes(type)
  if(checkDate){
    let date = data?.credentialSubject?.validFrom
        date = convertToTimestamp(date);
    const dateNow = new Date()
    const diff = dateNow.getTime() - date.getTime()
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24))
    if(diffDays < 0){
      return {result : false , message:'Credential out of date'}
    }
  }
  if(isAvailable){
    return {result : true , message:'Verification success'}
  }else{
    return {result : false , message:'Credential type not available to pass'}
  }
}