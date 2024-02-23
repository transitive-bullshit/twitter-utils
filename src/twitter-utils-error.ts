export type TwitterUtilsErrorType = 'empty-tweet' | 'invalid-tweet'

export class TwitterUtilsError extends Error {
  type: TwitterUtilsErrorType

  constructor(
    message: string,
    {
      type,
      ...opts
    }: ErrorOptions & {
      type: TwitterUtilsErrorType
    }
  ) {
    super(message, opts)

    this.type = type
  }
}
