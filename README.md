[![Build Status](https://travis-ci.org/mikechabot/react-form-engine.svg?branch=master)](https://travis-ci.org/mikechabot/react-form-engine)
[![Dependency Status](https://david-dm.org/mikechabot/react-json-form-engine.svg)](https://david-dm.org/mikechabot/react-json-form-engine)
[![devDependencies Status](https://david-dm.org/mikechabot/react-json-form-engine/dev-status.svg)](https://david-dm.org/mikechabot/react-json-form-engine?type=dev)

[![NPM](https://nodei.co/npm/react-json-form-engine.png)](https://nodei.co/npm/react-json-form-engine/)

[![GitHub stars](https://img.shields.io/github/stars/mikechabot/react-json-form-engine.svg?style=social&label=Star)](https://github.com/mikechabot/react-json-form-engine)
[![GitHub forks](https://img.shields.io/github/forks/mikechabot/react-json-form-engine.svg?style=social&label=Fork)](https://github.com/mikechabot/react-json-form-engine)

# react-json-form-engine

## Installation
Yarn: or npm:

* `$ npm install --save react-json-form-engine`
* `$ yarn add react-json-form-engine`

## Getting Started

#### ES6 Modules

    import { FormEngine, Form } from 'react-json-form-engine';
    
#### CommonJS

    const JsonFormEngine = require('react-json-form-engine');
    const FormEngine = JsonFormEngine.FormEngine;
    const Form = JsonFormEngine.FormEngine;

## Example

#### Component (App.jsx)

    import React from 'react';
    import { FormEngine, Form } from 'react-json-form-engine';

    import MyForm from './my-form';

    class App extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                instance: null
            };
        }

        componentDidMount() {
            // Generate instance from JSON or JavaScript Object
            const instance = new FormEngine(MyForm);
            
            this.setState({instance});
        }

        render() {
            const { instance } = this.state;

            if (!instance) {
                return null;
            }


            return (
              <Form
                instance={instance}
                onUpdate={this._onFormUpdate}
                onSubmit={this._onSubmit}
              />
            );
        }

        _onSubmit = () => {
            const { instance } = this.state;
            console.log(instance.getModel());
        }

        _onFormUpdate = (changeEvent) => {
            // You might want to do something with the latest change
            // event, and then use "setState", otherwise just force a refresh
            this.forceUpdate();
        }

    }

    export default App;
    
#### JSON or JavaScript Object (my-form)

    export default {
        id: 'STRINGS',
        title: 'Strings',
        sections: [
            {
                id: 'section_0',
                title: 'Strings',
                subsections: [
                    {
                        id: 'subsection_0',
                        title: 'Store String Values',
                        fields: [
                            {
                                id: 'str1',
                                type: 'string',
                                title: 'Text'
                            }
                        ]
                    }
                ]
            }
        ]
    };

