function replaceTextContent(node: Node): void {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node as Text;
    const content = text.textContent || '';
    if (content.match(/\b[Ee]lection\b/)) {
      console.log('content', content);
      text.textContent = content.replace(/\b[Ee]lection\b/g, match => 
        match.charAt(0) === 'E' ? 'Erection' : 'erection'
      );
    }
  } else {
    node.childNodes.forEach(replaceTextContent);
  }
}

function handleMutations(mutations: MutationRecord[]): void {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => replaceTextContent(node));
  });
}

replaceTextContent(document.body);

const observer = new MutationObserver(handleMutations);

observer.observe(document.body, {
  childList: true,
  subtree: true
});
