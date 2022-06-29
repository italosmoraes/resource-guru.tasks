import assert from 'assert'

enum Operator {
  '+',
  '-',
  'x',
  '%'
}

const getResult = (
  operator: Operator,
  value: number | null,
  leftOperand: Node,
  rightOperand: Node
) => {
  if (!leftOperand || !rightOperand || !leftOperand.result || !rightOperand.result) {
    return value
  }

  switch (operator) {
    case Operator['+']:
      // @ts-ignore silly TS not able to recognize validation above
      return leftOperand.result() + rightOperand.result()
    case Operator['-']:
      // @ts-ignore silly TS not able to recognize validation above
      return leftOperand.result() - rightOperand.result()
    case Operator.x:
      // @ts-ignore silly TS not able to recognize validation above
      return leftOperand.result() * rightOperand.result()
    case Operator['%']:
      // @ts-ignore silly TS not able to recognize validation above
      return leftOperand.result() / rightOperand.result()
    default:
      return value
  }
}

const getString = (
  operator: Operator,
  value: number | null,
  leftOperand: Node,
  rightOperand: Node
): string => {
  switch (operator) {
    case Operator['+']:
      return `(${leftOperand.toString()} + ${rightOperand.toString()})`
    case Operator['-']:
      return `(${leftOperand.toString()} - ${rightOperand.toString()})`
    case Operator['x']:
      return `(${leftOperand.toString()} x ${rightOperand.toString()})`
    case Operator['%']:
      return `(${leftOperand.toString()} ÷ ${rightOperand.toString()})`
    default:
      return (value && value.toString()) || ''
  }
}

interface Node {
  operator: Operator | any
  value: number | null
  leftOperand: Node | null
  rightOperand: Node | null
  result: () => number | null
  toString: () => string | number | null
}

const Operation = (
  operator: Operator | any,
  value: number | null,
  rightNode: Node | null,
  leftNode: Node | null
) => {
  const result = function () {
    if (!rightNode || !leftNode) {
      return value
    }

    return getResult(operator, value, rightNode, leftNode)
  }

  const toString = function () {
    if (!rightNode || !leftNode) {
      return value
    }

    return getString(operator, value, rightNode, leftNode)
  }

  return {
    operator,
    value,
    leftOperand: rightNode && rightNode.leftOperand,
    rightOperand: leftNode && leftNode.rightOperand,
    result,
    toString
  }
}

const tree = Operation(
  Operator['%'],
  null,
  Operation(
    Operator['+'],
    null,
    Operation('', 7, null, null),
    Operation(
      Operator.x,
      null,
      Operation(Operator['-'], null, Operation('', 3, null, null), Operation('', 2, null, null)),
      Operation('', 5, null, null)
    )
  ),
  Operation('', 6, null, null)
)

// (!) keeping assertions in place of tests
assert.strictEqual('((7 + ((3 - 2) x 5)) ÷ 6)', tree.toString())
assert.strictEqual(2, tree.result())
