import { getAllDocs, getAllDocsWhere, getDocById, addDocument, updateDocument } from "./firestore"

export const getUsers = async () => {
    return await getAllDocs("users")
}

export const getUsersWhereVet = async vet => {
    return await getAllDocsWhere("users", "vet", "==", vet)
}

export const getUserById = async id => {
    return await getDocById("users", id)
}

export const addUser = async (cedula, direccion, telefono, ciudad, pais) => {
    const user = {
        cedula,
        direccion,
        telefono,
        ciudad,
        pais,
        isVet: false
    }
    return await addDocument("users", user)
}

export const updateUser = async (id, data) => {
    return await updateDocument('users', id, data)
}