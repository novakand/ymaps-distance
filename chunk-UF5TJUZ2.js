import{a as We}from"./chunk-DGOCICEH.js";import{Aa as Ie,Ba as j,Ha as E,Ka as D,Ra as de,Sa as Ae,V as Oe,Ya as Qe,Z as Y,_a as qe,b as he,ba as ee,ca as ze,cb as Xe,d as Le,e as ve,ea as Pe,f as ke,g as we,i as H,ia as Re,j as Se,na as He,oa as je,sa as Ne}from"./chunk-6UBET32E.js";import{$ as Fe,Ba as Me,Bb as g,Cb as a,Db as Ee,Eb as se,Fb as pe,Fc as Q,Gb as v,Gc as Be,Kb as S,Lb as z,Mb as k,Nb as L,Ob as O,Pb as le,Qb as xe,Sb as re,Tb as x,Ub as ae,Vb as ce,Xb as A,Yb as ue,Zb as V,_a as d,_b as M,a as W,aa as T,b as te,ba as K,bc as me,db as ye,ga as F,jc as $,kc as Ce,lb as C,lc as X,ma as be,mb as J,mc as fe,na as ie,nb as $e,nc as De,oa as ne,pa as oe,pb as b,qa as m,qb as y,uc as ge,wa as q,xa as Ve}from"./chunk-FZY324E7.js";var ot=({dt:t})=>`
.p-skeleton {
    overflow: hidden;
    background: ${t("skeleton.background")};
    border-radius: ${t("skeleton.border.radius")};
}

.p-skeleton::after {
    content: "";
    animation: p-skeleton-animation 1.2s infinite;
    height: 100%;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(-100%);
    z-index: 1;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0), ${t("skeleton.animation.background")}, rgba(255, 255, 255, 0));
}

[dir='rtl'] .p-skeleton::after {
    animation-name: p-skeleton-animation-rtl;
}

.p-skeleton-circle {
    border-radius: 50%;
}

.p-skeleton-animation-none::after {
    animation: none;
}

@keyframes p-skeleton-animation {
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(100%);
    }
}

@keyframes p-skeleton-animation-rtl {
    from {
        transform: translateX(100%);
    }
    to {
        transform: translateX(-100%);
    }
}
`,st={root:{position:"relative"}},lt={root:({props:t})=>["p-skeleton p-component",{"p-skeleton-circle":t.shape==="circle","p-skeleton-animation-none":t.animation==="none"}]},Ze=(()=>{class t extends E{name="skeleton";theme=ot;classes=lt;inlineStyles=st;static \u0275fac=(()=>{let e;return function(n){return(e||(e=m(t)))(n||t)}})();static \u0275prov=T({token:t,factory:t.\u0275fac})}return t})();var rt=(()=>{class t extends D{styleClass;style;shape="rectangle";animation="wave";borderRadius;size;width="100%";height="1rem";_componentStyle=F(Ze);containerClass(){return{"p-skeleton p-component":!0,"p-skeleton-circle":this.shape==="circle","p-skeleton-animation-none":this.animation==="none"}}get containerStyle(){let e=this._componentStyle?.inlineStyles.root,i;return this.size?i=te(W(W({},this.style),e),{width:this.size,height:this.size,borderRadius:this.borderRadius}):i=W(te(W({},e),{width:this.width,height:this.height,borderRadius:this.borderRadius}),this.style),i}static \u0275fac=(()=>{let e;return function(n){return(e||(e=m(t)))(n||t)}})();static \u0275cmp=C({type:t,selectors:[["p-skeleton"]],inputs:{styleClass:"styleClass",style:"style",shape:"shape",animation:"animation",borderRadius:"borderRadius",size:"size",width:"width",height:"height"},features:[$([Ze]),b],decls:1,vars:7,consts:[[3,"ngClass","ngStyle"]],template:function(i,n){i&1&&k(0,"div",0),i&2&&(v(n.styleClass),a("ngClass",n.containerClass())("ngStyle",n.containerStyle),g("data-pc-name","skeleton")("aria-hidden",!0)("data-pc-section","root"))},dependencies:[H,he,ke,j],encapsulation:2,changeDetection:0})}return t})(),_i=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=J({type:t});static \u0275inj=K({imports:[rt,j,j]})}return t})();var Ci=(()=>{class t extends de{static \u0275fac=(()=>{let e;return function(n){return(e||(e=m(t)))(n||t)}})();static \u0275cmp=C({type:t,selectors:[["BlankIcon"]],features:[b],decls:2,vars:0,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["width","1","height","1","fill","currentColor","fill-opacity","0"]],template:function(i,n){i&1&&(oe(),S(0,"svg",0),k(1,"rect",1),z())},encapsulation:2})}return t})();var Ue=(()=>{class t extends de{static \u0275fac=(()=>{let e;return function(n){return(e||(e=m(t)))(n||t)}})();static \u0275cmp=C({type:t,selectors:[["MinusIcon"]],features:[b],decls:2,vars:5,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M13.2222 7.77778H0.777778C0.571498 7.77778 0.373667 7.69584 0.227806 7.54998C0.0819442 7.40412 0 7.20629 0 7.00001C0 6.79373 0.0819442 6.5959 0.227806 6.45003C0.373667 6.30417 0.571498 6.22223 0.777778 6.22223H13.2222C13.4285 6.22223 13.6263 6.30417 13.7722 6.45003C13.9181 6.5959 14 6.79373 14 7.00001C14 7.20629 13.9181 7.40412 13.7722 7.54998C13.6263 7.69584 13.4285 7.77778 13.2222 7.77778Z","fill","currentColor"]],template:function(i,n){i&1&&(oe(),S(0,"svg",0),k(1,"path",1),z()),i&2&&(v(n.getClassNames()),g("aria-label",n.ariaLabel)("aria-hidden",n.ariaHidden)("role",n.role))},encapsulation:2})}return t})();var zi=(()=>{class t extends de{pathId;ngOnInit(){this.pathId="url(#"+Ne()+")"}static \u0275fac=(()=>{let e;return function(n){return(e||(e=m(t)))(n||t)}})();static \u0275cmp=C({type:t,selectors:[["SearchIcon"]],features:[b],decls:6,vars:7,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["fill-rule","evenodd","clip-rule","evenodd","d","M2.67602 11.0265C3.6661 11.688 4.83011 12.0411 6.02086 12.0411C6.81149 12.0411 7.59438 11.8854 8.32483 11.5828C8.87005 11.357 9.37808 11.0526 9.83317 10.6803L12.9769 13.8241C13.0323 13.8801 13.0983 13.9245 13.171 13.9548C13.2438 13.985 13.3219 14.0003 13.4007 14C13.4795 14.0003 13.5575 13.985 13.6303 13.9548C13.7031 13.9245 13.7691 13.8801 13.8244 13.8241C13.9367 13.7116 13.9998 13.5592 13.9998 13.4003C13.9998 13.2414 13.9367 13.089 13.8244 12.9765L10.6807 9.8328C11.053 9.37773 11.3573 8.86972 11.5831 8.32452C11.8857 7.59408 12.0414 6.81119 12.0414 6.02056C12.0414 4.8298 11.6883 3.66579 11.0268 2.67572C10.3652 1.68564 9.42494 0.913972 8.32483 0.45829C7.22472 0.00260857 6.01418 -0.116618 4.84631 0.115686C3.67844 0.34799 2.60568 0.921393 1.76369 1.76338C0.921698 2.60537 0.348296 3.67813 0.115991 4.84601C-0.116313 6.01388 0.00291375 7.22441 0.458595 8.32452C0.914277 9.42464 1.68595 10.3649 2.67602 11.0265ZM3.35565 2.0158C4.14456 1.48867 5.07206 1.20731 6.02086 1.20731C7.29317 1.20731 8.51338 1.71274 9.41304 2.6124C10.3127 3.51206 10.8181 4.73226 10.8181 6.00457C10.8181 6.95337 10.5368 7.88088 10.0096 8.66978C9.48251 9.45868 8.73328 10.0736 7.85669 10.4367C6.98011 10.7997 6.01554 10.8947 5.08496 10.7096C4.15439 10.5245 3.2996 10.0676 2.62869 9.39674C1.95778 8.72583 1.50089 7.87104 1.31579 6.94046C1.13068 6.00989 1.22568 5.04532 1.58878 4.16874C1.95187 3.29215 2.56675 2.54292 3.35565 2.0158Z","fill","currentColor"],[3,"id"],["width","14","height","14","fill","white"]],template:function(i,n){i&1&&(oe(),S(0,"svg",0)(1,"g"),k(2,"path",1),z(),S(3,"defs")(4,"clipPath",2),k(5,"rect",3),z()()()),i&2&&(v(n.getClassNames()),g("aria-label",n.ariaLabel)("aria-hidden",n.ariaHidden)("role",n.role),d(),g("clip-path",n.pathId),d(3),a("id",n.pathId))},encapsulation:2})}return t})();var at=["checkboxicon"],ct=["input"],ht=()=>({"p-checkbox-input":!0}),dt=t=>({checked:t,class:"p-checkbox-icon"});function pt(t,l){if(t&1&&k(0,"span",8),t&2){let e=x(3);a("ngClass",e.checkboxIcon),g("data-pc-section","icon")}}function ut(t,l){t&1&&k(0,"CheckIcon",9),t&2&&(a("styleClass","p-checkbox-icon"),g("data-pc-section","icon"))}function mt(t,l){if(t&1&&(L(0),y(1,pt,1,2,"span",7)(2,ut,1,2,"CheckIcon",6),O()),t&2){let e=x(2);d(),a("ngIf",e.checkboxIcon),d(),a("ngIf",!e.checkboxIcon)}}function ft(t,l){t&1&&k(0,"MinusIcon",9),t&2&&(a("styleClass","p-checkbox-icon"),g("data-pc-section","icon"))}function gt(t,l){if(t&1&&(L(0),y(1,mt,3,2,"ng-container",4)(2,ft,1,2,"MinusIcon",6),O()),t&2){let e=x();d(),a("ngIf",e.checked),d(),a("ngIf",e._indeterminate())}}function _t(t,l){}function bt(t,l){t&1&&y(0,_t,0,0,"ng-template")}var yt=({dt:t})=>`
.p-checkbox {
    position: relative;
    display: inline-flex;
    user-select: none;
    vertical-align: bottom;
    width: ${t("checkbox.width")};
    height: ${t("checkbox.height")};
}

.p-checkbox-input {
    cursor: pointer;
    appearance: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: 1;
    outline: 0 none;
    border: 1px solid transparent;
    border-radius: ${t("checkbox.border.radius")};
}

.p-checkbox-box {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${t("checkbox.border.radius")};
    border: 1px solid ${t("checkbox.border.color")};
    background: ${t("checkbox.background")};
    width: ${t("checkbox.width")};
    height: ${t("checkbox.height")};
    transition: background ${t("checkbox.transition.duration")}, color ${t("checkbox.transition.duration")}, border-color ${t("checkbox.transition.duration")}, box-shadow ${t("checkbox.transition.duration")}, outline-color ${t("checkbox.transition.duration")};
    outline-color: transparent;
    box-shadow: ${t("checkbox.shadow")};
}

.p-checkbox-icon {
    transition-duration: ${t("checkbox.transition.duration")};
    color: ${t("checkbox.icon.color")};
    font-size: ${t("checkbox.icon.size")};
    width: ${t("checkbox.icon.size")};
    height: ${t("checkbox.icon.size")};
}

.p-checkbox:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
    border-color: ${t("checkbox.hover.border.color")};
}

.p-checkbox-checked .p-checkbox-box {
    border-color: ${t("checkbox.checked.border.color")};
    background: ${t("checkbox.checked.background")};
}

.p-checkbox-checked .p-checkbox-icon {
    color: ${t("checkbox.icon.checked.color")};
}

.p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
    background: ${t("checkbox.checked.hover.background")};
    border-color: ${t("checkbox.checked.hover.border.color")};
}

.p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-icon {
    color: ${t("checkbox.icon.checked.hover.color")};
}

.p-checkbox:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {
    border-color: ${t("checkbox.focus.border.color")};
    box-shadow: ${t("checkbox.focus.ring.shadow")};
    outline: ${t("checkbox.focus.ring.width")} ${t("checkbox.focus.ring.style")} ${t("checkbox.focus.ring.color")};
    outline-offset: ${t("checkbox.focus.ring.offset")};
}

.p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {
    border-color: ${t("checkbox.checked.focus.border.color")};
}

p-checkBox.ng-invalid.ng-dirty .p-checkbox-box,
p-check-box.ng-invalid.ng-dirty .p-checkbox-box,
p-checkbox.ng-invalid.ng-dirty .p-checkbox-box {
    border-color: ${t("checkbox.invalid.border.color")};
}

.p-checkbox.p-variant-filled .p-checkbox-box {
    background: ${t("checkbox.filled.background")};
}

.p-checkbox-checked.p-variant-filled .p-checkbox-box {
    background: ${t("checkbox.checked.background")};
}

.p-checkbox-checked.p-variant-filled:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
    background: ${t("checkbox.checked.hover.background")};
}

.p-checkbox.p-disabled {
    opacity: 1;
}

.p-checkbox.p-disabled .p-checkbox-box {
    background: ${t("checkbox.disabled.background")};
    border-color: ${t("checkbox.checked.disabled.border.color")};
}

.p-checkbox.p-disabled .p-checkbox-box .p-checkbox-icon {
    color: ${t("checkbox.icon.disabled.color")};
}

.p-checkbox-sm,
.p-checkbox-sm .p-checkbox-box {
    width: ${t("checkbox.sm.width")};
    height: ${t("checkbox.sm.height")};
}

.p-checkbox-sm .p-checkbox-icon {
    font-size: ${t("checkbox.icon.sm.size")};
    width: ${t("checkbox.icon.sm.size")};
    height: ${t("checkbox.icon.sm.size")};
}

.p-checkbox-lg,
.p-checkbox-lg .p-checkbox-box {
    width: ${t("checkbox.lg.width")};
    height: ${t("checkbox.lg.height")};
}

.p-checkbox-lg .p-checkbox-icon {
    font-size: ${t("checkbox.icon.lg.size")};
    width: ${t("checkbox.icon.lg.size")};
    height: ${t("checkbox.icon.lg.size")};
}
`,xt={root:({instance:t,props:l})=>["p-checkbox p-component",{"p-checkbox-checked":t.checked,"p-disabled":l.disabled,"p-invalid":l.invalid,"p-variant-filled":l.variant?l.variant==="filled":t.config.inputStyle==="filled"||t.config.inputVariant==="filled"}],box:"p-checkbox-box",input:"p-checkbox-input",icon:"p-checkbox-icon"},Ke=(()=>{class t extends E{name="checkbox";theme=yt;classes=xt;static \u0275fac=(()=>{let e;return function(n){return(e||(e=m(t)))(n||t)}})();static \u0275prov=T({token:t,factory:t.\u0275fac})}return t})();var Ct={provide:Qe,useExisting:Fe(()=>vt),multi:!0},vt=(()=>{class t extends D{value;name;disabled;binary;ariaLabelledBy;ariaLabel;tabindex;inputId;style;inputStyle;styleClass;inputClass;indeterminate=!1;size;formControl;checkboxIcon;readonly;required;autofocus;trueValue=!0;falseValue=!1;variant;onChange=new q;onFocus=new q;onBlur=new q;inputViewChild;get checked(){return this._indeterminate()?!1:this.binary?this.model===this.trueValue:je(this.value,this.model)}get containerClass(){return{"p-checkbox p-component":!0,"p-checkbox-checked p-highlight":this.checked,"p-disabled":this.disabled,"p-variant-filled":this.variant==="filled"||this.config.inputStyle()==="filled"||this.config.inputVariant()==="filled","p-checkbox-sm p-inputfield-sm":this.size==="small","p-checkbox-lg p-inputfield-lg":this.size==="large"}}_indeterminate=Me(void 0);checkboxIconTemplate;templates;_checkboxIconTemplate;model;onModelChange=()=>{};onModelTouched=()=>{};focused=!1;_componentStyle=F(Ke);ngAfterContentInit(){this.templates.forEach(e=>{switch(e.getType()){case"icon":this._checkboxIconTemplate=e.template;break;case"checkboxicon":this._checkboxIconTemplate=e.template;break}})}ngOnChanges(e){super.ngOnChanges(e),e.indeterminate&&this._indeterminate.set(e.indeterminate.currentValue)}updateModel(e){let i,n=this.injector.get(qe,null,{optional:!0,self:!0}),o=n&&!this.formControl?n.value:this.model;this.binary?(i=this._indeterminate()?this.trueValue:this.checked?this.falseValue:this.trueValue,this.model=i,this.onModelChange(i)):(this.checked||this._indeterminate()?i=o.filter(s=>!He(s,this.value)):i=o?[...o,this.value]:[this.value],this.onModelChange(i),this.model=i,this.formControl&&this.formControl.setValue(i)),this._indeterminate()&&this._indeterminate.set(!1),this.onChange.emit({checked:i,originalEvent:e})}handleChange(e){this.readonly||this.updateModel(e)}onInputFocus(e){this.focused=!0,this.onFocus.emit(e)}onInputBlur(e){this.focused=!1,this.onBlur.emit(e),this.onModelTouched()}focus(){this.inputViewChild.nativeElement.focus()}writeValue(e){this.model=e,this.cd.markForCheck()}registerOnChange(e){this.onModelChange=e}registerOnTouched(e){this.onModelTouched=e}setDisabledState(e){setTimeout(()=>{this.disabled=e,this.cd.markForCheck()})}static \u0275fac=(()=>{let e;return function(n){return(e||(e=m(t)))(n||t)}})();static \u0275cmp=C({type:t,selectors:[["p-checkbox"],["p-checkBox"],["p-check-box"]],contentQueries:function(i,n,o){if(i&1&&(A(o,at,4),A(o,Ie,4)),i&2){let s;V(s=M())&&(n.checkboxIconTemplate=s.first),V(s=M())&&(n.templates=s)}},viewQuery:function(i,n){if(i&1&&ue(ct,5),i&2){let o;V(o=M())&&(n.inputViewChild=o.first)}},inputs:{value:"value",name:"name",disabled:[2,"disabled","disabled",Q],binary:[2,"binary","binary",Q],ariaLabelledBy:"ariaLabelledBy",ariaLabel:"ariaLabel",tabindex:[2,"tabindex","tabindex",Be],inputId:"inputId",style:"style",inputStyle:"inputStyle",styleClass:"styleClass",inputClass:"inputClass",indeterminate:[2,"indeterminate","indeterminate",Q],size:"size",formControl:"formControl",checkboxIcon:"checkboxIcon",readonly:[2,"readonly","readonly",Q],required:[2,"required","required",Q],autofocus:[2,"autofocus","autofocus",Q],trueValue:"trueValue",falseValue:"falseValue",variant:"variant"},outputs:{onChange:"onChange",onFocus:"onFocus",onBlur:"onBlur"},features:[$([Ct,Ke]),b,be],decls:6,vars:29,consts:[["input",""],[3,"ngClass"],["type","checkbox",3,"focus","blur","change","value","checked","disabled","readonly","ngClass"],[1,"p-checkbox-box"],[4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[3,"styleClass",4,"ngIf"],["class","p-checkbox-icon",3,"ngClass",4,"ngIf"],[1,"p-checkbox-icon",3,"ngClass"],[3,"styleClass"]],template:function(i,n){if(i&1){let o=xe();S(0,"div",1)(1,"input",2,0),re("focus",function(r){return ie(o),ne(n.onInputFocus(r))})("blur",function(r){return ie(o),ne(n.onInputBlur(r))})("change",function(r){return ie(o),ne(n.handleChange(r))}),z(),S(3,"div",3),y(4,gt,3,2,"ng-container",4)(5,bt,1,0,null,5),z()()}i&2&&(pe(n.style),v(n.styleClass),a("ngClass",n.containerClass),g("data-p-highlight",n.checked)("data-p-checked",n.checked)("data-p-disabled",n.disabled),d(),pe(n.inputStyle),v(n.inputClass),a("value",n.value)("checked",n.checked)("disabled",n.disabled)("readonly",n.readonly)("ngClass",Ce(26,ht)),g("id",n.inputId)("name",n.name)("tabindex",n.tabindex)("required",n.required?!0:null)("aria-labelledby",n.ariaLabelledBy)("aria-label",n.ariaLabel),d(3),a("ngIf",!n.checkboxIconTemplate&&!n._checkboxIconTemplate),d(),a("ngTemplateOutlet",n.checkboxIconTemplate||n._checkboxIconTemplate)("ngTemplateOutletContext",X(27,dt,n.checked)))},dependencies:[H,he,ve,we,We,Ue,j],encapsulation:2,changeDetection:0})}return t})();var kt=["*"],wt=({dt:t})=>`
.p-iconfield {
    position: relative;
    display: block;
}

.p-inputicon {
    position: absolute;
    top: 50%;
    margin-top: calc(-1 * (${t("icon.size")} / 2));
    color: ${t("iconfield.icon.color")};
    line-height: 1;
}

.p-iconfield .p-inputicon:first-child {
    inset-inline-start: ${t("form.field.padding.x")};
}

.p-iconfield .p-inputicon:last-child {
    inset-inline-end: ${t("form.field.padding.x")};
}

.p-iconfield .p-inputtext:not(:first-child) {
    padding-inline-start: calc((${t("form.field.padding.x")} * 2) + ${t("icon.size")});
}

.p-iconfield .p-inputtext:not(:last-child) {
    padding-inline-end: calc((${t("form.field.padding.x")} * 2) + ${t("icon.size")});
}

.p-iconfield:has(.p-inputfield-sm) .p-inputicon {
    font-size: ${t("form.field.sm.font.size")};
    width: ${t("form.field.sm.font.size")};
    height: ${t("form.field.sm.font.size")};
    margin-top: calc(-1 * (${t("form.field.sm.font.size")} / 2));
}

.p-iconfield:has(.p-inputfield-lg) .p-inputicon {
    font-size: ${t("form.field.lg.font.size")};
    width: ${t("form.field.lg.font.size")};
    height: ${t("form.field.lg.font.size")};
    margin-top: calc(-1 * (${t("form.field.lg.font.size")} / 2));
}
`,It={root:"p-iconfield"},Je=(()=>{class t extends E{name="iconfield";theme=wt;classes=It;static \u0275fac=(()=>{let e;return function(n){return(e||(e=m(t)))(n||t)}})();static \u0275prov=T({token:t,factory:t.\u0275fac})}return t})();var ln=(()=>{class t extends D{iconPosition="left";get _styleClass(){return this.styleClass}styleClass;_componentStyle=F(Je);static \u0275fac=(()=>{let e;return function(n){return(e||(e=m(t)))(n||t)}})();static \u0275cmp=C({type:t,selectors:[["p-iconfield"],["p-iconField"],["p-icon-field"]],hostAttrs:[1,"p-iconfield"],hostVars:6,hostBindings:function(i,n){i&2&&(v(n._styleClass),se("p-iconfield-left",n.iconPosition==="left")("p-iconfield-right",n.iconPosition==="right"))},inputs:{iconPosition:"iconPosition",styleClass:"styleClass"},features:[$([Je]),b],ngContentSelectors:kt,decls:1,vars:0,template:function(i,n){i&1&&(ae(),ce(0))},dependencies:[H],encapsulation:2,changeDetection:0})}return t})();var St=["*"],zt={root:"p-inputicon"},Ye=(()=>{class t extends E{name="inputicon";classes=zt;static \u0275fac=(()=>{let e;return function(n){return(e||(e=m(t)))(n||t)}})();static \u0275prov=T({token:t,factory:t.\u0275fac})}return t})(),xn=(()=>{class t extends D{styleClass;get hostClasses(){return this.styleClass}_componentStyle=F(Ye);static \u0275fac=(()=>{let e;return function(n){return(e||(e=m(t)))(n||t)}})();static \u0275cmp=C({type:t,selectors:[["p-inputicon"],["p-inputIcon"]],hostVars:4,hostBindings:function(i,n){i&2&&(v(n.hostClasses),se("p-inputicon",!0))},inputs:{styleClass:"styleClass"},features:[$([Ye]),b],ngContentSelectors:St,decls:1,vars:0,template:function(i,n){i&1&&(ae(),ce(0))},dependencies:[H,j],encapsulation:2,changeDetection:0})}return t})();var Tt=({dt:t})=>`
.p-inputtext {
    font-family: inherit;
    font-feature-settings: inherit;
    font-size: 1rem;
    color: ${t("inputtext.color")};
    background: ${t("inputtext.background")};
    padding-block: ${t("inputtext.padding.y")};
    padding-inline: ${t("inputtext.padding.x")};
    border: 1px solid ${t("inputtext.border.color")};
    transition: background ${t("inputtext.transition.duration")}, color ${t("inputtext.transition.duration")}, border-color ${t("inputtext.transition.duration")}, outline-color ${t("inputtext.transition.duration")}, box-shadow ${t("inputtext.transition.duration")};
    appearance: none;
    border-radius: ${t("inputtext.border.radius")};
    outline-color: transparent;
    box-shadow: ${t("inputtext.shadow")};
}

.p-inputtext.ng-invalid.ng-dirty {
    border-color: ${t("inputtext.invalid.border.color")};
}

.p-inputtext:enabled:hover {
    border-color: ${t("inputtext.hover.border.color")};
}

.p-inputtext:enabled:focus {
    border-color: ${t("inputtext.focus.border.color")};
    box-shadow: ${t("inputtext.focus.ring.shadow")};
    outline: ${t("inputtext.focus.ring.width")} ${t("inputtext.focus.ring.style")} ${t("inputtext.focus.ring.color")};
    outline-offset: ${t("inputtext.focus.ring.offset")};
}

.p-inputtext.p-invalid {
    border-color: ${t("inputtext.invalid.border.color")};
}

.p-inputtext.p-variant-filled {
    background: ${t("inputtext.filled.background")};
}
    
.p-inputtext.p-variant-filled:enabled:hover {
    background: ${t("inputtext.filled.hover.background")};
}

.p-inputtext.p-variant-filled:enabled:focus {
    background: ${t("inputtext.filled.focus.background")};
}

.p-inputtext:disabled {
    opacity: 1;
    background: ${t("inputtext.disabled.background")};
    color: ${t("inputtext.disabled.color")};
}

.p-inputtext::placeholder {
    color: ${t("inputtext.placeholder.color")};
}

.p-inputtext.ng-invalid.ng-dirty::placeholder {
    color: ${t("inputtext.invalid.placeholder.color")};
}

.p-inputtext-sm {
    font-size: ${t("inputtext.sm.font.size")};
    padding-block: ${t("inputtext.sm.padding.y")};
    padding-inline: ${t("inputtext.sm.padding.x")};
}

.p-inputtext-lg {
    font-size: ${t("inputtext.lg.font.size")};
    padding-block: ${t("inputtext.lg.padding.y")};
    padding-inline: ${t("inputtext.lg.padding.x")};
}

.p-inputtext-fluid {
    width: 100%;
}
`,Ft={root:({instance:t,props:l})=>["p-inputtext p-component",{"p-filled":t.filled,"p-inputtext-sm":l.size==="small","p-inputtext-lg":l.size==="large","p-invalid":l.invalid,"p-variant-filled":l.variant==="filled","p-inputtext-fluid":l.fluid}]},et=(()=>{class t extends E{name="inputtext";theme=Tt;classes=Ft;static \u0275fac=(()=>{let e;return function(n){return(e||(e=m(t)))(n||t)}})();static \u0275prov=T({token:t,factory:t.\u0275fac})}return t})();var En=(()=>{class t extends D{ngModel;variant;fluid;pSize;filled;_componentStyle=F(et);get hasFluid(){let i=this.el.nativeElement.closest("p-fluid");return Re(this.fluid)?!!i:this.fluid}constructor(e){super(),this.ngModel=e}ngAfterViewInit(){super.ngAfterViewInit(),this.updateFilledState(),this.cd.detectChanges()}ngDoCheck(){this.updateFilledState()}onInput(){this.updateFilledState()}updateFilledState(){this.filled=this.el.nativeElement.value&&this.el.nativeElement.value.length||this.ngModel&&this.ngModel.model}static \u0275fac=function(i){return new(i||t)(ye(Xe,8))};static \u0275dir=$e({type:t,selectors:[["","pInputText",""]],hostAttrs:[1,"p-inputtext","p-component"],hostVars:14,hostBindings:function(i,n){if(i&1&&re("input",function(s){return n.onInput(s)}),i&2){let o;se("p-filled",n.filled)("p-variant-filled",((o=n.variant)!==null&&o!==void 0?o:n.config.inputStyle()||n.config.inputVariant())==="filled")("p-inputtext-fluid",n.hasFluid)("p-inputtext-sm",n.pSize==="small")("p-inputfield-sm",n.pSize==="small")("p-inputtext-lg",n.pSize==="large")("p-inputfield-lg",n.pSize==="large")}},inputs:{variant:"variant",fluid:[2,"fluid","fluid",Q],pSize:"pSize"},features:[$([et]),b]})}return t})();var tt=["content"],Vt=["item"],Mt=["loader"],$t=["loadericon"],Et=["element"],Dt=["*"],Bt=(t,l,e)=>({"p-virtualscroller":!0,"p-virtualscroller-inline":t,"p-virtualscroller-both p-both-scroll":l,"p-virtualscroller-horizontal p-horizontal-scroll":e}),Te=(t,l)=>({$implicit:t,options:l}),Lt=t=>({"p-virtualscroller-content":!0,"p-virtualscroller-loading ":t}),Ot=t=>({"p-virtualscroller-loader-mask":t}),Pt=t=>({numCols:t}),nt=t=>({options:t}),Rt=()=>({styleClass:"p-virtualscroller-loading-icon"}),Ht=(t,l)=>({rows:t,columns:l});function jt(t,l){t&1&&le(0)}function Nt(t,l){if(t&1&&(L(0),y(1,jt,1,0,"ng-container",10),O()),t&2){let e=x(2);d(),a("ngTemplateOutlet",e.contentTemplate||e._contentTemplate)("ngTemplateOutletContext",fe(2,Te,e.loadedItems,e.getContentOptions()))}}function Wt(t,l){t&1&&le(0)}function At(t,l){if(t&1&&(L(0),y(1,Wt,1,0,"ng-container",10),O()),t&2){let e=l.$implicit,i=l.index,n=x(3);d(),a("ngTemplateOutlet",n.itemTemplate||n._itemTemplate)("ngTemplateOutletContext",fe(2,Te,e,n.getOptions(i)))}}function Qt(t,l){if(t&1&&(S(0,"div",11,3),y(2,At,2,5,"ng-container",12),z()),t&2){let e=x(2);pe(e.contentStyle),v(e.contentStyleClass),a("ngClass",X(8,Lt,e.d_loading)),g("data-pc-section","content"),d(2),a("ngForOf",e.loadedItems)("ngForTrackBy",e._trackBy)}}function qt(t,l){if(t&1&&k(0,"div",13),t&2){let e=x(2);a("ngStyle",e.spacerStyle),g("data-pc-section","spacer")}}function Xt(t,l){t&1&&le(0)}function Zt(t,l){if(t&1&&(L(0),y(1,Xt,1,0,"ng-container",10),O()),t&2){let e=l.index,i=x(4);d(),a("ngTemplateOutlet",i.loaderTemplate||i._loaderTemplate)("ngTemplateOutletContext",X(4,nt,i.getLoaderOptions(e,i.both&&X(2,Pt,i.numItemsInViewport.cols))))}}function Gt(t,l){if(t&1&&(L(0),y(1,Zt,2,6,"ng-container",15),O()),t&2){let e=x(3);d(),a("ngForOf",e.loaderArr)}}function Ut(t,l){t&1&&le(0)}function Kt(t,l){if(t&1&&(L(0),y(1,Ut,1,0,"ng-container",10),O()),t&2){let e=x(4);d(),a("ngTemplateOutlet",e.loaderIconTemplate||e._loaderIconTemplate)("ngTemplateOutletContext",X(3,nt,Ce(2,Rt)))}}function Jt(t,l){t&1&&k(0,"SpinnerIcon",16),t&2&&(a("styleClass","p-virtualscroller-loading-icon pi-spin"),g("data-pc-section","loadingIcon"))}function Yt(t,l){if(t&1&&y(0,Kt,2,5,"ng-container",6)(1,Jt,1,2,"ng-template",null,5,ge),t&2){let e=me(2),i=x(3);a("ngIf",i.loaderIconTemplate||i._loaderIconTemplate)("ngIfElse",e)}}function ei(t,l){if(t&1&&(S(0,"div",14),y(1,Gt,2,1,"ng-container",6)(2,Yt,3,2,"ng-template",null,4,ge),z()),t&2){let e=me(3),i=x(2);a("ngClass",X(4,Ot,!i.loaderTemplate)),g("data-pc-section","loader"),d(),a("ngIf",i.loaderTemplate||i._loaderTemplate)("ngIfElse",e)}}function ti(t,l){if(t&1){let e=xe();L(0),S(1,"div",7,1),re("scroll",function(n){ie(e);let o=x();return ne(o.onContainerScroll(n))}),y(3,Nt,2,5,"ng-container",6)(4,Qt,3,10,"ng-template",null,2,ge)(6,qt,1,2,"div",8)(7,ei,4,6,"div",9),z(),O()}if(t&2){let e=me(5),i=x();d(),v(i._styleClass),a("ngStyle",i._style)("ngClass",De(12,Bt,i.inline,i.both,i.horizontal)),g("id",i._id)("tabindex",i.tabindex)("data-pc-name","scroller")("data-pc-section","root"),d(2),a("ngIf",i.contentTemplate||i._contentTemplate)("ngIfElse",e),d(3),a("ngIf",i._showSpacer),d(),a("ngIf",!i.loaderDisabled&&i._showLoader&&i.d_loading)}}function ii(t,l){t&1&&le(0)}function ni(t,l){if(t&1&&(L(0),y(1,ii,1,0,"ng-container",10),O()),t&2){let e=x(2);d(),a("ngTemplateOutlet",e.contentTemplate||e._contentTemplate)("ngTemplateOutletContext",fe(5,Te,e.items,fe(2,Ht,e._items,e.loadedColumns)))}}function oi(t,l){if(t&1&&(ce(0),y(1,ni,2,8,"ng-container",17)),t&2){let e=x();d(),a("ngIf",e.contentTemplate||e._contentTemplate)}}var si=({dt:t})=>`
.p-virtualscroller {
    position: relative;
    overflow: auto;
    contain: strict;
    transform: translateZ(0);
    will-change: scroll-position;
    outline: 0 none;
}

.p-virtualscroller-content {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100%;
    min-width: 100%;
    will-change: transform;
}

.p-virtualscroller-spacer {
    position: absolute;
    top: 0;
    left: 0;
    height: 1px;
    width: 1px;
    transform-origin: 0 0;
    pointer-events: none;
}

.p-virtualscroller-loader {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${t("virtualscroller.loader.mask.background")};
    color: ${t("virtualscroller.loader.mask.color")};
}

.p-virtualscroller-loader-mask {
    display: flex;
    align-items: center;
    justify-content: center;
}

.p-virtualscroller-loading-icon {
    font-size: ${t("virtualscroller.loader.icon.size")};
    width: ${t("virtualscroller.loader.icon.size")};
    height: ${t("virtualscroller.loader.icon.size")};
}

.p-virtualscroller-horizontal > .p-virtualscroller-content {
    display: flex;
}

.p-virtualscroller-inline .p-virtualscroller-content {
    position: static;
}
`,it=(()=>{class t extends E{name="virtualscroller";theme=si;static \u0275fac=(()=>{let e;return function(n){return(e||(e=m(t)))(n||t)}})();static \u0275prov=T({token:t,factory:t.\u0275fac})}return t})();var Yn=(()=>{class t extends D{zone;get id(){return this._id}set id(e){this._id=e}get style(){return this._style}set style(e){this._style=e}get styleClass(){return this._styleClass}set styleClass(e){this._styleClass=e}get tabindex(){return this._tabindex}set tabindex(e){this._tabindex=e}get items(){return this._items}set items(e){this._items=e}get itemSize(){return this._itemSize}set itemSize(e){this._itemSize=e}get scrollHeight(){return this._scrollHeight}set scrollHeight(e){this._scrollHeight=e}get scrollWidth(){return this._scrollWidth}set scrollWidth(e){this._scrollWidth=e}get orientation(){return this._orientation}set orientation(e){this._orientation=e}get step(){return this._step}set step(e){this._step=e}get delay(){return this._delay}set delay(e){this._delay=e}get resizeDelay(){return this._resizeDelay}set resizeDelay(e){this._resizeDelay=e}get appendOnly(){return this._appendOnly}set appendOnly(e){this._appendOnly=e}get inline(){return this._inline}set inline(e){this._inline=e}get lazy(){return this._lazy}set lazy(e){this._lazy=e}get disabled(){return this._disabled}set disabled(e){this._disabled=e}get loaderDisabled(){return this._loaderDisabled}set loaderDisabled(e){this._loaderDisabled=e}get columns(){return this._columns}set columns(e){this._columns=e}get showSpacer(){return this._showSpacer}set showSpacer(e){this._showSpacer=e}get showLoader(){return this._showLoader}set showLoader(e){this._showLoader=e}get numToleratedItems(){return this._numToleratedItems}set numToleratedItems(e){this._numToleratedItems=e}get loading(){return this._loading}set loading(e){this._loading=e}get autoSize(){return this._autoSize}set autoSize(e){this._autoSize=e}get trackBy(){return this._trackBy}set trackBy(e){this._trackBy=e}get options(){return this._options}set options(e){this._options=e,e&&typeof e=="object"&&(Object.entries(e).forEach(([i,n])=>this[`_${i}`]!==n&&(this[`_${i}`]=n)),Object.entries(e).forEach(([i,n])=>this[`${i}`]!==n&&(this[`${i}`]=n)))}onLazyLoad=new q;onScroll=new q;onScrollIndexChange=new q;elementViewChild;contentViewChild;height;_id;_style;_styleClass;_tabindex=0;_items;_itemSize=0;_scrollHeight;_scrollWidth;_orientation="vertical";_step=0;_delay=0;_resizeDelay=10;_appendOnly=!1;_inline=!1;_lazy=!1;_disabled=!1;_loaderDisabled=!1;_columns;_showSpacer=!0;_showLoader=!1;_numToleratedItems;_loading;_autoSize=!1;_trackBy;_options;d_loading=!1;d_numToleratedItems;contentEl;contentTemplate;itemTemplate;loaderTemplate;loaderIconTemplate;templates;_contentTemplate;_itemTemplate;_loaderTemplate;_loaderIconTemplate;first=0;last=0;page=0;isRangeChanged=!1;numItemsInViewport=0;lastScrollPos=0;lazyLoadState={};loaderArr=[];spacerStyle={};contentStyle={};scrollTimeout;resizeTimeout;initialized=!1;windowResizeListener;defaultWidth;defaultHeight;defaultContentWidth;defaultContentHeight;_contentStyleClass;get contentStyleClass(){return this._contentStyleClass}set contentStyleClass(e){this._contentStyleClass=e}get vertical(){return this._orientation==="vertical"}get horizontal(){return this._orientation==="horizontal"}get both(){return this._orientation==="both"}get loadedItems(){return this._items&&!this.d_loading?this.both?this._items.slice(this._appendOnly?0:this.first.rows,this.last.rows).map(e=>this._columns?e:e.slice(this._appendOnly?0:this.first.cols,this.last.cols)):this.horizontal&&this._columns?this._items:this._items.slice(this._appendOnly?0:this.first,this.last):[]}get loadedRows(){return this.d_loading?this._loaderDisabled?this.loaderArr:[]:this.loadedItems}get loadedColumns(){return this._columns&&(this.both||this.horizontal)?this.d_loading&&this._loaderDisabled?this.both?this.loaderArr[0]:this.loaderArr:this._columns.slice(this.both?this.first.cols:this.first,this.both?this.last.cols:this.last):this._columns}_componentStyle=F(it);constructor(e){super(),this.zone=e}ngOnInit(){super.ngOnInit(),this.setInitialState()}ngOnChanges(e){super.ngOnChanges(e);let i=!1;if(this.scrollHeight=="100%"&&(this.height="100%"),e.loading){let{previousValue:n,currentValue:o}=e.loading;this.lazy&&n!==o&&o!==this.d_loading&&(this.d_loading=o,i=!0)}if(e.orientation&&(this.lastScrollPos=this.both?{top:0,left:0}:0),e.numToleratedItems){let{previousValue:n,currentValue:o}=e.numToleratedItems;n!==o&&o!==this.d_numToleratedItems&&(this.d_numToleratedItems=o)}if(e.options){let{previousValue:n,currentValue:o}=e.options;this.lazy&&n?.loading!==o?.loading&&o?.loading!==this.d_loading&&(this.d_loading=o.loading,i=!0),n?.numToleratedItems!==o?.numToleratedItems&&o?.numToleratedItems!==this.d_numToleratedItems&&(this.d_numToleratedItems=o.numToleratedItems)}this.initialized&&!i&&(e.items?.previousValue?.length!==e.items?.currentValue?.length||e.itemSize||e.scrollHeight||e.scrollWidth)&&(this.init(),this.calculateAutoSize())}ngAfterContentInit(){this.templates.forEach(e=>{switch(e.getType()){case"content":this._contentTemplate=e.template;break;case"item":this._itemTemplate=e.template;break;case"loader":this._loaderTemplate=e.template;break;case"loadericon":this._loaderIconTemplate=e.template;break;default:this._itemTemplate=e.template;break}})}ngAfterViewInit(){super.ngAfterViewInit(),Promise.resolve().then(()=>{this.viewInit()})}ngAfterViewChecked(){this.initialized||this.viewInit()}ngOnDestroy(){this.unbindResizeListener(),this.contentEl=null,this.initialized=!1,super.ngOnDestroy()}viewInit(){Se(this.platformId)&&!this.initialized&&ze(this.elementViewChild?.nativeElement)&&(this.setInitialState(),this.setContentEl(this.contentEl),this.init(),this.defaultWidth=ee(this.elementViewChild?.nativeElement),this.defaultHeight=Y(this.elementViewChild?.nativeElement),this.defaultContentWidth=ee(this.contentEl),this.defaultContentHeight=Y(this.contentEl),this.initialized=!0)}init(){this._disabled||(this.setSize(),this.calculateOptions(),this.setSpacerSize(),this.bindResizeListener(),this.cd.detectChanges())}setContentEl(e){this.contentEl=e||this.contentViewChild?.nativeElement||Oe(this.elementViewChild?.nativeElement,".p-virtualscroller-content")}setInitialState(){this.first=this.both?{rows:0,cols:0}:0,this.last=this.both?{rows:0,cols:0}:0,this.numItemsInViewport=this.both?{rows:0,cols:0}:0,this.lastScrollPos=this.both?{top:0,left:0}:0,this.d_loading=this._loading||!1,this.d_numToleratedItems=this._numToleratedItems,this.loaderArr=[]}getElementRef(){return this.elementViewChild}getPageByFirst(e){return Math.floor(((e??this.first)+this.d_numToleratedItems*4)/(this._step||1))}isPageChanged(e){return this._step?this.page!==this.getPageByFirst(e??this.first):!0}scrollTo(e){this.elementViewChild?.nativeElement?.scrollTo(e)}scrollToIndex(e,i="auto"){if(this.both?e.every(o=>o>-1):e>-1){let o=this.first,{scrollTop:s=0,scrollLeft:r=0}=this.elementViewChild?.nativeElement,{numToleratedItems:_}=this.calculateNumItems(),f=this.getContentPosition(),p=this.itemSize,P=(h=0,u)=>h<=u?0:h,w=(h,u,B)=>h*u+B,R=(h=0,u=0)=>this.scrollTo({left:h,top:u,behavior:i}),I=this.both?{rows:0,cols:0}:0,G=!1,c=!1;this.both?(I={rows:P(e[0],_[0]),cols:P(e[1],_[1])},R(w(I.cols,p[1],f.left),w(I.rows,p[0],f.top)),c=this.lastScrollPos.top!==s||this.lastScrollPos.left!==r,G=I.rows!==o.rows||I.cols!==o.cols):(I=P(e,_),this.horizontal?R(w(I,p,f.left),s):R(r,w(I,p,f.top)),c=this.lastScrollPos!==(this.horizontal?r:s),G=I!==o),this.isRangeChanged=G,c&&(this.first=I)}}scrollInView(e,i,n="auto"){if(i){let{first:o,viewport:s}=this.getRenderedRange(),r=(p=0,P=0)=>this.scrollTo({left:p,top:P,behavior:n}),_=i==="to-start",f=i==="to-end";if(_){if(this.both)s.first.rows-o.rows>e[0]?r(s.first.cols*this._itemSize[1],(s.first.rows-1)*this._itemSize[0]):s.first.cols-o.cols>e[1]&&r((s.first.cols-1)*this._itemSize[1],s.first.rows*this._itemSize[0]);else if(s.first-o>e){let p=(s.first-1)*this._itemSize;this.horizontal?r(p,0):r(0,p)}}else if(f){if(this.both)s.last.rows-o.rows<=e[0]+1?r(s.first.cols*this._itemSize[1],(s.first.rows+1)*this._itemSize[0]):s.last.cols-o.cols<=e[1]+1&&r((s.first.cols+1)*this._itemSize[1],s.first.rows*this._itemSize[0]);else if(s.last-o<=e+1){let p=(s.first+1)*this._itemSize;this.horizontal?r(p,0):r(0,p)}}}else this.scrollToIndex(e,n)}getRenderedRange(){let e=(o,s)=>s||o?Math.floor(o/(s||o)):0,i=this.first,n=0;if(this.elementViewChild?.nativeElement){let{scrollTop:o,scrollLeft:s}=this.elementViewChild.nativeElement;if(this.both)i={rows:e(o,this._itemSize[0]),cols:e(s,this._itemSize[1])},n={rows:i.rows+this.numItemsInViewport.rows,cols:i.cols+this.numItemsInViewport.cols};else{let r=this.horizontal?s:o;i=e(r,this._itemSize),n=i+this.numItemsInViewport}}return{first:this.first,last:this.last,viewport:{first:i,last:n}}}calculateNumItems(){let e=this.getContentPosition(),i=(this.elementViewChild?.nativeElement?this.elementViewChild.nativeElement.offsetWidth-e.left:0)||0,n=(this.elementViewChild?.nativeElement?this.elementViewChild.nativeElement.offsetHeight-e.top:0)||0,o=(f,p)=>p||f?Math.ceil(f/(p||f)):0,s=f=>Math.ceil(f/2),r=this.both?{rows:o(n,this._itemSize[0]),cols:o(i,this._itemSize[1])}:o(this.horizontal?i:n,this._itemSize),_=this.d_numToleratedItems||(this.both?[s(r.rows),s(r.cols)]:s(r));return{numItemsInViewport:r,numToleratedItems:_}}calculateOptions(){let{numItemsInViewport:e,numToleratedItems:i}=this.calculateNumItems(),n=(r,_,f,p=!1)=>this.getLast(r+_+(r<f?2:3)*f,p),o=this.first,s=this.both?{rows:n(this.first.rows,e.rows,i[0]),cols:n(this.first.cols,e.cols,i[1],!0)}:n(this.first,e,i);this.last=s,this.numItemsInViewport=e,this.d_numToleratedItems=i,this.showLoader&&(this.loaderArr=this.both?Array.from({length:e.rows}).map(()=>Array.from({length:e.cols})):Array.from({length:e})),this._lazy&&Promise.resolve().then(()=>{this.lazyLoadState={first:this._step?this.both?{rows:0,cols:o.cols}:0:o,last:Math.min(this._step?this._step:this.last,this.items.length)},this.handleEvents("onLazyLoad",this.lazyLoadState)})}calculateAutoSize(){this._autoSize&&!this.d_loading&&Promise.resolve().then(()=>{if(this.contentEl){this.contentEl.style.minHeight=this.contentEl.style.minWidth="auto",this.contentEl.style.position="relative",this.elementViewChild.nativeElement.style.contain="none";let[e,i]=[ee(this.contentEl),Y(this.contentEl)];e!==this.defaultContentWidth&&(this.elementViewChild.nativeElement.style.width=""),i!==this.defaultContentHeight&&(this.elementViewChild.nativeElement.style.height="");let[n,o]=[ee(this.elementViewChild.nativeElement),Y(this.elementViewChild.nativeElement)];(this.both||this.horizontal)&&(this.elementViewChild.nativeElement.style.width=n<this.defaultWidth?n+"px":this._scrollWidth||this.defaultWidth+"px"),(this.both||this.vertical)&&(this.elementViewChild.nativeElement.style.height=o<this.defaultHeight?o+"px":this._scrollHeight||this.defaultHeight+"px"),this.contentEl.style.minHeight=this.contentEl.style.minWidth="",this.contentEl.style.position="",this.elementViewChild.nativeElement.style.contain=""}})}getLast(e=0,i=!1){return this._items?Math.min(i?(this._columns||this._items[0]).length:this._items.length,e):0}getContentPosition(){if(this.contentEl){let e=getComputedStyle(this.contentEl),i=parseFloat(e.paddingLeft)+Math.max(parseFloat(e.left)||0,0),n=parseFloat(e.paddingRight)+Math.max(parseFloat(e.right)||0,0),o=parseFloat(e.paddingTop)+Math.max(parseFloat(e.top)||0,0),s=parseFloat(e.paddingBottom)+Math.max(parseFloat(e.bottom)||0,0);return{left:i,right:n,top:o,bottom:s,x:i+n,y:o+s}}return{left:0,right:0,top:0,bottom:0,x:0,y:0}}setSize(){if(this.elementViewChild?.nativeElement){let e=this.elementViewChild.nativeElement.parentElement.parentElement,i=this._scrollWidth||`${this.elementViewChild.nativeElement.offsetWidth||e.offsetWidth}px`,n=this._scrollHeight||`${this.elementViewChild.nativeElement.offsetHeight||e.offsetHeight}px`,o=(s,r)=>this.elementViewChild.nativeElement.style[s]=r;this.both||this.horizontal?(o("height",n),o("width",i)):o("height",n)}}setSpacerSize(){if(this._items){let e=this.getContentPosition(),i=(n,o,s,r=0)=>this.spacerStyle=te(W({},this.spacerStyle),{[`${n}`]:(o||[]).length*s+r+"px"});this.both?(i("height",this._items,this._itemSize[0],e.y),i("width",this._columns||this._items[1],this._itemSize[1],e.x)):this.horizontal?i("width",this._columns||this._items,this._itemSize,e.x):i("height",this._items,this._itemSize,e.y)}}setContentPosition(e){if(this.contentEl&&!this._appendOnly){let i=e?e.first:this.first,n=(s,r)=>s*r,o=(s=0,r=0)=>this.contentStyle=te(W({},this.contentStyle),{transform:`translate3d(${s}px, ${r}px, 0)`});if(this.both)o(n(i.cols,this._itemSize[1]),n(i.rows,this._itemSize[0]));else{let s=n(i,this._itemSize);this.horizontal?o(s,0):o(0,s)}}}onScrollPositionChange(e){let i=e.target,n=this.getContentPosition(),o=(c,h)=>c?c>h?c-h:c:0,s=(c,h)=>h||c?Math.floor(c/(h||c)):0,r=(c,h,u,B,N,U)=>c<=N?N:U?u-B-N:h+N-1,_=(c,h,u,B,N,U,_e)=>c<=U?0:Math.max(0,_e?c<h?u:c-U:c>h?u:c-2*U),f=(c,h,u,B,N,U=!1)=>{let _e=h+B+2*N;return c>=N&&(_e+=N+1),this.getLast(_e,U)},p=o(i.scrollTop,n.top),P=o(i.scrollLeft,n.left),w=this.both?{rows:0,cols:0}:0,R=this.last,I=!1,G=this.lastScrollPos;if(this.both){let c=this.lastScrollPos.top<=p,h=this.lastScrollPos.left<=P;if(!this._appendOnly||this._appendOnly&&(c||h)){let u={rows:s(p,this._itemSize[0]),cols:s(P,this._itemSize[1])},B={rows:r(u.rows,this.first.rows,this.last.rows,this.numItemsInViewport.rows,this.d_numToleratedItems[0],c),cols:r(u.cols,this.first.cols,this.last.cols,this.numItemsInViewport.cols,this.d_numToleratedItems[1],h)};w={rows:_(u.rows,B.rows,this.first.rows,this.last.rows,this.numItemsInViewport.rows,this.d_numToleratedItems[0],c),cols:_(u.cols,B.cols,this.first.cols,this.last.cols,this.numItemsInViewport.cols,this.d_numToleratedItems[1],h)},R={rows:f(u.rows,w.rows,this.last.rows,this.numItemsInViewport.rows,this.d_numToleratedItems[0]),cols:f(u.cols,w.cols,this.last.cols,this.numItemsInViewport.cols,this.d_numToleratedItems[1],!0)},I=w.rows!==this.first.rows||R.rows!==this.last.rows||w.cols!==this.first.cols||R.cols!==this.last.cols||this.isRangeChanged,G={top:p,left:P}}}else{let c=this.horizontal?P:p,h=this.lastScrollPos<=c;if(!this._appendOnly||this._appendOnly&&h){let u=s(c,this._itemSize),B=r(u,this.first,this.last,this.numItemsInViewport,this.d_numToleratedItems,h);w=_(u,B,this.first,this.last,this.numItemsInViewport,this.d_numToleratedItems,h),R=f(u,w,this.last,this.numItemsInViewport,this.d_numToleratedItems),I=w!==this.first||R!==this.last||this.isRangeChanged,G=c}}return{first:w,last:R,isRangeChanged:I,scrollPos:G}}onScrollChange(e){let{first:i,last:n,isRangeChanged:o,scrollPos:s}=this.onScrollPositionChange(e);if(o){let r={first:i,last:n};if(this.setContentPosition(r),this.first=i,this.last=n,this.lastScrollPos=s,this.handleEvents("onScrollIndexChange",r),this._lazy&&this.isPageChanged(i)){let _={first:this._step?Math.min(this.getPageByFirst(i)*this._step,this.items.length-this._step):i,last:Math.min(this._step?(this.getPageByFirst(i)+1)*this._step:n,this.items.length)};(this.lazyLoadState.first!==_.first||this.lazyLoadState.last!==_.last)&&this.handleEvents("onLazyLoad",_),this.lazyLoadState=_}}}onContainerScroll(e){if(this.handleEvents("onScroll",{originalEvent:e}),this._delay&&this.isPageChanged()){if(this.scrollTimeout&&clearTimeout(this.scrollTimeout),!this.d_loading&&this.showLoader){let{isRangeChanged:i}=this.onScrollPositionChange(e);(i||(this._step?this.isPageChanged():!1))&&(this.d_loading=!0,this.cd.detectChanges())}this.scrollTimeout=setTimeout(()=>{this.onScrollChange(e),this.d_loading&&this.showLoader&&(!this._lazy||this._loading===void 0)&&(this.d_loading=!1,this.page=this.getPageByFirst()),this.cd.detectChanges()},this._delay)}else!this.d_loading&&this.onScrollChange(e)}bindResizeListener(){Se(this.platformId)&&(this.windowResizeListener||this.zone.runOutsideAngular(()=>{let e=this.document.defaultView,i=Pe()?"orientationchange":"resize";this.windowResizeListener=this.renderer.listen(e,i,this.onWindowResize.bind(this))}))}unbindResizeListener(){this.windowResizeListener&&(this.windowResizeListener(),this.windowResizeListener=null)}onWindowResize(){this.resizeTimeout&&clearTimeout(this.resizeTimeout),this.resizeTimeout=setTimeout(()=>{if(ze(this.elementViewChild?.nativeElement)){let[e,i]=[ee(this.elementViewChild?.nativeElement),Y(this.elementViewChild?.nativeElement)],[n,o]=[e!==this.defaultWidth,i!==this.defaultHeight];(this.both?n||o:this.horizontal?n:this.vertical?o:!1)&&this.zone.run(()=>{this.d_numToleratedItems=this._numToleratedItems,this.defaultWidth=e,this.defaultHeight=i,this.defaultContentWidth=ee(this.contentEl),this.defaultContentHeight=Y(this.contentEl),this.init()})}},this._resizeDelay)}handleEvents(e,i){return this.options&&this.options[e]?this.options[e](i):this[e].emit(i)}getContentOptions(){return{contentStyleClass:`p-virtualscroller-content ${this.d_loading?"p-virtualscroller-loading":""}`,items:this.loadedItems,getItemOptions:e=>this.getOptions(e),loading:this.d_loading,getLoaderOptions:(e,i)=>this.getLoaderOptions(e,i),itemSize:this._itemSize,rows:this.loadedRows,columns:this.loadedColumns,spacerStyle:this.spacerStyle,contentStyle:this.contentStyle,vertical:this.vertical,horizontal:this.horizontal,both:this.both}}getOptions(e){let i=(this._items||[]).length,n=this.both?this.first.rows+e:this.first+e;return{index:n,count:i,first:n===0,last:n===i-1,even:n%2===0,odd:n%2!==0}}getLoaderOptions(e,i){let n=this.loaderArr.length;return W({index:e,count:n,first:e===0,last:e===n-1,even:e%2===0,odd:e%2!==0},i)}static \u0275fac=function(i){return new(i||t)(ye(Ve))};static \u0275cmp=C({type:t,selectors:[["p-scroller"],["p-virtualscroller"],["p-virtual-scroller"],["p-virtualScroller"]],contentQueries:function(i,n,o){if(i&1&&(A(o,tt,4),A(o,Vt,4),A(o,Mt,4),A(o,$t,4),A(o,Ie,4)),i&2){let s;V(s=M())&&(n.contentTemplate=s.first),V(s=M())&&(n.itemTemplate=s.first),V(s=M())&&(n.loaderTemplate=s.first),V(s=M())&&(n.loaderIconTemplate=s.first),V(s=M())&&(n.templates=s)}},viewQuery:function(i,n){if(i&1&&(ue(Et,5),ue(tt,5)),i&2){let o;V(o=M())&&(n.elementViewChild=o.first),V(o=M())&&(n.contentViewChild=o.first)}},hostVars:2,hostBindings:function(i,n){i&2&&Ee("height",n.height)},inputs:{id:"id",style:"style",styleClass:"styleClass",tabindex:"tabindex",items:"items",itemSize:"itemSize",scrollHeight:"scrollHeight",scrollWidth:"scrollWidth",orientation:"orientation",step:"step",delay:"delay",resizeDelay:"resizeDelay",appendOnly:"appendOnly",inline:"inline",lazy:"lazy",disabled:"disabled",loaderDisabled:"loaderDisabled",columns:"columns",showSpacer:"showSpacer",showLoader:"showLoader",numToleratedItems:"numToleratedItems",loading:"loading",autoSize:"autoSize",trackBy:"trackBy",options:"options"},outputs:{onLazyLoad:"onLazyLoad",onScroll:"onScroll",onScrollIndexChange:"onScrollIndexChange"},features:[$([it]),b,be],ngContentSelectors:Dt,decls:3,vars:2,consts:[["disabledContainer",""],["element",""],["buildInContent",""],["content",""],["buildInLoader",""],["buildInLoaderIcon",""],[4,"ngIf","ngIfElse"],[3,"scroll","ngStyle","ngClass"],["class","p-virtualscroller-spacer",3,"ngStyle",4,"ngIf"],["class","p-virtualscroller-loader",3,"ngClass",4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[3,"ngClass"],[4,"ngFor","ngForOf","ngForTrackBy"],[1,"p-virtualscroller-spacer",3,"ngStyle"],[1,"p-virtualscroller-loader",3,"ngClass"],[4,"ngFor","ngForOf"],[3,"styleClass"],[4,"ngIf"]],template:function(i,n){if(i&1&&(ae(),y(0,ti,8,16,"ng-container",6)(1,oi,2,1,"ng-template",null,0,ge)),i&2){let o=me(2);a("ngIf",!n._disabled)("ngIfElse",o)}},dependencies:[H,he,Le,ve,we,ke,Ae,j],encapsulation:2})}return t})();export{Ci as a,Ue as b,zi as c,rt as d,_i as e,vt as f,ln as g,xn as h,En as i,Yn as j};
