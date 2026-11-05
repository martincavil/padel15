import type { Config } from "prismic-ts-codegen";

/** Types TypeScript générés à partir des modèles du code : `npm run prismic:types`. */
const config: Config = {
  output: "./src/prismicio-types.d.ts",
  models: ["./customtypes/**/index.json", "./src/slices/**/model.json"],
};

export default config;
