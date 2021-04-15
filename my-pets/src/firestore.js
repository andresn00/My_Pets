import firebase from 'firebase'

export const getAllDocs = async collectionName => {
    const database = firebase.firestore()
    const collectionRef = database.collection(collectionName);
    const snapshot = await collectionRef.get()
    const results = []

    snapshot.forEach(doc => {
        results.push({id: doc.id, ...doc.data()})
    });
    return results
}

export const getAllDocsWhere = async (collectionName, field, equals, value) => {
    const database = firebase.firestore()
    const collectionRef = database.collection(collectionName).where(field, equals, value);
    const snapshot = await collectionRef.get()
    const results = []

    snapshot.forEach(doc => {
        results.push({id: doc.id, ...doc.data()})
    });
    return results
}

export const getDocById = async (collectionName, id) => {
    const database = firebase.firestore()
    const docRef = database.collection(collectionName).doc(id);
    const doc = await docRef.get()
    if(doc.exists) {
        return {id: doc.id, ...doc.data()}
    }
}

export const addDocument = async (collectionName, doc) => {
    const database = firebase.firestore()
    const collectionRef = database.collection(collectionName);
    const result = await collectionRef.add(doc)
    return {...doc, id: result.id}
}

export const addDocumentWithId = async (collectionName, doc, id) => {
    const database = firebase.firestore()
    const collectionRef = database.collection(collectionName);
    const result = await collectionRef.doc(id).set(doc)
    console.log("result created: ", result)
    return {...doc, id: id}
}

export const updateDocument = async (collectionName, id, doc) => {
    const database = firebase.firestore()
    const collectionRef = database.collection(collectionName);
    const docRef = await collectionRef.doc(id)
    const result = await docRef.update(doc)
    console.log('result updated: ', result)
    return {...doc, id: id}
}

