import { defineBuildConfig } from 'obuild/config'

export default defineBuildConfig({
  entries: [
    {
      type: 'bundle',
      input: ['./src/index.ts'],
    },
    {
      type: 'bundle',
      input: ['./src/hast.ts'],
    },
    {
      type: 'bundle',
      input: ['./src/stringify.ts'],
    },
  ],
})
