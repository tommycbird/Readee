class Echo3DApi {
    /**
     * Constructor
     * 
     * @param {string} apiKey API Key of project
     * @param {string} secKey Security Key of project
     */
    constructor(apiKey, secKey = '') {
        this.apiKey = apiKey;
        this.secKey = secKey;
        this.domain = 'api.echo3d.co';
        this.queryURL = 'https://' + this.domain + '/query';
        this.getURL = 'https://' + this.domain + '/get';
        this.postURL = 'https://' + this.domain + '/post';
    }

    /** 
     * Query helper.
     * 
     * @param {string} url 
     * @param {FormData} formData 
     * @param {callback} successCallback 
     * @param {callback} errorCallback 
     * @returns response
     */
    async query(url, method, formData, successCallback = null, errorCallback = null) {

        let resp = '';

        await fetch(url, {
            method: method,
            body: formData
        }).then(response => response.text())
            .then(result => {
                if (successCallback !== null)
                    successCallback(result);
                resp = result;
            })
            .catch(error => {
                // if there is no callback for error then print error
                if (errorCallback !== null) {
                    errorCallback(error);
                } else {
                    console.error('Error:', error);
                }
            });

        return resp;
    }

    /**
     * Get all entries
     * 
     * @param {callback} successCallback 
     * @param {callback} errorCallback 
     * @returns JSON of all entries
     */
    async queryAll(successCallback = null, errorCallback = null) {

        let resp = '';

        const formData = new FormData();
        formData.append('key', this.apiKey);
        if (this.secKey !== '') { formData.append('secKey', this.secKey); }

        resp = await this.query(this.queryURL, 'post', formData, successCallback, errorCallback);

        return resp;
    }

    /**
     * Get a specific entry
     * 
     * @param {string} entry A specific entry ID.
     * @param {callback} successCallback 
     * @param {callback} errorCallback 
     * @returns JSON of entry
     */
    async queryEntry(entry, successCallback = null, errorCallback = null) {

        const formData = new FormData();
        formData.append('key', this.apiKey);
        if (this.secKey !== '') { formData.append('secKey', this.secKey); }
        formData.append('entry', entry);

        return await this.query(this.queryURL, 'post', formData, successCallback, errorCallback);
    }

    /**
     * Get specific entries
     * 
     * @param {string[]} entries Array of entries
     * @param {callback} successCallback 
     * @param {callback} errorCallback 
     * @returns JSON of relevant entries
     */
    async queryEntries(entries, successCallback = null, errorCallback = null) {

        const formData = new FormData();
        formData.append('key', this.apiKey);
        if (this.secKey !== '') { formData.append('secKey', this.secKey); }
        formData.append('entries', entries.join(','));

        return await this.query(this.queryURL, 'post', formData, successCallback, errorCallback);
    }

    /**
     * Get entries based on tags
     * 
     * @param {string[]} tags Array of tags
     * @param {callback} successCallback
     * @param {callback} errorCallback 
     * @returns JSON of relevant entries
     */
    async queryTags(tags, successCallback = null, errorCallback = null) {

        const formData = new FormData();
        formData.append('key', this.apiKey);
        if (this.secKey !== '') { formData.append('secKey', this.secKey); }
        formData.append('tags', tags.join(','));

        return await this.query(this.queryURL, 'post', formData, successCallback, errorCallback);
    }

    /**
     * Get entries based on file
     * 
     * @param {string} filename A filename, e.g. myfile.obj.
     * @param {boolean} async 
     * @param {callback} successCallback 
     * @param {callback} errorCallback 
     * @returns JSON of relevant entries
     */
    async queryFilename(filename, successCallback = null, errorCallback = null) {

        const formData = new FormData();
        formData.append('key', this.apiKey);
        if (this.secKey !== '') { formData.append('secKey', this.secKey); }
        formData.append('filename', filename);

        return await this.query(this.queryURL, 'post', formData, successCallback, errorCallback);
    }

    /**
     * Get entries based on data
     * 
     * @param {string} data A data key, e.g. scale.
     * @param {string} value A data value, e.g. 2.
     * @param {callback} successCallback 
     * @param {callback} errorCallback 
     * @returns JSON of relevant entries
     */
    async queryData(data, value, successCallback = null, errorCallback = null) {

        const formData = new FormData();
        formData.append('key', this.apiKey);
        if (this.secKey !== '') { formData.append('secKey', this.secKey); }
        formData.append('data', data);
        formData.append('value', value);

        return await this.query(this.queryURL, 'post', formData, successCallback, errorCallback);
    }

    /**
     * Get entries based on type
     * 
     * @param {string} type A type of hologram or target. Options: MODEL_HOLOGRAM, VIDEO_HOLOGRAM, IMAGE_HOLOGRAM,BRICK_TARGET, GEOLOCATION_TARGET, or IMAGE_TARGET
     * @param {callback} successCallback 
     * @param {callback} errorCallback 
     * @returns JSON of relevant entries
     */
    async queryType(type, successCallback = null, errorCallback = null) {


        const formData = new FormData();
        formData.append('key', this.apiKey);
        if (this.secKey !== '') { formData.append('secKey', this.secKey); }
        formData.append('type', type);

        return await this.query(this.queryURL, 'post', formData, successCallback, errorCallback);
    }

    /**
     * Get entries based on location
     * 
     * @param {string} location Location express as <"lat", "long">
     * @param {callback} radius The acceptable distance in miles between the location and the the entry's location. If radius isn't specified, a default 1 mile radius is used.
     * @param {callback} successCallback 
     * @param {callback} errorCallback 
     * @returns JSON of relevant entries
     */
    async queryLocation(location, radius = 1, successCallback = null, errorCallback = null) {

        const formData = new FormData();
        formData.append('key', this.apiKey);
        if (this.secKey !== '') { formData.append('secKey', this.secKey); }
        formData.append('location', location);
        formData.append('radius', radius);

        return await this.query(this.queryURL, 'post', formData, successCallback, errorCallback);
    }

    /**
     * Get a global data entry
     * 
     * @param {string} data Data key
     * @param {callback} successCallback 
     * @param {callback} errorCallback 
     * @returns {string} value of the data entry
     */
    async queryGlobalData(data, successCallback = null, errorCallback = null) {

        const formData = new FormData();
        formData.append('key', this.apiKey);
        if (this.secKey !== '') { formData.append('secKey', this.secKey); }
        formData.append('data', data);

        return await this.query(this.getURL, 'post', formData, successCallback, errorCallback);
    }

    /**
     * Post a global data entry
     * 
     * @param {string} data Data key
     * @param {string} value Data Value
     * @param {callback} successCallback 
     * @param {callback} errorCallback 
     * @returns status message
     */
    async postGlobalData(data, value, successCallback = null, errorCallback = null) {

        const formData = new FormData();
        formData.append('key', this.apiKey);
        if (this.secKey !== '') { formData.append('secKey', this.secKey); }
        formData.append('data', data);
        formData.append('value', value);

        return await this.query(this.postURL, 'post', formData, successCallback, errorCallback);
    }

    /**
     * Get metadata of an entry
     * 
     * @param {string} entryID Entry ID
     * @param {string} data Data key
     * @param {callback} successCallback 
     * @param {callback} errorCallback 
     * @returns string value of the metadata
     */
    async queryEntryData(entryID, data, successCallback = null, errorCallback = null) {

        const formData = new FormData();
        formData.append('key', this.apiKey);
        if (this.secKey !== '') { formData.append('secKey', this.secKey); }
        formData.append('entry', entryID);
        formData.append('data', data);

        return await this.query(this.getURL, 'post', formData, successCallback, errorCallback);
    }

    /**
     * Post metadata to an entry
     * 
     * @param {string} entryID Entry ID
     * @param {string} data data key
     * @param {string} value data value
     * @param {callback} successCallback 
     * @param {callback} errorCallback 
     * @returns status message
     */
    async postEntryData(entryID, data, value, successCallback = null, errorCallback = null) {

        const formData = new FormData();
        formData.append('key', this.apiKey);
        if (this.secKey !== '') { formData.append('secKey', this.secKey); }
        formData.append('entry', entryID);
        formData.append('data', data);
        formData.append('value', value);

        return await this.query(this.postURL, 'post', formData, successCallback, errorCallback);
    }


    /**
     * Download file content in the system given the file storage id.
     * 
     * @param {string} fileStorageID File storage id as displayed in additionalData of the Entry
     * @param {callback} successCallback 
     * @param {callback} errorCallback 
     * @returns File contents if query is valid. Else, return text message.
     */
    async downloadFileByFileStorageID(fileStorageID, successCallback = null, errorCallback = null) {

        const formData = new FormData();
        formData.append('key', this.apiKey);
        if (this.secKey !== '') { formData.append('secKey', this.secKey); }
        formData.append('file', fileStorageID);

        return await this.query(this.queryURL, 'post', formData, successCallback, errorCallback);
    }

    /**
     * Download file content stored in the system given the entryID
     * 
     * @param {string} entryID Entry ID
     * @param {callback} successCallback 
     * @param {callback} errorCallback 
     * @returns File content if query is valid. Else, returns text message.
     */
    async downloadFileByEntryID(entryID, successCallback = null, errorCallback = null) {

        const formData = new FormData();
        formData.append('key', this.apiKey);
        if (this.secKey !== '') { formData.append('secKey', this.secKey); }
        formData.append('entry', entryID);

        let result = await this.query(this.queryURL, 'post', formData);

        const dataset = new EchoDataset(result);

        // get the storageID of the file
        const storageID = dataset.Database.Entries[entryID].Hologram.storageID;

        // get the file contents
        return await this.downloadFileByFileStorageID(storageID, successCallback, errorCallback);
    }

    /**
     * Download file content given file format and the entry id. If the optional entry param is not used, 
     * the response will be a JSON containing all the Entrys with the specified format in the project.
     * Otherwise, the response will be the file content as specified by the file format and entry id.
     * 
     * @param {string} fileFormat File formats. Valid inputs: <FBX, OBJ, GLTF, GLB, or USDZ>
     * @param {string} entries Entry ID
     * @param {callback} successCallback 
     * @param {callback} errorCallback 
     * @returns JSON if <entries> excluded. Else, file contents 
     */
    async downloadFileByEntryIDAndFormat(fileFormat, entries = null, successCallback = null, errorCallback = null) {

        const formData = new FormData();
        formData.append('key', this.apiKey);
        if (this.secKey !== '') { formData.append('secKey', this.secKey); }
        formData.append('fileFormat', fileFormat);
        if (entries !== null) { formData.append('entries', entries); }

        // get the file contents
        return await this.query(this.queryURL, 'post', formData, successCallback, errorCallback);
    }

}


