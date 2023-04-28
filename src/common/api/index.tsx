import axios, {AxiosRequestConfig} from 'axios'
import {ReactNode, useMemo} from 'react'
import {SWRConfig} from 'swr'

export const client = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

const fetcher = (input: string, config?: AxiosRequestConfig) =>
  client.get(input, config).then((res) => res.data)

const globalConfig = () => ({
  fetcher,
  shouldRetryOnError: false,
  revalidateOnFocus: false,
  onError: (err: any) => {
    console.error(err)
  },
})

export const APIProvider = ({children}: {children: ReactNode}) => {
  const config = useMemo(() => globalConfig(), [])

  return <SWRConfig value={config}>{children}</SWRConfig>
}
