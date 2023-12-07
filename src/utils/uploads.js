const aws = require('aws-sdk');
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

const endpoint = new aws.Endpoint(process.env.ENDPOINT_BACKBLAZE);

const s3 = new aws.S3({
	endpoint,
	credentials: {
		accessKeyId: process.env.KEY_ID,
		secretAccessKey: process.env.APP_KEY
	},
	sslEnabled: true
});

module.exports = {
	uploadFile: async (path, bufer, mimetype) => {
		const arquivo = await s3.upload({
			Bucket: process.env.BUCKET_NAME,
			Key: path,
			Body: bufer,
			ContentType: mimetype
		}).promise();

		return {
			url: `https://${process.env.BUCKET_NAME}.${process.env.ENDPOINT_BACKBLAZE}/${arquivo.Key}`
		};
	},
	deleteFile: async (path) => {
		await s3.deleteObject({
			Bucket: process.env.BUCKET_NAME,
			Key: path
		}).promise();
	}
};
