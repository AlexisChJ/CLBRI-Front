import api from "../api"
import { SignUpProps } from "@/types/SignUp";

export const signUpUser = async (signUpProps: SignUpProps): Promise<boolean> => {
    const fullName = signUpProps.first_name.trim() + " " + signUpProps.last_name.trim();
    const signUpSend = {
        email: signUpProps.email,
        name: fullName,
        password: signUpProps.password,
        workplace: signUpProps.workplace,
        phone_number: signUpProps.phone_number,
        token: signUpProps.admin_token,
        location: {
            address: signUpProps.address,
            city: signUpProps.city,
            state: signUpProps.state,
            country: signUpProps.country,
            postal_code: signUpProps.postal_code
        }
    };
    const { data } = await api.post(`/user/register-by-invitation`, signUpSend);
    return data;
};