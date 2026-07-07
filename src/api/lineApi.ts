const LINE_API_URL =
  "https://script.google.com/macros/s/AKfycbygVMi7R_GnHdC2AHBpVsI4FkEpj2wVy9tGMQBih-PLAmCXMz5clomz5_HXv1Lsr48YBw/exec";

export async function sendLineMessage(message: string) {
  const response = await fetch(LINE_API_URL, {
    method: "POST",
    body: JSON.stringify({ message }),
  });

  return response.json();
}