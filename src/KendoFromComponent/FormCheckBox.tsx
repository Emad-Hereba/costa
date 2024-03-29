import * as React from "react";

import {FieldRenderProps, FieldWrapper} from "@progress/kendo-react-form";
import {Checkbox} from "@progress/kendo-react-inputs"
import {Error, Hint,} from "@progress/kendo-react-labels";

export const FormCheckbox = (fieldRenderProps: FieldRenderProps) => {
    const {
        validationMessage,
        touched,
        id,
        valid,
        disabled,
        hint,
        optional,
        label,
        visited,
        modified,
        ...others
    } = fieldRenderProps;

    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : "";
    const errorId = showValidationMessage ? `${id}_error` : "";

    return (
        <FieldWrapper>
            <Checkbox
                ariaDescribedBy={`${hintId} ${errorId}`}
                label={label}
                labelOptional={optional}
                valid={valid}
                id={id}
                disabled={disabled}
                {...others}
            />
            {showHint && <Hint id={hintId}>{hint}</Hint>}
            {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
        </FieldWrapper>
    );
};

export const MemoizedFormCheckBox = React.memo(FormCheckbox);
