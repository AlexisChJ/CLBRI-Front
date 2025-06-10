import api from "../api"
import { SignUpAdminProps } from "@/types/SignUp";

export const signUpAdmin = async (signUpProps: SignUpAdminProps): Promise<boolean> => {
    const fullName = signUpProps.first_name.trim() + " " + signUpProps.last_name.trim();
    const signUpSend = {
        email: signUpProps.email,
        name: fullName,
        password: signUpProps.password,
        workplace: signUpProps.workplace,
        phone_number: signUpProps.phone_number,
        location: {
            address: signUpProps.address,
            city: signUpProps.city,
            state: signUpProps.state,
            country: signUpProps.country,
            postal_code: signUpProps.postal_code
        }
    };
    const { data } = await api.post(`/admin/signup`, signUpSend);
    return data;
};