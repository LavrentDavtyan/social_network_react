import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAccount, handleCancelation, handleFollow, handleUnfollow } from "../../../helpers/api";
import { IAccount } from "../../../helpers/types";
import { BASE, DEF } from "../../../helpers/default";
import { Gallery } from "../../../components/Gallery";

export const Account = () => {

    const { id } = useParams();
    const [user, setUser] = useState<IAccount | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            return;
        }

        getAccount(id)
            .then(response => {
                if (!response.payload || response.status === "error") {
                    return navigate("/profile/search");
                }
                console.log(response.payload);
                console.log('response.payload');

                setUser(response.payload as IAccount);
            })
            .catch(error => {
                console.error("Failed to fetch account:", error);
            });
    }, [id, navigate]);

    const handleRequest = () => {
        if (user?.connection.following) {
            unfollow();
        } else if (user?.connection.requested) {
            cancelRequest();
        } else {
            follow();
        }
    };

    const follow = () => {
        if (user?.id) {
            handleFollow(user.id)
                .then(response => {
                    if (response.status === 'following') {
                        setUser({ ...user, connection: { ...user.connection, following: true } });
                    } else if (response.status === 'requested') {
                        setUser({ ...user, connection: { ...user.connection, requested: true } });
                    }
                });
        }
    };

    const unfollow = () => {
        if (user?.id) {
            handleUnfollow(user.id)
                .then(response => {
                    if (response.status === 'unfollowed') {
                        setUser({ ...user, connection: { ...user.connection, following: false } });
                    }
                });
        }
    };

    const cancelRequest = () => {
        if (user?.id) {
            handleCancelation(user.id)
                .then(response => {
                    if (response.status === 'cancelled') {
                        setUser({ ...user, connection: { ...user.connection, requested: false } });
                    }
                });
        }
    };

    return user ? (
        <div className="container mt-5 mb-5">
            <div className="row no-gutters">
                <div className="col-md-4 col-lg-4">
                    <img
                        src={user.picture ? BASE + user.picture : DEF}
                        alt={`${user.name}'s profile`}
                    />
                </div>
                <div className="col-md-8 col-lg-8">
                    <div className="d-flex flex-column">
                        <div className="d-flex flex-row justify-content-between align-items-center p-5 bg-dark text-white">
                            <h3 className="display-5">{user.name} {user.surname}</h3>
                            <i className="fa fa-facebook"></i>
                            <i className="fa fa-google"></i>
                            <i className="fa fa-youtube-play"></i>
                            <i className="fa fa-dribbble"></i>
                            <i className="fa fa-linkedin"></i>
                        </div>
                        <div className="p-3 bg-black text-white">
                            <img
                                className="icon"
                                src={user.isPrivate ? "https://cdn1.iconfinder.com/data/icons/unicons-line-vol-4/24/lock-alt-512.png" : "https://cdn1.iconfinder.com/data/icons/unicons-line-vol-4/24/lock-open-alt-512.png"}
                                alt={user.isPrivate ? "Private Account" : "Public Account"}
                            />
                            <button onClick={handleRequest} className="btn btn-primary btn-sm">
                                {user.connection.requested
                                    ? "Cancel Request"
                                    : user.connection.following
                                        ? "Unfollow"
                                        : user.connection.followsMe
                                            ? "Follow Back"
                                            : "Follow"}
                            </button>
                        </div>
                        <div className="d-flex flex-row text-white">
                            <div className="p-4 bg-primary text-center skill-block">

                                <h4>{ user.connection.followers?.length || 0}</h4>
                                <h6>Followers</h6>
                            </div>
                            <div className="p-3 bg-success text-center skill-block">
                                <h4>{user.connection.following?.length || 0}</h4>
                                <h6>Following</h6>
                            </div>
                            <div className="p-3 bg-danger text-center skill-block">
                                <h4>{user.posts?.length || 0}</h4>
                                <h6>Posts</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {!user.isPrivate && <Gallery posts={user.posts} />}
        </div>
    ) : null;
};
