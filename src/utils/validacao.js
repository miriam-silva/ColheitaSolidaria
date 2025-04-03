export function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/\D/g, ""); 
    return cnpj.length === 14; 
}

export function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, ""); 
    return cpf.length === 11; 
}
