import {formatBody} from './formatBody.js'
import {formatHeader} from './formatHeader.js'
import {formatPostFormat} from './formatPostFormat.js'

export async function format(newsletter) {
  const header = formatHeader(newsletter)
  const body = formatPostFormat(await formatBody(newsletter)) 
   return header + body 
}
