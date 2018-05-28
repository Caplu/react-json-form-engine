# <a href='https://github.com/mikechabot/react-json-form-engine'><img src='https://raw.githubusercontent.com/mikechabot/react-json-form-engine-storybook/master/src/assets/banner_dark.png' alt='logo' aria-label='https://github.com/mikechabot/react-json-form-engine' /></a>

Build lightning-fast web forms from JSON.

:heart: Robust conditional logic 
<br/>
:heart: Flexible validation 
<br/>
:heart: Mindless deserialization and rehydration

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
  - [FormEngine](#form-engine)
  - [&lt;Form /&gt;](#form)
  
  
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

#### <a id="form-schema">Form Schema</a>

Forms must adhere to a strict schema. If the form object is malformed, the UI will be notified of the exact cause and location of the failure:

<div align="center">
<img src='https://raw.githubusercontent.com/mikechabot/react-json-form-engine-storybook/master/src/assets/form-engine-api-check.png' alt='api-check' aria-label='api-check' />
</div>

> See the full schema definition in the [FormAPIService](https://github.com/mikechabot/react-json-form-engine/blob/master/src/form/service/form-api-service.js#L27)

A form object must contain at least **one** section, which contains at least **one** subsection, that contains an array of fields:

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


The public API consists of two components that are used in tandem:

```js
import { Form, FormEngine } from 'react-json-form-engine';
```

<table>
<tr>
<th align="right"><code>FormEngine</code></th>
<td>Instantiates and manages the form.</td>
</tr>
<tr>
<th align="right"><code>&lt;Form /&gt;</code></th>
<td>Renders the form.</td>
</tr>
</table>

#### <a id="form-engine">FormEngine</a>

```jsx
import React from 'react';
import { Form, FormEngine } from 'react-json-form-engine';

const myForm = import('./my-form.json');

class MyForm extends React.Component {
   constructor(props) {
      this.state = {
         instance: new FormEngine(myForm)
      }
   }
   
   render() {
    return (
      <Form
        instance={this.state.instance}
        onSubmit={this._onSubmit}
      />
    );
  }

  _onSubmit () => {
     const { instance } = this.state;
     const model = instance.getModel();
     // Do stuff
  }  
}

```

#### <a id="form">&lt;Form /&gt;</a>



#### <a id="form-schema">Basic Example</a>

```jsx
import React from 'react';
import { Form, FormEngine } from 'react-json-form-engine';

const myForm = import('./my-form.json');

class MyForm extends React.Component {
   constructor(props) {
      this.state = {
         instance: new FormEngine(myForm)
      }
   }
   
   render() {
    return (
      <Form
        instance={this.state.instance}
        onSubmit={this._onSubmit}
      />
    );
  }

  _onSubmit () => {
     const { instance } = this.state;
     const model = instance.getModel();
     // Do stuff
  }  
}

```



