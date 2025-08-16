import {
  Button,
  ButtonModule
} from "./chunk-MLZOMSK2.js";
import {
  MinusIcon,
  PlusIcon
} from "./chunk-OHPT5HPN.js";
import "./chunk-O5IGNYUK.js";
import "./chunk-V3DNLQNI.js";
import "./chunk-BBO4PRO5.js";
import "./chunk-EDB2TDMN.js";
import "./chunk-5G7WYC4N.js";
import {
  BaseComponent
} from "./chunk-Y6A2EGEY.js";
import {
  BaseStyle
} from "./chunk-QKY7V5ON.js";
import {
  Footer,
  PrimeTemplate,
  SharedModule,
  uuid
} from "./chunk-FYM5GVYR.js";
import "./chunk-UM5VRUGR.js";
import "./chunk-SPI32U7T.js";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "./chunk-W334TBAC.js";
import {
  CommonModule,
  NgClass,
  NgIf,
  NgStyle,
  NgTemplateOutlet
} from "./chunk-NE6GCDYT.js";
import "./chunk-VXD2P2UT.js";
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Injectable,
  Input,
  NgModule,
  Output,
  ViewChild,
  ViewEncapsulation,
  booleanAttribute,
  inject,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵpureFunction3,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵviewQuery
} from "./chunk-QLCWAD4B.js";
import "./chunk-VMI3K6GE.js";
import "./chunk-5KXDAEEK.js";
import "./chunk-WD6C567C.js";
import "./chunk-HM5YLMWO.js";
import "./chunk-TXDUYLVM.js";

