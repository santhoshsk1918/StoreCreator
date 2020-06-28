import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

function InputElement(props) {
    const {
        type,
        name,
        id,
        onChangeHandler,
        classes,
        placeholder,
        label,
        value,
        error
    } = props;
    return (
        <React.Fragment>
            <Form.Group>
                <Form.Label htmlFor={id} className={"float-left"}>{label}</Form.Label>
                <Form.Control
                    type={type}
                    name={name}
                    id={id}
                    className={classes + ((error === "") ? "" : "is-invalid") }
                    placeholder={placeholder}
                    onChange={onChangeHandler}
                    value={value}
                ></Form.Control>
                {(error === "") ? null : <Form.Text className="invalid-feedback">{error}</Form.Text>}
            </Form.Group>
        </React.Fragment>
    );
}

InputElement.defaultProps = {
    type: "text",
    name: "",
    id: "",
    onChangeHandler: (e) => {},
    classes: "",
    placeholder: "",
    label: "",
    value: "",
};

InputElement.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string.isRequired,
    onChangeHandler: PropTypes.func,
    classes: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
};


export default InputElement;