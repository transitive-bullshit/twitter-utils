# twitter-utils <!-- omit from toc -->

> Twitter / tweet utils that I find myself reusing often.

<p>
  <a href="https://www.npmjs.com/package/twitter-utils"><img alt="NPM" src="https://img.shields.io/npm/v/twitter-utils.svg" /></a>
  <a href="https://github.com/transitive-bullshit/twitter-utils/actions/workflows/test.yml"><img alt="Build Status" src="https://github.com/transitive-bullshit/twitter-utils/actions/workflows/main.yml/badge.svg" /></a>
  <a href="https://github.com/transitive-bullshit/twitter-utils/blob/main/license"><img alt="MIT License" src="https://img.shields.io/badge/license-MIT-blue" /></a>
  <a href="https://prettier.io"><img alt="Prettier Code Formatting" src="https://img.shields.io/badge/code_style-prettier-brightgreen.svg" /></a>
</p>

## Install

```bash
npm install twitter-utils
```

## Usage

```ts
import {
  getTweetUrl,
  maxTwitterId,
  minTwitterId,
  sanitizeTweetText,
  stripUserMentions
} from 'twitter-utils'

// This can be a really long tweet with diff URLs and it will truncate the text
// intelligently while preserving URLs
const tweetText = sanitizeTweetText(
  'Lorem ipsum dolor sit amet, https://dexa.ai consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum https://transitivebullsh.it/about'
)
// tweetText = 'Lorem ipsum dolor sit amet, https://dexa.ai consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequa... https://transitivebullsh.it/about'

const tweetUrl = getTweetUrl({
  username: 'transitive_bs',
  id: '1643017583917174784'
})
// tweetUrl = 'https://twitter.com/transitive_bs/status/1643017583917174784'

const id0 = minTwitterId('1759532018956656921', '1733299213503787018')
// id0 = '1733299213503787018'
const id1 = maxTwitterId('1726313076444795273', undefined)
// id1 = '1726313076444795273'

const text = stripUserMentions('hey @transitive_bs ')
// text = 'hey'
```

## License

MIT © [Travis Fischer](https://transitivebullsh.it)

If you found this project interesting, please consider [sponsoring me](https://github.com/sponsors/transitive-bullshit) or <a href="https://twitter.com/transitive_bs">following me on twitter <img src="https://storage.googleapis.com/saasify-assets/twitter-logo.svg" alt="twitter" height="24px" align="center"></a>
