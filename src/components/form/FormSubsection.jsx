import React from 'react';
import FormField from './FormField';
import FormSubsectionTitle from './helpers/form-subsection-title';
import Subtitle from './helpers/Subtitle';
import { Flex } from '../common';
import _ from 'lodash';

class FormSubsection extends React.Component {

    render () {
        const { hideTitle, subsection, instance, onUpdate } = this.props;
        return (
            <Flex column={true}>
                { this._maybeRenderSubsectionTitle(hideTitle) }
                { this._maybeRenderSubsectionSubtitle(subsection.subtitle, hideTitle)}
                <ol className="simple-list">
                    {
                        _.map(subsection.fields, (fieldDef, index) => {
                            const field = instance.getField(fieldDef.id);
                            if (instance.evaluateShowCondition(field)) {
                                return (
                                    <li key={index} style={{marginTop: 10}}>
                                        <FormField
                                            id={field.id}
                                            field={field}
                                            onUpdate={onUpdate}
                                            instance={instance}
                                            value={instance.getModelValue(field.id)}
                                        />
                                    </li>
                                );
                            }
                        })
                    }
                </ol>
            </Flex>
        );
    }

    _maybeRenderSubsectionTitle (hideTitle) {
        if (!hideTitle) {
            return <FormSubsectionTitle
                title={this.props.subsection.title}
                status={this.props.validationStatus}
            />;
        }
    }

    _maybeRenderSubsectionSubtitle (subtitle, hideTitle) {
        if (subtitle) {
            return !hideTitle
                ? <Subtitle text={subtitle} />
                : <div style={{marginTop: 10}}><Subtitle text={subtitle} /></div>
        }
    }

}

FormSubsection.propTypes = {
    title     : React.PropTypes.string,
    subsection: React.PropTypes.object.isRequired,
    onUpdate  : React.PropTypes.func.isRequired,
    instance  : React.PropTypes.object.isRequired
};

export default FormSubsection;
