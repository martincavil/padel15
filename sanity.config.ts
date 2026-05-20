// sanity.config.ts — configuration du Studio Sanity monté sur /studio
// Note: structureTool (sanity/structure) retiré car il importe useEffectEvent
// qui n'est pas dans React 19 stable, cassant le build Next.js.
// Le Studio fonctionne avec la structure par défaut. Réactiver structureTool
// quand Sanity publiera une version compatible React 19.

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'

import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schemaTypes'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
