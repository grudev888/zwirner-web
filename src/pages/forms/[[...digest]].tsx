import {
  DzButton,
  DzCheckbox,
  DzColumn,
  DzInput,
  DzInputGroups,
  DzInputText,
  DzLink,
  DzTitle,
  INPUT_GROUP_TYPES,
  TITLE_SIZES,
  TITLE_TYPES,
} from '@zwirner/design-system'
import axios from 'axios'
import {useRouter} from 'next/router'
import {useReCaptcha} from 'next-recaptcha-v3'
import {useCallback, useEffect, useState} from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import {v4 as uuid} from 'uuid'

import {useForms as useFormsAPI} from '@/forms/api/useForms'
import { useLocation } from '@/forms/api/useLocation'
import {IFormInput, ILocation} from '@/forms/types'
import {EMAIL_REGEX} from '@/forms/utils'

const Forms = () => {
  const router = useRouter()
  const digest = router.query.digest?.[0]

  const {data: location} = useLocation()

  const {data, addOrUpdate, getEmailToken, isLoading, error} = useFormsAPI({digest})

  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<IFormInput>()

  const {executeRecaptcha} = useReCaptcha()

  const [formId, _] = useState(uuid())
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    if (data?.interests) {
      const availableInterests = data.interests.map(({id}: {id: string}) => id)
      const selectedInterests = Object.keys(data.user?.interests || {}).filter(
        (i) => availableInterests.includes(i) && data.user?.interests?.[i] === true
      )

      setValue('interests', data.user?.interests ? selectedInterests : availableInterests)
    }

    if (data?.payload) {
      setValue('email', data.payload.email)
    }

    if (data?.user?.firstName) {
      setValue('firstName', data.user?.firstName)
    }

    if (data?.user?.lastName) {
      setValue('lastName', data.user?.lastName)
    }
  }, [data, setValue])

  const onSubmit: SubmitHandler<IFormInput> = useCallback(
    async (formData) => {
      try {
        const token = await executeRecaptcha('form_submit')

        await addOrUpdate(
          {
            ...formData,
            interests: {
              ...data?.interests?.reduce(
                (prev: {}, {id}: {id: string}) => ({...prev, [id]: false}),
                {}
              ),
              ...formData.interests.reduce((prev, i) => ({...prev, [i]: true}), {}),
            },
            location: location as ILocation
          },
          token,
          digest
        )

        alert('Thanks for your subscription')
      } catch (error: Error | any) {
        let msg = 'An error has happened. Try again in some minutes'

        if (axios.isAxiosError(error) && error?.response?.data?.errors) {
          msg = error.response.data.errors
        }

        alert(msg)

        if (msg === 'Email already submitted') {
          const {token} = await getEmailToken(formData.email)
          setToken(token)
        }
      }
    },
    [addOrUpdate, data?.interests, digest, executeRecaptcha, getEmailToken]
  )

  if (isLoading || error) return null

  return (
    <DzColumn span={12}>
      <form className="flex flex-col gap-3 p-8" onSubmit={handleSubmit(onSubmit)}>
        <DzTitle
          classNameTitle="mb-5"
          title="Email newsletter subscription"
          titleType={TITLE_TYPES.H1}
          titleSize={TITLE_SIZES.LG}
        />

        <DzInput value={formId} hidden {...register('formId', {required: true})} />

        <DzInput
          value={window?.location.href}
          hidden
          {...register('currentUrl', {required: true})}
        />

        <DzInputText
          className="mb-5"
          title="Email"
          placeholder="Enter your email address here"
          errorMsg={errors?.email?.message}
          hasError={!!errors?.email?.message}
          disabled={!!data?.payload?.email}
          {...register('email', {
            required: 'Please enter your email address',
            pattern: {value: EMAIL_REGEX, message: 'This email address is not valid'},
          })}
        />

        <DzInputText
          className="mb-5"
          title="First name"
          placeholder="Enter your first name"
          errorMsg={errors?.firstName?.message}
          hasError={!!errors?.firstName?.message}
          {...register('firstName', {required: 'Please enter your first name'})}
        />

        <DzInputText
          className="mb-5"
          title="Last name"
          placeholder="Enter your last name"
          errorMsg={errors?.lastName?.message}
          hasError={!!errors?.lastName?.message}
          {...register('lastName', {required: 'Please enter your last name'})}
        />

        <DzInputGroups
          title="Available newsletters"
          type={INPUT_GROUP_TYPES.CHECKBOX}
          errorMsg={errors?.interests?.message}
          hasError={!!errors?.interests?.message}
          items={data?.interests?.map((opt: any) => ({
            id: opt.id,
            title: opt.name,
            value: opt.id,
            ...register('interests', {required: 'Please choose at least one group'}),
          }))}
        />

        {!data?.payload?.email && (
          <DzCheckbox
            className="mt-3"
            title="I have read and agree to the Terms"
            value="true"
            hasError={!!errors.terms?.message}
            {...register('terms', {required: 'Please accept the terms and conditions'})}
          />
        )}

        {token && (
          <DzLink href={`/forms/${token}`}>
            You are already registered in our newsletter.{' '}
            <strong>Click here to update your preferences</strong>.
          </DzLink>
        )}

        <DzButton className="mt-5 w-full" type="submit">
          {data?.payload?.email ? 'Update preferences' : 'Submit'}
        </DzButton>
      </form>
    </DzColumn>
  )
}

export default Forms
