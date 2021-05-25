import {getAllDocs, getAllDocsWhere, getDocById, addDocument, updateDocument} from "./firestore"

export const getPets = async () => {
    return await getAllDocs("pets")
}

export const getUserPets = async uid => {
    return await getAllDocsWhere("pets", "propietario", "==", uid)
}

export const getPetById = async id => {
    return await getDocById("pets", id)
}

export const addPet = async (data) => {
    return await addDocument("pets", data)
}

export const updatePet = async (id, data) => {
    return await updateDocument('pets', id, data)
}
export const updatePetCitasPendientes = async (id, citasPendientes) => {
    const data = {
        citasPendientes
    }
    return await updateDocument('pets', id, data)
}