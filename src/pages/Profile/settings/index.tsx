import { UpdatePrivacy } from "../../../helpers/UpdatePrivacy";
import { UpdateLogin } from "../../../helpers/UpdateLogin";
import { UpdatePassword } from "../../../helpers/UpdatePassword";

export const Settings = () => {


    return (
        <>
            <h1>Settings</h1>
            <UpdatePrivacy/>
            <UpdateLogin />
            <UpdatePassword />
        </>
    );
};
