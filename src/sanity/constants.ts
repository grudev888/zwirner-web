// This is the document id used for the preview secret that's stored in your dataset.
// The secret protects against unauthorized access to your draft content and have a lifetime of 60 minutes, to protect against bruteforcing.
export const previewSecretId: `${string}.${string}` = 'preview.secret'

// Amount of elements returned when generating paths when building pages
// Development environments will have a limit to boost build times
export const DEV_GROQ_BUILD_LIMIT = '[0..100]'
