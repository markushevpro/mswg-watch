import pluginJs              from '@eslint/js'
import alignAssignments      from 'eslint-plugin-align-assignments'
import alignImport           from 'eslint-plugin-align-import'
import braceRules            from 'eslint-plugin-brace-rules'
import importPlugin          from 'eslint-plugin-import'
import noRelativePathImports from 'eslint-plugin-no-relative-import-paths'
import pluginReact           from 'eslint-plugin-react'
import reactHooks            from 'eslint-plugin-react-hooks'
import globals               from 'globals'
import tseslint              from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files:   [ '**/*.{js,mjs,cjs,ts,jsx,tsx}' ],
        ignores: [ 'node_modules/*' ]
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            }
        }
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        plugins: {
            'align-import':             alignImport,
            'align-assignments':        alignAssignments,
            import:                     importPlugin,
            'no-relative-import-paths': noRelativePathImports,
            'brace-rules':              braceRules,
            'react-hooks':              reactHooks
        },
        rules: {
            'react-hooks/exhaustive-deps': 'warn',
            'linebreak-style':             [ 'error', 'unix' ],
            'quotes':                      [ 'error', 'single' ],
            'semi':                        [ 'error', 'never' ],
            'array-bracket-spacing':       [ 'error', 'always' ],
            'arrow-spacing':               [ 'error', {
                'before': true,
                'after':  true
            } ],
            'block-spacing': [ 'error', 'always' ],
            'comma-spacing': [ 'error', {
                'before': false,
                'after':  true
            } ],
            'comma-style':               [ 'error', 'last' ],
            'computed-property-spacing': [ 'error', 'always' ],
            'curly':                     [ 'error', 'all' ],
            'dot-location':              [ 'error', 'property' ],
            'eol-last':                  [ 'error' ],
            'func-names':                [ 1 ],
            'key-spacing':               [ 'error', {
                'beforeColon': false,
                'afterColon':  true,
                'align':       'value'
            } ],
            'keyword-spacing':          [ 'error' ],
            'no-eq-null':               [ 2 ],
            'no-inline-comments':       [ 0 ],
            'no-mixed-spaces-and-tabs': [ 'error' ],
            'no-multi-spaces':          [ 'error', {
                'exceptions': {
                    'VariableDeclarator':   true,
                    'ImportDeclaration':    true,
                    'AssignmentExpression': true
                }
            } ],
            'func-call-spacing':            [ 'error', 'never' ],
            'no-trailing-spaces':           [ 'error' ],
            'object-curly-spacing':         [ 'error', 'always' ],
            'one-var-declaration-per-line': [ 'error', 'initializations' ],
            'semi-spacing':                 [ 'error', {
                'before': false,
                'after':  true
            } ],
            'space-before-blocks':         [ 'error', 'always' ],
            'space-before-function-paren': [ 'error', 'always' ],
            'space-in-parens':             [ 'error', 'always', { 'exceptions': [ '{}', '[]', '()', 'empty' ] } ],
            'space-infix-ops':             [ 'error' ],
            'space-unary-ops':             [ 'error', {
                'words':    true,
                'nonwords': false
            } ],
            'vars-on-top':             [ 'error' ],
            'camelcase':               [ 0 ],
            'object-curly-newline':    [ 'error', { 'multiline': true } ],
            'object-property-newline': [ 'error', { 'allowAllPropertiesOnSameLine': false } ],
            'max-depth':               [ 'error', 4 ],
            'max-params':              [ 'error', 5 ],
            'max-nested-callbacks':    [ 'error', 3 ],
            'max-statements':          [ 'error', 15 ],

            'react/jsx-key':                  2,
            'react/jsx-no-comment-textnodes': 2,
            'react/jsx-no-duplicate-props':   2,
            'react/jsx-no-target-blank':      2,
            'react/jsx-no-undef':             2,
            'react/jsx-uses-react':           2,
            'react/jsx-uses-vars':            2,
            'react/no-children-prop':         2,
            'react/no-danger-with-children':  2,
            'react/no-deprecated':            2,
            'react/no-direct-mutation-state': 2,
            'react/no-find-dom-node':         2,
            'react/no-is-mounted':            2,
            'react/no-render-return-value':   2,
            'react/no-string-refs':           2,
            'react/no-unescaped-entities':    2,
            'react/no-unknown-property':      2,
            'react/no-unsafe':                0,
            'react/prop-types':               2,
            'react/require-render-return':    2,

            'react/display-name':       [ 0 ],
            'react/react-in-jsx-scope': [ 0 ],
            'react/jsx-indent-props':   [ 'error', 4 ],
            'react/jsx-indent':         [ 'error', 4, {
                checkAttributes:          true,
                indentLogicalExpressions: true
            } ],

            'react/jsx-sort-props': [ 'error', {
                'callbacksLast':        true,
                'shorthandFirst':       true,
                'multiline':            'last',
                'ignoreCase':           true,
                'noSortAlphabetically': false,
                'reservedFirst':        true
            } ],

            'react/jsx-wrap-multilines': [ 'error', {
                'declaration': 'parens-new-line',
                'assignment':  'parens-new-line',
                'return':      'parens-new-line',
                'arrow':       'parens-new-line',
                'condition':   'parens-new-line',
                'logical':     'parens-new-line',
                'prop':        'parens-new-line'
            } ],

            'react/jsx-max-props-per-line': [ 'error', {
                'maximum': {
                    'single': 3,
                    'multi':  1
                }
            } ],
            'react/jsx-boolean-value': [ 'error', 'never' ],
            'react/jsx-curly-spacing': [ 'error', {
                'when':       'always',
                'attributes': false
            } ],
            'react/jsx-equals-spacing':           [ 0 ],
            'react/jsx-first-prop-new-line':      [ 'error', 'multiline' ],
            'react/jsx-closing-bracket-location': [ 'error' ],
            'react/jsx-fragments':                [ 'error', 'syntax' ],
            'react/jsx-newline':                  [ 'error', {
                'prevent':         true,
                'allowMultilines': true
            } ],
            'react/jsx-no-constructed-context-values': [ 'error' ],
            'react/jsx-one-expression-per-line':       [ 'error', { 'allow': 'single-child' } ],

            'react/jsx-tag-spacing': [ 'error', {
                'closingSlash':      'never',
                'beforeSelfClosing': 'always',
                'afterOpening':      'never',
                'beforeClosing':     'never'
            } ],

            'react/jsx-curly-newline': [ 'error', {
                'multiline':  'consistent',
                'singleline': 'consistent'
            } ],

            'align-import/align-import':           [ 'error', 'always' ],
            'align-assignments/align-assignments': [ 2 ],

            'brace-style':                    [ 0 ],
            '@typescript-eslint/brace-style': [ 0 ],
            'brace-rules/brace-on-same-line': [ 'error', { 'FunctionDeclaration': 'never' }, { 'allowSingleLine': true } ],

            'no-relative-import-paths/no-relative-import-paths': [
                'error',
                {
                    'allowSameFolder': true,
                    'rootDir':         'src',
                    'prefix':          '@'
                }
            ],

            'import/order': [
                'error',
                {
                    'alphabetize': { 'order': 'asc' },
                    'groups':      [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'type',
                        [ 'index', 'sibling' ]
                    ],
                    'newlines-between':        'always',
                    'warnOnUnassignedImports': true,
                    'pathGroups':              [
                        {
                            'pattern': '~/**',
                            'group':   'internal'
                        },
                        {
                            'pattern': '@/**',
                            'group':   'internal'
                        }
                    ],
                    'pathGroupsExcludedImportTypes': [ 'type' ]
                }
            ],

            '@/space-before-blocks':         [ 'error', 'always' ],
            '@/space-before-function-paren': [ 'error', 'always' ],
            '@/semi':                        [ 'error', 'never' ],
            '@/indent':                      [
                'error',
                4,
                {
                    'outerIIFEBody':       1,
                    'FunctionDeclaration': {
                        'parameters': 1,
                        'body':       1
                    },
                    'FunctionExpression': {
                        'parameters': 1,
                        'body':       1
                    },
                    'CallExpression':    { 'arguments': 1 },
                    'ImportDeclaration': 1,
                    'ignoreComments':    false,
                    'ignoredNodes':      [
                        'TSInterfaceDeclaration',
                        'TemplateLiteral *',
                        'JSXElement',
                        'JSXElement > *',
                        'JSXAttribute',
                        'JSXIdentifier',
                        'JSXNamespacedName',
                        'JSXMemberExpression',
                        'JSXSpreadAttribute',
                        'JSXExpressionContainer',
                        'JSXOpeningElement',
                        'JSXClosingElement',
                        'JSXFragment',
                        'JSXOpeningFragment',
                        'JSXClosingFragment',
                        'JSXText',
                        'JSXEmptyExpression',
                        'JSXSpreadChild'
                    ],
                    'SwitchCase':               1,
                    'VariableDeclarator':       'first',
                    'MemberExpression':         1,
                    'ArrayExpression':          1,
                    'ObjectExpression':         1,
                    'flatTernaryExpressions':   false,
                    'offsetTernaryExpressions': false
                }
            ],
        }
    }
]
