// Simplified Tree-sitter R playground implementation
// Based on the tree-sitter playground but focused only on R language

(function() {
  // DOM elements we'll use
  let codeEditor, tree, codeContainer, treeContainer, queryContainer, queryEditor;
  // Libraries we depend on
  let CodeMirror, TreeSitter, Clusterize;
  // The tree-sitter objects we'll use
  let parser, rLanguage;

  // Wait for page to load then initialize the playground
  document.addEventListener('DOMContentLoaded', async function() {
    // Wait until all required libraries are loaded
    await initializeLibraries();
    
    // Get the DOM elements
    codeContainer = document.getElementById('code-container');
    treeContainer = document.getElementById('tree-container');
    queryContainer = document.getElementById('query-container');
    
    // Create code editor
    codeEditor = CodeMirror(codeContainer, {
      mode: 'r',
      lineNumbers: true,
      showCursorWhenSelecting: true,
      tabSize: 2,
      theme: 'default',
      value: getStoredState('code') || 'function(x) {\n  if (x > 0) {\n    return(sqrt(x))\n  } else {\n    return(NA)\n  }\n}'
    });
    
    // Create query editor if the container exists
    if (queryContainer) {
      queryEditor = CodeMirror(queryContainer, {
        mode: 'scm',
        lineNumbers: false,
        tabSize: 2,
        theme: 'default',
        placeholder: 'Enter a tree-sitter query...',
        value: getStoredState('query') || ''
      });
    }
    
    // Initialize tree-sitter
    initializeParser();
    
    // Set up event handlers
    setupEvents();
  });
  
  // Load required libraries
  async function initializeLibraries() {
    // These would typically be loaded from CDN or directly in the HTML
    // Here we're just ensuring they're available
    CodeMirror = window.CodeMirror;
    TreeSitter = window.TreeSitter;
    Clusterize = window.Clusterize;
    
    if (!CodeMirror || !TreeSitter || !Clusterize) {
      console.error('Required libraries not loaded');
      return;
    }
    
    // Load CodeMirror R mode if not already loaded
    if (!CodeMirror.modes.r) {
      // We could load it here if needed
    }
  }
  
  // Initialize the Tree-sitter parser with R language
  async function initializeParser() {
    try {
      parser = new TreeSitter();
      
      // Load the R language WASM file
      const wasmUrl = 'assets/tree-sitter-r.wasm';
      console.log('Attempting to load WASM from:', wasmUrl);
      rLanguage = await TreeSitter.Language.load(wasmUrl);
      
      // Set language for parser
      parser.setLanguage(rLanguage);
      
      // Initial parse
      parseCode();
    } catch (error) {
      console.error('Error initializing parser:', error);
      displayError('Failed to load R grammar. Check console for details.');
    }
  }
  
  // Parse current code and update the tree
  function parseCode() {
    try {
      const code = codeEditor.getValue();
      localStorage.setItem('tree-sitter-r-playground-code', code);
      
      // Parse the code
      const tree = parser.parse(code);
      
      // Render the tree
      renderTree(tree);
      
      // Run query if there's one in the editor
      if (queryEditor && queryEditor.getValue().trim()) {
        runQuery();
      }
    } catch (error) {
      console.error('Error parsing code:', error);
      displayError('Error parsing code. Check console for details.');
    }
  }
  
  // Render the syntax tree
  function renderTree(tree) {
    if (!treeContainer) return;
    
    const root = tree.rootNode;
    const rows = [];
    const maxRow = codeEditor.lineCount() - 1;
    
    // Format tree into HTML rows
    let formatTree = function(node, depth) {
      if (!node) return;
      
      const start = node.startPosition;
      const end = node.endPosition;
      const maxColumn = codeEditor.getLine(Math.min(maxRow, end.row)).length;
      
      // Create row for this node
      const row = document.createElement('div');
      row.className = 'tree-row';
      row.style.marginLeft = (depth * 12) + 'px';
      
      // Field name if present
      if (node.parent && node.parent.childCount > 1) {
        const fieldName = node.parent.children.find(n => n === node)?.fieldName;
        if (fieldName) {
          const fieldNameSpan = document.createElement('span');
          fieldNameSpan.className = 'field-name';
          fieldNameSpan.textContent = fieldName + ': ';
          row.appendChild(fieldNameSpan);
        }
      }
      
      // Node type
      const typeSpan = document.createElement('span');
      typeSpan.className = node.isNamed() ? 'node-type' : 'anonymous-node-type';
      typeSpan.textContent = node.type;
      row.appendChild(typeSpan);
      
      // Position display
      const position = document.createElement('span');
      position.className = 'tree-node-position';
      position.textContent = ` [${start.row},${start.column} - ${end.row},${end.column}]`;
      row.appendChild(position);
      
      // Add event listener to highlight the corresponding code when clicked
      row.addEventListener('click', () => {
        codeEditor.focus();
        codeEditor.setSelection(
          { line: start.row, ch: start.column },
          { line: end.row, ch: end.column }
        );
      });
      
      rows.push(row);
      
      // Process children recursively
      if (node.children && node.children.length > 0) {
        node.children.forEach(child => formatTree(child, depth + 1));
      }
    };
    
    formatTree(root, 0);
    
    // Clear the tree container
    treeContainer.innerHTML = '';
    
    // Add all rows to the tree container
    rows.forEach(row => treeContainer.appendChild(row));
  }
  
  // Run a query on the current code
  function runQuery() {
    if (!queryEditor) return;
    
    try {
      const code = codeEditor.getValue();
      const queryString = queryEditor.getValue();
      
      localStorage.setItem('tree-sitter-r-playground-query', queryString);
      
      if (!queryString.trim()) {
        // Clear highlights but don't show error
        codeEditor.getAllMarks().forEach(m => m.clear());
        return;
      }
      
      // Parse the code
      const tree = parser.parse(code);
      
      // Create and run query
      const query = rLanguage.query(queryString);
      const matches = query.matches(tree.rootNode);
      
      // Clear previous highlights
      codeEditor.getAllMarks().forEach(m => m.clear());
      
      // Highlight matching nodes
      matches.forEach(match => {
        match.captures.forEach(capture => {
          const { node } = capture;
          const start = { line: node.startPosition.row, ch: node.startPosition.column };
          const end = { line: node.endPosition.row, ch: node.endPosition.column };
          
          codeEditor.markText(start, end, {
            className: `capture-${capture.name || 'node'}`
          });
        });
      });
      
    } catch (error) {
      console.error('Query error:', error);
      displayError('Invalid query. Check console for details.');
    }
  }
  
  // Set up event handlers
  function setupEvents() {
    // Update tree when code changes
    codeEditor.on('changes', debounce(parseCode, 250));
    
    // Run query when query changes
    if (queryEditor) {
      queryEditor.on('changes', debounce(runQuery, 250));
    }
    
    // Add keyboard shortcuts
    codeEditor.setOption('extraKeys', {
      'Ctrl-Enter': parseCode,
      'Cmd-Enter': parseCode,
    });
    
    if (queryEditor) {
      queryEditor.setOption('extraKeys', {
        'Ctrl-Enter': runQuery,
        'Cmd-Enter': runQuery,
      });
    }
  }
  
  // Helper function to get stored state
  function getStoredState(key) {
    try {
      return localStorage.getItem(`tree-sitter-r-playground-${key}`);
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return null;
    }
  }
  
  // Helper function to display errors
  function displayError(message) {
    // Simple error display - could be improved
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    treeContainer.innerHTML = '';
    treeContainer.appendChild(errorDiv);
  }
  
  // Debounce function to limit how often a function is called
  function debounce(func, wait) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }
})();