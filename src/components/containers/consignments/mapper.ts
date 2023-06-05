import {
  countries,
  EDITORIAL_TEXT_TYPES,
  EDITORIAL_TYPES,
  FORM_FIELD_TYPES,
  hasStringValue,
  INTERSTITIAL_TEXT_COLORS,
  isEmail,
  isPhoneNumber,
  MEDIA_TYPES,
} from '@zwirner/design-system'

import {builder} from '@/sanity/imageBuilder'

export const headerImageMap = (data: any) => {
  const {image} = data ?? {}
  const {asset, alt} = image ?? {}
  const imgSrc = asset ? builder.image(asset).url() : ''
  return {
    type: MEDIA_TYPES.IMAGE,
    imgProps: {
      url: '/',
      src: imgSrc,
      alt: alt,
    },
  }
}

export const editorialSectionMap = (data: any) => {
  const {content, title} = data ?? {}
  return {
    data: {
      reverse: false,
      paragraphs: [
        {
          type: EDITORIAL_TEXT_TYPES.QUOTE,
          text: title,
        },
        {
          type: EDITORIAL_TEXT_TYPES.PARAGRAPH,
          text: content,
        },
      ],
    },
    type: EDITORIAL_TYPES.COMPLEX,
  }
}

export const formSectionMap = (data: any) => {
  const {image} = data ?? {}
  const {asset, alt} = image ?? {}
  const imgSrc = asset ? builder.image(asset).url() : ''
  return {
    steps: [
      {
        id: '1',
        formName: 'form-step-1',
        title: 'Share Your Details',
        primarySubtitle:
          'Kindly share your contact and artwork details here, and our team will connect with you shortly',
        secondarySubtitle: 'All fields marked “*” are required.',
        formSections: [
          {
            id: '1a',
            fields: [
              {
                title: 'First Name',
                required: true,
                type: FORM_FIELD_TYPES.INPUT,
                span: 6,
                data: {
                  validator: hasStringValue,
                  errorMsg: 'First Name is required.',
                },
              },
              {
                title: 'Last Name',
                required: true,
                type: FORM_FIELD_TYPES.INPUT,
                span: 6,
                data: {
                  validator: hasStringValue,
                  errorMsg: 'Last Name is required.',
                },
              },
              {
                title: 'Email Address',
                required: true,
                type: FORM_FIELD_TYPES.INPUT,
                span: 6,
                data: {
                  type: 'email',
                  validator: isEmail,
                  errorMsg: 'Please enter a valid email address.',
                },
              },
              {
                title: 'Phone Number',
                required: false,
                type: FORM_FIELD_TYPES.INPUT,
                span: 6,
                data: {
                  type: 'tel',
                  validator: isPhoneNumber,
                  errorMsg: 'Invalid phone format',
                },
              },
            ],
          },
        ],
        CTAProps: {
          text: 'Next: Artwork Details',
          showRightArrow: true,
        },
      },
      {
        id: '2',
        formName: 'form-step-2',
        title: 'Artwork Details',
        primarySubtitle:
          'Please provide as much information as possible. Unfortunately, we cannot accept submissions by artists of their own work.',
        formSections: [
          {
            id: '2a',
            fields: [
              {
                title: 'Artist Name',
                required: true,
                type: FORM_FIELD_TYPES.INPUT,
                span: 6,
                data: {
                  validator: hasStringValue,
                  errorMsg: 'Artist Name is required.',
                },
              },
              {
                title: 'Title',
                required: true,
                type: FORM_FIELD_TYPES.INPUT,
                span: 6,
                data: {
                  validator: hasStringValue,
                  errorMsg: 'Title is required.',
                },
              },
              {
                title: 'Year',
                required: true,
                type: FORM_FIELD_TYPES.INPUT,
                span: 6,
                data: {
                  type: 'string',
                  validator: hasStringValue,
                  errorMsg: 'Year is required.',
                },
              },
              {
                title: 'Medium',
                required: true,
                type: FORM_FIELD_TYPES.INPUT,
                span: 6,
                data: {
                  type: 'string',
                  validator: hasStringValue,
                  errorMsg: 'Medium is required.',
                },
              },
            ],
          },
          {
            id: '3a',
            sectionTitle: 'Location of Artwork',
            fields: [
              {
                required: true,
                type: FORM_FIELD_TYPES.SELECT,
                data: {
                  options: countries,
                },
                span: 12,
              },
              {
                title: 'Width',
                required: false,
                type: FORM_FIELD_TYPES.INPUT,
                span: 2,
              },
              {
                title: 'Height',
                required: false,
                type: FORM_FIELD_TYPES.INPUT,
                span: 2,
              },
              {
                title: 'Depth',
                required: false,
                type: FORM_FIELD_TYPES.INPUT,
                span: 2,
              },
              {
                required: true,
                type: FORM_FIELD_TYPES.SELECT,
                span: 6,
                data: {
                  options: [
                    {title: 'In', value: 'in'},
                    {title: 'Cm', value: 'cm'},
                  ],
                },
              },
            ],
          },
        ],
        CTAProps: {
          text: 'Next: Additional Details',
          showRightArrow: true,
        },
      },
      {
        id: '3',
        formName: 'form-step-3',
        title: 'Additional Details (optional)',
        primarySubtitle: 'Please provide any additional information you would like to share.',
        formSections: [
          {
            id: '4a',
            fields: [
              {
                title: 'Signatures, inscriptions, labels',
                required: false,
                type: FORM_FIELD_TYPES.INPUT,
                span: 12,
              },
              {
                title: 'Provenance, exhibitions, literature',
                required: false,
                type: FORM_FIELD_TYPES.INPUT,
                span: 12,
              },
              {
                title: 'Link to artwork, if available',
                required: false,
                type: FORM_FIELD_TYPES.INPUT,
                span: 12,
              },
              {
                title: 'Additional comments',
                required: false,
                type: FORM_FIELD_TYPES.INPUT,
                span: 12,
              },
            ],
          },
        ],
        CTAProps: {
          text: 'Next: Upload Files',
          showRightArrow: true,
        },
      },
      {
        id: '4',
        formName: 'form-step-4',
        title: 'Upload Files',
        secondarySubtitle:
          'Please upload up to three images of your artwork including any related files such as invoices, certificates of authenticity and/or previous valuation statements in JPG, PNG or PDF format. Each file must not exceed 10MB.',
        formSections: [
          {
            id: '5a',
            fields: [
              {
                required: true,
                type: FORM_FIELD_TYPES.UPLOADER,
                span: 9,
              },
            ],
          },
        ],
        CTAProps: {
          text: 'Submit Artwork',
          type: 'submit',
        },
      },
    ],
    mediaProps: {
      type: MEDIA_TYPES.IMAGE,
      imgProps: {
        src: imgSrc,
        alt,
      },
    },
  }
}

