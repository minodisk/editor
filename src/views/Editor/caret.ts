// Borrows from react-contenteditable
// https://github.com/lovasoa/react-contenteditable/blob/ecd3656cc534b1351e59eeefd33cada1c5abd3c8/src/react-contenteditable.tsx#L19-L33

export function replaceCaret(el: HTMLElement) {
  // Place the caret at the end of the element
  const target = findLastTextNode(el)
  // do not move caret if element was not focused
  const isTargetFocused = document.activeElement === el
  if (target !== null && target.nodeValue !== null && isTargetFocused) {
    const range = document.createRange()
    const sel = window.getSelection()
    range.setStart(target, target.nodeValue.length)
    range.collapse(true)
    sel.removeAllRanges()
    sel.addRange(range)
    if (el instanceof HTMLElement) el.focus()
  }
}

function findLastTextNode(node: Node): Node | null {
  if (node.nodeType === Node.TEXT_NODE) {
    return node
  }
  const children = node.childNodes
  for (let i = children.length - 1; i >= 0; i--) {
    const textNode = findLastTextNode(children[i])
    if (textNode !== null) {
      return textNode
    }
  }
  return null
}

