define([
    "dojo/Evented",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/has",
    "esri/kernel",
    "dijit/_WidgetBase",
    "dijit/a11yclick",
    "dijit/_TemplatedMixin",
    "dojo/on",
    // load template
    "dojo/text!zesri/dijit/templates/GeocoderButton.html",
    "dojo/i18n!zesri/nls/jsapi",
    "dojo/dom-class",
    "dojo/dom-style",
    "esri/dijit/Geocoder"
],
function (
    Evented,
    declare,
    lang,
    has, esriNS,
    _WidgetBase, a11yclick, _TemplatedMixin,
    on,
    dijitTemplate, i18n,
    domClass, domStyle,
    Geocoder
) {
    var Widget = declare([_WidgetBase, _TemplatedMixin, Evented], {
        declaredClass: "esri.dijit.GeocoderButton",
        templateString: dijitTemplate,
        options: {
            theme: "GeocoderButton",
            map: null,
            open: false,
            visible: true,
            geocoderOptions: {
                autoComplete: true
            }
        },
        // lifecycle: 1
        constructor: function(options, srcRefNode) {
            // mix in settings and defaults
            var defaults = lang.mixin({}, this.options, options);
            // widget node
            this.domNode = srcRefNode;
            this._i18n = i18n;
            // properties
            this.set("map", defaults.map);
            this.set("theme", defaults.theme);
            this.set("open", defaults.open);
            this.set("visible", defaults.visible);
            // listeners
            this.watch("theme", this._updateThemeWatch);
            this.watch("open", this._open);
            this.watch("visible", this._visible);
            // classes
            this._css = {
                container: "geocoderBtnCon",
                open: "open",
                geocoderTheme: "geocoderToggle",
                item: "navItem",
                search: "zoomSearchButton",
                controlDisabled: "controlDisabled",
                otherButtons: "custom",
                searchContainer: "searchContainer"
            };
        },
        // bind listener for button to action
        postCreate: function() {
            this.inherited(arguments);
            this.own(
                on(this._searchNode, a11yclick, lang.hitch(this, this.toggle))
            );
        },
        // start widget. called by user
        startup: function() {
            // map not defined
            if (!this.map) {
                this.destroy();
                console.log('GeocoderButton::map required');
            }
            // when map is loaded
            if (this.map.loaded) {
                this._init();
            } else {
                on.once(this.map, "load", lang.hitch(this, function() {
                    this._init();
                }));
            }
        },
        // connections/subscriptions will be cleaned up during the destroy() lifecycle phase
        destroy: function() {
            this.inherited(arguments);
        },
        /* ---------------- */
        /* Public Events */
        /* ---------------- */
        // load
        // toggle
        // open
        // close
        /* ---------------- */
        /* Public Functions */
        /* ---------------- */
        toggle: function(){
            var display = domStyle.get(this._searchContainerNode, 'display');
            if(display === 'block'){
                this.set("open", false);
            }
            else{
                this.set("open", true);
            }
            this.emit("toggle", {});
        },
        show: function(){
            this.set("visible", true);  
        },
        hide: function(){
            this.set("visible", false);
        },
        open: function(){
            this.set("open", true);
            this.emit("open", {});
        },
        close: function(){
            this.set("open", false);
            this.emit("close", {});
        },
        /* ---------------- */
        /* Private Functions */
        /* ---------------- */
        _visible: function(){
            if(this.get("visible")){
                domStyle.set(this.domNode, 'display', 'block');
            }
            else{
                domStyle.set(this.domNode, 'display', 'none');
            }
        },
        _open: function(){
            if(this.get("open")){
                domStyle.set(this._searchContainerNode, 'display', 'block');
                domClass.add(this._containerNode, this._css.open);
                if(this.geocoder){
                    this.geocoder.focus();   
                }
            }
            else{
                domStyle.set(this._searchContainerNode, 'display', 'none');
                domClass.remove(this._containerNode, this._css.open);
                if(this.geocoder){
                    this.geocoder.blur();
                }
            }
        },
        _init: function() {
            this._visible();
            this._open();
            var options = lang.mixin({}, this.options.geocoderOptions, {
                theme: this._css.geocoderTheme,
                map: this.map
            });
            this.geocoder = new Geocoder(options, this._geocoderNode);
            
            on(this.geocoder, 'select', lang.hitch(this, function(e){
                if(e.result){
                    this.set("open", false);   
                }
            }));
            
            on(this.map, 'pan-start', lang.hitch(this, function(){
                this.set("open", false);
            }));
            this.geocoder.startup();
            this.set("loaded", true);
            this.emit("load", {});
        },
        _updateThemeWatch: function(attr, oldVal, newVal) {
            if (this.get("loaded")) {
                domClass.remove(this.domNode, oldVal);
                domClass.add(this.domNode, newVal);
            }
        }
    });
    if (has("extend-esri")) {
        lang.setObject("dijit.GeocoderButton", Widget, esriNS);
    }
    return Widget;
});