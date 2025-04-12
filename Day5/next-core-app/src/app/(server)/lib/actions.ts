'use server';

import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";

export async function authenticate(formData: FormData) {
    try {
        await signIn('', {});
        return { success: true };
    } catch (error) {
        console.log("Error ------------------", error);
        if (error instanceof CredentialsSignin) {
            return { error: 'Invalid credentials.' };
        } else {
            return { error: 'Something wend wrong.' };
        }
    }
}