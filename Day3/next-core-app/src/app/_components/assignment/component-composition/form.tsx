import React from 'react';

const FormComponent: React.FC = () => {
    return (
        <div className='row'>
            <div className='col-sm-8 offset-sm-2'>
                <form className='form-horizontal' autoComplete='off' >
                    <fieldset>
                        <legend className="text-center text-secondary text-uppercase font-weight-bold">Add/Edit Employee Information</legend>
                        <hr className="mt-0" />
                    </fieldset>
                </form>
            </div>
        </div>
    );
}

export default FormComponent