class EchoDataset {
    /**
     * Constructor
     * 
     * @param {string} jsonString JSON string representing Echo3D Dataset
     */
    constructor(jsonString) {
        const echoDB = JSON.parse(jsonString);

        this.ApiKey = echoDB.apiKey;
        this.Database = new Database(echoDB.db);
    }
}

class Database {
    /**
     * Constructor
     * 
     * @param {JSON} json JSON of the database entries.
     */
    constructor(json) {
        this.Entries = {};

        Object.keys(json).forEach(element => {
            const entry = new Entry(json[element]);
            this.Entries[entry.Id] = entry;
        });

        this.json = json;
    }
}

class Entry {
    /**
     * Constructor
     * 
     * @param {JSON} json JSON of individual Entry
     */
    constructor(json) {
        this.Id = json.id;
        this.Hologram = new Hologram(json.hologram);
        this.AdditionalData = new Metadata(json.additionalData);
        this.Target = new Target(json.target);

        this.json = json;
    }
}

class Hologram {
    /**
     * Constructor
     * 
     * @param {JSON} json JSON containing Hologram data
     */
    constructor(json) {
        this.filename = json.filename;
        this.storageID = json.storageID;
        this.textureFilenames = json.textureFilenames;
        this.textureStorageIDs = json.textureStorageIDs;
        this.materialFilename = json.materialFilename;
        this.materialStorageID = json.materialStorageID;
        this.type = json.type;
        this.targetID = json.targetID;

        this.json = json;
    }
}

