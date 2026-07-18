const CATEGORY_COLORS = {
  Food: "#2F6B3A",
  Shopping: "#8B3A2B",
  Transport: "#2A5C73",
  Bills: "#8A6A21",
  Other: "#5B5750",
};

const formatAmount = (amount) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);

function Summary({ total, breakdown }) {
  return (
    <div className="bg-surface rounded-sm border border-line p-6">
      <p className="text-xs font-semibold text-ink-soft uppercase tracking-widest mb-2">
        Total Expenses
      </p>
      <p className="font-display text-5xl font-semibold text-ink mb-6">
        {formatAmount(total)}
      </p>

      {breakdown.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-ink-soft uppercase tracking-widest mb-3">
            By Category
          </p>
          <div className="flex flex-wrap gap-3">
            {breakdown.map((item, i) => {
              const color =
                CATEGORY_COLORS[item.category] || CATEGORY_COLORS.Other;
              return (
                <div
                  key={item.category}
                  style={{
                    borderColor: color,
                    color: color,
                    transform: i % 2 === 0 ? "rotate(-1deg)" : "rotate(1deg)",
                  }}
                  className="rounded-sm border-2 px-3 py-1.5 bg-surface"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-widest">
                    {item.category}
                  </p>
                  <p className="font-mono text-sm font-semibold">
                    {formatAmount(item.total)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Summary;
