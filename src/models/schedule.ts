export class ScheduleModel{
    constructor(
        public s_schedule_id?:number,
        public s_type?:number,
        public s_from?:string,
        public s_to?:string,
        public s_carrier?:string,
        public s_feeder?:string,
        public s_fvoy?:string,
        public s_vessel?:string,
        public s_voy?:string,
        public s_closing_date?:any,
        public s_etd?:any,
        public s_eta?:any,
        public s_feeder_flag?:string,
        public creation_date?:any,
        public created_by?:string,
        public last_update_date?:any,
        public last_update_by?:string,
        public time?:string
    ){}
}