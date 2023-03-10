import {visionTool} from '@sanity/vision'
import {Config, defineConfig} from 'sanity'
import {availability} from 'sanity-plugin-availability'

import {schema, singletons} from './src/sanity'
import {dataset, projectId} from './src/sanity/env'
import {deskTool} from './src/sanity/lib/desk'

export default defineConfig<Config>({
  basePath: '/studio',
  dataset,
  projectId,
  schema,
  title: 'Zwirner Gallery Website',
  plugins: [deskTool(singletons), visionTool(), availability()],
})
