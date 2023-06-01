/**
 * Created by Leon<silenceace@gmail.com> at 2023-03-14.
 */

import dayjs from 'dayjs'

// export default BugSnag
const logStart = (level = 'info') =>
  dayjs(new Date()).format(
    `[Time:] YYYY-MM-DDTHH:mm:ssZ[Z], [Level:${level.toUpperCase()}], [message:]`
  )
export const logError = (error: any) => {
  console.error(`${logStart()}`, ...error)
}
export const logInfo = (...info: any[]) => {
  const hasError = info.some((item) => item instanceof Error)
  console.log(`${logStart(hasError ? 'error' : 'info')}`, ...info)
  // if (hasError) {
  //   console.error(`${logStart('error')}`, ...info)
  // } else {
  //   console.log(`${logStart('info')}`, ...info)
  // }
}
