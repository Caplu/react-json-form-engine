# <a href='https://github.com/mikechabot/react-json-form-engine'><img src='https://raw.githubusercontent.com/mikechabot/react-json-form-engine-storybook/master/src/assets/banner_dark.png' alt='logo' aria-label='https://github.com/mikechabot/react-json-form-engine' /></a>

Build lightning-fast web forms from JSON.

:heart: Robust conditional logic 
<br/>
:heart: Flexible validation 
<br/>
:heart: Mindless deserialization & rehydration

Within the React ecosystem, there's no shortage of approaches to take for form state management. Utilization of Redux is popular, but the overhead is unnecessary. Other libraries might use `context`, or export some type of HOC, however they rely on ever-changing React patterns, and/or deprecatable APIs. 

`react-json-form-engine` takes a different approach: by relying on React as little as possible, and offloading everything else to pure JavaScript. The result is scalable, lightning-fast performance with neglible reliance on the React lifecycle.

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
  - [Form Schema](#form-schema)
  - [Field Schema](#field-schema)  
  
## <a id="live-demo">Live Demo</a>

https://mikechabot.github.io/react-json-form-engine-storybook/

## <a id="installing">Installing</a>

Requires React 15.0.0+

`$ npm install --save react-json-form-engine`

> Note: This library renders [Bulma](https://bulma.io/documentation/overview/start/) semantics, you'll need to include the styles on your own. You can either install it with npm, and `require`/`import` the CSS/SCSS, or have it served from a CDN.

> Note: [Font Awesome](https://fontawesome.com) is supported.

#### Bulma via CDN

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css">
```

#### Bulma via npm 

`$ npm install --save bulma`

1. If your project supports Sass/SCSS, Bulma can be over easily overriden:

  ```scss
  /* index.scss */
  
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
  import './scss/index.scss';
 ```

#### Font Awesome

If you'd like to use , be sure to also include the icon pack:

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

Before we can start rendering, we'll need to build a form object, which consists of sections, subsections, and fields. Fields can contain other fields as children (infinitely) -- with or without conditional logic.

Let's start by understanding the basic form schema.

----

### <a id="form-schema">Form Schema</a>

Form objects must adhere to a strict schema. They must contain at least **one section**, which contains at least **one subsection**, which contains at least **one field**.

> See the full schema definition in the [FormAPIService](https://github.com/mikechabot/react-json-form-engine/blob/master/src/form/service/form-api-service.js#L27)

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

#### <a id="form-schema-validation">Form Schema Validation</a>

If the form object is malformed, the UI will be notified of the failure:

<div align="center">
<img src='https://raw.githubusercontent.com/mikechabot/react-json-form-engine-storybook/master/src/assets/form-engine-api-check.png' alt='api-check' aria-label='api-check' />
</div>

[![Edit react-json-form-engine (Malformed)](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/mm3y516258)
----

### <a id="field-schema">Field Schema</a>

Field objects also adhere to a strict schema. At minimum, they must contain an `id`, `type` and `title`:

```js
// The most minimal field object
{
  id: 'field_ID',
  type: 'string',
  title: 'Field title'
}
```
#### Field Id

Uniquely identifies the form field within the DOM, as well as the form instance. User input is stored in the form's model as:

```js
{ key: <field.id>, value: <value> }
```

#### Field Type

Determines the data type of the value to be stored in the model, and also plays a role in which form control to render:

| Field/Data Type  | Default Control  | Additional Controls                                       | Supports `options`? |
|------------------|------------------|-----------------------------------------------------------|---------------------|
| `string`         | `<Text />`       | `<Password />`, `<Textarea />`, `<Select />`, `<Radio />` | Yes*                |
| `boolean`        | `<Checkbox />`   | `<Radio />`                                               | Yes*                |
| `number`         | `<Number />`     | `<Range />`                                               | No                  |
| `array`          | `<Select />`     | `<Checkboxgroup />`                                       | Yes                 |
| `date`           | `<DateTime />`   | N/A                                                       | No                  |

> Certain field types will *automatically* transition from their Default Control to a supported Additional Control with the addition of an `options` array. (See [Field Type Transitions](#field-type-transitions))

----

### <a id="field-schema">Field Type Transitions</a>

By default, a `string` field will be rendered as <Text /> control:

<table>
  <tr>
    <th>Field Definition</th>
    <th>Field Instance</th>
  </tr>
  <tr>
    <td>
    <pre>
{
  id: 'field_ID',
  type: 'string',
  title: 'Field title'
}
    </pre>
    </td>
    <td>
      <pre>
&lt;input name="field_ID" id="field_ID" class="input" type="text" value=""&gt;
      </pre>
    </td>
  <tr>
</table>

However, a `string` field with `options` will be rendered as `<Select />` control:

<table>
  <tr>
    <th>Field Definition</th>
    <th>Field Instance</th>
  </tr>
  <tr>
    <td>
    <pre>
{
  id: 'field_ID',
  type: 'string',
  title: 'Field title',
  options: [
    { id: "op1", title: "Option 1" },
    { id: "op2", title: "Option 2" },
  ]
}
    </pre>
    </td>
    <td>
      <pre>
&lt;select id="field_ID" name="field_ID"&gt;
  &lt;option value=""&gt;-- select value --&lt;/option&gt;
  &lt;option value="op1"&gt;Option 1&lt;/option&gt;
  &lt;option value="op2"&gt;Option 2&lt;/option&gt;
&lt;/select&gt;
      </pre>
    </td>
  <tr>
</table>


| Property  | Type      | Required | Description                                                                 | 
|-----------|-----------|----------|-----------------------------------------------------------------------------|
| `id`      | `string`  | Yes      | Uniquely identifies the field in the DOM, as well as the form's data model. |
| `type`    | `string`  | Yes      | Used to derive form control to render (See [Field Types](#field-types)).    |
| `title`   | `string`  | Yes      | Display label for the field.                                                |
| `options` | `array`   | No       | Options to render for Select, Radio, and Checkboxgroup fields types.        |
| `fields`  | `array`   | No       | Children of the field (children must adhere to Field schema).               |
| `min`     | `number`  | No       | Minimum value (Used for `number` field types).                              |
| `max`     | `number`  | No       | Maximum value (Used for `number` field types).                              |

