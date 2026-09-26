import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()

export class UtilityService {

    getDateTimeFormatted(date) {
        const d = moment(date * 1000);
        const dateStr = (moment().diff(d, 'days') >= 2) ? d.fromNow() : d.calendar().split(' ')[0];
        return dateStr + ' - ' + moment(date * 1000).format('MMMM Do YYYY, h:mm:ss a');
    };
    getDateTimeFormattedShort(date) {
       const d = moment(date * 1000);
        const dateStr = moment(date * 1000).format('L');
        return dateStr;
    }
}
