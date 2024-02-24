export const phone = "(24) 3384-7550";
export const whatsapp = "(24) 3384-7550";
export const email = "contato@pedaserrahotel.com.br";
export const address = [
  "Rua Luís Pistarini, 43",
  "Campos Elíseos, Resende - RJ",
  "27542-090"
];

export const url = {
  address: "https://maps.app.goo.gl/VXfjYryWJ2yoGia46",
  email: `mailto:${email}`,
  whatsapp: `https://wa.me/55${keepOnlyNumbers(whatsapp)}`,
  phone: `tel:+55${keepOnlyNumbers(phone)}`,
  instagram: "https://www.instagram.com",
}

function keepOnlyNumbers(text: string) {
  return text.replace(/[^0-9]/g, '');
}
