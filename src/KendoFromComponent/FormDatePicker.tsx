import React from 'react';
import {FieldRenderProps, FieldWrapper} from '@progress/kendo-react-form';
import {DatePicker} from '@progress/kendo-react-dateinputs';
import {Error, Hint, Label} from '@progress/kendo-react-labels';

const FormDatePicker = (fieldRenderProps: FieldRenderProps) => {
    const {
        validationMessage, touched, label, id, valid,
        disabled, hint, wrapperStyle, hintDirection, value, defaultValue, ...others
    } = fieldRenderProps;

    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';
    const labelId = label ? `${id}_label` : '';

    return (
        <FieldWrapper style={wrapperStyle}>
            <Label id={labelId} editorId={id} editorValid={valid} editorDisabled={disabled}>
                {label}
            </Label>
            <div className={'k-form-field-wrap'}>
                <DatePicker
                    ariaLabelledBy={labelId}
                    ariaDescribedBy={`${hintId} ${errorId}`}
                    valid={valid}
                    id={id}
                    value={value}
                    defaultValue={defaultValue}
                    disabled={disabled}
                    {...others}
                />
                {
                    showHint &&
                    <Hint id={hintId} direction={hintDirection}>{hint}</Hint>
                }
                {
                    showValidationMessage &&
                    <Error id={errorId}>{validationMessage}</Error>
                }
            </div>
        </FieldWrapper>
    );
};

export default FormDatePicker;