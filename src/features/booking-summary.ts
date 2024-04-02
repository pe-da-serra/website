import { computed } from "vue";
import { booking, listRooms } from "./booking";

export const useBookingSummary = () => {
  const rooms = listRooms();

  const summaryList = computed(() => {
    if (!rooms.value.data) return [];

    return booking.value.selectedRooms.map(room => ({
      roomId: room.roomId,
      name: rooms.value.data?.find(r => r.id === room.roomId)?.name ?? '',
      quantity: room.totalRooms,
      guestsPerRoom: room.guestsPerRoom,
      amount: room.pricePerRoom * room.totalRooms,
    }))
  });

  const totalAmount = computed(() =>
    summaryList.value.reduce((acc, listItem) => acc + listItem.amount, 0)
  );

  const totalGuests = computed(() =>
    summaryList.value.reduce((acc, listItem) => acc + (listItem.guestsPerRoom * listItem.quantity), 0)
  );

  return { summaryList, totalAmount, totalGuests }
}

