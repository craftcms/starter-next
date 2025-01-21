import { createPage } from '../lib/createPage'
import { HOME_QUERY } from '../queries/home'

export const dynamic = 'force-static'
export const revalidate = 3600

export default createPage(HOME_QUERY)