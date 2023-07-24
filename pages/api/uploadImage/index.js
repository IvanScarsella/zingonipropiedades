export default async function handler(req, res) {
    const { id, file } = req.body;
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);
        try {
            console.log(formData);
            const uploadResponse = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            console.log(uploadResponse);
            // Response {
            //     [Symbol(realm)]: null,
            //     [Symbol(state)]: {
            //       aborted: false,
            //       rangeRequested: false,
            //       timingAllowPassed: true,
            //       requestIncludesCredentials: true,
            //       type: 'default',
            //       status: 400,
            //       timingInfo: {
            //         startTime: 3132458.5947999954,
            //         redirectStartTime: 0,
            //         redirectEndTime: 0,
            //         postRedirectStartTime: 3132458.5947999954,
            //         finalServiceWorkerStartTime: 0,
            //         finalNetworkResponseStartTime: 0,
            //         finalNetworkRequestStartTime: 0,
            //         endTime: 0,
            //         encodedBodySize: 0,
            //         decodedBodySize: 0,
            //         finalConnectionTimingInfo: null
            //       },
            //       cacheState: '',
            //       statusText: 'Bad Request',
            //       headersList: HeadersList {
            //         cookies: null,
            //         [Symbol(headers map)]: [Map],
            //         [Symbol(headers map sorted)]: null
            //       },
            //       urlList: [ [URL] ],
            //       body: { stream: undefined }
            //     },
            //     [Symbol(headers)]: HeadersList {
            //       cookies: null,
            //       [Symbol(headers map)]: Map(11) {
            //         'date' => [Object],
            //         'content-type' => [Object],
            //         'transfer-encoding' => [Object],
            //         'connection' => [Object],
            //         'status' => [Object],
            //         'cache-control' => [Object],
            //         'x-cld-error' => [Object],
            //         'x-xss-protection' => [Object],
            //         'x-request-id' => [Object],
            //         'x-ua-compatible' => [Object],
            //         'server' => [Object]
            //       },
            //       [Symbol(headers map sorted)]: null
            //     }
            //   }
        } catch (error) {
            console.log(error);
        }
        if (uploadResponse.ok) {
            const jsonResponse = await uploadResponse.json();
            console.log("Archivo subido con éxito:", jsonResponse.url);

            const propertyImage = jsonResponse.url;

            // Una vez que el archivo se carga en Cloudinary, actualiza la propiedad con la nueva URL de imagen
            const apiResponse = await fetch(`/api/properties/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    propertyImage,
                }),
            });

            if (apiResponse.ok) {
                const jsonResponse = await apiResponse.json();
                console.log("Imagen de propiedad actualizada exitosamente:", jsonResponse);

                // Limpia el campo de archivo después de la actualización exitosa
                setFile(null);
                setFilename('');
            } else {
                console.log(
                    "Error al actualizar la imagen de la propiedad:",
                    apiResponse.status,
                    apiResponse.statusText
                );
            }
        } else {
            console.log(
                "Error al subir el archivo:",
                uploadResponse.status,
                uploadResponse.statusText
            );
        }
    } catch (error) {
        console.log(error);
    }
}