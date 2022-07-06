import './style/index.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

export { default as KPagination } from '@/packages/pagination'
export type { PaginationProps } from '@/packages/pagination'


export { default as PdfReader } from '@/packages/pdfReader'
export type { PdfReaderProps } from '@/packages/pdfReader'

export { default as VideoLearner} from '@/packages/videoLearner'
export type {VideoLearnIProps} from '@/packages/videoLearner'