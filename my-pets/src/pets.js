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

export const addPet = async (uid, name, fechaNacimiento, especie, raza, sexo, color) => {
    const pet = {
        nombre: name,
        fechaNacimiento,
        especie,
        raza,
        sexo,
        color,
        propietario: uid
    }
    return await addDocument("pets", pet)
}

export const updatePet = async (id, data) => {
    return await updateDocument('pets', id, data)
}