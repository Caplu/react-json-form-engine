# <a href='https://github.com/mikechabot/react-json-form-engine'><img src='https://raw.githubusercontent.com/mikechabot/react-json-form-engine-storybook/master/src/assets/banner_dark.png' alt='logo' aria-label='https://github.com/mikechabot/react-json-form-engine' /></a>

Build lightning fast web forms from JSON.

:heart: Conditional logic 
<br/>
:heart: Flexible validation 
<br/>
:heart: Easy deserialization & rehydration

There are plenty of solutions for form management within the React ecosystem. Utilization of Redux is popular, but the overhead is unnecessary. Other libraries might use `context`, or export some type of HOC, however they rely on ever-changing React patterns, and/or deprecatable APIs. 

This library takes a different approach: by relying on React as little as possible, and offloading everything else to plain JavaScript. The result is scalable, lightning fast performance with neglible reliance on the React lifecycle.

<div align="center">  
  <a href="https://travis-ci.org/mikechabot/react-json-form-engine">
    <img src="https://travis-ci.org/mikechabot/react-json-form-engine.svg?branch=master" alt="build status" />
  </a>
  <a href="https://www.npmjs.com/package/react-json-form-engine">
    <img src="https://img.shields.io/npm/v/react-json-form-engine.svg" alt="npm version" />
  </a>
  <a href="https://david-dm.org/mikechabot/react-json-form-engine">
    <img src="https://david-dm.org/mikechabot/react-json-form-engine.svg" alt="dependency status" />
  </a>
  <a href="https://github.com/mikechabot/react-json-form-engine/pulls">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="prs welcome" />
  </a>
</div>

----

## Table of Contents

