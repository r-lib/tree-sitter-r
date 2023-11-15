import r from "./bindings/node/index.js";
import { default as Parser } from "tree-sitter";

const parser = new Parser();
parser.setLanguage(r);
