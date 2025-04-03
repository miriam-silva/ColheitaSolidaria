export function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/\D/g, ""); // Remove caracteres não numéricos
    return cnpj.length === 14; // Simples verificação de tamanho
}

export function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, ""); // Remove caracteres não numéricos
    return cpf.length === 11; // Simples verificação de tamanho
}
