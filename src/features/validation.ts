import { phoneMask, documentMask } from "./mask";

export function validateName(name: string): string|boolean {
  if (name.length === 0) {
    return 'Nome é obrigatório.';
  }

  if (!name.includes(' ')) {
    return 'Insira o nome completo.';
  }

  return true;
}

export function validateEmail(email: string): string|boolean {
  if (email.length === 0) {
    return 'Email é obrigatório.';
  }

  if (!email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )) {
    return 'Email inválido.'
  }

  return true;
}

export function validatePhone(phone: string): string|boolean {
  phone = phoneMask.unmasked(phone);

  if (phone.length === 0) {
    return 'Telefone é obrigatório.';
  }

  if (!hasOnlyNumbers(phone)) {
    return 'Telefone deve ter somente números';
  }

  return true;
}

export function validateDocument(document: string): string|boolean {
  document = documentMask.unmasked(document);

  if (document.length === 0) {
    return 'CPF é obrigatório.';
  }

  if (!hasOnlyNumbers(document)) {
    return 'CPF deve ter somente números';
  }

  if (!isValidCpf(document)) {
    return 'CPF inválido.'
  }

  return true;
}

function isValidCpf(cpf: string) {
  cpf = cpf.replace(/\D/g, '');
  if(cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  var result = true;
  [9,10].forEach(function(j){
      var soma = 0, r;
      cpf.split(/(?=)/).splice(0,j).forEach(function(e, i){
          soma += parseInt(e) * ((j+2)-(i+1));
      });
      r = soma % 11;
      r = (r <2)?0:11-r;
      if(r.toString() != cpf.substring(j, j+1)) result = false;
  });

  return result;
}

function hasOnlyNumbers(input: string) {
  return /^\d+$/.test(input);
}
