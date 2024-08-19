import { useEffect, useState } from "react";
import { IRequests } from "../../../helpers/types";
import { getAllRequests, handleAcceptRequest, handleDeclineRequest } from "../../../helpers/api";
import { BASE } from "../../../helpers/default";
import { Link } from "react-router-dom";

export const Requests = () => {
    const [requests, setRequests] = useState<IRequests[]>([]);

    useEffect(() => {
        getAllRequests()
            .then(response => {
                if (response.status === 'ok') {
                    console.log(response.payload);
                    setRequests(response.payload as IRequests[]);
                }
            })
            .catch(error => {
                console.error("Failed to fetch requests:", error);
            });
    }, []);

    const handleAccept = async (id:number) => {
        handleAcceptRequest(id)
            .then(response => {
                if (response.status === 'ok') {
                    setRequests(prevRequests => prevRequests.filter(request => request.id !== id));
                }
            })
            .catch(error => {
                console.error("Failed to accept request:", error);
            });
    };

    const handleDecline = async (id:number)=>{
        handleDeclineRequest(id)
        .then(response => {
            if (response.status === 'ok') {
                setRequests(prevRequests => prevRequests.filter(request => request.id !== id));
            }
        })
    }

    return (
        <div className="container">
            <h1>Requests</h1>
            <div>
                {requests.map((request) => (
                    request.user && (
                        <div className="col-md-3" key={request.user.id}>
                            <img
                                className="profile-pic"
                                src={BASE + request.user.picture}
                                alt={`${request.user.name}'s profile`}
                            />
                            <p>{request.user.name} {request.user.surname}</p>
                            <Link to={"/profile/" + request.user.id}>Account</Link>
                            <hr />
                            <button onClick={() => handleAccept(request.id)} className="btn btn-primary btn-sm">
                                Accept
                            </button>
                            <button onClick={() => handleDecline(request.id)}  className="btn btn-outline-dark btn-sm">
                                Decline
                            </button>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};
