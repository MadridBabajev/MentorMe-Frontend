import {BaseEntityService} from "../base-services/BaseEntityService";
import {IPayment} from "../../types/dto/domain/lessons/IPayment";
import {HostURLs} from "../../types/strings/HostURLs";

export class PaymentsService extends BaseEntityService<IPayment> {
    constructor() {
        super(HostURLs.LESSONS_CONTROLLER);
    }
}