import * as parser from '@typescript-eslint/parser';
import {RuleTester} from 'eslint';
import {noTopLevelVariables} from '../../../lib/rules/noTopLevelVariables';

new RuleTester({
  parser,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    env: {
      es6: true
    }
  }
}).run('no-top-level-variables', noTopLevelVariables, {
  valid: [
    {
      code: `
        export default function () {
          var foo = 'bar';
        }
      `
    },
    {
      code: `
        export default function () {
          let foo = 'bar';
        }
      `
    },
    {
      code: `
        export default function () {
          const foo = 'bar';
        }
      `
    }
  ],
  invalid: [
    {
      code: `
        var foo = 'bar';
        export default function () {}
      `,
      errors: [
        {
          messageId: 'message'
        }
      ]
    },
    {
      code: `
        let foo = 'bar';
        export default function () {}
      `,
      errors: [
        {
          messageId: 'message'
        }
      ]
    },
    {
      code: `
        const foo = 'bar';
        export default function () {}
      `,
      errors: [
        {
          messageId: 'message'
        }
      ]
    }
  ]
});