// node_modules/primeng/fesm2022/primeng-panel.mjs
var _c0 = ["header"];
var _c1 = ["icons"];
var _c2 = ["content"];
var _c3 = ["footer"];
var _c4 = ["headericons"];
var _c5 = ["contentWrapper"];
var _c6 = ["*", [["p-header"]], [["p-footer"]]];
var _c7 = ["*", "p-header", "p-footer"];
var _c8 = (a0, a1) => ({
  "p-panel p-component": true,
  "p-panel-toggleable": a0,
  "p-panel-expanded": a1
});
var _c9 = (a0) => ({
  transitionParams: a0,
  height: "0",
  opacity: "0"
});
var _c10 = (a0) => ({
  value: "hidden",
  params: a0
});
var _c11 = (a0) => ({
  transitionParams: a0,
  height: "*",
  opacity: "1"
});
var _c12 = (a0) => ({
  value: "visible",
  params: a0
});
var _c13 = (a0, a1, a2) => ({
  "p-panel-icons-start": a0,
  "p-panel-icons-end": a1,
  "p-panel-icons-center": a2
});
var _c14 = (a0) => ({
  $implicit: a0
});
function Panel_div_1_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 12);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵattribute("id", ctx_r2.id + "_header");
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r2._header);
  }
}
function Panel_div_1_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Panel_div_1_5_ng_template_0_Template(rf, ctx) {
}
function Panel_div_1_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Panel_div_1_5_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function Panel_div_1_p_button_6_ng_template_1_ng_container_0_ng_container_1_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span");
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(6);
    ɵɵclassMap(ctx_r2.expandIcon);
  }
}
function Panel_div_1_p_button_6_ng_template_1_ng_container_0_ng_container_1_MinusIcon_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "MinusIcon");
  }
}
function Panel_div_1_p_button_6_ng_template_1_ng_container_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Panel_div_1_p_button_6_ng_template_1_ng_container_0_ng_container_1_span_1_Template, 1, 2, "span", 16)(2, Panel_div_1_p_button_6_ng_template_1_ng_container_0_ng_container_1_MinusIcon_2_Template, 1, 0, "MinusIcon", 14);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(5);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.expandIcon);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r2.expandIcon);
  }
}
function Panel_div_1_p_button_6_ng_template_1_ng_container_0_ng_container_2_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span");
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(6);
    ɵɵclassMap(ctx_r2.collapseIcon);
  }
}
function Panel_div_1_p_button_6_ng_template_1_ng_container_0_ng_container_2_PlusIcon_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "PlusIcon");
  }
}
function Panel_div_1_p_button_6_ng_template_1_ng_container_0_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Panel_div_1_p_button_6_ng_template_1_ng_container_0_ng_container_2_span_1_Template, 1, 2, "span", 16)(2, Panel_div_1_p_button_6_ng_template_1_ng_container_0_ng_container_2_PlusIcon_2_Template, 1, 0, "PlusIcon", 14);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(5);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.collapseIcon);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r2.collapseIcon);
  }
}
function Panel_div_1_p_button_6_ng_template_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Panel_div_1_p_button_6_ng_template_1_ng_container_0_ng_container_1_Template, 3, 2, "ng-container", 14)(2, Panel_div_1_p_button_6_ng_template_1_ng_container_0_ng_container_2_Template, 3, 2, "ng-container", 14);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(4);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r2.collapsed);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.collapsed);
  }
}
function Panel_div_1_p_button_6_ng_template_1_1_ng_template_0_Template(rf, ctx) {
}
function Panel_div_1_p_button_6_ng_template_1_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Panel_div_1_p_button_6_ng_template_1_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function Panel_div_1_p_button_6_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Panel_div_1_p_button_6_ng_template_1_ng_container_0_Template, 3, 2, "ng-container", 14)(1, Panel_div_1_p_button_6_ng_template_1_1_Template, 1, 0, null, 15);
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵproperty("ngIf", !ctx_r2.headerIconsTemplate && !ctx_r2._headerIconsTemplate && !(ctx_r2.toggleButtonProps == null ? null : ctx_r2.toggleButtonProps.icon));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r2.headerIconsTemplate || ctx_r2._headerIconsTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(3, _c14, ctx_r2.collapsed));
  }
}
function Panel_div_1_p_button_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "p-button", 13);
    ɵɵlistener("click", function Panel_div_1_p_button_6_Template_p_button_click_0_listener($event) {
      ɵɵrestoreView(_r4);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.onIconClick($event));
    })("keydown", function Panel_div_1_p_button_6_Template_p_button_keydown_0_listener($event) {
      ɵɵrestoreView(_r4);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.onKeyDown($event));
    });
    ɵɵtemplate(1, Panel_div_1_p_button_6_ng_template_1_Template, 2, 5, "ng-template", null, 1, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵproperty("text", true)("rounded", true)("buttonProps", ctx_r2.toggleButtonProps);
    ɵɵattribute("id", ctx_r2.id + "_header")("aria-label", ctx_r2.buttonAriaLabel)("aria-controls", ctx_r2.id + "_content")("aria-expanded", !ctx_r2.collapsed);
  }
}
function Panel_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 8);
    ɵɵlistener("click", function Panel_div_1_Template_div_click_0_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onHeaderClick($event));
    });
    ɵɵtemplate(1, Panel_div_1_span_1_Template, 2, 2, "span", 9);
    ɵɵprojection(2, 1);
    ɵɵtemplate(3, Panel_div_1_ng_container_3_Template, 1, 0, "ng-container", 6);
    ɵɵelementStart(4, "div", 10);
    ɵɵtemplate(5, Panel_div_1_5_Template, 1, 0, null, 6)(6, Panel_div_1_p_button_6_Template, 3, 7, "p-button", 11);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵattribute("id", ctx_r2.id + "-titlebar");
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2._header);
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r2.headerTemplate || ctx_r2._headerTemplate);
    ɵɵadvance();
    ɵɵproperty("ngClass", ɵɵpureFunction3(6, _c13, ctx_r2.iconPos === "start", ctx_r2.iconPos === "end", ctx_r2.iconPos === "center"));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r2.iconTemplate || ctx_r2._iconTemplate);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.toggleable);
  }
}
function Panel_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Panel_div_7_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Panel_div_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 17);
    ɵɵprojection(1, 2);
    ɵɵtemplate(2, Panel_div_7_ng_container_2_Template, 1, 0, "ng-container", 6);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r2.footerTemplate || ctx_r2._footerTemplate);
  }
}
var theme = ({
  dt
}) => `
.p-panel {
    border: 1px solid ${dt("panel.border.color")};
    border-radius: ${dt("panel.border.radius")};
    background: ${dt("panel.background")};
    color: ${dt("panel.color")};
}

.p-panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${dt("panel.header.padding")};
    background: ${dt("panel.header.background")};
    color: ${dt("panel.header.color")};
    border-style: solid;
    border-width: ${dt("panel.header.border.width")};
    border-color: ${dt("panel.header.border.color")};
    border-radius: ${dt("panel.header.border.radius")};
}

.p-panel-toggleable .p-panel-header {
    padding: ${dt("panel.toggleable.header.padding")};
}

.p-panel-title {
    line-height: 1;
    font-weight: ${dt("panel.title.font.weight")};
}

.p-panel-content {
    padding: ${dt("panel.content.padding")};
}

.p-panel-footer {
    padding: ${dt("panel.footer.padding")};
}

/* For PrimeNG */
.p-panel-toggleable.p-panel-expanded > .p-panel-content-container:not(.ng-animating) {
    overflow: visible
}

.p-panel-toggleable .p-panel-content-container {
    overflow: hidden;
}
`;
var classes = {
  root: ({
    props
  }) => ["p-panel p-component", {
    "p-panel-toggleable": props.toggleable
  }],
  header: "p-panel-header",
  title: "p-panel-title",
  headerActions: "p-panel-header-actions",
  pcToggleButton: "p-panel-toggle-button",
  contentContainer: "p-panel-content-container",
  content: "p-panel-content",
  footer: "p-panel-footer"
};
var PanelStyle = class _PanelStyle extends BaseStyle {
  name = "panel";
  theme = theme;
  classes = classes;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPanelStyle_BaseFactory;
    return function PanelStyle_Factory(__ngFactoryType__) {
      return (ɵPanelStyle_BaseFactory || (ɵPanelStyle_BaseFactory = ɵɵgetInheritedFactory(_PanelStyle)))(__ngFactoryType__ || _PanelStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _PanelStyle,
    factory: _PanelStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PanelStyle, [{
    type: Injectable
  }], null, null);
})();
var PanelClasses;
(function(PanelClasses2) {
  PanelClasses2["root"] = "p-panel";
  PanelClasses2["header"] = "p-panel-header";
  PanelClasses2["title"] = "p-panel-title";
  PanelClasses2["headerActions"] = "p-panel-header-actions";
  PanelClasses2["pcToggleButton"] = "p-panel-toggle-button";
  PanelClasses2["contentContainer"] = "p-panel-content-container";
  PanelClasses2["content"] = "p-panel-content";
  PanelClasses2["footer"] = "p-panel-footer";
})(PanelClasses || (PanelClasses = {}));
var Panel = class _Panel extends BaseComponent {
  /**
   * Defines if content of panel can be expanded and collapsed.
   * @group Props
   */
  toggleable;
  /**
   * Header text of the panel.
   * @group Props
   */
  _header;
  /**
   * Defines the initial state of panel content, supports one or two-way binding as well.
   * @group Props
   */
  collapsed;
  /**
   * Inline style of the component.
   * @group Props
   */
  style;
  /**
   * Style class of the component.
   * @group Props
   */
  styleClass;
  /**
   * Position of the icons.
   * @group Props
   */
  iconPos = "end";
  /**
   * Expand icon of the toggle button.
   * @group Props
   * @deprecated since v15.4.2, use `headericons` template instead.
   */
  expandIcon;
  /**
   * Collapse icon of the toggle button.
   * @group Props
   * @deprecated since v15.4.2, use `headericons` template instead.
   */
  collapseIcon;
  /**
   * Specifies if header of panel cannot be displayed.
   * @group Props
   */
  showHeader = true;
  /**
   * Specifies the toggler element to toggle the panel content.
   * @group Props
   */
  toggler = "icon";
  /**
   * Transition options of the animation.
   * @group Props
   */
  transitionOptions = "400ms cubic-bezier(0.86, 0, 0.07, 1)";
  /**
   * Used to pass all properties of the ButtonProps to the Button component.
   * @group Props
   */
  toggleButtonProps;
  /**
   * Emitted when the collapsed changes.
   * @param {boolean} value - New Value.
   * @group Emits
   */
  collapsedChange = new EventEmitter();
  /**
   * Callback to invoke before panel toggle.
   * @param {PanelBeforeToggleEvent} event - Custom panel toggle event
   * @group Emits
   */
  onBeforeToggle = new EventEmitter();
  /**
   * Callback to invoke after panel toggle.
   * @param {PanelAfterToggleEvent} event - Custom panel toggle event
   * @group Emits
   */
  onAfterToggle = new EventEmitter();
  footerFacet;
  animating;
  /**
   * Defines template option for header.
   * @group Templates
   */
  headerTemplate;
  /**
   * Defines template option for icon.
   * @example
   * ```html
   * <ng-template #icon> </ng-template>
   * ```
   * @group Templates
   */
  iconTemplate;
  /**
   * Defines template option for content.
   * @example
   * ```html
   * <ng-template #content> </ng-template>
   * ```
   * @group Templates
   */
  contentTemplate;
  /**
   * Defines template option for footer.
   * @example
   * ```html
   * <ng-template #footer> </ng-template>
   * ```
   * @group Templates
   */
  footerTemplate;
  /**
   * Defines template option for headerIcon.
   * @type {TemplateRef<PanelHeaderIconsTemplateContext>} context - context of the template.
   * @example
   * ```html
   * <ng-template #headericons let-collapsed> </ng-template>
   * ```
   * @see {@link PanelHeaderIconsTemplateContext}
   * @group Templates
   */
  headerIconsTemplate;
  _headerTemplate;
  _iconTemplate;
  _contentTemplate;
  _footerTemplate;
  _headerIconsTemplate;
  contentWrapperViewChild;
  id = uuid("pn_id_");
  get buttonAriaLabel() {
    return this._header;
  }
  _componentStyle = inject(PanelStyle);
  onHeaderClick(event) {
    if (this.toggler === "header") {
      this.toggle(event);
    }
  }
  onIconClick(event) {
    if (this.toggler === "icon") {
      this.toggle(event);
    }
  }
  toggle(event) {
    if (this.animating) {
      return false;
    }
    this.animating = true;
    this.onBeforeToggle.emit({
      originalEvent: event,
      collapsed: this.collapsed
    });
    if (this.toggleable) {
      if (this.collapsed) this.expand();
      else this.collapse();
    }
    this.cd.markForCheck();
    event.preventDefault();
  }
  expand() {
    this.collapsed = false;
    this.collapsedChange.emit(this.collapsed);
    this.updateTabIndex();
  }
  collapse() {
    this.collapsed = true;
    this.collapsedChange.emit(this.collapsed);
    this.updateTabIndex();
  }
  getBlockableElement() {
    return this.el.nativeElement.children[0];
  }
  updateTabIndex() {
    if (this.contentWrapperViewChild) {
      const focusableElements = this.contentWrapperViewChild.nativeElement.querySelectorAll('input, button, select, a, textarea, [tabindex]:not([tabindex="-1"])');
      focusableElements.forEach((element) => {
        if (this.collapsed) {
          element.setAttribute("tabindex", "-1");
        } else {
          element.removeAttribute("tabindex");
        }
      });
    }
  }
  onKeyDown(event) {
    if (event.code === "Enter" || event.code === "Space") {
      this.toggle(event);
      event.preventDefault();
    }
  }
  onToggleDone(event) {
    this.animating = false;
    this.onAfterToggle.emit({
      originalEvent: event,
      collapsed: this.collapsed
    });
  }
  templates;
  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case "header":
          this._headerTemplate = item.template;
          break;
        case "content":
          this._contentTemplate = item.template;
          break;
        case "footer":
          this._footerTemplate = item.template;
          break;
        case "icons":
          this._iconTemplate = item.template;
          break;
        case "headericons":
          this._headerIconsTemplate = item.template;
          break;
        default:
          this._contentTemplate = item.template;
          break;
      }
    });
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵPanel_BaseFactory;
    return function Panel_Factory(__ngFactoryType__) {
      return (ɵPanel_BaseFactory || (ɵPanel_BaseFactory = ɵɵgetInheritedFactory(_Panel)))(__ngFactoryType__ || _Panel);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _Panel,
    selectors: [["p-panel"]],
    contentQueries: function Panel_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, Footer, 5);
        ɵɵcontentQuery(dirIndex, _c0, 4);
        ɵɵcontentQuery(dirIndex, _c1, 4);
        ɵɵcontentQuery(dirIndex, _c2, 4);
        ɵɵcontentQuery(dirIndex, _c3, 4);
        ɵɵcontentQuery(dirIndex, _c4, 4);
        ɵɵcontentQuery(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.footerFacet = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.headerTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.iconTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.contentTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.footerTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.headerIconsTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    viewQuery: function Panel_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c5, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.contentWrapperViewChild = _t.first);
      }
    },
    inputs: {
      toggleable: [2, "toggleable", "toggleable", booleanAttribute],
      _header: [0, "header", "_header"],
      collapsed: [2, "collapsed", "collapsed", booleanAttribute],
      style: "style",
      styleClass: "styleClass",
      iconPos: "iconPos",
      expandIcon: "expandIcon",
      collapseIcon: "collapseIcon",
      showHeader: [2, "showHeader", "showHeader", booleanAttribute],
      toggler: "toggler",
      transitionOptions: "transitionOptions",
      toggleButtonProps: "toggleButtonProps"
    },
    outputs: {
      collapsedChange: "collapsedChange",
      onBeforeToggle: "onBeforeToggle",
      onAfterToggle: "onAfterToggle"
    },
    features: [ɵɵProvidersFeature([PanelStyle]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c7,
    decls: 8,
    vars: 25,
    consts: [["contentWrapper", ""], ["icon", ""], [3, "ngClass", "ngStyle"], ["class", "p-panel-header", 3, "click", 4, "ngIf"], ["role", "region", 1, "p-panel-content-container", 3, "id"], [1, "p-panel-content"], [4, "ngTemplateOutlet"], ["class", "p-panel-footer", 4, "ngIf"], [1, "p-panel-header", 3, "click"], ["class", "p-panel-title", 4, "ngIf"], [1, "p-panel-icons", 3, "ngClass"], ["severity", "secondary", "type", "button", "role", "button", "styleClass", "p-panel-header-icon p-panel-toggler p-link", 3, "text", "rounded", "buttonProps", "click", "keydown", 4, "ngIf"], [1, "p-panel-title"], ["severity", "secondary", "type", "button", "role", "button", "styleClass", "p-panel-header-icon p-panel-toggler p-link", 3, "click", "keydown", "text", "rounded", "buttonProps"], [4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "class", 4, "ngIf"], [1, "p-panel-footer"]],
    template: function Panel_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = ɵɵgetCurrentView();
        ɵɵprojectionDef(_c6);
        ɵɵelementStart(0, "div", 2);
        ɵɵtemplate(1, Panel_div_1_Template, 7, 10, "div", 3);
        ɵɵelementStart(2, "div", 4);
        ɵɵlistener("@panelContent.done", function Panel_Template_div_animation_panelContent_done_2_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onToggleDone($event));
        });
        ɵɵelementStart(3, "div", 5, 0);
        ɵɵprojection(5);
        ɵɵtemplate(6, Panel_ng_container_6_Template, 1, 0, "ng-container", 6);
        ɵɵelementEnd();
        ɵɵtemplate(7, Panel_div_7_Template, 3, 1, "div", 7);
        ɵɵelementEnd()();
      }
      if (rf & 2) {
        ɵɵclassMap(ctx.styleClass);
        ɵɵproperty("ngClass", ɵɵpureFunction2(14, _c8, ctx.toggleable, !ctx.collapsed && ctx.toggleable))("ngStyle", ctx.style);
        ɵɵattribute("id", ctx.id)("data-pc-name", "panel");
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.showHeader);
        ɵɵadvance();
        ɵɵproperty("id", ctx.id + "_content")("@panelContent", ctx.collapsed ? ɵɵpureFunction1(19, _c10, ɵɵpureFunction1(17, _c9, ctx.animating ? ctx.transitionOptions : "0ms")) : ɵɵpureFunction1(23, _c12, ɵɵpureFunction1(21, _c11, ctx.animating ? ctx.transitionOptions : "0ms")));
        ɵɵattribute("aria-labelledby", ctx.id + "_header")("aria-hidden", ctx.collapsed)("tabindex", ctx.collapsed ? "-1" : void 0);
        ɵɵadvance(4);
        ɵɵproperty("ngTemplateOutlet", ctx.contentTemplate || ctx._contentTemplate);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.footerFacet || ctx.footerTemplate || ctx._footerTemplate);
      }
    },
    dependencies: [CommonModule, NgClass, NgIf, NgTemplateOutlet, NgStyle, PlusIcon, MinusIcon, ButtonModule, Button, SharedModule],
    encapsulation: 2,
    data: {
      animation: [trigger("panelContent", [state("hidden", style({
        height: "0"
      })), state("void", style({
        height: "{{height}}"
      }), {
        params: {
          height: "0"
        }
      }), state("visible", style({
        height: "*"
      })), transition("visible <=> hidden", [animate("{{transitionParams}}")]), transition("void => hidden", animate("{{transitionParams}}")), transition("void => visible", animate("{{transitionParams}}"))])]
    },
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Panel, [{
    type: Component,
    args: [{
      selector: "p-panel",
      standalone: true,
      imports: [CommonModule, PlusIcon, MinusIcon, ButtonModule, SharedModule],
      template: `
        <div
            [attr.id]="id"
            [attr.data-pc-name]="'panel'"
            [ngClass]="{
                'p-panel p-component': true,
                'p-panel-toggleable': toggleable,
                'p-panel-expanded': !collapsed && toggleable
            }"
            [ngStyle]="style"
            [class]="styleClass"
        >
            <div class="p-panel-header" *ngIf="showHeader" (click)="onHeaderClick($event)" [attr.id]="id + '-titlebar'">
                <span class="p-panel-title" *ngIf="_header" [attr.id]="id + '_header'">{{ _header }}</span>
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate || _headerTemplate"></ng-container>
                <div
                    class="p-panel-icons"
                    [ngClass]="{
                        'p-panel-icons-start': iconPos === 'start',
                        'p-panel-icons-end': iconPos === 'end',
                        'p-panel-icons-center': iconPos === 'center'
                    }"
                >
                    <ng-template *ngTemplateOutlet="iconTemplate || _iconTemplate"></ng-template>
                    <p-button
                        *ngIf="toggleable"
                        [attr.id]="id + '_header'"
                        severity="secondary"
                        [text]="true"
                        [rounded]="true"
                        type="button"
                        role="button"
                        styleClass="p-panel-header-icon p-panel-toggler p-link"
                        [attr.aria-label]="buttonAriaLabel"
                        [attr.aria-controls]="id + '_content'"
                        [attr.aria-expanded]="!collapsed"
                        (click)="onIconClick($event)"
                        (keydown)="onKeyDown($event)"
                        [buttonProps]="toggleButtonProps"
                    >
                        <ng-template #icon>
                            <ng-container *ngIf="!headerIconsTemplate && !_headerIconsTemplate && !toggleButtonProps?.icon">
                                <ng-container *ngIf="!collapsed">
                                    <span *ngIf="expandIcon" [class]="expandIcon"></span>
                                    <MinusIcon *ngIf="!expandIcon" />
                                </ng-container>

                                <ng-container *ngIf="collapsed">
                                    <span *ngIf="collapseIcon" [class]="collapseIcon"></span>
                                    <PlusIcon *ngIf="!collapseIcon" />
                                </ng-container>
                            </ng-container>

                            <ng-template *ngTemplateOutlet="headerIconsTemplate || _headerIconsTemplate; context: { $implicit: collapsed }"></ng-template>
                        </ng-template>
                    </p-button>
                </div>
            </div>
            <div
                class="p-panel-content-container"
                [id]="id + '_content'"
                role="region"
                [attr.aria-labelledby]="id + '_header'"
                [attr.aria-hidden]="collapsed"
                [attr.tabindex]="collapsed ? '-1' : undefined"
                [@panelContent]="
                    collapsed
                        ? {
                              value: 'hidden',
                              params: {
                                  transitionParams: animating ? transitionOptions : '0ms',
                                  height: '0',
                                  opacity: '0'
                              }
                          }
                        : {
                              value: 'visible',
                              params: {
                                  transitionParams: animating ? transitionOptions : '0ms',
                                  height: '*',
                                  opacity: '1'
                              }
                          }
                "
                (@panelContent.done)="onToggleDone($event)"
            >
                <div class="p-panel-content" #contentWrapper>
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate || _contentTemplate"></ng-container>
                </div>

                <div class="p-panel-footer" *ngIf="footerFacet || footerTemplate || _footerTemplate">
                    <ng-content select="p-footer"></ng-content>
                    <ng-container *ngTemplateOutlet="footerTemplate || _footerTemplate"></ng-container>
                </div>
            </div>
        </div>
    `,
      animations: [trigger("panelContent", [state("hidden", style({
        height: "0"
      })), state("void", style({
        height: "{{height}}"
      }), {
        params: {
          height: "0"
        }
      }), state("visible", style({
        height: "*"
      })), transition("visible <=> hidden", [animate("{{transitionParams}}")]), transition("void => hidden", animate("{{transitionParams}}")), transition("void => visible", animate("{{transitionParams}}"))])],
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [PanelStyle]
    }]
  }], null, {
    toggleable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    _header: [{
      type: Input,
      args: ["header"]
    }],
    collapsed: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    style: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    iconPos: [{
      type: Input
    }],
    expandIcon: [{
      type: Input
    }],
    collapseIcon: [{
      type: Input
    }],
    showHeader: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    toggler: [{
      type: Input
    }],
    transitionOptions: [{
      type: Input
    }],
    toggleButtonProps: [{
      type: Input
    }],
    collapsedChange: [{
      type: Output
    }],
    onBeforeToggle: [{
      type: Output
    }],
    onAfterToggle: [{
      type: Output
    }],
    footerFacet: [{
      type: ContentChild,
      args: [Footer]
    }],
    headerTemplate: [{
      type: ContentChild,
      args: ["header", {
        descendants: false
      }]
    }],
    iconTemplate: [{
      type: ContentChild,
      args: ["icons", {
        descendants: false
      }]
    }],
    contentTemplate: [{
      type: ContentChild,
      args: ["content", {
        descendants: false
      }]
    }],
    footerTemplate: [{
      type: ContentChild,
      args: ["footer", {
        descendants: false
      }]
    }],
    headerIconsTemplate: [{
      type: ContentChild,
      args: ["headericons", {
        descendants: false
      }]
    }],
    contentWrapperViewChild: [{
      type: ViewChild,
      args: ["contentWrapper"]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }]
  });
})();
var PanelModule = class _PanelModule {
  static ɵfac = function PanelModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PanelModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _PanelModule,
    imports: [Panel, SharedModule],
    exports: [Panel, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [Panel, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PanelModule, [{
    type: NgModule,
    args: [{
      imports: [Panel, SharedModule],
      exports: [Panel, SharedModule]
    }]
  }], null, null);
})();
export {
  Panel,
  PanelClasses,
  PanelModule,
  PanelStyle
};
//# sourceMappingURL=primeng_panel.js.map
