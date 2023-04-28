import {visionTool} from '@sanity/vision'
import {Config, defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {availability} from 'sanity-plugin-availability'

import {Logo} from '@/components/wrappers/DzLogoWrapper'
import {generalStructure} from '@/sanity/lib/desk/structure/structure'

import {schema} from './src/sanity'
import {dataset, projectId} from './src/sanity/env'

export default defineConfig<Config>({
  basePath: '/studio',
  dataset,
  projectId,
  schema,
  title: 'Zwirner Gallery Website',
  plugins: [deskTool({ structure: generalStructure,}), visionTool(), availability()],
  studio: {
    components: {
      logo: Logo,
    },
  },
})
