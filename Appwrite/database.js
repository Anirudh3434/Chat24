import config from '../Key/key';
import { Client, Databases, Storage, ID, Query } from 'appwrite';

export class Service {
    client = new Client();
    database;
    storage;

    constructor() {
        this.client.setEndpoint(config.url).setProject(config.projectid);
        this.database = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({ name, message, key, date, time }) {
        try {
            const documentData = {
                name: name,
                message: message,
                key: key,
                date: date,
                time: time
            };
            return await this.database.createDocument(
                config.databaseid,
                config.collectionid,
                ID.unique(), 
                documentData
            );
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updatePost(slug, { title, content, featureImage, userID, status }) {
        try {
            return await this.database.updateDocument(
                config.databaseid,
                config.collectionid,
                slug,
                {
                    title,
                    slug,
                    content,
                    featureImage,
                    userID,
                    status
                }
            );
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            return await this.database.deleteDocument(
                config.databaseid,
                config.collectionid,
                slug
            );
        } catch (error) {
            throw error;
        }
    }

    async getPost(slug) {
        try {
            return await this.database.getDocument(
                config.databaseid,
                config.collectionid,
                slug
            );
        } catch (error) {
            throw error;
        }
    }

    async getAllPosts(key) {
        try {
            const response = await this.database.listDocuments(
                config.databaseid,
                config.collectionid,
                [Query.equal('key', key)]
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                config.bucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            throw error;
        }
    }

    async deleteFile(fileID) {
        try {
            return await this.storage.deleteFile(
                config.bucketId,
                fileID 
            );
        } catch (error) {
            throw error;
        }
    }

    async getPreview(fileID) {
        try {
            return await this.storage.getFilePreview(
                config.bucketId,
                fileID
            );
        } catch (error) {
            throw error;
        }
    }
}

const service = new Service();
export default service;
