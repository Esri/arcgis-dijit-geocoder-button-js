# arcgis-dijit-geocoder-button-js

## Features
A simple dijit button to show/hide the ArcGIS Geocoder Dijit.

![App](https://raw.github.com/driskull/arcgis-dijit-geocoder-button-js/master/images/demo.png)

[View Demo](http://driskull.github.com/arcgis-dijit-geocoder-button-js/)

## Instructions

Basic use

    var myWidget = new geocoderButton({
        map: myMap,
    }, "geocoderButton");
    myWidget.startup();
    
All options
    
     var myWidget = new geocoderButton({
        map: myMap,
        theme: "geocoderButton", // custom theme to style yourself
        open: false, // start closed by default
        visible: true, // show widget
        geocoderOptions: { // options for the geocoder widget.
            autoComplete: true
        }
    }, "geocoderButton");
    myWidget.startup();
    

 [New to Github? Get started here.](https://github.com/)

## Requirements

* Notepad or HTML editor
* A little background with Javascript
* Experience with the [ArcGIS Javascript API](http://www.esri.com/) would help.

## Resources

* [ArcGIS for JavaScript API Resource Center](http://help.arcgis.com/en/webapi/javascript/arcgis/index.html)
* [ArcGIS Blog](http://blogs.esri.com/esri/arcgis/)
* [twitter@esri](http://twitter.com/esri)

## Issues

Find a bug or want to request a new feature?  Please let us know by submitting an issue.

## Contributing

Anyone and everyone is welcome to contribute.

## Licensing
Copyright 2012 Esri

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

A copy of the license is available in the repository's [license.txt](https://raw.github.com/Esri/geocoder-search-widget-js/master/license.txt) file.

[](Esri Tags: ArcGIS JavaScript API Dijit module swipe Widget Public swipemap LayerSwipe)
[](Esri Language: JavaScript)