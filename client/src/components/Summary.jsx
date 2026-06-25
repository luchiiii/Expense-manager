function Summary({ total, breakdown }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Summary</h2>
      <p className="text-3xl font-bold text-blue-600 mb-4">
        ₦{total.toLocaleString()}
      </p>
      {breakdown.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-2">
            BY CATEGORY
          </h3>
          <div className="space-y-2">
            {breakdown.map((item) => (
              <div
                key={item.category}
                className="flex justify-between items-center text-sm"
              >
                <span className="text-gray-600">{item.category}</span>
                <span className="font-semibold text-gray-800">
                  ₦{item.total.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Summary;
