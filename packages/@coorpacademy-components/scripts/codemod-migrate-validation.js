
module.exports = function transformer(file, api) {
  const j = api.jscodeshift;
  const ast = j(file.source);
  let hasValidate = false;

  ast.find(j.ImportDeclaration)
  .forEach(path => {
    if (!path.value.source.value.includes('util/validation')) {
      return;
    }

    path.value.specifiers.forEach(specifier => {
      if (specifier.type === 'ImportSpecifier' &&
        specifier.local.type === 'Identifier' &&
        specifier.local.name === 'createValidate'
      ) {
        hasValidate = true;
        specifier.local.name = 'validate';
      }
    });
  });

  if (!hasValidate) {
    return ast.toSource();
  }

  ast.find(j.ExportDefaultDeclaration)
  .forEach(path => {
    const body = path.value.declaration.body.body;
    const returnStatement = body.find(statement => statement.type === 'ReturnStatement');

    returnStatement.argument = j.callExpression(
      j.identifier('validate'),
      [
        j.identifier('conditions'),
        returnStatement.argument
      ]
    );

    path.value.declaration.body.body = body.filter(statement =>
      !(statement.type === 'ExpressionStatement' &&
        statement.expression.type === 'AssignmentExpression' &&
        statement.expression.left.type === 'MemberExpression' &&
        statement.expression.left.property.type === 'Identifier' &&
        statement.expression.left.property.name === 'validate'
      )
    );
  });

  return ast.toSource();
};
