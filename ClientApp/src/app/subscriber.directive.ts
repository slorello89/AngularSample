import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[subscriberDiv]',
})
export class SubscriberDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
