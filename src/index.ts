export const create = (el: HTMLElement) => {
  el.setAttribute('contenteditable', 'true')
  document.addEventListener('selectionchange', onSelectionChanged)
}

const onSelectionChanged = (e: Event) => {
  const selection = document.getSelection()
  if (selection == null) {
    return
  }
  const range = selection.getRangeAt(0)
  if (range.startOffset === range.endOffset) {
    return
  }
  const clientRect = range.getBoundingClientRect()
  console.log('selectionChanged:', range, clientRect)
}
