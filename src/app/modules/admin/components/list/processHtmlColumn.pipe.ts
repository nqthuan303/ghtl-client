import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'processHtmlColumn' })
export class ProcessHtmlColumnPipe implements PipeTransform {

    transform(column: any, objData: any) {
        let result = column;
        let item = objData.item;
        let componentInfo = objData.componentInfo;

        if (column.type == 'html') {
            let elms = column.elms;
            result = '';

            for (let i = 0; i < elms.length; i++) {
                let elm = elms[i];
                switch (elm.elmType) {
                    case 'slb-orderstatus':
                        let elmData = elm.elmData;
                        result += this.getSlbOrderStatus(elmData, item.orderstatus_id._id);
                        break;
                    case 'btn-edit':
                        result += '<button type="button" class="btn btn-primary btn-edit"><i class="fa fa-pencil"></i></button> ';
                        break;
                    case 'btn-delete':
                        result += '<button type="button" class="btn btn-danger btn-delete"><i class="fa fa-trash-o"></i></button> ';
                        break;
                    case 'btn-add-orderstatus':
                        result += '<button type="button" class="btn btn-success btn-add-orderstatus"><i class="fa fa-plus-square"></i></button>';
                        break;
                }
            }
        }
        return result;
    }
    getSlbOrderStatus(elmData: any, orderStatusId: string) {
        let result = '<select class="form-control slb-orderstatus">';

        for (let j = 0; j < elmData.length; j++) {
            let dataItem = elmData[j];
            let strSelected = ' ';
            if (orderStatusId == dataItem._id) {
                strSelected = ' selected="selected" ';
            }
            result += '<option' + strSelected + 'value="' + dataItem._id + '">' + dataItem.name + '</option>';
        }

        result += '</select>';
        return result;
    }
}