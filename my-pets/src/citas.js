import {getAllDocsWhere, getDocById, addDocument} from "./firestore"


export const getCitasWherePet = async pid => {
    return await getAllDocsWhere("citas", "pet", "==", pid)
}

export const getCitaById = async id => {
    return await getDocById("citas", id)
}

export const addCita = async (fecha, fechaProxima, peso, tipo, descripcion, producto, dosis, pet) => {
    var cita = {
        fecha,
        peso,
        tipo,
        descripcion,
        producto,
        dosis,
        pet
    }
    if (fechaProxima) {
        cita.fechaProxima = fechaProxima
    }
    return await addDocument("citas", cita)
}