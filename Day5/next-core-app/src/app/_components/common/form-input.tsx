import { Form } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';

interface FormInputProps {
    name: string;
    label: string;
    type?: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, name, type = 'text' }) => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <Form.Group className='mb-3'>
            <Form.Label className='mb-0' htmlFor={name}>{label}</Form.Label>
            <Form.Control
                id={name}
                type={type}
                isInvalid={!!errors[name]}
                {...register(name)}
            />
            {
                errors[name] &&
                <Form.Control.Feedback type="invalid">
                    {errors[name]?.message as string}
                </Form.Control.Feedback>
            }
        </Form.Group>
    );
}

export default FormInput;