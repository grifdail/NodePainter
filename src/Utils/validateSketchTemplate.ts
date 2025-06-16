import Ajv, { JSONSchemaType } from "ajv";

import { SketchTemplate } from "../Types/SketchTemplate";
import schemaJSON from "../schema/sketch_template.json";

const ajv = new Ajv();

export const validateTemplateJson = ajv.compile(schemaJSON as any as JSONSchemaType<SketchTemplate>);

export function validateSketchTemplate() {}
