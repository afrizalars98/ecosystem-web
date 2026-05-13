import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TopBar, Button, Spinner } from "@wondr/design-system";
import { api } from "../../../core/api/client";

interface Slot { id: string; date: string; time: string; available: boolean; }

export const SlotPicker = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { api.get<Slot[]>(`/partners/rspi/doctors/${id}/slots`).then(setSlots).finally(() => setLoading(false)); }, [id]);

  const grouped = slots.reduce<Record<string, Slot[]>>((acc, slot) => { (acc[slot.date] = acc[slot.date] || []).push(slot); return acc; }, {});
  const fmtDate = (d: string) => new Date(d).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" });

  if (loading) return <div style={{ display: "flex", justifyContent: "center", padding: "64px" }}><Spinner size="lg" /></div>;

  return (
    <div>
      <TopBar title="Pilih Jadwal" onBack={() => navigate(`/partners/rspi/doctors/${id}`)} />
      <div style={{ padding: "var(--spacing-lg)" }}>
        {Object.entries(grouped).map(([date, dateSlots]) => (
          <div key={date} style={{ marginBottom: "var(--spacing-2xl)" }}>
            <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "var(--spacing-md)" }}>{fmtDate(date)}</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-sm)" }}>
              {dateSlots.map((slot) => (
                <button key={slot.id} onClick={() => setSelectedSlot(slot.id)} disabled={!slot.available}
                  style={{ padding: "var(--spacing-sm) var(--spacing-lg)", borderRadius: "var(--radius-lg)", border: selectedSlot === slot.id ? "2px solid var(--color-primary-500)" : "1px solid var(--color-neutral-300)", backgroundColor: selectedSlot === slot.id ? "var(--color-primary-100)" : "var(--color-white)", color: slot.available ? "var(--color-neutral-800)" : "var(--color-neutral-300)", fontSize: "14px", fontWeight: 500, cursor: slot.available ? "pointer" : "not-allowed" }}>
                  {slot.time}
                </button>
              ))}
            </div>
          </div>
        ))}
        <Button fullWidth size="lg" disabled={!selectedSlot} onClick={() => {
          const slot = slots.find((s) => s.id === selectedSlot);
          if (slot) navigate(`/partners/rspi/booking/${id}?slotId=${slot.id}&date=${slot.date}&time=${slot.time}`);
        }}>Lanjutkan</Button>
      </div>
    </div>
  );
};
