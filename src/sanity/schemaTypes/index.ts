import { type SchemaTypeDefinition } from 'sanity'

// Blog
import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'

// Restaurant
import {menuItemSchema} from '../schemas/menuItem'
import {dailySpecialSchema} from '../schemas/dailySpecial'
import {menuFormuleSchema} from '../schemas/menuFormule'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Blog
    blockContentType,
    categoryType,
    postType,
    authorType,
    // Restaurant
    menuItemSchema,
    dailySpecialSchema,
    menuFormuleSchema,
  ],
}
