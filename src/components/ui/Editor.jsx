import { useState } from 'react'
import { createReactEditorJS } from 'react-editor-js'
import Embed from '@editorjs/embed'
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import CheckList from '@editorjs/checklist'
import SimpleImage from '@editorjs/simple-image'


export const EDITOR_JS_TOOLS = {
    embed: Embed,
    paragraph: Paragraph,
    list: List,
    linkTool: LinkTool,
    image: Image,
    header: Header,
    quote: Quote,
    checklist: CheckList,
    simpleImage: SimpleImage,
}

const ReactEditorJS = createReactEditorJS()

export default function Editor() {

    const [blocks, setBlocks] = useState('')

  return (
    <ReactEditorJS defaultValue={blocks} tools={EDITOR_JS_TOOLS} onChange={setBlocks}/>
  )
}
