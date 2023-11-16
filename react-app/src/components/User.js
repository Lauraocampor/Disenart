import React from 'react';

function User(props){
    return (
        <React.Fragment>
        <div className="col-lg-6 mb-4">
            <div className="card text-white bg-dark shadow">
                <div className="card-body" key={props.id}>
                    <div className="d-flex align-items-center">
                        <p className="mb-0 mr-2">{props.name} {props.last_name}</p>
                        <img
                            className="img-profile rounded-circle text-gray-600"
                            src={`/api/users/profile-image/${props.id}`}
                            alt={``}
                            width="60"
                        />
                    </div>
                </div>
            </div>
        </div>
        </React.Fragment>
    );
    }
    
export default User;