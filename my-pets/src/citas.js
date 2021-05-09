import {
    getAllDocsWhere, getDocById, addDocument,
    updateDocument, deleteDocument
} from "./firestore"


export const getCitasWherePet = async pid => {
    return await getAllDocsWhere("citas", "pet", "==", pid)
}

export const getCitaById = async id => {
    return await getDocById("citas", id)
}

export const addCita = async (cita) => {
    return await addDocument("citas", cita)
}

export const updateCita = async (id, cita) => {
    updateDocument('citas', id, cita)
}

export const deleteCita = async (id) => {
    deleteDocument('citas', id)
}