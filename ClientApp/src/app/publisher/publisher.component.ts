import { Directive, ViewContainerRef, Component, ElementRef, AfterViewInit, ViewChild, Input, ComponentFactoryResolver } from '@angular/core';
import  *  as OT from '@opentok/client';
import { OpentokService } from '../opentok';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import config from '../../config';
import { SubscriberComponent } from '../subscriber/subscriber.component';

@Component({
    selector: 'app-publisher',    
    templateUrl: './publisher.component.html'
})
export class PublisherComponent implements AfterViewInit {
    @ViewChild('subscriberHost', { read: ViewContainerRef, static: true }) subscriberHost;
    @ViewChild('publisherDiv', { static: false }) publisherDiv: ElementRef;    
    //@ViewChild('subscribersDiv', { static: false }) subscribersDiv: ElementRef;
    session: OT.Session;
    publisher: OT.Publisher;
    publishing: Boolean;
    joinRoomForm;
    roomName;
    sessionId;
    token;
    apiKey;
    subscribers: SubscriberComponent[];
    

    constructor(
        private opentokService: OpentokService,
        private formBuilder: FormBuilder,
        private http: HttpClient,
        private componentFactoryResolver: ComponentFactoryResolver        
        ){
        this.publishing = false;
        this.joinRoomForm = this.formBuilder.group({
            roomName: ''
        });
    }

    connect() {
        console.log("connect")
    }
    
    publish(){
        this.session.publish(this.publisher,(err)=>{
            if(err){
                alert(err.message);
            }
            else{
                this.publishing = true;
            }
        });
    }
    
    ngAfterViewInit(): void {
        const OT = this.opentokService.getOT();
        this.publisher = OT.initPublisher(this.publisherDiv.nativeElement, {insertMode:'append'});

        if(this.session){
            if(this.session['isConnected']()){
                this.publish()
            }
            this.session.on('sessionConnected',()=>this.publish());
        }
    }

    onStreamCreated = function (stream) {        
        const componentFactory = this.componentFactoryResolver
            .resolveComponentFactory(SubscriberComponent);

        const viewContainerRef  = this.subscriberHost;
        const componentRef = viewContainerRef.createComponent(componentFactory);
        (<SubscriberComponent>componentRef.instance).stream = stream;
        (<SubscriberComponent>componentRef.instance).session = this.session;
        (<SubscriberComponent>componentRef.instance).subscribe();
    };

    onSubmit(roomData){
        console.log("in on submitted");
        this.roomName = roomData.roomName;
        console.log("form Submitted - room name = " + this.roomName);
        this.joinRoomForm.reset();
        let session_url = config.SAMPLE_SERVER_BASE_URL+'/session/getSession'
        console.log(roomData)
        console.log(session_url);
        this.http.post(session_url, roomData).subscribe(
            (res)=>{
                console.log("token = " + res['token']);
                this.token=res['token'];
                console.log("Session = " + res["sessionId"]);
                this.sessionId = res['sessionId'];
                this.apiKey = res['apiKey'];
                this.session = OT.initSession(this.apiKey, this.sessionId);
                this.session.connect(this.token, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log("connected");
                        this.publish();
                        let that = this
                        this.session.on("streamCreated", function (event) {
                            that.onStreamCreated(event.stream);
                        });
                    }
                })

            },
            (err)=>{
                console.log(err);
            });
        
        // add call to controller here        
    }

    
}
