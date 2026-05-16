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
    <div className="min-h-screen pb-24  bg-pink-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl border border-pink-100 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-pink-600">
              Emergency Helplines
            </h1>

            <p className="text-gray-500 mt-2">
              Quick access to important emergency services.
            </p>
          </div>


          <div className="space-y-4">
            {helplines.map((helpline, index) => (
              <div
                key={index}
                className="bg-pink-50 border border-pink-100 rounded-2xl p-5 flex items-center justify-between"
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
                  className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-xl font-medium transition"
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