export const featuredMediaMap = (data: any) => {
  const {image} = data ?? {}
  const {asset, alt} = image ?? {}
  const imgSrc = asset ? builder.image(asset).url() : ''
  return {
    type: MEDIA_TYPES.IMAGE,
    imgProps: {
      url: '/',
      src: imgSrc,
      alt: alt,
    },
  }
}

export const interstitialMap = (data: any) => {
  const {title} = data ?? {}
  return {
    data: {
      split: false,
      title,
      primaryCta: {
        text: 'Talk to Us',
      },
      textColor: INTERSTITIAL_TEXT_COLORS.BLACK,
    },
  }
}

export const bodyDataMap = (data: any) => {
  return data
    ?.filter((subSection: any) => {
      const {image} = subSection ?? {}
      const {asset} = image ?? {}
      return !!asset
    })
    ?.map((subSection: any, key: number) => {
      const {image, text} = subSection ?? {}
      const {title, content} = text ?? {}
      const {asset, alt} = image ?? {}
      const imgSrc = asset ? builder.image(asset).url() : ''

      return {
        id: `${title}-${key}`,
        mediaProps: {
          type: MEDIA_TYPES.IMAGE,
          imgProps: {
            url: '/',
            src: imgSrc,
            alt: alt,
          },
        },
        editorialProps: {
          data: {
            reverse: false,
            paragraphs: [
              {
                type: EDITORIAL_TEXT_TYPES.QUOTE,
                text: title,
              },
              {
                type: EDITORIAL_TEXT_TYPES.PARAGRAPH,
                text: content,
              },
            ],
          },
          type: EDITORIAL_TYPES.COMPLEX,
        },
      }
    })
}

export const mapCarouselCards = (data: any) => {
  return data
    ?.filter((artist: any) => {
      const {picture} = artist ?? {}
      const {asset} = picture ?? {}
      return !!asset
    })
    ?.map((artist: any) => {
      const {fullName, _id, picture} = artist ?? {}
      const {asset, alt} = picture ?? {}
      const imgSrc = asset ? builder.image(asset).url() : ''
      return {
        id: _id,
        media: {
          type: 'image',
          imgProps: {
            src: imgSrc,
            alt,
          },
        },
        title: fullName,
      }
    })
}

export const mapFooterInterstitial = (data: any) => {
  const {title} = data ?? {}
  return {
    data: {
      split: false,
      title,
      primaryCta: {
        text: 'Get in Touch',
      },
      textColor: INTERSTITIAL_TEXT_COLORS.BLACK,
    },
  }
}
