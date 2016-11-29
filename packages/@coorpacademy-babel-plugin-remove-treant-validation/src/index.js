module.exports = function(babel) {
  return {
    name: 'remove-treant-validation',
    visitor: {
      ReturnStatement(path) {
        /* eslint-disable fp/no-arguments */
        if (path.node.argument.type === 'CallExpression' &&
            path.node.argument.callee.type === 'Identifier' &&
            path.node.argument.callee.name === 'validate' &&
            path.node.argument.arguments.length === 2
        ) {
          path.node.argument = path.node.argument.arguments[1];
        }
        /* eslint-enable fp/no-arguments */
      }
    }
  };
};