- [Live Demo](#live-demo)
- [Installing](#installing)
- [Getting Started](#getting-started)
  - [Form Definition](#form-definition)
  - [Field Definition](#field-definition)
  - [Option Field Definition](#option-field-definition)
  - [Field Decorators](#field-decorators)
- [Validation](#validation)
- [Conditions](#conditions)

----

## <a id="live-demo">Live Demo</a>

https://mikechabot.github.io/react-json-form-engine-storybook/

> Storybook repository located [here](https://github.com/mikechabot/react-json-form-engine-storybook)

## <a id="installing">Installing</a>

Requires React 15.0.0+

`$ npm install --save react-json-form-engine`

> Note: This library renders [Bulma](https://bulma.io/documentation/overview/start/) semantics; you'll need to include the styles on your own for everything to look nice. You can either install it with npm, or just have it served from a CDN.

> Note: [Font Awesome](https://fontawesome.com) is supported.

#### Bulma via CDN

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css">
```

#### Bulma via npm 

`$ npm install --save bulma`

1. If your project supports Sass/SCSS, Bulma can be over easily overriden:

  ```scss
  /* my-awesome-styles.scss */
  
  // 1. Import the initial variables
  @import "../sass/utilities/initial-variables";
  @import "../sass/utilities/functions";

  // 2. Set your own initial variables
  $blue: #72d0eb;

  // 3. Import the rest of Bulma
  @import "../bulma";
  ```

2. Depending on your build pipeline, either import the compiled CSS, or uncompiled SCSS.
 
  ```js
  // App.js
  import './scss/my-awesome-styles.scss';
 ```

#### Font Awesome

If you'd like to use [Font Awesome](https://fontawesome.com), be sure to also include the icon pack:

```html
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css">
```

### Starter Template

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>react-json-form-engine</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

----

## <a id="getting-started">Getting Started</a>

Before we start rendering, we'll need to build a [Form Definition](#form-definition), which is the skeleton structure that describes how the form should look and behave. The definition can be a JavaScript object or a [JSON Schema](http://json-schema.org).

Let's create a typical login form:

 <img src='https://raw.githubusercontent.com/mikechabot/react-json-form-engine-storybook/master/src/assets/login.png' alt='login' aria-label='login' />
 
```javascript
{
  id: "login_form",
  title: "Login Form",
  sections: [
    {
      id: "section_1",
      title: "Login Section",
      subsections: [
        {
          id: "subsection_1",
          title: "Login",
          "subtitle": "Please enter your credentials.",
          fields: [
            {
              id: "user_name",
              title: "Username",
              type: "string"
            },
            {
              id: "user_pass",
              title: "Password",
              type: "string"
            },
            {
              id: "remember_me",
              title: "Remember me",
              type: "boolean"
            }
          ]
        }
      ]
    }
  ],
  decorators: {
    "user_pass": {
      component: {
        type: "password"
      }
    }
  }
};
```

Once we have a defintion, we'll create an instance of `FormEngine` and pass it to our `<Form />` component; both of which work together to manage the form. And once filled out, `onSubmit` will get us the form responses:

 ```jsx
const instance = new FormEngine(signUpFormDefinition); 
 
const SignUpForm = () => (
  <Form
    instance={instance}
    onSubmit={() => {
      const model = instance.getModel();  // Get form model
      console.log(model.findAll());       // Log all form responses
    }}
  />
);
```

### <a id="form-definition">Form Definition</a>

Form definitions adhere to a strict schema. They must contain at least **one section**, which contains at least **one subsection**, which contains at least **one [Field Definition](#field-definition)**.

> View the full schema in the [FormAPIService](https://github.com/mikechabot/react-json-form-engine/blob/master/src/form/service/form-api-service.js#L27)

```js
// The most minimal form possible
export default {
    id: 'Form_ID',
    title: 'Form Title',
    sections: [
        {
            id: 'section_ID',
            title: 'Section Title',
            subsections: [
                {
                    id: 'subsection_ID',
                    title: 'Subsection Title',
                    fields: [
                        {
                            ...
                        }
                    ]
                }
            ]
        }
    ]
};
```

[![Edit react-json-form-engine (Simple)](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/n3wrwzpjo0)

---

#### Form Definition Validation

If the `FormEngine` is instantiated with a malformed definition, the UI will be notified of the failure:

<div align="center">
<img src='https://raw.githubusercontent.com/mikechabot/react-json-form-engine-storybook/master/src/assets/form-engine-api-check.png' alt='api-check' aria-label='api-check' />
</div>

[![Edit react-json-form-engine (Malformed)](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/mm3y516258)
----

### <a id="field-definition">Field Definition</a>

Field definitions also adhere to a strict schema. At minimum, they must contain an `id`, `type` and `title`:

```js
// The most minimal field object
{
  id: 'field_ID',
  type: 'string',
  title: 'Field title'
}
```
#### <a id="field-id">Field ID</a>

Uniquely identifies the form field within the DOM, as well as the form instance. End-user input is stored in the model as:

```js
{ key: <field.id>, value: <value> }
```

----

#### <a id="field-type">Field Type</a>

Determines the data type of the value stored in the model, and also plays a role in which form control to render:

| Field/Data Type  | Default Control   | Allowed Controls                                          | Supports `options`? |
|------------------|-------------------|-----------------------------------------------------------|---------------------|
| `string`         | `<Text />`        | `<Password />`, `<Textarea />`, `<Select />`, `<Radio />` | Yes*                |
| `boolean`        | `<Checkbox />`    | `<Radio />`                                               | Yes*                |
| `number`         | `<Number />`      | `<Range />`                                               | No                  |
| `array`          | `<Select />`      | `<Checkboxgroup />`                                       | Yes                 |
| `date`           | `<DateTime />`    | N/A                                                       | No                  |

> Some field types will *automatically* transition from their Default Control to another Allowed Control if an `options` array is present in the field definition. (See [Field Type Transitions](#field-type-transitions))

----

#### <a id="field-property-list">Complete Field Property List</a>

| Property        | Type      | Required | Description                                                                                 |
|-----------------|-----------|----------|---------------------------------------------------------------------------------------------|
| `id`            | `string`  | Yes      | See [Field ID](#field-id)                                                                   |
| `type`          | `string`  | Yes      | See [Field Type](#field-type)                                                               |
| `title`         | `string`  | Yes      | Display label for the field                                                                 |
| `options`       | `array`   | No       | Options to render for certain types (See [Option Field Definition](#option-field-definition)|
| `fields`        | `array`   | No       | Children of the field (Must adhere to [Field Definition](#field-definition))                |
| `placeholder`   | `string`  | No       | Display a placeholder                                                                       |
| `showCondition` | `object`  | No       | Condition object (See [Conditions](#conditions))                                            |
| `required`      | `boolean` | No       | Whether the field is required (See [Validation](#validation))                               |
| `pattern`       | `string`  | No       | Pattern to match (See [Validation](#validation))                                            |
| `min`           | `number`  | Yes*     | Minimum value. (Used for `number` field types)                                              |
| `max`           | `number`  | Yes*     | Maximum value. (Used for `number` field types)                                              |
| `hideTime`      | `boolean` | No       | Hide the time value. (Used for `date` field types)                                          |
| `hideCalendar`  | `boolean` | No       | Hide the date value. (Used for `date` field types)                                          |

> `min` and `max` are only required for `number` field types.

----

### <a id="form-definition">Option Field Definition</a>

> Applies to `string`, `boolean`, and `array` field types only.

For field types that accept unlimited options (`string`, `array`), you must include both an `id` and `title`. The `ids` of the selected options are stored in the model.

```js
options: [
      { id: "op1", title: "Option 1" },
      { id: "op2", title: "Option 2" },
    ]
```

For `boolean` field types, which can accept a maximum of two (2) options, only include a `title` property. The first option is considered the affirmative response:

```
options: [
      { title: "Always" },
      { title: "Never" },
    ]
```

[![Edit react-json-form-engine (Option Field Definitions)](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/9ymvkn8qnw)

----

### <a id="field-type-transitions">Field Type Transitions</a>

#### `string`

By default, a `string` field is rendered as `<Text />`, but with `options` it automatically renders as a `<Select />`.

```js
[
  { 
    // Renders as <Text />
    id: 'field_1',
    type: 'string', 
    title: 'Text Field'
  },
  {             
    // Renders as <Select />
    id: 'field_2',
    type: 'string',
    title: 'Select Field',
    options: [
      { id: "op1", title: "Option 1" },
      { id: "op2", title: "Option 2" },
    ]
  }
]
```
[![Edit react-json-form-engine (Simple)](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/mq88xm5l6x)

----

#### `boolean`

By default, a `boolean` field is rendered as `<Checkbox />`, but with `options` it automatically renders as a `<Radio />`.

```js
[
  {
    id: "field_1",
    type: "boolean",
    title: "Checkbox Field"
  },
  {
    id: "field_2",
    type: "boolean",
    title: "Radio Field",
    options: [
      { title: "Yes" },
      { title: "No" }
    ]
  }
]
```

> A maximum of two (2) options is allowed for `boolean` fields. For unlimited `<Radio />` options, use the `string` type with a `component` of `radio`.

[![Edit react-json-form-engine (Boolean Field Type Transition)](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/zw9q7zrol4)

----

### <a id="form-definition">Field Decorators</a> 

As we've seen above, both field `type` and `options` help drive the rendered Component type. However, you'll often want to explicitly override the default component type in favor of another. 

Add the `decorators` object to the root of the [Form Definition](#form-definition); this object will be keyed by [Field ID](#field-id), and can contain the properties `hint` and `component`:

```js
  {
  ...
  sections: [...],
  decorators: {
    [field.id]: {
      hint: <hintText>
      component: {
        type: <componentType>
      }
    }
  }
```

| Field Type       | Component Decorator Overrides   | 
|------------------|---------------------------------|
| `string`         | `password`, `textarea`, `radio` |
| `number`         | `range`                         |  
| `array`          | `checkboxgroup`                 |

[![Edit react-json-form-engine (Component Type Decorators)](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/wqpy6099p7)

----

## <a id="validation">Validation</a>

## <a id="conditions">Conditions</a>


