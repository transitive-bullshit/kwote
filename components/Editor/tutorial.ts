const initialEditorState = {
  _nodeMap: [
    [
      'root',
      {
        __children: ['24', '78', '4', '77', '11', '86', '15'],
        __dir: 'ltr',
        __format: 0,
        __indent: 0,
        __key: 'root',
        __parent: null,
        __type: 'root'
      }
    ],
    [
      '4',
      {
        __type: 'paragraph',
        __parent: 'root',
        __key: '4',
        __children: ['5', '6', '8'],
        __format: 0,
        __indent: 0,
        __dir: 'ltr'
      }
    ],
    [
      '5',
      {
        __type: 'text',
        __parent: '4',
        __key: '5',
        __text: 'Replace this text with your favorite quote, and then ',
        __format: 0,
        __style: '',
        __mode: 0,
        __detail: 0
      }
    ],
    [
      '6',
      {
        __type: 'text',
        __parent: '4',
        __key: '6',
        __text: 'select portions of the text to ',
        __format: 2,
        __style: '',
        __mode: 0,
        __detail: 0
      }
    ],
    [
      '8',
      {
        __type: 'text',
        __parent: '4',
        __key: '8',
        __text: 'highlight.',
        __format: 3,
        __style: '',
        __mode: 0,
        __detail: 0
      }
    ],
    [
      '10',
      {
        __type: 'text',
        __parent: '77',
        __key: '10',
        __text: '\n',
        __format: 0,
        __style: '',
        __mode: 0,
        __detail: 0
      }
    ],
    [
      '11',
      {
        __type: 'paragraph',
        __parent: 'root',
        __key: '11',
        __children: ['12', '28'],
        __format: 0,
        __indent: 0,
        __dir: 'ltr'
      }
    ],
    [
      '12',
      {
        __type: 'text',
        __parent: '11',
        __key: '12',
        __text: 'Blue highlights are italic.',
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
        __children: ['16', '29'],
        __format: 0,
        __indent: 0,
        __dir: 'ltr'
      }
    ],
    [
      '16',
      {
        __type: 'text',
        __parent: '15',
        __key: '16',
        __text: 'Yellow highlights are bold.',
        __format: 1,
        __style: '',
        __mode: 0,
        __detail: 0
      }
    ],
    [
      '24',
      {
        __type: 'paragraph',
        __parent: 'root',
        __key: '24',
        __children: ['25'],
        __format: 0,
        __indent: 0,
        __dir: 'ltr'
      }
    ],
    [
      '25',
      {
        __type: 'text',
        __parent: '24',
        __key: '25',
        __text: 'Welcome to Kwote 👋',
        __format: 0,
        __style: '',
        __mode: 0,
        __detail: 0
      }
    ],
    [
      '28',
      {
        __type: 'text',
        __parent: '11',
        __key: '28',
        __text: ' (CMD + I or Control + I)',
        __format: 0,
        __style: '',
        __mode: 0,
        __detail: 0
      }
    ],
    [
      '29',
      {
        __type: 'text',
        __parent: '15',
        __key: '29',
        __text: ' (CMD + B or Control + B)',
        __format: 0,
        __style: '',
        __mode: 0,
        __detail: 0
      }
    ],
    [
      '77',
      {
        __type: 'paragraph',
        __parent: 'root',
        __key: '77',
        __children: ['10'],
        __format: 0,
        __indent: 0,
        __dir: null
      }
    ],
    [
      '78',
      {
        __type: 'paragraph',
        __parent: 'root',
        __key: '78',
        __children: [],
        __format: 0,
        __indent: 0,
        __dir: 'ltr'
      }
    ],
    [
      '85',
      {
        __type: 'text',
        __parent: '86',
        __key: '85',
        __text: '\n',
        __format: 0,
        __style: '',
        __mode: 0,
        __detail: 0
      }
    ],
    [
      '86',
      {
        __type: 'paragraph',
        __parent: 'root',
        __key: '86',
        __children: ['85'],
        __format: 0,
        __indent: 0,
        __dir: null
      }
    ]
  ],
  _selection: {
    anchor: { key: '29', offset: 25, type: 'text' },
    focus: { key: '29', offset: 25, type: 'text' },
    type: 'range'
  }
}

export default JSON.stringify(initialEditorState)
