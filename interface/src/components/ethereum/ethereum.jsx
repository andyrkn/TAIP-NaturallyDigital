import Web3 from 'web3';
import userIdentityAbi from './userIdentity';
import identityProviderAbi from './identityProvider';

const userIdentityAddress = "0xe4d31CB79d5Ac29f221666a5F302bF82F3c6786c";
const identityProviderAddress = "0x8e3C7B180D670BA781b2Bd1fB3415Dc0468abCa1";

export const getWeb3Instance = () => {
  let web3Provider;
  if ('ethereum' in window) {
    console.log('web3 Provider present');
    web3Provider = window['ethereum'];
  }
  else {
    console.log('no web3 Provider');
    web3Provider = new Web3.providers.HttpProvider(`http://localhost:7545`);
  }
  return new Web3(web3Provider);
}

export const getAccountAddress = async () => {
  let web3 = getWeb3Instance();

  let res = await web3.eth.getAccounts();
  return res[0];
}

export const createIdentity = async (userAddress, ipfsHash, identityProviderAddress) => {
  let web3 = getWeb3Instance();
  const contract = new web3.eth.Contract(userIdentityAbi, userIdentityAddress);
  let result = await contract.methods.addIdentity(ipfsHash, identityProviderAddress).send({
    from: userAddress
  });
  return result.transactionHash;
}

export const getIdentity = async (userAddress, index) => {
  let web3 = getWeb3Instance();
  const contract = new web3.eth.Contract(userIdentityAbi, userIdentityAddress);
  let result = await contract.methods.getUserIdentity(userAddress, index).call();
  return { index: index, ipfsHash: result.ipfsHash, identityProvider: result.identityProviderReference };
}

export const getAllIdentities = async (userAddress) => {
  let web3 = getWeb3Instance();
  const contract = new web3.eth.Contract(userIdentityAbi, userIdentityAddress);
  let identitiesNumber = await contract.methods.getUserIdentityNumber(userAddress).call();
  let identities = [];
  for (let i = 0; i < identitiesNumber; i++) {
    const result = await getIdentity(userAddress, i);
    identities.push(result);
  }
  return identities;
}

export const deleteIdentity = async (userAddress, index) => {
  let web3 = getWeb3Instance();
  const contract = new web3.eth.Contract(userIdentityAbi, userIdentityAddress);
  let result = await contract.methods.removeIdentity(index).send({
    from: userAddress
  });
  return result.transactionHash;
}

export const createIdentityProvider = async (userAddress, identityProviderAddress, ipfsHash) => {
  let web3 = getWeb3Instance();
  const contract = new web3.eth.Contract(identityProviderAbi, identityProviderAddress);
  let result = await contract.methods.addIdentityProvider(identityProviderAddress, ipfsHash).send({
    from: userAddress
  });
  return result.transactionHash;
}

export const getIdentityProvider = async (index) => {
  let web3 = getWeb3Instance();
  const contract = new web3.eth.Contract(identityProviderAbi, identityProviderAddress);
  let result = await contract.methods.identityProviders.call(index);
  return { index: index, ipfsHash: result.ipfsHash, identityProvider: result.identifier };
}

export const getAllIdentityProviders = async () => {
  let web3 = getWeb3Instance();
  const contract = new web3.eth.Contract(identityProviderAbi, identityProviderAddress);
  let identitiesNumber = await contract.methods.getIdentityProviderNumber().call();
  let identitiyProviders = [];
  for (let i = 0; i < identitiesNumber; i++) {
    const result = await getIdentityProvider(i);
    identitiyProviders.push(result);
  }
  return identitiyProviders;
}

export const updateIdentityProvider = async (userAddress, index, ipAddress, ipfsHash) => {
  let web3 = getWeb3Instance();
  const contract = new web3.eth.Contract(identityProviderAbi, identityProviderAddress);
  let result = await contract.methods.updateIdentityProvider(index, ipAddress, ipfsHash).send({
    from: userAddress
  });
  return result.transactionHash;
}

export const deleteIdentityProvider = async (userAddress, index) => {
  let web3 = getWeb3Instance();
  const contract = new web3.eth.Contract(identityProviderAbi, identityProviderAddress);
  let result = await contract.methods.removeIdentityProvider(index).send({
    from: userAddress
  });
  return result.transactionHash;
}

export const isIdentityProviderValid = async (identityProvider) => {
  let web3 = getWeb3Instance();
  const contract = new web3.eth.Contract(identityProviderAbi, identityProviderAddress);
  return contract.methods.isIdentityProviderCreated.call(identityProvider);
}