import moment from "moment";
import Event from "../interfaces/GraphQL/Event";
import { EventStatus } from "../types/Event";

const filterEventsFunction = (status: EventStatus) => {
    return (event: Event) => {
        const currentDate = moment();
        switch(status){ 
            case "ACTIVE": 
                return currentDate.diff(moment(event.StartDate), 'days') >= 0 && currentDate.diff(moment(event.EndDate), 'days') < 0
            case "FINISHED":
                return currentDate.diff(moment(event.EndDate), 'days') >= 0;
            case "WAITING":
                return currentDate.diff(moment(event.StartDate), 'days') < 0;
            case "ARCHIVED": 
                return event.isArchived
            default: 
                return false;
        }
    }
}

export default filterEventsFunction;