export class ClientModel {
    _id: string;
    name: string;
    contact_name: string;   
    province_id: string = '587124bcbe644a04d4b14e8b';
    district_id: string;
    ward_id: string;
    address: string;
    phone_number: string;
    phone_number_2: string;
    link: string;
    createdAt: string;
    datetime_modified: string;
    status: number = 1;
    bankNumber: string; // số tài khoản ngân hàng
    bankAccount: string; // Tên chủ tài khoản ngân hàng
    bankBranch: string; // chi nhánh ngân hàng
    bankName: string; // Tên ngân hàng
}