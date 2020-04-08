import { Component, ElementRef, AfterViewInit, ViewChild, Input } from '@angular/core';
import { OpentokService } from '../opentok';
import *  as OT from '@opentok/client';
@Component({
    selector: 'app-subscriber',
    templateUrl: './subscriber.component.html'
})

export class SubscriberComponent{
    @ViewChild('subscriberDiv', { static: false }) subscriberDiv: ElementRef;
    @Input() session: OT.Session;
    @Input() stream: OT.Stream;

    constructor() {}

    subscribe(): void {
          const subscriber = this.session.subscribe(this.stream, this.subscriberDiv.nativeElement, {}, (err) => {
              if (err) {
                  alert(err.message);
              }
          });
    }
    
}
