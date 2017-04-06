export class OrderModel {
    _id: string;
    client_id: string;
    shipper_id: string;
    reciever_name: string;
    reciever_phone: string;
    province_id: string = '587124bcbe644a04d4b14e8b';
    district_id: string;
    ward_id: string;
    address: string;
    bonus_fee: number = 0;
    ship_fee: number;
    note: string;
    orderstatus_id: string = '5884a56f7b66847851a426e6';
    datetime_added: string;
    datetime_done: string;
    datetime_modified: string;
}