class Metadata {
    /**
     * Constructor
     * 
     * @param {JSON} json JSON containing Metadata
     */
    constructor(json) {
        this.accessHistory = json.accessHistory;
        this.createdAt = json.createdAt;
        this.fbxHologramStorageFilename = json.fbxHologramStorageFilename;
        this.fbxHologramStorageID = json.fbxHologramStorageID;
        this.gltfHologramStorageFilename = json.gltfHologramStorageFilename;
        this.gltfHologramStorageID = json.gltfHologramStorageID;
        this.lastAccessed = json.lastAccessed;
        this.materialStorageFilename = json.materialStorageFilename;
        this.materialStorageID = json.materialStorageID;
        this.objHologramStorageFilename = json.objHologramStorageFilename;
        this.objHologramStorageID = json.objHologramStorageID;
        this.qrARjsMarkerStorageFilename = json.qrARjsMarkerStorageFilename;
        this.qrARjsMarkerStorageID = json.qrARjsMarkerStorageID;
        this.qrARjsStorageFilename = json.qrARjsStorageFilename;
        this.qrARjsStorageID = json.qrARjsStorageID;
        this.qrARjsTargetStorageFilename = json.qrARjsTargetStorageFilename;
        this.qrARjsTargetStorageID = json.qrARjsTargetStorageID;
        this.qrFaceARStorageFilename = json.qrFaceARStorageFilename;
        this.qrFaceARStorageID = json.qrFaceARStorageID;
        this.qrWebARStorageFilename = json.qrWebARStorageFilename;
        this.qrWebARStorageID = json.qrWebARStorageID;
        this.qrWebXRStorageFilename = json.qrWebXRStorageFilename;
        this.qrWebXRStorageID = json.qrWebXRStorageID;
        this.shortURL = json.shortURL;
        this.usdzHologramStorageFilename = json.usdzHologramStorageFilename;
        this.usdzHologramStorageID = json.usdzHologramStorageID;

        this.json = json;
    }
}

class Target {
    /**
     * Constructor
     * 
     * @param {JSON} json JSON of Target data
     */
    constructor(json) {
        this.id = json.id;
        this.type = json.type;
        this.holograms = json.holograms;

        this.json = json;
    }
}