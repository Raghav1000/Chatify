export const getSender = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ?
        users[1].fullName :
        users[0].fullName;
};

export const getSenderImage = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ?
        users[1].profilePic :
        users[0].profilePic;
};