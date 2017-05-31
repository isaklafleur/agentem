/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
interface JQuery {
   daterangepicker(options?: any, callback?: Function) : any;
   slick(options?: any, callback?: Function) : any;
}