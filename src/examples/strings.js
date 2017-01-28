export default {
    id      : 'STRINGS',
    title   : 'Strings',
    sections: [
        {
            title      : 'Strings',
            sortOrder  : 0,
            subsections: [
                {
                    title    : 'Stores [tag]:[value:String]',
                    sortOrder: 0,
                    fields   : [
                        {
                            id         : 'str1',
                            type       : 'string',
                            title      : 'Text field',
                            placeholder: 'Placeholder!',
                            sortOrder  : 0
                        },
                        {
                            tag        : 'str2',
                            type       : 'string',
                            title      : 'Textarea field',
                            placeholder: 'Placeholder!',
                            sortOrder  : 1
                        },
                        {
                            tag        : 'str3',
                            type       : 'string',
                            title      : 'Select field',
                            placeholder: '-- select an option --',
                            options    : [
                                {id: 0, title: 'Option 1'},
                                {id: 1, title: 'Option 2'},
                                {id: 2, title: 'Option 3'}
                            ],
                            sortOrder: 2
                        },
                        {
                            tag    : 'str4',
                            type   : 'string',
                            title  : 'Radio field',
                            options: [
                                { title: 'Male', id: 'M' },
                                { title: 'Female', id: 'F' },
                                { title: 'Decline', id: 'N/A' }
                            ],
                            sortOrder: 3
                        }
                    ]
                }
            ]
        }
    ],
    decorators: {
        str2: {
            hint     : 'This is some hint text',
            component: {
                type: 'textarea'
            }
        },
        str3: {
            hint: 'Stores the id of the selected option'
        },
        str4: {
            hint     : 'Stores the id of the selected option',
            component: {
                type: 'radio'
            }
        }
    }
};
