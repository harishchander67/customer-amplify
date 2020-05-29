/* Amplify Params - DO NOT EDIT
	API_RETAIL_GRAPHQLAPIENDPOINTOUTPUT
	API_RETAIL_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */ /* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var apiPhotoalbumsGraphQLAPIIdOutput = process.env.API_PHOTOALBUMS_GRAPHQLAPIIDOUTPUT
var apiPhotoalbumsGraphQLAPIEndpointOutput = process.env.API_PHOTOALBUMS_GRAPHQLAPIENDPOINTOUTPUT

Amplify Params - DO NOT EDIT */ // eslint-disable-next-line

require('es6-promise').polyfill();
require('isomorphic-fetch');
const AWS = require('aws-sdk');
const S3 = new AWS.S3({signatureVersion: 'v4'});
const Rekognition = new AWS.Rekognition();

/*
Note: Sharp requires native extensions to be installed in a way that is compatible
with Amazon Linux (in order to run successfully in a Lambda execution environment).

If you're not working in Cloud9, you can follow the instructions on http://sharp.pixelplumbing.com/en/stable/install/#aws-lambda how to install the module and native dependencies.
*/
const Sharp = require('sharp');

// We'll expect these environment variables to be defined when the Lambda function is deployed
const THUMBNAIL_WIDTH = parseInt(process.env.THUMBNAIL_WIDTH || 80, 10);
const THUMBNAIL_HEIGHT = parseInt(process.env.THUMBNAIL_HEIGHT || 80, 10);

function thumbnailKey(keyPrefix, filename) {
  return `${keyPrefix}/resized/${filename}`;
}

function fullsizeKey(keyPrefix, filename) {
  return `${keyPrefix}/fullsize/${filename}`;
}

function makeThumbnail(photo) {
  return Sharp(photo).resize(THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT).toBuffer();
}

async function resize(photoBody, bucketName, key) {
  const keyPrefix = key.substr(0, key.indexOf('/upload/'));
  const originalPhotoName = key.substr(key.lastIndexOf('/') + 1);
  // const originalPhotoDimensions = await Sharp(photoBody).metadata();

  const thumbnail = await makeThumbnail(photoBody);
  const fullsizeKeyValue = fullsizeKey(keyPrefix, originalPhotoName);
  const thumbnailKeyValue = thumbnailKey(keyPrefix, originalPhotoName);
  await Promise.all([
    S3.putObject({
      //Body: bareBinImageBufferToBase64WithURLBuffer(thumbnail),
      Body: thumbnail,
      Bucket: bucketName,
      Key: thumbnailKeyValue,
    }).promise(),

    /*		S3.copyObject({
			Bucket: bucketName,
			CopySource: bucketName + '/' + key,
			Key: fullsizeKeyValue,
		}).promise(),
		*/
    S3.putObject({
      Body: photoBody,
      Bucket: bucketName,
      Key: fullsizeKeyValue,
    }).promise(),
  ]);

  await S3.deleteObject({
    Bucket: bucketName,
    Key: key,
  }).promise();
  const labelNames = await getLabelNames(photoBody);
  console.log('labelNames: ' + labelNames);

  return {
    photoId: originalPhotoName,

    thumbnail: {
      key: thumbnailKey(keyPrefix, originalPhotoName),
      width: THUMBNAIL_WIDTH,
      height: THUMBNAIL_HEIGHT,
    },

    fullsize: {
      key: fullsizeKey(keyPrefix, originalPhotoName),
      //	width: originalPhotoDimensions.width,
      //	height: originalPhotoDimensions.height
    },
  };
}

async function processRecord(record) {
  const bucketName = record.s3.bucket.name;
  const key = decodeURIComponent(record.s3.object.key.replace(/\+/g, ' '));

  console.log('processRecord', JSON.stringify(record));

  if (record.eventName !== 'ObjectCreated:Put') {
    console.log('Is not a new file');
    return;
  }
  if (!key.includes('upload/')) {
    console.log('Does not look like an upload from user');
    return;
  }

  const originalPhoto = await S3.getObject({
    Bucket: bucketName,
    Key: key,
  }).promise();

  const metadata = originalPhoto.Metadata;
  const sizes = await resize(
    base64WithURLBufferToBareBinImageBuffer(originalPhoto.Body),
    bucketName,
    key,
  );
  console.log('sizes', JSON.stringify(sizes));

  console.log(JSON.stringify(metadata), JSON.stringify(sizes));
}

exports.handler = async (event, context, callback) => {
  console.log('Received S3 event:', JSON.stringify(event, null, 2));
  const bucket = event.Records[0].s3.bucket.name; //eslint-disable-line
  const key = event.Records[0].s3.object.key; //eslint-disable-line
  console.log(`Bucket: ${bucket}`, `Key: ${key}`);

  try {
    event.Records.forEach(processRecord);
    callback(null, {status: 'Photo Processed'});
  } catch (err) {
    console.error(err);
    callback(err);
  }
};

function base64WithURLBufferToBareBinImageBuffer(base64DataBuffer) {
  //const buf1 = Buffer.from("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAAFACAYAAADqG3NrAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAB2bSURBVHic7d19dBXV/");
  var content = base64DataBuffer.toString();

  console.log(base64DataBuffer.toString());

  var imageebas64 = content.split('base64,')[1];

  var binarimagebuffer = new Buffer(imageebas64, 'base64');

  console.log(binarimagebuffer.toString());
  return binarimagebuffer;
}

function bareBinImageBufferToBase64WithURLBuffer(binarimagebuffer) {
  //Convert binary to bas64image
  let content = binarimagebuffer.toString('base64');
  console.log(content);
  var imageType = null;

  if (content.charAt(0) == '/') imageType = 'jpg';
  else if (content.charAt(0) == 'i') imageType = 'png';
  if (content.charAt(0) == 'R') imageType = 'gif';
  if (content.charAt(0) == 'U') imageType = 'webp';
  return Buffer.from('data:image/' + imageType + ';base64,' + content);
}

async function getLabelNames(binaryImage) {
  let params = {
    Image: {
      Bytes: binaryImage,
    },
    MaxLabels: 50,
    MinConfidence: 70,
  };
  console.log('Fetching labelNames start: ');
  const detectionResult = await Rekognition.detectLabels(params).promise();
  const labelNames = detectionResult.Labels.map((l) => l.Name.toLowerCase());
  console.log('Feetchiing labelNames End: ' + labelNames);
  return labelNames;
}
