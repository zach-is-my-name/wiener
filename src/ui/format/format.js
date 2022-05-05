import {formatBody} from './formatBody.js'
import {formatHeader} from './formatHeader.js'
import {formatPostFormat} from './formatPostFormat.js'

export function format(newsletter) {
  const header = formatHeader(newsletter)
  const body = formatPostFormat(formatBody(newsletter)) 
  return header + body 
}
