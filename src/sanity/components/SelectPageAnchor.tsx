import {useEffect, useState} from 'react'
import {StringInputProps, TitledListValue} from 'sanity'
import {useFormValue} from 'sanity'

import {useSanityClient} from '../client'

const SelectPageAnchor = (props: StringInputProps) => {
  const client = useSanityClient()
  const pageRef = useFormValue([...props.path.slice(0, -1), 'page', '_ref']) as string | undefined
  const [anchors, setAnchors] = useState<TitledListValue<string>[]>([])

  useEffect(() => {
    ;(async () => {
      const page = pageRef ? await client.getDocument<{components: any[]}>(pageRef) : undefined

      setAnchors(
        page?.components
          .filter(({componentId}) => !!componentId?.current)
          .map((component) => ({
            title: `${component.title} (${component.componentId.current})`,
            value: component.componentId.current,
          })) || []
      )
    })()
  }, [client, pageRef])

  return props.renderDefault({
    ...props,
    schemaType: {...props.schemaType, options: {...props.schemaType.options, list: anchors}},
  })
}

export default SelectPageAnchor
