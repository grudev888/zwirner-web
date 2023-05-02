import {useMemo,useState} from 'react'
import {
  IntentButton,
  Preview,
  SanityDocument,
  SchemaType,
  useSchema,
  WithReferringDocuments,
} from 'sanity'
import {UserViewComponent} from 'sanity/desk'

import styles from './overrides.module.css'

type ReferenceListProps = {
  referringDocuments: SanityDocument[]
}
type ListButtonProps = {
  document: SanityDocument
  schemaType: SchemaType
}
type ReferenceItem = {
  title: string
  data: Array<SanityDocument>
}
type DataReferenceShape = {
  overrides: ReferenceItem
  contentReferences: ReferenceItem
}

function ListButton({document, schemaType}: ListButtonProps) {
  const [hover, setHover] = useState(false)
  return (
    <IntentButton
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
      style={{
        backgroundColor: 'white',
        width: '100%',
        border: '1px solid #E8E8E8',
        color: 'black',
        ...(hover
          ? {
              backgroundColor: '#E8E8E8',
            }
          : null),
      }}
      intent="edit"
      params={{id: document._id, type: document._type}}
    >
      <Preview value={document} schemaType={schemaType} />
    </IntentButton>
  )
}

function ReferencesList({referringDocuments}: ReferenceListProps) {
  const schema = useSchema()
  const referencesByType = useMemo(() => {
    return referringDocuments.reduce(
      (prev: DataReferenceShape, doc: SanityDocument) => {
        const prevCopy = {...prev}
        const {_type, components} = doc ?? {}
        const isPage = ['artistPage', 'exhibitionPage'].includes(_type)
        if (isPage && Array.isArray(components) && components.length) {
          const overrideEnables = components.filter((cmp) => !!cmp.enableOverrides)
          if (overrideEnables.length) {
            prevCopy.overrides.data.push(doc)
            return prevCopy
          }
        }
        prevCopy.contentReferences.data.push(doc)
        return prevCopy
      },
      {
        overrides: {title: 'Overrides', data: []},
        contentReferences: {title: 'Content References', data: []},
      }
    )
  }, [referringDocuments])

  return (
    <div>
      {Object.entries(referencesByType).map((listItem) => {
        const [_, section] = listItem
        const {title, data} = section ?? {}
        if (title && Array.isArray(data) && data.length) {
          return (
            <div key={`section-${title}`}>
              <h2 className={styles.title}>{title}</h2>
              <ul className={styles.sectionContainer}>
                {data.map((document) => {
                  if (!document) return null
                  const schemaType = schema.get(document._type)
                  if (!schemaType) return null
                  return (
                    <li key={document._id}>
                      <ListButton document={document} schemaType={schemaType} />
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        }
        return null
      })}
    </div>
  )
}

export const ReferenceByTab: UserViewComponent = (props) => {
  return (
    <div className={styles.mainContainer}>
      <WithReferringDocuments id={props.documentId}>
        {({referringDocuments, isLoading}) => {
          if (isLoading) {
            return <div className={styles.loadingState}>Looking for referring documents...</div>
          }

          if (!referringDocuments.length) return <></>

          return <ReferencesList referringDocuments={referringDocuments} />
        }}
      </WithReferringDocuments>
    </div>
  )
}
