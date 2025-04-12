'use client'
import { authenticate } from "@/app/(server)/lib/actions";
import FormInput from "@/app/_components/common/form-input";
import LoadingButton from "@/app/_components/common/loading-button";
import { LoginUserSchema, loginUserSchema } from "@/app/schemas/login-user-schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function Login() {
    const [submitting, setSubmitting] = React.useState(false);
    const router = useRouter();

    const methods = useForm<LoginUserSchema>({
        resolver: zodResolver(loginUserSchema)
    });

    const { reset, handleSubmit } = methods;

    const login = async (values: LoginUserSchema) => {
        setSubmitting(true);

        const formData = new FormData();
        formData.append('email', values.email);
        formData.append('password', values.password);

        const result = await authenticate(formData);

        setSubmitting(false);

        if (result.error) {
            toast.error(result.error);
            reset({ password: '' });
        } else {
            toast.success('Logged in successfully');
            router.push('/');
        }
    };

    const onSubmitHandler: SubmitHandler<LoginUserSchema> = (values) => {
        login(values);
    }

    return (
        <main className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-lg p-4" style={{ minWidth: '400px' }}>
                <h3 className="text-center mb-3">Welcome Back</h3>
                <p className="text-center text-muted mb-4">Please login to continue</p>
                <FormProvider {...methods}>
                    <form noValidate onSubmit={handleSubmit(onSubmitHandler)}>
                        <FormInput name="email" label="Email" type="email" />
                        <FormInput name="password" label="Password" type="password" />
                        <div className="mt-3">
                            <LoadingButton loading={submitting}>
                                Login
                            </LoadingButton>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </main>
    );
}