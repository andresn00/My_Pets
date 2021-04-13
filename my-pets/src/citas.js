import {getAllDocsWhere, getDocById, addDocument} from "./firestore"


export const getCitasWhere = async pid => {
    return await getAllDocsWhere("citas", "pet", "==", pid)
}

export const getCitaById = async id => {
    return await getDocById("citas", id)
}

export const addCita = async (fecha, peso, tipo, descripcion, producto, dosis, pet) => {
    const cita = {
        fecha,
        peso,
        tipo,
        descripcion,
        producto,
        dosis,
        pet
    }
    return await addDocument("pets", cita)
}