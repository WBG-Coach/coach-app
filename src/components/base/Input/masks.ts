export const masks = {
  cnpj: (value: string) =>
    value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1'),
  cpf: (value: string) =>
    value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1'),
  cep: (value: string) =>
    value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1'),
  removeMask: (value: string) =>
    value.replace(/\./g, '').replace(/[^0-9]/g, ''),
  text: (value: string) => value,
  date: (value: string) => value,
};
