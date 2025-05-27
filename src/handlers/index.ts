import { code } from './code'
import { pre } from './pre'
import { hr } from './hr'
import { heading } from './heading'
import { p } from './p'
import { a } from './a'
import { ul } from './ul'
import { ol } from './ol'
import { li } from './li'
import { html } from './html'
import { strong } from './strong'
import { emphesis } from './emphesis'
import { blockquote } from './blockquote'
import { img } from './img'
import { del } from './del'
import { mdc } from './mdc'

export const handlers = {
  code,
  pre,
  hr,
  h1: heading,
  h2: heading,
  h3: heading,
  h4: heading,
  h5: heading,
  h6: heading,
  p,
  a,
  ul,
  ol,
  li,
  html,
  strong,
  em: emphesis,
  blockquote,
  img,
  del,
  mdc
}