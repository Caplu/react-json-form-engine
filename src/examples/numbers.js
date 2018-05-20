export default {
    id: 'NUMBERS',
    title: 'Numbers',
    sections: [
        {
            id: 'section_0',
            title: 'Numbers',
            subsections: [
                {
                    id: 'subsection_0',
                    title: 'Store Numeric Values',
                    subtitle: 'Persisted as [id]:[value:Number] in the Model',
                    fields: [
                        {
                            id: 'num1',
                            type: 'number',
                            title: 'Number field',
                            placeholder: 'Enter a value'
                        },
                        {
                            id: 'num2',
                            type: 'number',
                            title: 'Range slider',
                            min: 0,
                            max: 50
                        }
                    ]
                }
            ]
        }
    ],
    decorators: {
        num1: {
            hint: 'Numbers only!'
        },
        num2: {
            hint: 'Range sliders are cool!',
            component: {
                type: 'range'
            }
        }
    }
};
