const helplines = [
  {
    name: "Women Helpline",
    number: "1091",
  },
  {
    name: "Emergency Response Support System",
    number: "112",
  },
  {
    name: "Police",
    number: "100",
  },
  {
    name: "Ambulance",
    number: "108",
  },
  {
    name: "Cyber Crime Helpline",
    number: "1930",
  },
];

export default function Helpline() {
  return (
    <div className="min-h-screen bg-pink-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl p-6">
          <h1 className="text-3xl font-bold text-pink-600 mb-6">
            Emergency Helplines
          </h1>

          <div className="space-y-4">
            {helplines.map((helpline, index) => (
              <div
                key={index}
                className="bg-pink-50 border border-pink-100 rounded-xl p-4 flex items-center justify-between"
              >
                <div>
                  <h2 className="font-semibold text-lg">
                    {helpline.name}
                  </h2>

                  <p className="text-gray-600">
                    {helpline.number}
                  </p>
                </div>

                <a
                  href={`tel:${helpline.number}`}
                  className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg"
                >
                  Call
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}