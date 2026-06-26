const CATEGORY_COLORS = {
  Food: { bg: "#DCFCE7", text: "#16A34A" },
  Shopping: { bg: "#F3E8FF", text: "#9333EA" },
  Transport: { bg: "#DBEAFE", text: "#2563EB" },
  Bills: { bg: "#FFEDD5", text: "#EA580C" },
  Other: { bg: "#E5E7EB", text: "#4B5563" },
};

const formatAmount = (amount) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);

function Summary({ total, breakdown }) {
  return (
    <div className="bg-white dark:bg-[#1E293B] rounded-xl shadow-sm border border-[#E2E8F0] dark:border-[#334155] p-6">
      <p className="text-sm font-medium text-[#64748B] dark:text-[#94A3B8] mb-1">
        Total Expenses
      </p>
      <p className="text-4xl font-bold text-[#0F172A] dark:text-[#F8FAFC] mb-6">
        {formatAmount(total)}
      </p>
      {breakdown.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wide mb-3">
            By Category
          </p>
          <div className="flex flex-wrap gap-3">
            {breakdown.map((item) => {
              const colors =
                CATEGORY_COLORS[item.category] || CATEGORY_COLORS.Other;
              return (
                <div
                  key={item.category}
                  style={{ backgroundColor: colors.bg }}
                  className="rounded-lg px-4 py-2"
                >
                  <p
                    style={{ color: colors.text }}
                    className="text-xs font-semibold"
                  >
                    {item.category}
                  </p>
                  <p
                    style={{ color: colors.text }}
                    className="text-sm font-bold"
                  >
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
