import face from './FaceApi';

const getPersonIdentity = (personGroupId, personId) => {
    return `/face/v1.0/persongroups/${personGroupId}/persons/${personId}`;
};

const identify =({
    personGroupId,
    personId,
}) => {
    const requestUrl = getPersonIdentity(personGroupId, personId);

    return face.get(requestUrl)
}

export {
    identify,
}