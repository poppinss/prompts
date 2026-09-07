/*
 * @poppinss/prompts
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Shape of a mapped choice passed through the builder
 */
export type InternalChoice = {
  name: string
  message?: string
  hint?: string
  disabled?: boolean
  value?: string
}

/**
 * Common fields shared by all prompt option objects
 */
type BaseOptions = {
  name: string
  message: string
  signal?: AbortSignal
  validate?: (...args: any[]) => any
  result?: (value: any) => any
  format?: (value: any) => any
}

type TextOptions = BaseOptions & {
  type: 'input'
  hint?: string
  initial?: string
}

type PasswordOptions = BaseOptions & {
  type: 'password'
  mask?: string
  initial?: string
}

type ListOptions = BaseOptions & {
  type: 'list'
  hint?: string
  initial?: string
  sep: string
}

type ConfirmOptions = BaseOptions & {
  type: 'confirm'
  hint?: string
  initial?: boolean
}

type ToggleOptions = BaseOptions & {
  type: 'toggle'
  hint?: string
  initial?: boolean
  enabled: string
  disabled: string
}

type SelectOptions = BaseOptions & {
  type: 'select'
  hint?: string
  initial?: string | number
  maxItems?: number
  choices: InternalChoice[]
}

type MultiSelectOptions = BaseOptions & {
  type: 'multiselect'
  hint?: string
  initial?: (string | number)[]
  maxItems?: number
  choices: InternalChoice[]
}

type AutocompleteOptions = BaseOptions & {
  type: 'autocomplete'
  hint?: string
  initial?: number | string
  multiple?: boolean
  limit?: number
  footer?: () => string
  choices: (string | InternalChoice)[]
}

type SelectKeyOptions = BaseOptions & {
  type: 'select-key'
  choices: InternalChoice[]
}

type GroupMultiSelectOptions = BaseOptions & {
  type: 'group-multiselect'
  hint?: string
  initial?: string[]
  selectableGroups?: boolean
  groups: Record<string, InternalChoice[]>
}

type PathOptions = BaseOptions & {
  type: 'path'
  initial?: string
  root?: string
  onlyDirectories?: boolean
}

/**
 * Discriminated union of all internal prompt options
 */
export type InternalPromptOptions =
  | TextOptions
  | PasswordOptions
  | ListOptions
  | ConfirmOptions
  | ToggleOptions
  | SelectOptions
  | MultiSelectOptions
  | AutocompleteOptions
  | SelectKeyOptions
  | GroupMultiSelectOptions
  | PathOptions
