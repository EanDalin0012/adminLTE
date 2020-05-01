import { Header } from './class-header';

export class HeaderModel {
    header: Header;
    // tslint:disable-next-line: ban-types
    body: Object;

    constructor() {
        this.header = new Header();
    }
}
