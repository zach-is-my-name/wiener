import { formatBody } from './formatBody.js';
import { formatHeader } from './formatHeader.js';
import { formatPostFormat } from './formatPostFormat.js';
export function format(newsletter) {
  var header = formatHeader(newsletter);
  var body = formatPostFormat(formatBody(newsletter));
  return header + body;
}