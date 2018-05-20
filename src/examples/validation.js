export default {
    id: 'VALIDATION',
    title: 'Validation',
    faIcon: {
        name: 'asterisk'
    },
    sections: [
        {
            id: 'Required-Section',
            title: 'Required',
            subsections: [
                {
                    id: 'Required-Subsection',
                    title: 'Make any field required',
                    subtitle: 'Only display the error notification once the field is dirty',
                    fields: [
                        {
                            id: 'str1',
                            type: 'string',
                            title: 'Text field',
                            required: true
                        },
                        {
                            id: 'array1',
                            type: 'array',
                            title: 'Multiselect',
                            required: true,
                            options: [
                                { id: 'op1', title: 'Option 1' },
                                { id: 'op2', title: 'Option 2' },
                                { id: 'op3', title: 'Option 3' },
                                { id: 'op4', title: 'Option 4' }
                            ]
                        },
                        {
                            id: 'num1',
                            type: 'number',
                            title: 'Number field',
                            required: true
                        }
                    ]
                }
            ]
        },
        {
            id: 'Numeric-Section',
            title: 'Numeric',
            subsections: [
                {
                    id: 'Numeric-Subsection',
                    title: 'Min/max validation supported',
                    fields: [
                        {
                            id: 'num2',
                            type: 'number',
                            title: 'Number field',
                            min: 0,
                            max: 5
                        }
                    ]
                }
            ]
        },
        {
            id: 'Regex-Section',
            title: 'Regex',
            subsections: [
                {
                    id: 'Regex-Subsection',
                    title: 'Add a regex pattern to any String field',
                    fields: [
                        {
                            id: 'str2',
                            type: 'string',
                            title: 'Using regex pattern: "^foobar!$"',
                            pattern: '^foobar!$'
                        }
                    ]
                }
            ]
        }
    ],
    decorators: {
        str1: {
            hint: 'Enter some text, then delete it.'
        },
        array1: {
            hint: 'Select, then deselect an option.',
            component: {
                type: 'checkboxgroup'
            }
        },
        num1: {
            hint: 'Try entering some text'
        },
        num2: {
            hint: 'Min: 0, Max: 5. Try entering a value outside the range.'
        },
        str2: {
            hint: 'Satisfy the condition by entering "foobar!"'
        }
    }
};
