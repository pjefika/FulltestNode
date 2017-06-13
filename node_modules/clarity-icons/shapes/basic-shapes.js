"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/* TODO: BasicShapes is deprecated and will be removed in 0.9.0 */
var essential_shapes_1 = require("./essential-shapes");
exports.BasicShapes = essential_shapes_1.essentialShapes;
if (typeof window !== "undefined" && window.hasOwnProperty("ClarityIcons")) {
    window["ClarityIcons"].add(essential_shapes_1.essentialShapes);
}
