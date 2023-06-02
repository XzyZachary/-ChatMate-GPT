export * from './constants'

import LocalPromptShortcuts from './prompt/prompts.json'

export const config = {
  // 引导词更新频率（秒）
  promptUpdateInterval: 60 * 60 * 24,
  LocalPromptShortcuts
}
