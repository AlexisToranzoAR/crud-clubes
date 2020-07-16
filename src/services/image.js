import {
    postImage,
    deleteImage as dImage
} from '../API/CRUD.js'

export async function uploadImage(imageData,dataTeam) {
    console.log("Llega a la funcion")
    if (imageData === undefined || !typeof imageData === 'object' || dataTeam === undefined || !typeof dataTeam === 'object') {
        throw new Error('Se necesita un objeto para subir una imagen');
    }
    try {
        const imageUrl = await postImage(imageData);
        dataTeam.crestUrl = imageUrl;
        return dataTeam;
    } catch (error) {
        throw console.error(error);
    }
}

export async function updateImage(imageData,dataTeam) {
    if (imageData === undefined || !typeof imageData === 'object' || dataTeam === undefined || !typeof dataTeam === 'object') {
        throw new Error('Se necesita un objeto para actualizar una imagen');
    }
    try {
        console.log(dataTeam)
        const imageUrl = dataTeam.crestUrl;
        console.log(dataTeam.crestUrl)
        console.log(imageUrl)
        await deleteImage(imageUrl);
        return await uploadImage(imageData,dataTeam);
    } catch (error) {
        try {
            return await uploadImage(imageData,dataTeam);
        } catch (error) {
            throw console.error(error);
        }
    }
}

export async function deleteImage(imageUrl) {
    console.log(imageUrl)
    if (imageUrl === undefined) {
        throw new Error('Se necesita el URL de la imagen a borrar');
    }
    try {
        await dImage(imageUrl);
    } catch (error) {
        throw console.error(error);
    }
}