import React from 'react';
import BSRadio from 'react-bootstrap/lib/Radio';
import FormField from '../form-field';
import { __hasValue } from '../../../common/common';

class Radio extends React.Component {

    isChecked (option, value, isEven) {
        if (!__hasValue(value)) return;
        if (option.id) {
            return option.id === value;
        }
        return isEven ? value : !value;
    }

    renderChildren (children) {
        const { instance, onUpdate } = this.props;
        children = _.orderBy(children, 'sortOrder');
        return _.map(children, (child) => {
            const tag = child.tag;
            if (instance.evaluateShowCondition(child, tag)) {
                return (
                    <ul style={{listStyle: 'none'}} key={tag}>
                        <li>
                            <FormField
                                tag={tag}
                                id={tag}
                                field={child}
                                value={instance.getModelValue(tag)}
                                instance={instance}
                                onUpdate={onUpdate}
                            />
                        </li>
                    </ul>
                );
            }
        });
    }

    render () {
        const { tag, value, field, onUpdate } = this.props;
        if (!field.options) {
            console.warn(`${field.type} is missing required "options" (tag: ${tag}`);
            return <span />;
        }
        return (
            <div id={tag}>
                {
                    field.options.map((option, index) => {
                        const isEven = index % 2 === 0;
                        return (
                                <div key={index} style={field.inline ? {display: 'inline', marginRight: 10} : {} }>
                                    <BSRadio
                                        id={tag}
                                        disabled={field.disabled}
                                        style={!field.inline ? {margin: '5px 0px'} : {}}
                                        inline={field.inline}
                                        onChange={onUpdate}
                                        value={option.id || isEven}
                                        checked={this.isChecked(option, value, isEven)}>
                                        <span style={{fontWeight: 300}}>{ option.title || option }</span>
                                    </BSRadio>
                                    {
                                        option.fields
                                            ? this.renderChildren(option.fields)
                                            : ''
                                    }
                                </div>
                        );
                    })
                }
            </div>
        );
    }
}

Radio.propTypes = {
    instance: React.PropTypes.object,
    tag     : React.PropTypes.string.isRequired,
    value   : React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.bool
    ]),
    field   : React.PropTypes.object.isRequired,
    uiField : React.PropTypes.object,
    onUpdate: React.PropTypes.func.isRequired
};

export default Radio;
