import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { changeStatus } from "./api";
import { IContext } from "./types";

export const UpdatePrivacy = () => {
    const { account, setAccount } = useOutletContext<IContext>()
    const [status, setStatus] = useState<number>(account.isPrivate); 
    const [message, setMessage] = useState<string>("");

    const handleChangeStatus = async () => {
        try {
            const response = await changeStatus();
            
            if (response.status === "ok") {
                setStatus(response.payload);
                setMessage(response.message || "Status updated successfully.");
            } else {
                setMessage("Failed to update status.");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            setMessage("An error occurred.");
        }
    };

    return (
        <>
            <p>Current Status: { status == 1 ? 'Public' : 'Privete'  }</p>
            <br />
            <button onClick={handleChangeStatus} className="btn btn-outline-dark my-3">
                Toggle Status
            </button>
            {message && <p>{message}</p>}
        </>
    );
};
