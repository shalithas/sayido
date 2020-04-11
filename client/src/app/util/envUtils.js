export const getEnvVar = (name) => {
    if(process.env[`REACT_APP_${name}`]){
        return process.env[`REACT_APP_${name}`];
    } else {
        throw new Error(`Environment variable '${name}' not configured`);
    }
}