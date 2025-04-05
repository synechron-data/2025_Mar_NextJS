interface TextInputProps {
    name: string;
    label: string;
    placeholder?: string;
    value: string;
    readOnly?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({ name, label, placeholder, value, readOnly, onChange }) => {
    return (
        <div className="form-group mb-1">
            <label className="mb-0" htmlFor={name}>{label}</label>
            <input
                className="form-control"
                type="text"
                name={name}
                id={name}
                placeholder={placeholder}
                value={value}
                readOnly={readOnly}
                onChange={onChange} />
        </div>
    );
}

export default TextInput;