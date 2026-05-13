import styles from "./FilterChips.module.css";

export interface FilterChip {
  id: string;
  label: string;
}

export interface FilterChipsProps {
  chips: FilterChip[];
  selected: string | null;
  onSelect: (id: string | null) => void;
}

export const FilterChips = ({ chips, selected, onSelect }: FilterChipsProps) => {
  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.chip} ${selected === null ? styles.active : ""}`}
        onClick={() => onSelect(null)}
      >
        Semua
      </button>
      {chips.map((chip) => (
        <button
          key={chip.id}
          className={`${styles.chip} ${selected === chip.id ? styles.active : ""}`}
          onClick={() => onSelect(chip.id === selected ? null : chip.id)}
        >
          {chip.label}
        </button>
      ))}
    </div>
  );
};
