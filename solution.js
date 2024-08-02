function getComponents(input) {
  function parseComponents(str) {
    const result = [];
    const stack = [];
    const regex = /(<\/?[a-zA-Z]+>)/g;
    let current = null;
    let lastIndex = 0;

    function processText(text) {
      if (current) {
        current.value.push(text);
      }
    }

    let match;
    while ((match = regex.exec(str)) !== null) {
      const tag = match[1];
      const index = match.index;

      if (index > lastIndex) {
        // Text between tags
        processText(str.slice(lastIndex, index));
      }

      if (tag[1] !== '/') {
        // Opening tag
        const newComponent = { key: tag.slice(1, -1), value: [] };
        if (current) {
          current.value.push(newComponent);
        } else {
          result.push(newComponent);
        }
        stack.push(current);
        current = newComponent;
      } else {
        // Closing tag
        const tagName = tag.slice(2, -1);
        if (current && current.key === tagName) {
          current = stack.pop();
        } else {
          // Invalid nesting or unmatched tag, continue parsing but invalidate the structure
          current = null;
          break;
        }
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < str.length) {
      // Text after the last tag
      processText(str.slice(lastIndex));
    }

    if (stack.length > 0) {
      // There are unmatched tags
      return [];
    }

    function cleanUp(parsed) {
      return parsed.map(item => {
        if (typeof item === 'object' && Array.isArray(item.value)) {
          item.value = cleanUp(item.value);
          if (item.value.length === 1 && typeof item.value[0] === 'string') {
            item.value = item.value[0];
          }
        }
        return item;
      }).filter(item => {
        if (typeof item === 'string') {
          return item.trim().length > 0;
        }
        return true;
      });
    }

    return cleanUp(result);
  }

  return parseComponents(input);
}
