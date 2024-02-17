export const bookingUrl = (options: BookingOptions = {}) => {
  const phone = "5524999988330";

  var text = "Olá, gostaria fazer uma reserva no *Pé da Serra Hotel*.\n";

  if (options.start && options.end) {
    text += `\n*Chegada:* ${options.start.toLocaleDateString()}\n*Saída:* ${options.end.toLocaleDateString()}`;
  }

  if (options.room) {
    text += `\n*Quarto:* ${transalateRoomType(options.room)}`;
  }

  if (options.guests) {
    text += `\n*Hóspedes:* ${options.guests}`;
  }

  return encodeURI(`https://api.whatsapp.com/send?phone=${phone}&text=${text}`);
}

type BookingOptions = {
  start?: Date;
  end?: Date;
  room?: RoomType;
  guests?: number;
}

export enum RoomType {
  Single = 'single',
  Double = 'double',
  DoubleSharedBathroom = 'double-shared-bathroom',
  Couple = 'couple',
  Triple = 'triple',
  Apartment = 'apartment',
}

const transalateRoomType = (room: RoomType) => {
  switch (room) {
    case RoomType.Single:
      return "Solteiro";
    case RoomType.Double:
      return "Duplo";
    case RoomType.DoubleSharedBathroom:
      return "Duplo - banheiro compartilhado";
    case RoomType.Couple:
      return "Casal";
    case RoomType.Triple:
      return "Triplo";
    case RoomType.Apartment:
      return "Apartamento";
  }
}
