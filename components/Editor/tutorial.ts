const initialEditorState = {
  _nodeMap: [
    [
      'root',
      {
        __children: ['3', '5', '6', '10', '12', '15', '17', '32', '33'],
        __dir: 'ltr',
        __format: 0,
        __indent: 0,
        __key: 'root',
        __parent: null,
        __type: 'root'
      }
    ],
    [
      '3',
      {
        __type: 'paragraph',
        __parent: 'root',
        __key: '3',
        __children: ['4'],
        __format: 0,
        __indent: 0,
        __dir: 'ltr'
      }
    ],
    [
      '4',
      {
        __type: 'text',
        __parent: '3',
        __key: '4',
        __text: 'Welcome to Kwote 👋',
        __format: 0,
        __style: '',
        __mode: 0,
        __detail: 0
      }
    ],
    [
      '5',
      {
        __type: 'paragraph',
        __parent: 'root',
        __key: '5',
        __children: [],
        __format: 0,
        __indent: 0,
        __dir: 'ltr'
      }
    ],
    [
      '6',
      {
        __type: 'paragraph',
        __parent: 'root',
        __key: '6',
        __children: ['7', '24'],
        __format: 0,
        __indent: 0,
        __dir: 'ltr'
      }
    ],
    [
      '7',
      {
        __type: 'text',
        __parent: '6',
        __key: '7',
        __text: 'Replace this text with your favorite quote, and then ',
        __format: 0,
        __style: '',
        __mode: 0,
        __detail: 0
      }
    ],
    [
      '10',
      {
        __type: 'paragraph',
        __parent: 'root',
        __key: '10',
        __children: ['11'],
        __format: 0,
        __indent: 0,
        __dir: null
      }
    ],
    [
      '11',
      {
        __type: 'text',
        __parent: '10',
        __key: '11',
        __text: '\n',
        __format: 0,
        __style: '',
        __mode: 0,
        __detail: 0
      }
    ],
    [
      '12',
      {
        __type: 'paragraph',
        __parent: 'root',
        __key: '12',
        __children: ['13'],
        __format: 0,
        __indent: 0,
        __dir: 'ltr'
      }
    ],
    [
      '13',
      {
        __type: 'text',
        __parent: '12',
        __key: '13',
        __text: 'Italic text will have a blue highlight.',
        __format: 2,
        __style: '',
        __mode: 0,
        __detail: 0
      }
    ],
    [
      '15',
      {
        __type: 'paragraph',
        __parent: 'root',
        __key: '15',
        __children: ['16'],
        __format: 0,
        __indent: 0,
        __dir: null
      }
    ],
    [
      '16',
      {
        __type: 'text',
        __parent: '15',
        __key: '16',
        __text: '\n',
        __format: 0,
        __style: '',
        __mode: 0,
        __detail: 0
      }
    ],
    [
      '17',
      {
        __type: 'paragraph',
        __parent: 'root',
        __key: '17',
        __children: ['18'],
        __format: 0,
        __indent: 0,
        __dir: 'ltr'
      }
    ],
    [
      '18',
      {
        __type: 'text',
        __parent: '17',
        __key: '18',
        __text: 'Bold text will have a yellow highlight.',
        __format: 1,
        __style: '',
        __mode: 0,
        __detail: 0
      }
    ],
    [
      '24',
      {
        __type: 'text',
        __parent: '6',
        __key: '24',
        __text: 'select portions of the text to highlight.',
        __format: 2,
        __style: '',
        __mode: 0,
        __detail: 0
      }
    ],
    [
      '32',
      {
        __type: 'paragraph',
        __parent: 'root',
        __key: '32',
        __children: [],
        __format: 0,
        __indent: 0,
        __dir: null
      }
    ],
    [
      '33',
      {
        __type: 'paragraph',
        __parent: 'root',
        __key: '33',
        __children: ['34', '48', '49'],
        __format: 0,
        __indent: 0,
        __dir: 'ltr'
      }
    ],
    [
      '34',
      {
        __type: 'text',
        __parent: '33',
        __key: '34',
        __text: "Once you're happy with your quote, you can ",
        __format: 0,
        __style: '',
        __mode: 0,
        __detail: 0
      }
    ],
    [
      '48',
      {
        __type: 'text',
        __parent: '33',
        __key: '48',
        __text: 'export it as a beautiful image',
        __format: 1,
        __style: '',
        __mode: 0,
        __detail: 0
      }
    ],
    [
      '49',
      {
        __type: 'text',
        __parent: '33',
        __key: '49',
        __text: '.',
        __format: 0,
        __style: '',
        __mode: 0,
        __detail: 0
      }
    ]
  ],
  _selection: {
    anchor: { key: '49', offset: 1, type: 'text' },
    focus: { key: '49', offset: 1, type: 'text' },
    type: 'range'
  }
}

export default JSON.stringify(initialEditorState)
