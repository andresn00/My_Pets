import { auth } from './firebase'
import { getAllDocs, getAllDocsWhere, getDocById, addDocument } from "./firestore"

export const getUsers = async () => {
    return await getAllDocs("users")
}

export const getUsersByType = async isVet => {
    return await getAllDocsWhere("users", "isVet", "==", isVet)
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