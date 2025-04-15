export default interface ApiErrorModel {
   timestamp: Date;
   message: string;
   devMessage: string;
   httpStatusString: number;
   httpStatus: number;
}
