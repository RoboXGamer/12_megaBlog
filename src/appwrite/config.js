import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
	client = new Client();
	databases;
	storage;

	constructor() {
		this.client
			.setEndpoint(conf.appwriteUrl)
			.setProject(conf.appwriteProjectId);
		this.databases = new Databases(this.client);
		this.storage = new Storage(this.client);
	}

	// Methods for database service:
	// 1. createPost
	// 2. updatePost
	// 3. deletePost
	// 4. getPost
	// 5. getPosts
	async createPost({ title, slug, content, featuredImage, status, userId }) {
		try {
			return await this.databases.createDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug,
				{
					title,
					content,
					featuredImage,
					status,
					userId,
				}
			);
		} catch (error) {
			console.log("Appwrite service :: Create post :: Error ::", error);
		}
	}

	async updatePost(slug, { title, content, featuredImage, status }) {
		try {
			return await this.databases.updateDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug,
				{
					title,
					content,
					featuredImage,
					status,
				}
			);
		} catch (error) {
			console.log("Appwrite service :: Update post :: Error ::", error);
		}
	}

	async deletePost(slug) {
		try {
			await this.databases.deleteDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug
			);
			return true;
		} catch (error) {
			console.log("Appwrite service :: Delete post :: Error ::", error);
			return false;
		}
	}

	async getPost(slug) {
		try {
			return await this.databases.getDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug
			);
		} catch (error) {
			console.log("Appwrite service :: Get post :: Error ::", error);
			return false;
		}
	}

	async getPosts(queries = [Query.equal("status", "active")]) {
		try {
			await this.databases.listDocuments(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				queries
			);
		} catch (error) {
			console.log("Appwrite service :: Get posts :: Error ::", error);
		}
	}

	// Methods for file upload service:
	// 1. uploadFile
	// 2. deleteFile
	// 3. getFilePreview

	async uploadFile(file) {
		try {
			return await this.storage.createFile(
				conf.appwriteBucketId,
				ID.unique(),
				file
			);
		} catch (error) {
			console.log("Appwrite service :: Upload file :: Error ::", error);
		}
	}

	async deleteFile(fileId) {
		try {
			await this.storage.deleteFile(conf.appwriteBucketId, fileId);
			return true;
		} catch (error) {
			console.log("Appwrite service :: Delete file :: Error ::", error);
			return false;
		}
	}

	getFilePreview(fileId) {
		try {
			return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
		} catch (error) {
			console.log("Appwrite service :: Get file preview :: Error ::", error);
		}
	}
}

const service = new Service();

export default service;
