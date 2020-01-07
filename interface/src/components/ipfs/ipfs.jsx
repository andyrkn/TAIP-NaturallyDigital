const IPFS = require('ipfs-api');

export const ipfsNode = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

export const uploadContent = async (jsonFile) => {
    console.log('Uploading to IPFS');
    const content = Buffer.from(jsonFile);
    const filesAdded = await ipfsNode.files.add(content);
    return filesAdded[0].hash;
}

export const getContent = async (hash) => {
    console.log('Retrieving from IPFS');
    const fileBuffer = await ipfsNode.files.cat(hash);
    return fileBuffer.toString();
}