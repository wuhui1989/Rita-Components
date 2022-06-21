
import React from 'react'
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)
import BasicPagination from './packages/pagination/__example__/Basic-pagination'
import PdfReaderExample from './packages/pdfReader/__example__/Basic-pdfReader'
import VideoLearnerExample from './packages/videoLearner/__example__/Basic-videoReader'

import './style/index.scss'
ReactDOM.render(
  <>
  <VideoLearnerExample />
  {/* <BasicPagination /> */}
    {/* <PdfReaderExample/> */}
  </>,
  document.getElementById('root')
)
