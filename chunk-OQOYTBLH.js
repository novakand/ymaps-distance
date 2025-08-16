import{a as Fe}from"./chunk-OJTZUU4D.js";import{a as W}from"./chunk-2DNGAUFH.js";import"./chunk-XKHRF2WW.js";import{a as Ee,d as Me}from"./chunk-JAPSFBIP.js";import{A as ve,Aa as j,Ba as z,Ha as he,Ka as ge,Wa as _e,Xa as be,Za as B,ab as xe,d as ce,db as ye,e as V,f as de,fb as ke,g as ue,gb as Ce,hb as we,i as $,kb as Te,lb as Se,qb as Ie,sb as De,tb as Re,ua as fe}from"./chunk-6UBET32E.js";import{Ba as ne,Bb as _,Cb as s,Eb as le,F as A,Fb as ae,Gb as pe,Ic as L,J as Y,Kb as r,Lb as o,M as J,Mb as b,Nb as C,Ob as w,Pb as R,Qb as F,Sb as T,Tb as f,X,Xb as S,Y as Z,Zb as I,_a as l,_b as D,aa as ee,ba as te,bc as me,cc as p,db as u,dc as Q,ec as x,ga as ie,gc as H,hc as N,ic as q,jc as M,l as O,lb as E,lc as y,mb as re,na as h,oa as g,pb as oe,qa as P,qb as d,uc as k,zc as se}from"./chunk-FZY324E7.js";var He=["content"],Ne=["opposite"],qe=["marker"],G=e=>({$implicit:e});function Le(e,m){e&1&&R(0)}function We(e,m){e&1&&R(0)}function Ge(e,m){if(e&1&&(C(0),d(1,We,1,0,"ng-container",4),w()),e&2){let t=f().$implicit,n=f();l(),s("ngTemplateOutlet",n.markerTemplate||n._markerTemplate)("ngTemplateOutletContext",y(2,G,t))}}function Ke(e,m){e&1&&b(0,"div",9),e&2&&_("data-pc-section","marker")}function Ue(e,m){e&1&&b(0,"div",10)}function Ae(e,m){e&1&&R(0)}function Ye(e,m){if(e&1&&(r(0,"div",2)(1,"div",3),d(2,Le,1,0,"ng-container",4),o(),r(3,"div",5),d(4,Ge,2,4,"ng-container",6)(5,Ke,1,1,"ng-template",null,0,k)(7,Ue,1,0,"div",7),o(),r(8,"div",8),d(9,Ae,1,0,"ng-container",4),o()()),e&2){let t=m.$implicit,n=m.last,i=me(6),a=f();_("data-pc-section","event"),l(),_("data-pc-section","opposite"),l(),s("ngTemplateOutlet",a.oppositeTemplate||a._oppositeTemplate)("ngTemplateOutletContext",y(11,G,t)),l(),_("data-pc-section","separator"),l(),s("ngIf",a.markerTemplate||a._markerTemplate)("ngIfElse",i),l(3),s("ngIf",!n),l(),_("data-pc-section","content"),l(),s("ngTemplateOutlet",a.contentTemplate||a._contentTemplate)("ngTemplateOutletContext",y(13,G,t))}}var Je=({dt:e})=>`
.p-timeline {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    direction: ltr;
}

.p-timeline-left .p-timeline-event-opposite {
    text-align: right;
}

.p-timeline-left .p-timeline-event-content {
    text-align: left;
}

.p-timeline-right .p-timeline-event {
    flex-direction: row-reverse;
}

.p-timeline-right .p-timeline-event-opposite {
    text-align: left;
}

.p-timeline-right .p-timeline-event-content {
    text-align: right;
}

.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) {
    flex-direction: row-reverse;
}

.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(odd) .p-timeline-event-opposite {
    text-align: right;
}

.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(odd) .p-timeline-event-content {
    text-align: left;
}

.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) .p-timeline-event-opposite {
    text-align: left;
}

.p-timeline-vertical.p-timeline-alternate .p-timeline-event:nth-child(even) .p-timeline-event-content {
    text-align: right;
}

.p-timeline-vertical .p-timeline-event-opposite,
.p-timeline-vertical .p-timeline-event-content {
    padding: ${e("timeline.vertical.event.content.padding")};
}

.p-timeline-vertical .p-timeline-event-connector {
    width: ${e("timeline.event.connector.size")};
}

.p-timeline-event {
    display: flex;
    position: relative;
    min-height: ${e("timeline.event.min.height")};
}

.p-timeline-event:last-child {
    min-height: 0;
}

.p-timeline-event-opposite {
    flex: 1;
}

.p-timeline-event-content {
    flex: 1;
}

.p-timeline-event-separator {
    flex: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
}

.p-timeline-event-marker {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    align-self: baseline;
    border-width: ${e("timeline.event.marker.border.width")};
    border-style: solid;
    border-color: ${e("timeline.event.marker.border.color")};
    border-radius: ${e("timeline.event.marker.border.radius")};
    width: ${e("timeline.event.marker.size")};
    height: ${e("timeline.event.marker.size")};
    background: ${e("timeline.event.marker.background")};
}

.p-timeline-event-marker::before {
    content: " ";
    border-radius: ${e("timeline.event.marker.content.border.radius")};
    width: ${e("timeline.event.marker.content.size")};
    height:${e("timeline.event.marker.content.size")};
    background: ${e("timeline.event.marker.content.background")};
}

.p-timeline-event-marker::after {
    content: " ";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: ${e("timeline.event.marker.border.radius")};
    box-shadow: ${e("timeline.event.marker.content.inset.shadow")};
}

.p-timeline-event-connector {
    flex-grow: 1;
    background: ${e("timeline.event.connector.color")};
}

.p-timeline-horizontal {
    flex-direction: row;
}

.p-timeline-horizontal .p-timeline-event {
    flex-direction: column;
    flex: 1;
}

.p-timeline-horizontal .p-timeline-event:last-child {
    flex: 0;
}

.p-timeline-horizontal .p-timeline-event-separator {
    flex-direction: row;
}

.p-timeline-horizontal .p-timeline-event-connector {
    width: 100%;
    height: ${e("timeline.event.connector.size")};
}

.p-timeline-horizontal .p-timeline-event-opposite,
.p-timeline-horizontal .p-timeline-event-content {
    padding: ${e("timeline.horizontal.event.content.padding")};
}

.p-timeline-horizontal.p-timeline-alternate .p-timeline-event:nth-child(even) {
    flex-direction: column-reverse;
}

.p-timeline-bottom .p-timeline-event {
    flex-direction: column-reverse;
}
`,Xe={root:({props:e})=>["p-timeline p-component","p-timeline-"+e.align,"p-timeline-"+e.layout],event:"p-timeline-event",eventOpposite:"p-timeline-event-opposite",eventSeparator:"p-timeline-event-separator",eventMarker:"p-timeline-event-marker",eventConnector:"p-timeline-event-connector",eventContent:"p-timeline-event-content"},Ve=(()=>{class e extends he{name="timeline";theme=Je;classes=Xe;static \u0275fac=(()=>{let t;return function(i){return(t||(t=P(e)))(i||e)}})();static \u0275prov=ee({token:e,factory:e.\u0275fac})}return e})();var K=(()=>{class e extends ge{value;style;styleClass;align="left";layout="vertical";contentTemplate;oppositeTemplate;markerTemplate;templates;_contentTemplate;_oppositeTemplate;_markerTemplate;_componentStyle=ie(Ve);get hostClass(){return this.styleClass}getBlockableElement(){return this.el.nativeElement.children[0]}ngAfterContentInit(){this.templates.forEach(t=>{switch(t.getType()){case"content":this._contentTemplate=t.template;break;case"opposite":this._oppositeTemplate=t.template;break;case"marker":this._markerTemplate=t.template;break}})}static \u0275fac=(()=>{let t;return function(i){return(t||(t=P(e)))(i||e)}})();static \u0275cmp=E({type:e,selectors:[["p-timeline"]],contentQueries:function(n,i,a){if(n&1&&(S(a,He,4),S(a,Ne,4),S(a,qe,4),S(a,j,4)),n&2){let c;I(c=D())&&(i.contentTemplate=c.first),I(c=D())&&(i.oppositeTemplate=c.first),I(c=D())&&(i.markerTemplate=c.first),I(c=D())&&(i.templates=c)}},hostVars:24,hostBindings:function(n,i){n&2&&(_("data-pc-section","root")("data-pc-name","timeline"),ae(i.style),pe(i.hostClass),le("p-timeline",!0)("p-component",!0)("p-timeline-left",i.align==="left")("p-timeline-right",i.align==="right")("p-timeline-top",i.align==="top")("p-timeline-bottom",i.align==="bottom")("p-timeline-alternate",i.align==="alternate")("p-timeline-vertical",i.layout==="vertical")("p-timeline-horizontal",i.layout==="horizontal"))},inputs:{value:"value",style:"style",styleClass:"styleClass",align:"align",layout:"layout"},features:[M([Ve]),oe],decls:1,vars:1,consts:[["marker",""],["class","p-timeline-event",4,"ngFor","ngForOf"],[1,"p-timeline-event"],[1,"p-timeline-event-opposite"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[1,"p-timeline-event-separator"],[4,"ngIf","ngIfElse"],["class","p-timeline-event-connector",4,"ngIf"],[1,"p-timeline-event-content"],[1,"p-timeline-event-marker"],[1,"p-timeline-event-connector"]],template:function(n,i){n&1&&d(0,Ye,10,15,"div",1),n&2&&s("ngForOf",i.value)},dependencies:[$,ce,V,ue,z],encapsulation:2,changeDetection:0})}return e})(),$e=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=re({type:e});static \u0275inj=te({imports:[K,z,z]})}return e})();var et=e=>({"border-color":e});function tt(e,m){if(e&1){let t=F();r(0,"p-button",22),T("click",function(){h(t);let i=f(2);return g(i.toggleSideBar())}),o()}e&2&&s("rounded",!0)("text",!0)}function it(e,m){if(e&1){let t=F();C(0),r(1,"div",17)(2,"div",18),p(3,"Route"),o(),r(4,"div",19),d(5,tt,1,2,"p-button",20),r(6,"p-button",21),T("click",function(){h(t);let i=f();return g(i.onClose())}),o()()(),w()}if(e&2){let t=f();l(5),s("ngIf",t.isSmallScreen),l(),s("rounded",!0)("text",!0)}}function nt(e,m){if(e&1&&(C(0),r(1,"div",23)(2,"div",24)(3,"span",25),p(4,"id"),o(),r(5,"span",25),p(6),o()(),r(7,"div",24)(8,"span",25),p(9,"Duration "),o(),r(10,"span",25),p(11),o()(),r(12,"div",24)(13,"span",25),p(14,"Duration Traffic "),o(),r(15,"span",25),p(16),o()(),r(17,"div",24)(18,"span",25),p(19,"Duration (40 urban / 60 rural km/h)"),o(),r(20,"span",25),p(21),o()(),r(22,"div",24)(23,"span",25),p(24,"Distance"),o(),r(25,"span",25),p(26),o()(),r(27,"div",24)(28,"span",25),p(29,"HasTolls"),o(),r(30,"span",25),p(31),o()()(),w()),e&2){let t=f();l(6),x(" ",(t.item==null?null:t.item.id)||"-"," "),l(5),x(" ",(t.item==null?null:t.item.durationText)||"-"," "),l(5),x(" ",(t.item==null?null:t.item.durationInTrafficText)||"-"," "),l(5),x(" ",(t.item==null?null:t.item.durationBy4060Text)||"-"," "),l(5),x(" ",(t.item==null?null:t.item.distanceText)||"-"," "),l(5),x(" ",(t.item==null?null:t.item.hasTolls)==null?"-":t.item==null?null:t.item.hasTolls," ")}}function rt(e,m){if(e&1&&b(0,"span",26),e&2){let t=m.$implicit;s("ngStyle",y(1,et,t.type==="loading"?"#8BDE8C":t.type==="unloading"?"#FF5757":""))}}function ot(e,m){if(e&1&&(r(0,"div")(1,"span",27),p(2),o(),r(3,"span"),p(4),o()()),e&2){let t=m.$implicit;l(2),Q(t.name||"-"),l(2),Q(t.coordinates)}}function lt(e,m){e&1&&(r(0,"div",28)(1,"span",29),p(2,"Route"),o()())}var Wt=(()=>{class e{constructor(t,n,i,a,c,v,je,ze,Be,Oe){this._fb=t,this._cdr=n,this.routeService=i,this.router=a,this._vehicleService=c,this._loadProgressService=v,this.mapService=je,this.breakpointObserver=ze,this.confirmationService=Be,this.layoutService=Oe,this._isMapSidebar=ne(!0),this.isVisibleRoute=!1,this.data={},this.isVisible=!0,this.points=[{name:"-",coordinates:[],icon:"from",type:"loading"},{name:"-",coordinates:[],icon:"to",type:"unloading"}],this._getTrack$=new O,this._destroy$=new O,this.isMapSidebar=L(()=>this._isMapSidebar()),this.containerClass=L(()=>({"sidebar-active":this.isMapSidebar()})),this.data={timestamp:"\u2013",latitude:null,longitude:null,altitude:null,speed:null},this._buildForm(),this._watchForFormValueChanges(),this._watchForIsRepeatChanges(),this.breakpointObserver.observe(["(min-width: 992px)","(max-width: 767px)"]).pipe(J(100)).subscribe(U=>{this.isLargeScreen=U.breakpoints["(min-width: 992px)"],this.isSmallScreen=U.breakpoints["(max-width: 767px)"],this._cdr.detectChanges()})}onClose(){this.isVisible=!1,this.onHide(),this._cdr.markForCheck()}toggleSideBar(){this.layoutService.toggleSideBar()}_watchForFormValueChanges(){this.form.valueChanges.pipe(A(()=>this.form.valid),Y(600),Z(()=>this._getTrack$.next(this.form.value))).subscribe()}_watchForIsRepeatChanges(){this.form.get("isRepeat").valueChanges.pipe(X(this._destroy$)).subscribe(t=>{let n=this.form.get("start"),i=this.form.get("end");t?(n.disable({emitEvent:!1}),i.disable({emitEvent:!1})):(n.enable({emitEvent:!1}),i.enable({emitEvent:!1}))})}ngOnInit(){this.getById(),this._getTrack$.next(null)}getById(){this.routeService.getById(this.id).pipe().subscribe(t=>{let n=t?.features?.[0]?.properties??{};this.item=n,this.points[0].name=n?.start?.addressComponent?.address??"",this.points[0].coordinates=n?.start?.coordinates?.reverse(),this.points[1].name=n?.end?.addressComponent?.address??"",this.points[1].coordinates=n?.end?.coordinates?.reverse(),this.mapService.currentRoteData$.next(t),this._cdr.markForCheck()})}onHide(){this.router.navigate(["/"]),this.data={timestamp:"\u2013",latitude:null,longitude:null,altitude:null,speed:null},this._cdr.markForCheck(),this._cdr.detectChanges()}ngOnDestroy(){this._destroy$.next(!0),this._destroy$.complete(),this.mapService.remove$.next(!0),this.data={timestamp:"\u2013",latitude:null,longitude:null,altitude:null,speed:null},this._cdr.markForCheck()}onRoutes(){this.isVisibleRoute=!this.isVisibleRoute}_buildForm(){let t=new Date,n=new Date(t.getFullYear(),t.getMonth(),t.getDate(),0,0,0,0);this.form=this._fb.group({start:[{value:n,disabled:!0},[B.required]],end:[{value:t,disabled:!0},[B.required]],isRepeat:[!0,[B.required]]})}static{this.\u0275fac=function(n){return new(n||e)(u(ke),u(se),u(W),u(ve),u(W),u(Fe),u(Ee),u(Me),u(fe),u(Re))}}static{this.\u0275cmp=E({type:e,selectors:[["app-vehicle-detail"]],inputs:{id:"id"},features:[M([])],decls:22,vars:7,consts:[["header",""],["content",""],["modal","false","appendTo","","styleClass","border-none p-drawer-bottom-append","position","bottom","showCloseIcon","false",3,"visibleChange","onHide","visible"],[1,"grid"],[1,"col-span-12","lg:col-span-12","h-full"],[1,"grid","grid-cols-12","gap-4"],[4,"ngIf"],[1,"col-span-12","border-t","border-surface",3,"formGroup"],[1,"flex","flex-col","lg:flex-row","flex-wrap","items-center","py-2"],[1,"flex-grow"],[1,"flex","items-center","justify-between","mb-0"],["label","More","styleClass","px-0 py-0","styleClass","text-color","size","large",3,"click","disabled","link"],[1,"flex","flex-grow","justify-between","items-center"],[1,"flex","flex-col","gap-2"],[1,"w-full","p-timeline-routes",3,"value"],["pTemplate","marker"],["modal","false","appendTo","","styleClass","border-none p-drawer-bottom-append","position","bottom","showCloseIcon","true",3,"visibleChange","visible"],[1,"flex","items-center","justify-between","w-full","mb-0","gap-2"],[1,"text-900","text-xl","font-semibold","whitespace-nowrap"],[1,"flex","items-center","ml-auto"],["class","text-xl","badgeSeverity","contrast","size","large","icon","pi pi-map",3,"rounded","text","click",4,"ngIf"],["badgeSeverity","contrast","size","large","icon","pi pi-times",1,"text-xl","ml-4",3,"click","rounded","text"],["badgeSeverity","contrast","size","large","icon","pi pi-map",1,"text-xl",3,"click","rounded","text"],[1,"col-span-12"],[1,"flex","justify-between","items-center","mb-3"],[1,"font-semibold"],[1,"p-timeline-event-marker",3,"ngStyle"],[1,"block","mb-1","font-bold","pt-[15px]"],[1,"flex","align-center","justify-between","mb-0"],[1,"text-900","text-xl","font-semibold"]],template:function(n,i){if(n&1){let a=F();r(0,"p-drawer",2),q("visibleChange",function(v){return h(a),N(i.isVisible,v)||(i.isVisible=v),g(v)}),T("onHide",function(){return h(a),g(i.onHide())}),d(1,it,7,3,"ng-template",null,0,k),r(3,"div",3)(4,"div",4)(5,"div",5),d(6,nt,32,6,"ng-container",6),r(7,"div",7)(8,"div",8)(9,"div",9)(10,"div",10)(11,"p-button",11),T("click",function(){return h(a),g(i.onRoutes())}),o()(),b(12,"div",12),o()(),r(13,"div",13)(14,"p-timeline",14),d(15,rt,1,3,"ng-template",15)(16,ot,5,2,"ng-template",null,1,k),o()()()()()()(),r(18,"p-drawer",16),q("visibleChange",function(v){return h(a),N(i.isVisibleRoute,v)||(i.isVisibleRoute=v),g(v)}),d(19,lt,3,0,"ng-template",null,0,k),b(21,"div"),o()}n&2&&(H("visible",i.isVisible),l(6),s("ngIf",i.data),l(),s("formGroup",i.form),l(4),s("disabled","true")("link",!0),l(3),s("value",i.points),l(4),H("visible",i.isVisibleRoute))},dependencies:[$,V,de,Se,Te,j,be,_e,De,$e,K,Ce,xe,we,ye,Ie],styles:['@charset "UTF-8";  .p-drawer-bottom-append{bottom:0!important;position:absolute!important;left:0!important;width:100%!important;height:100%!important}  .p-timeline-event-marker:before{background:transparent}  .p-timeline-event-separator{top:16px;position:relative}  .p-timeline-event-opposite{padding:0;max-width:0}  .full-screen-datepicker{position:fixed!important;top:0!important;left:0!important;width:100vw!important;height:100vh!important;margin:0!important;padding:0!important;box-shadow:none!important;z-index:10000!important}  .full-screen-datepicker .p-datepicker{height:100%!important;display:flex;flex-direction:column}  .full-screen-datepicker .p-datepicker-calendar{flex:1;overflow:auto}  .full-screen-datepicker .p-datepicker-titlebar,   .full-screen-datepicker .p-datepicker-footer{flex-shrink:0}  .p-timeline-routes .p-timeline-event-separator{top:18px;position:relative}  .p-timeline-routes .p-timeline-event-opposite{display:none}'],changeDetection:0})}}return e})();export{Wt as RouteDetailComponent};
